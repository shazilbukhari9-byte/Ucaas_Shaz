/**
 * Rebuilds the Nextiva homepage as a Next.js App Router project from the
 * archived DOM capture at C:/Users/ADMIN/nxz.
 *
 *   node tools/generate.mjs
 *
 * Everything under app/, components/, styles/ and public/ is generated; edit
 * this file rather than the output if you need to change the result.
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, rmSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, extname, basename, join } from 'node:path';
import {
  tokenize, topLevelChildren, parseAttrs, jsxAttrName, attrValue,
  styleToObject, decodeEntities, VOID_TAGS,
} from './htmlutil.mjs';

const CAPTURE = 'C:/Users/ADMIN/nxz';
const SITE = `${CAPTURE}/www.nextiva.com`;
const OUT = new URL('..', import.meta.url).pathname.replace(/^\//, '').replace(/\/$/, '');

const html = readFileSync(`${SITE}/index.html`, 'utf8');

// ---------------------------------------------------------------------------
// Assets: resolve a site URL to a file in the capture, copy it to public/media
// ---------------------------------------------------------------------------

const assetMap = new Map();
const missingAssets = new Set();
const downloadQueue = new Map(); // url -> local path, fetched after the DOM pass

/** Path under public/media for a given capture-relative path. */
function mediaPath(relPath, ext) {
  const hash = createHash('sha1').update(relPath).digest('hex').slice(0, 8);
  const safe = basename(relPath, ext).replace(/[^a-zA-Z0-9._-]/g, '-').slice(0, 48);
  return `/media/${safe}-${hash}${ext}`;
}

function captureCandidates(pathname) {
  const clean = decodeURIComponent(pathname.replace(/^\//, '').split('?')[0].split('#')[0]);
  return [clean, clean.replace(/=/g, '')];
}

/** Returns a public URL for `url`, copying the file locally when the capture has it. */
function localizeUrl(url) {
  if (!url || typeof url !== 'string') return url;
  if (assetMap.has(url)) return assetMap.get(url);

  let pathname = null;
  let host = null;
  if (url.startsWith('https://www.nextiva.com/')) {
    host = 'www.nextiva.com';
    pathname = url.slice('https://www.nextiva.com'.length);
  } else if (url.startsWith('https://nextivaweb.imgix.net/')) {
    host = 'nextivaweb.imgix.net';
    pathname = url.slice('https://nextivaweb.imgix.net'.length);
  } else {
    return url;
  }

  const ext = extname(pathname.split('?')[0]).toLowerCase();
  const isAsset = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.woff', '.woff2', '.ttf', '.avif', '.ico', '.mp4'].includes(ext);
  if (!isAsset) return url; // navigational link, leave pointing at the live site

  for (const cand of captureCandidates(pathname)) {
    const src = `${CAPTURE}/${host}/${cand}`;
    if (existsSync(src)) {
      const rel = mediaPath(cand, ext);
      const dest = join(OUT, 'public', rel);
      mkdirSync(dirname(dest), { recursive: true });
      copyFileSync(src, dest);
      assetMap.set(url, rel);
      return rel;
    }
  }

  // Not in the capture (the original page lazy-loads it). Queue a download so
  // the project ends up self-contained and free of nextiva.com references.
  const rel = mediaPath(captureCandidates(pathname)[0], ext);
  downloadQueue.set(url, rel);
  assetMap.set(url, rel);
  return rel;
}

/** Fetches everything queued above into public/media. */
async function drainDownloadQueue() {
  const entries = [...downloadQueue];
  if (!entries.length) return;
  console.log(`\ndownloading ${entries.length} assets absent from the capture...`);
  let ok = 0;
  const limit = 6;
  for (let i = 0; i < entries.length; i += limit) {
    await Promise.all(entries.slice(i, i + limit).map(async ([url, rel]) => {
      const dest = join(OUT, 'public', rel);
      if (existsSync(dest)) { ok++; return; }
      try {
        const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        mkdirSync(dirname(dest), { recursive: true });
        writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
        ok++;
      } catch (err) {
        missingAssets.add(`${url} (${err.message})`);
      }
    }));
  }
  console.log(`  downloaded ${ok}/${entries.length}`);
}

/** Rewrites every nextiva.com asset URL inside an attribute value (handles srcset). */
function localizeAttrValue(name, value) {
  if (!value) return value;
  if (name === 'srcSet' || name === 'imageSrcSet') {
    // Split on ", " only: the cdn-cgi transform URLs contain bare commas
    // (width=1024,format=auto) that must not be treated as candidate separators.
    return value
      .split(/,\s+/)
      .map((part) => {
        const t = part.trim();
        const sp = t.indexOf(' ');
        const u = sp === -1 ? t : t.slice(0, sp);
        const rest = sp === -1 ? '' : t.slice(sp);
        return localizeUrl(u) + rest;
      })
      .join(', ');
  }
  if (name === 'src' || name === 'href' || name === 'poster' || name === 'data-src' || name === 'data-bg') {
    const localized = localizeUrl(value);
    // Same-site page links become relative paths, so the rebuild does not point
    // navigation at the origin site.
    const samesite = localized.match(/^https:\/\/www\.nextiva\.com(\/.*)?$/);
    return samesite ? samesite[1] || '/' : localized;
  }
  return value;
}

/**
 * Rewrites url() references. `baseUrl` is the original absolute URL of the
 * stylesheet, so relative references can be resolved before being localized —
 * otherwise the bundler tries to resolve them against styles/ and fails.
 */
function localizeCss(css, baseUrl) {
  return css.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g, (full, q, u) => {
    const trimmed = u.trim();
    if (trimmed.startsWith('data:') || trimmed.startsWith('#')) return full;

    let abs = trimmed;
    if (!/^(https?:)?\/\//.test(trimmed)) {
      if (!baseUrl) return full;
      try {
        abs = new URL(trimmed, baseUrl).href;
      } catch {
        return full;
      }
    }
    // Always emit an absolute or /media URL so the bundler never resolves it.
    return `url(${q}${localizeUrl(abs)}${q})`;
  });
}

// ---------------------------------------------------------------------------
// HTML -> JSX
// ---------------------------------------------------------------------------

const DROP_ELEMENTS = new Set(['script', 'noscript']);
const collectedStyles = [];

/**
 * Subtrees the original page filled in with JavaScript. They are replaced by
 * hand-written React components that render the same thing from state.
 */
const SLOTS = [
  { test: (id, cls) => cls.includes('ui-call-card'), component: 'CallPanel', from: '../hero/CallPanel' },
  { test: (id, cls) => cls.split(/\s+/).includes('app-chat'), component: 'HeroChatThread', from: '../hero/HeroChatThread' },
];

function htmlToJsx(fragment, usedSlots = new Set()) {
  let out = '';
  let skipDepth = 0;
  let skipTag = null;
  let styleBuf = null;
  let slot = null; // { tag, depth, component }

  for (const t of tokenize(fragment)) {
    // --- inside a slotted subtree: drop the original markup ------------------
    if (slot) {
      if (t.type === 'open' && t.name === slot.tag) slot.depth++;
      else if (t.type === 'close' && t.name === slot.tag) {
        slot.depth--;
        if (slot.depth === 0) {
          out += `<${slot.component} />`;
          slot = null;
        }
      }
      continue;
    }
    // --- inside a dropped subtree -------------------------------------------
    if (skipTag) {
      if (t.type === 'open' && t.name === skipTag) skipDepth++;
      else if (t.type === 'close' && t.name === skipTag) {
        skipDepth--;
        if (skipDepth === 0) skipTag = null;
      }
      continue;
    }
    // --- <style> content is hoisted into the stylesheet chain ----------------
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
        const id = attrValue(t.attrs, 'id') || '';
        const cls = attrValue(t.attrs, 'class') || '';
        const hit = SLOTS.find((s) => s.test(id, cls));
        if (hit) {
          usedSlots.add(hit);
          if (t.type === 'open') slot = { tag: t.name, depth: 1, component: hit.component };
          else out += `<${hit.component} />`;
          break;
        }
        out += renderTag(t);
        break;
      }

      case 'close':
        if (t.name === 'style' || DROP_ELEMENTS.has(t.name)) break;
        // The source has a stray `</br>`; browsers treat it as a line break.
        if (VOID_TAGS.has(t.name)) { out += `<${t.name} />`; break; }
        out += `</${t.name}>`;
        break;
    }
  }
  return out;
}

function renderTag(t) {
  const parts = [];
  for (const { name, value } of parseAttrs(t.attrs)) {
    const prop = jsxAttrName(name);
    if (prop === null) continue; // inline on* handler

    if (prop === 'style') {
      // Inline styles carry background-image url()s — localize them too,
      // otherwise they stay pointed at the origin site.
      const css = localizeCss(decodeEntities(value ?? ''), 'https://www.nextiva.com/');
      const obj = styleToObject(css);
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

/**
 * Rebrands the captured markup and CSS. Applied to generated output only —
 * class names, ids, copy, and URLs all move together, so nothing desynchronises.
 */
function rebrand(s) {
  return s
    .replace(/NEXTIVA/g, 'UCAAS')
    .replace(/Nextiva/g, 'UCaaS')
    .replace(/nextiva/g, 'ucaas');
}

function escapeJsxText(text) {
  // JSX understands HTML entities in text, so only the brace delimiters and a
  // literal backtick-free '}' need protection.
  return text.replace(/[{}]/g, (c) => `{'${c}'}`);
}

// ---------------------------------------------------------------------------
// Head: rebuild the exact stylesheet chain
// ---------------------------------------------------------------------------

/** Empties a directory without removing it — Windows keeps handles on dirs. */
function resetDir(dir, keep = []) {
  mkdirSync(dir, { recursive: true });
  for (const entry of readdirSync(dir)) {
    if (keep.includes(entry)) continue;
    rmSync(join(dir, entry), { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

const head = html.slice(html.indexOf('<head'), html.indexOf('</head>'));
const styleDir = join(OUT, 'styles');
resetDir(styleDir);

const cssImports = [];
let inlineIdx = 0;

{
  // Walk head nodes in document order so cascade order is preserved exactly.
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
      styleId = attr(t.attrs, 'id') || attr(t.attrs, 'class') || 'style';
      continue;
    }
    if ((t.type === 'self' || t.type === 'open') && t.name === 'link') {
      const rel = (attr(t.attrs, 'rel') || '').toLowerCase();
      if (rel === 'stylesheet') nodes.push({ kind: 'link', href: attr(t.attrs, 'href') });
    }
  }

  for (const n of nodes) {
    if (n.kind === 'inline') {
      if (!n.css.trim()) continue;
      const file = rebrand(`${String(++inlineIdx).padStart(2, '0')}-${slug(n.id)}.css`);
      writeFileSync(join(styleDir, file), localizeCss(n.css, 'https://www.nextiva.com/').trim() + '\n');
      cssImports.push(file);
    } else {
      const url = n.href;
      if (!url) continue;
      if (url.startsWith('https://cdn.jsdelivr.net/')) {
        cssImports.push({ remote: url }); // keep icon font on its CDN
        continue;
      }
      const m = url.match(/^https:\/\/www\.nextiva\.com(\/[^?]+)/);
      if (!m) continue;
      const src = `${SITE}${m[1]}`;
      if (!existsSync(src)) { missingAssets.add(url); continue; }
      const body = readFileSync(src, 'utf8');
      // A few responses were captured as placeholders rather than real CSS.
      if (/^\s*No Content:/.test(body)) {
        console.warn('  ! placeholder in capture, skipped:', m[1]);
        continue;
      }
      const name = rebrand(`${String(++inlineIdx).padStart(2, '0')}-${slug(m[1].split('/').slice(-3).join('-').replace(/\.css$/, ''))}.css`);
      writeFileSync(join(styleDir, name), localizeCss(body, `https://www.nextiva.com${m[1]}`));
      cssImports.push(name);
    }
  }
}

function attr(attrs, n) {
  const found = parseAttrs(attrs).find((a) => a.name.toLowerCase() === n);
  return found ? found.value : null;
}

function slug(s) {
  return String(s).replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase().slice(0, 50) || 'style';
}

// ---------------------------------------------------------------------------
// Body: slice into components
// ---------------------------------------------------------------------------

const bodyStart = html.indexOf('>', html.indexOf('<body')) + 1;
const body = html.slice(bodyStart, html.lastIndexOf('</body>'));

const siteBlocks = topLevelChildren(body).find((k) => k.className.includes('wp-site-blocks'));
const blockKids = topLevelChildren(inner(siteBlocks.html));

const headerPart = blockKids.find((k) => k.name === 'header');
const entryContent = blockKids.find((k) => k.className.includes('entry-content'));
const footerSection = blockKids.find((k) => k.className.includes('footer-section'));

const headerKids = topLevelChildren(inner(headerPart.html));
const entryKids = topLevelChildren(inner(entryContent.html));

/** Finds a node by id or class fragment, failing loudly if the DOM shifts. */
function pick(kids, needle, label) {
  const hit = kids.find((k) => k.id === needle || k.className.split(/\s+/).includes(needle));
  if (!hit) throw new Error(`could not locate "${needle}" for ${label}`);
  return hit.html;
}

const components = [
  ['TopBanner', pick(headerKids, 'ntb-banner', 'TopBanner')],
  ['MainHeader', pick(headerKids, 'nb20-header', 'MainHeader')],

  ['HeroSection', pick(entryKids, 'hero', 'HeroSection')],
  ['LogoTrustBar', pick(entryKids, 'section-logo-trust-bar', 'LogoTrustBar')],
  ['FeaturesTabs', pick(entryKids, 'section-tabbed-trust-showcase', 'FeaturesTabs')],
  ['SplitShowcase', pick(entryKids, 'section-split-showcase', 'SplitShowcase')],
  ['SpotlightHeroTrust', pick(entryKids, 'section-spotlight-hero-trust', 'SpotlightHeroTrust')],
  ['SocialProofGrid', pick(entryKids, 'section-social-proof-grid', 'SocialProofGrid')],
  ['IndustryProof', pick(entryKids, 'section-industry-proof', 'IndustryProof')],
  ['ProductAnchor', pick(entryKids, 'section-product-anchor', 'ProductAnchor')],
  ['FiberDivider', pick(entryKids, 'fiber-divider', 'FiberDivider')],
  ['PricingGrid', pick(entryKids, 'pricing', 'PricingGrid')],
  ['GetStarted', pick(entryKids, 'v2-get-started-block', 'GetStarted')],
  ['AuthoritySpotlight', pick(entryKids, 'section-authority-spotlight', 'AuthoritySpotlight')],
  ['CtaHero', pick(entryKids, 'section-cta-hero', 'CtaHero')],
  ['StickyCtaBanner', pick(entryKids, 'nextiva-sticky-cta-banner-block', 'StickyCtaBanner')],

  ['SiteFooter', footerSection.html],
];

/**
 * Blocks with behaviour. Each generated component becomes a client component
 * that hands its root element to the matching hook in hooks/.
 */
const BEHAVIOUR_HOOKS = {
  MainHeader: 'useHeaderNav',
  HeroSection: 'useHeroShowcase',
  LogoTrustBar: 'useLogoMarquee',
  FeaturesTabs: 'useFeatureTabs',
  SplitShowcase: 'useSplitShowcase',
  PricingGrid: 'usePricingGrid',
  IndustryProof: 'useIndustryCarousel',
  StickyCtaBanner: 'useStickyCta',
  SiteFooter: 'useFooterBrand',
};

const compDir = join(OUT, 'components', 'blocks');
resetDir(compDir);

for (const [name, source] of components) {
  const usedSlots = new Set();
  let jsx = htmlToJsx(source, usedSlots);

  const hook = BEHAVIOUR_HOOKS[name];
  if (hook) {
    // Attach the root ref to the outermost element.
    const insertAt = jsx.indexOf(' ') < jsx.indexOf('>') && jsx.indexOf(' ') !== -1
      ? jsx.indexOf(' ')
      : jsx.indexOf('>');
    jsx = jsx.slice(0, insertAt) + ' ref={rootRef}' + jsx.slice(insertAt);
  }

  const imports = [];
  if (hook) imports.push(`import { useRef } from 'react';`, `import ${hook} from '../../hooks/${hook}';`);
  for (const s of usedSlots) imports.push(`import ${s.component} from '${s.from}';`);

  const body = hook
    ? `  const rootRef = useRef(null);\n  ${hook}(rootRef);\n\n  return (\n${indent(jsx, 4)}\n  );`
    : `  return (\n${indent(jsx, 4)}\n  );`;

  const file = [
    hook || usedSlots.size ? "'use client';\n" : '',
    '/* Generated from the www.nextiva.com capture — see tools/generate.mjs */\n',
    imports.length ? imports.join('\n') + '\n\n' : '',
    `export default function ${name}() {\n${body}\n}\n`,
  ].join('');

  writeFileSync(join(compDir, `${name}.jsx`), rebrand(file));
  console.log(
    'component',
    name.padEnd(20),
    (source.length / 1024).toFixed(1).padStart(6) + ' KB',
    hook ? `→ ${hook}` : '',
    usedSlots.size ? `slots: ${[...usedSlots].map((s) => s.component).join(', ')}` : ''
  );
}

function inner(h) {
  return h.slice(h.indexOf('>') + 1, h.lastIndexOf('<'));
}

function indent(s, n) {
  const pad = ' '.repeat(n);
  return s.split('\n').map((l) => (l.trim() ? pad + l : l)).join('\n');
}

// ---------------------------------------------------------------------------
// Styles collected out of the body (the top-bar block ships its own <style>)
// ---------------------------------------------------------------------------

if (collectedStyles.length) {
  const css = collectedStyles
    .map((c) => localizeCss(c, 'https://www.nextiva.com/').trim())
    .filter(Boolean)
    .join('\n\n');
  writeFileSync(join(styleDir, '99-block-inline.css'), css + '\n');
  cssImports.push('99-block-inline.css');
}

// globals.css: @import chain in the original cascade order
const importLines = cssImports.map((i) =>
  typeof i === 'string' ? `@import './${i}';` : `@import url('${i.remote}');`
);
writeFileSync(
  join(styleDir, 'globals.css'),
  `/* Generated — stylesheet chain in the same order the original page loads it. */\n${importLines.join('\n')}\n`
);

// ---------------------------------------------------------------------------
// No runtime scripts are shipped: every behaviour lives in hooks/ as React.
// ---------------------------------------------------------------------------

rmSync(join(OUT, 'public', 'js'), { recursive: true, force: true, maxRetries: 5 });

await drainDownloadQueue();

// Rebrand the stylesheets last, once url() rewriting is settled.
for (const file of readdirSync(styleDir)) {
  const p = join(styleDir, file);
  writeFileSync(p, rebrand(readFileSync(p, 'utf8')));
}

// ---------------------------------------------------------------------------

const leftRemote = [...assetMap.values()].filter((v) => /^https?:/.test(v));
console.log('\nstylesheets:', cssImports.length);
console.log('assets local:', assetMap.size - leftRemote.length, '/', assetMap.size);
if (missingAssets.size) {
  console.log(`\ncould not be fetched (${missingAssets.size}):`);
  for (const u of missingAssets) console.log('  ', u);
}
