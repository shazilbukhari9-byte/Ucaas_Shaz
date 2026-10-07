/**
 * Rebuilds the captured "Business Voice & Text" page as the /cloud-phone/phone-texting
 * route, the same way tools/generate.mjs rebuilds the homepage.
 *
 *   node tools/generate-business-voice.mjs ["path/to/page.html"]
 *
 * The capture is a browser "save page complete" pair: an HTML file plus a
 * sibling <name>_files directory holding its stylesheets, scripts and images.
 *
 * Everything this writes is namespaced, so it never collides with the homepage
 * build and `npm run generate` can still be re-run independently:
 *
 *   components/business-voice/*.jsx     one component per block
 *   styles/business-voice/*.css         the page's own stylesheet chain
 *   public/media/bv/*                   the page's images
 *
 * Unlike the homepage generator this one does NOT rebrand: the page keeps its
 * Nextiva naming, and the capture ships the CSS that its Nextiva-named classes
 * need, so markup and stylesheets stay in sync.
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, extname, basename, join } from 'node:path';
import {
  tokenize, topLevelChildren, parseAttrs, jsxAttrName, attrValue,
  styleToObject, decodeEntities, VOID_TAGS,
} from './htmlutil.mjs';

const DEFAULT_CAPTURE =
  'C:/Users/LENOVO/Downloads/Business Voice & Text - Unified Communications - Nextiva.html';

const CAPTURE = process.argv[2] || DEFAULT_CAPTURE;
const FILES = CAPTURE.replace(/\.html$/i, '_files');
const FILES_BASE = basename(FILES);
const OUT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1').replace(/\/$/, '');

if (!existsSync(CAPTURE)) throw new Error(`capture not found: ${CAPTURE}`);
if (!existsSync(FILES)) throw new Error(`capture assets not found: ${FILES}`);

const html = readFileSync(CAPTURE, 'utf8');

const MEDIA_DIR = 'bv'; // public/media/bv — keeps this page's assets out of the homepage set
const COMP_DIR = join(OUT, 'components', 'business-voice');
const STYLE_DIR = join(OUT, 'styles', 'business-voice');

// ---------------------------------------------------------------------------
// Assets
// ---------------------------------------------------------------------------

const assetMap = new Map();   // original url -> public path
const unresolved = new Set(); // left pointing at the origin site
const reusedFromHome = new Map();

const ASSET_EXT = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.avif', '.ico',
  '.woff', '.woff2', '.ttf', '.eot', '.mp4', '.webm',
]);

/** Files the homepage build already put in public/media, indexed by name stem. */
const homeMedia = new Map();
{
  const dir = join(OUT, 'public', 'media');
  if (existsSync(dir)) {
    for (const f of readdirSync(dir)) {
      // generate.mjs names them <stem>-<8 hex><ext>
      const m = f.match(/^(.*)-[0-9a-f]{8}(\.[^.]+)$/);
      if (m) homeMedia.set(m[1].toLowerCase() + m[2].toLowerCase(), `/media/${f}`);
    }
  }
}

function publicPath(name, ext) {
  const hash = createHash('sha1').update(name).digest('hex').slice(0, 8);
  const safe = basename(name, ext).replace(/[^a-zA-Z0-9._-]/g, '-').slice(0, 48);
  return `/media/${MEDIA_DIR}/${safe}-${hash}${ext}`;
}

/** Copies a file out of the capture directory into public/media/bv. */
function adoptCaptureFile(fileName) {
  const src = join(FILES, fileName);
  if (!existsSync(src)) return null;
  let ext = extname(fileName).toLowerCase();
  if (ext === '.download') ext = extname(basename(fileName, ext)).toLowerCase();
  if (!ASSET_EXT.has(ext)) return null;

  // The homepage already localized many of these; reuse rather than duplicate.
  const stem = basename(fileName, extname(fileName)).toLowerCase();
  const shared = homeMedia.get(stem + ext);
  if (shared) {
    reusedFromHome.set(fileName, shared);
    return shared;
  }

  const rel = publicPath(fileName, ext);
  const dest = join(OUT, 'public', rel);
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(src, dest);
  return rel;
}

/** Every name in the capture directory, indexed lowercase for fuzzy lookups. */
const captureIndex = new Map();
for (const f of readdirSync(FILES)) captureIndex.set(f.toLowerCase(), f);

/**
 * Resolves an asset name against public/media, which the homepage build already
 * populated from the same theme. Upload variants carry a `_0902fd` style suffix
 * that the two captures do not share, so it is stripped on the second attempt.
 */
function homeMediaFor(pathname) {
  const name = decodeURIComponent(pathname.split('?')[0].split('#')[0].split('/').pop() || '');
  if (!name) return null;
  const ext = extname(name).toLowerCase();
  const stem = basename(name, extname(name)).toLowerCase();
  return homeMedia.get(stem + ext)
    || homeMedia.get(stem.replace(/_[0-9a-f]{6}$/, '') + ext)
    || null;
}

/** Resolves a remote asset URL to a file saved in the capture, by file name. */
function captureFileFor(pathname) {
  const name = decodeURIComponent(pathname.split('?')[0].split('#')[0].split('/').pop() || '');
  if (!name) return null;
  const direct = captureIndex.get(name.toLowerCase());
  if (direct) return direct;
  // Chrome appends " (1)" style suffixes when a name repeats.
  const ext = extname(name);
  const stem = basename(name, ext).toLowerCase();
  for (const [lower, actual] of captureIndex) {
    if (lower === `${stem}${ext.toLowerCase()}` || lower.startsWith(`${stem}(`)) return actual;
  }
  return null;
}

/**
 * Returns a servable URL for `url`. Capture-local references become
 * /media/bv/... ; origin-site references are matched against the capture and
 * fall back to the live URL when the browser never saved them.
 */
function localizeUrl(url) {
  if (!url || typeof url !== 'string') return url;
  const raw = url.trim();
  if (!raw || raw.startsWith('data:') || raw.startsWith('#')) return url;
  if (assetMap.has(raw)) return assetMap.get(raw);

  let result = raw;

  const localPrefix = `./${FILES_BASE}/`;
  if (raw.startsWith(localPrefix) || raw.startsWith(`${FILES_BASE}/`)) {
    const name = decodeURIComponent(raw.slice(raw.indexOf(FILES_BASE) + FILES_BASE.length + 1));
    result = adoptCaptureFile(name) || raw;
  } else if (/^https:\/\/(www\.nextiva\.com|nextivaweb\.imgix\.net)\//.test(raw)) {
    const pathname = raw.replace(/^https:\/\/[^/]+/, '');
    const ext = extname(pathname.split('?')[0]).toLowerCase();
    if (ASSET_EXT.has(ext)) {
      const hit = captureFileFor(pathname);
      const adopted = (hit ? adoptCaptureFile(hit) : null) || homeMediaFor(pathname);
      if (adopted) result = adopted;
      else { unresolved.add(raw); result = raw; }
    } else {
      result = raw; // navigational link, handled by localizeAttrValue
    }
  }

  assetMap.set(raw, result);
  return result;
}

function localizeAttrValue(name, value) {
  if (!value) return value;
  if (name === 'srcSet' || name === 'imageSrcSet') {
    return value
      .split(/,\s+/)
      .map((part) => {
        const t = part.trim();
        const sp = t.indexOf(' ');
        const u = sp === -1 ? t : t.slice(0, sp);
        return localizeUrl(u) + (sp === -1 ? '' : t.slice(sp));
      })
      .join(', ');
  }
  if (['src', 'href', 'poster', 'data-src', 'data-bg', 'content'].includes(name)) {
    const localized = localizeUrl(value);
    // Same-site page links become relative paths so navigation stays in-app.
    const samesite = localized.match(/^https:\/\/www\.nextiva\.com(\/.*)?$/);
    return samesite ? samesite[1] || '/' : localized;
  }
  return value;
}

/**
 * Rewrites url() in CSS. `sheetName` is the capture file the CSS came from, so
 * relative references resolve against the capture directory first and against
 * the origin site second.
 */
function localizeCss(css, sheetName) {
  return css.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g, (full, q, u) => {
    const ref = u.trim();
    if (!ref || ref.startsWith('data:') || ref.startsWith('#')) return full;

    if (/^https?:\/\//.test(ref)) {
      const localized = localizeUrl(ref);
      return `url(${q}${localized}${q})`;
    }

    // Relative: the browser saved siblings flat into the capture directory.
    const hit = captureFileFor(ref);
    if (hit) {
      const adopted = adoptCaptureFile(hit);
      if (adopted) return `url(${q}${adopted}${q})`;
    }
    // Assets the homepage build already localized (ABC Arizona fonts, theme art).
    const shared = homeMediaFor(ref)
      || homeMediaFor(ref.replace(/\.[0-9a-f]{8}(\.[^.]+)$/, '$1')); // hashed theme builds
    if (shared) return `url(${q}${shared}${q})`;
    if (sheetName) unresolved.add(`${sheetName} -> ${ref}`);
    // Absolute origin path keeps the sheet loadable rather than 404ing locally.
    return ref.startsWith('/') ? `url(${q}https://www.nextiva.com${ref}${q})` : full;
  });
}

// ---------------------------------------------------------------------------
// HTML -> JSX
// ---------------------------------------------------------------------------

const DROP_ELEMENTS = new Set(['script', 'noscript']);
const collectedStyles = [];

/**
 * The capture was saved after HubSpot rendered its forms, so the markup arrives
 * complete — including the live endpoint for Nextiva's portal, ~40 hidden
 * attribution fields and an `hs_context` blob carrying the capturing browser's
 * tracking cookie. The visible fields are the page's design and are kept; the
 * submission machinery is not ours to ship, so the endpoint, the hidden fields
 * and the post-target iframe are dropped. What remains is an inert form.
 */
const HUBSPOT_ACTION = /(hsforms\.com|hubspot\.com)/i;
let strippedHiddenFields = 0;

function escapeJsxText(text) {
  return text.replace(/[{}]/g, (c) => `{'${c}'}`);
}

/** Form controls React would otherwise treat as controlled — see below. */
const FORM_CONTROLS = new Set(['input', 'textarea', 'select', 'option']);

function renderTag(t, { inertForm = false } = {}) {
  const parts = [];
  for (const { name, value } of parseAttrs(t.attrs)) {
    let prop = jsxAttrName(name);
    if (prop === null) continue; // inline on* handler
    if (inertForm && t.name === 'form' && ['action', 'method', 'encType'].includes(prop)) continue;

    // The capture holds a rendered form, so its fields carry `value` and
    // `checked` attributes. In JSX those make a *controlled* input, which React
    // renders read-only without an onChange handler — the visitor could not
    // type into the demo form. The uncontrolled forms are what the markup
    // means, so they become the default-value props.
    if (FORM_CONTROLS.has(t.name)) {
      if (prop === 'value') prop = 'defaultValue';
      else if (prop === 'checked') prop = 'defaultChecked';
      else if (prop === 'selected') prop = 'defaultSelected';
    }

    // Extension noise the capture picked up from the browser profile.
    if (/^__processed|^data-new-gr-c-s|^data-gr-ext/.test(prop)) continue;

    if (prop === 'style') {
      const obj = styleToObject(localizeCss(decodeEntities(value ?? ''), null));
      if (obj) parts.push(`style=${obj}`);
      continue;
    }
    if (value === null) {
      parts.push(prop.startsWith('data-') || prop.startsWith('aria-') ? `${prop}=""` : prop);
      continue;
    }
    const decoded = localizeAttrValue(prop, decodeEntities(value));
    parts.push(
      /["\n\r{}\\]/.test(decoded)
        ? `${prop}={${JSON.stringify(decoded)}}`
        : `${prop}="${decoded}"`
    );
  }
  const attrs = parts.length ? ' ' + parts.join(' ') : '';
  const selfClose = t.type === 'self' || VOID_TAGS.has(t.name);
  return `<${t.name}${attrs}${selfClose ? ' />' : '>'}`;
}

function htmlToJsx(fragment) {
  let out = '';
  let skipDepth = 0;
  let skipTag = null;
  let styleBuf = null;
  let formDepth = 0; // > 0 while inside a HubSpot form

  for (const t of tokenize(fragment)) {
    if (skipTag) {
      if (t.type === 'open' && t.name === skipTag) skipDepth++;
      else if (t.type === 'close' && t.name === skipTag) {
        skipDepth--;
        if (skipDepth === 0) skipTag = null;
      }
      continue;
    }
    if (styleBuf !== null) {
      if (t.type === 'rawtext') styleBuf += t.raw;
      else if (t.type === 'close' && t.name === 'style') {
        collectedStyles.push(styleBuf);
        styleBuf = null;
      }
      continue;
    }

    switch (t.type) {
      case 'comment':
      case 'doctype':
        break;

      case 'text':
      case 'rawtext':
        out += escapeJsxText(t.raw);
        break;

      case 'open':
      case 'self': {
        if (t.name === 'style') {
          if (t.type === 'open') styleBuf = '';
          break;
        }
        if (DROP_ELEMENTS.has(t.name)) {
          if (t.type === 'open') { skipTag = t.name; skipDepth = 1; }
          break;
        }
        if (t.name === 'form' && HUBSPOT_ACTION.test(attrValue(t.attrs, 'action') || '')) {
          formDepth = 1;
          out += renderTag(t, { inertForm: true });
          break;
        }
        if (formDepth) {
          if (t.name === 'input' && (attrValue(t.attrs, 'type') || '').toLowerCase() === 'hidden') {
            strippedHiddenFields++;
            break;
          }
          if (t.name === 'iframe') {
            if (t.type === 'open') { skipTag = t.name; skipDepth = 1; }
            break;
          }
        }
        out += renderTag(t);
        break;
      }

      case 'close':
        if (t.name === 'style' || DROP_ELEMENTS.has(t.name)) break;
        if (t.name === 'form' && formDepth) formDepth = 0;
        if (VOID_TAGS.has(t.name)) { out += `<${t.name} />`; break; }
        out += `</${t.name}>`;
        break;
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Head: the page's own stylesheet chain
// ---------------------------------------------------------------------------

/**
 * Sheets the root layout already loads globally, or that belong to third-party
 * widgets this rebuild leaves out (consent banner, live chat, A/B testing).
 * Everything else in the capture's <head> is kept, in document order.
 */
const SKIP_SHEETS = [
  /onetrust/i, /introvoke/i, /simplify360/i, /api\.min\.css/i,
  /bootstrap/i, /^main\.[0-9a-f]+\.css$/i, /remixicon/i, /owl\.carousel/i,
];

/**
 * Inline <style> blocks belonging to widgets this rebuild leaves out — the
 * consent banner, the live chat and the de-anonymization tag. The HubSpot form
 * styles are kept: the capture holds the form's rendered markup, so the page
 * still shows a real form.
 */
const SKIP_INLINE = [/onetrust/i, /ucxm-chat/i, /6si/i, /goober/i];

function slug(s) {
  return String(s).replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase().slice(0, 50) || 'style';
}

/**
 * Output is overwritten in place rather than wiped: file names are derived from
 * the capture, so a re-run reproduces them exactly. Anything left behind from an
 * earlier run is reported at the end instead of being deleted, which keeps the
 * generator safe to run against a working tree.
 */
const written = new Set();

function emit(dir, name, contents) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, name), contents);
  written.add(join(dir, name));
}

function orphansIn(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => !written.has(join(dir, f)));
}

mkdirSync(STYLE_DIR, { recursive: true });
mkdirSync(COMP_DIR, { recursive: true });
mkdirSync(join(OUT, 'public', 'media', MEDIA_DIR), { recursive: true });

const head = html.slice(html.indexOf('<head'), html.indexOf('</head>'));
const cssImports = [];
let sheetIdx = 0;

{
  const nodes = [];
  let inStyle = false;
  let styleId = '';
  let buf = '';
  for (const t of tokenize(head)) {
    if (inStyle) {
      if (t.type === 'rawtext') buf += t.raw;
      else if (t.type === 'close' && t.name === 'style') {
        nodes.push({ kind: 'inline', id: styleId, css: buf });
        inStyle = false;
        buf = '';
      }
      continue;
    }
    if (t.type === 'open' && t.name === 'style') {
      inStyle = true;
      styleId = attrValue(t.attrs, 'id') || attrValue(t.attrs, 'class') || 'style';
      continue;
    }
    if ((t.type === 'self' || t.type === 'open') && t.name === 'link') {
      const rel = (attrValue(t.attrs, 'rel') || '').toLowerCase();
      if (rel === 'stylesheet') nodes.push({ kind: 'link', href: decodeEntities(attrValue(t.attrs, 'href') || '') });
    }
  }

  for (const n of nodes) {
    if (n.kind === 'inline') {
      if (!n.css.trim()) continue;
      if (SKIP_INLINE.some((re) => re.test(n.id))) continue;
      const file = `${String(++sheetIdx).padStart(2, '0')}-${slug(n.id)}.css`;
      emit(STYLE_DIR, file, localizeCss(n.css, file).trim() + '\n');
      cssImports.push(file);
      continue;
    }
    const href = n.href;
    if (!href) continue;
    const localPrefix = `./${FILES_BASE}/`;
    if (!href.startsWith(localPrefix)) continue; // remote sheets stay on the root layout
    const name = decodeURIComponent(href.slice(localPrefix.length));
    if (SKIP_SHEETS.some((re) => re.test(name))) continue;
    const src = join(FILES, name);
    if (!existsSync(src)) { unresolved.add(href); continue; }
    const body = readFileSync(src, 'utf8');
    if (body.trim().length < 32) continue; // the browser saved a placeholder
    const file = `${String(++sheetIdx).padStart(2, '0')}-${slug(basename(name, '.css'))}.css`;
    emit(STYLE_DIR, file, localizeCss(body, name));
    cssImports.push(file);
  }
}

// ---------------------------------------------------------------------------
// Body -> block components
// ---------------------------------------------------------------------------

const bodyStart = html.indexOf('>', html.indexOf('<body')) + 1;
const body = html.slice(bodyStart, html.lastIndexOf('</body>'));

const siteBlocks = topLevelChildren(body).find((k) => k.className.includes('wp-site-blocks'));
if (!siteBlocks) throw new Error('could not find .wp-site-blocks');

function inner(h) {
  return h.slice(h.indexOf('>') + 1, h.lastIndexOf('<'));
}

const blockKids = topLevelChildren(inner(siteBlocks.html));
const headerPart = blockKids.find((k) => k.name === 'header');
const entryContent = blockKids.find((k) => k.className.includes('entry-content'));
const footerPart = blockKids.find((k) => k.name === 'section' && k.className.includes('wp-block-template-part'));
if (!headerPart || !entryContent || !footerPart) throw new Error('capture layout differs from expectations');

const headerKids = topLevelChildren(inner(headerPart.html));
const entryKids = topLevelChildren(inner(entryContent.html));
const footerKids = topLevelChildren(inner(footerPart.html));

function pick(kids, needle, label) {
  const hit = kids.find((k) => k.id === needle || k.className.split(/\s+/).includes(needle));
  if (!hit) throw new Error(`could not locate "${needle}" for ${label}`);
  return hit.html;
}

const components = [
  ['TopBanner', pick(headerKids, 'ntb-banner', 'TopBanner')],
  ['MainHeader', pick(headerKids, 'nb20-header', 'MainHeader')],

  ['HeroEditorial', pick(entryKids, 'section-hero', 'HeroEditorial')],
  ['LogoTrustBar', pick(entryKids, 'section-logo-trust-bar', 'LogoTrustBar')],
  ['ProductShowcase', pick(entryKids, 'section-platform-showcase', 'ProductShowcase')],
  ['FeatureChecklist', pick(entryKids, 'section-feature-checklist', 'FeatureChecklist')],
  ['SocialProofGrid', pick(entryKids, 'section-social-proof-grid', 'SocialProofGrid')],
  ['FeatureHighlightCards', pick(entryKids, 'section-feature-highlight-cards', 'FeatureHighlightCards')],
  ['FaqAccordion', pick(entryKids, 'section-faq-accordion', 'FaqAccordion')],
  ['DemoForm', pick(entryKids, 'section-form-cta', 'DemoForm')],

  ['StickyCtaBanner', pick(footerKids, 'nextiva-sticky-cta-banner-block', 'StickyCtaBanner')],
  ['GetStarted', pick(footerKids, 'v2-get-started-block', 'GetStarted')],
  ['SiteFooter', pick(footerKids, 'wp-block-group', 'SiteFooter')],
];

/** Blocks with behaviour: each is wired to a hook that takes the root element. */
const BEHAVIOUR_HOOKS = {
  MainHeader: 'useHeaderNav',
  HeroEditorial: 'useHeroEditorial',
  LogoTrustBar: 'useLogoMarquee',
  ProductShowcase: 'useProductShowcase',
  FeatureChecklist: 'useFeatureChecklist',
  SocialProofGrid: 'useSocialProofGrid',
  FeatureHighlightCards: 'useHighlightCards',
  FaqAccordion: 'useFaqAccordion',
  DemoForm: 'useDemoForm',
  StickyCtaBanner: 'useStickyCta',
  GetStarted: 'useGetStarted',
  SiteFooter: 'useFooterBrand',
};

/**
 * Hooks that live in hooks/ rather than hooks/business-voice/. The header, the
 * logo marquee, the sticky CTA and the footer wordmark are the same upstream
 * blocks as on the homepage, down to their `data-nb20-*` hooks and class names,
 * so this page reuses the homepage's ports rather than shipping a second copy.
 */
const SHARED_HOOKS = new Set(['useHeaderNav', 'useLogoMarquee', 'useStickyCta', 'useFooterBrand']);

function indent(s, n) {
  const pad = ' '.repeat(n);
  return s.split('\n').map((l) => (l.trim() ? pad + l : l)).join('\n');
}

for (const [name, source] of components) {
  let jsx = htmlToJsx(source);
  const hook = BEHAVIOUR_HOOKS[name];

  if (hook) {
    const space = jsx.indexOf(' ');
    const gt = jsx.indexOf('>');
    const insertAt = space !== -1 && space < gt ? space : gt;
    jsx = jsx.slice(0, insertAt) + ' ref={rootRef}' + jsx.slice(insertAt);
  }

  const imports = [];
  if (hook) {
    const from = SHARED_HOOKS.has(hook)
      ? `../../hooks/${hook}`
      : `../../hooks/business-voice/${hook}`;
    imports.push(`import { useRef } from 'react';`, `import ${hook} from '${from}';`);
  }

  const fnBody = hook
    ? `  const rootRef = useRef(null);\n  ${hook}(rootRef);\n\n  return (\n${indent(jsx, 4)}\n  );`
    : `  return (\n${indent(jsx, 4)}\n  );`;

  const file = [
    hook ? "'use client';\n" : '',
    `/* Generated from the Business Voice capture — see tools/generate-business-voice.mjs */\n`,
    imports.length ? imports.join('\n') + '\n\n' : '',
    `export default function ${name}() {\n${fnBody}\n}\n`,
  ].join('');

  emit(COMP_DIR, `${name}.jsx`, file);
  console.log(
    'component',
    name.padEnd(22),
    (source.length / 1024).toFixed(1).padStart(6) + ' KB',
    hook ? `→ ${hook}` : ''
  );
}

// Styles hoisted out of the blocks (the top bar and get-started ship their own).
if (collectedStyles.length) {
  const css = collectedStyles
    .map((c) => localizeCss(c, 'block-inline').trim())
    .filter(Boolean)
    .join('\n\n');
  if (css.trim()) {
    emit(STYLE_DIR, '99-block-inline.css', css + '\n');
    cssImports.push('99-block-inline.css');
  }
}

emit(
  STYLE_DIR,
  'index.css',
  '/* Generated — the capture\'s stylesheet chain, in the order the page loads it.\n' +
    '   Imported by the route so it only applies to /cloud-phone/phone-texting. */\n' +
    cssImports.map((f) => `@import './${f}';`).join('\n') + '\n'
);

// ---------------------------------------------------------------------------

const localAssets = [...assetMap.values()].filter((v) => v.startsWith('/media/'));
console.log('\nstylesheets:', cssImports.length);
console.log('assets localized:', localAssets.length, `(${reusedFromHome.size} reused from the homepage build)`);
console.log('hidden HubSpot fields stripped:', strippedHiddenFields);
if (unresolved.size) {
  console.log(`\nleft pointing at the origin site (${unresolved.size}):`);
  for (const u of unresolved) console.log('  ', u);
}

const orphans = [...orphansIn(STYLE_DIR), ...orphansIn(COMP_DIR)];
if (orphans.length) {
  console.log(`\nfrom an earlier run, no longer generated (safe to delete): ${orphans.join(', ')}`);
}
