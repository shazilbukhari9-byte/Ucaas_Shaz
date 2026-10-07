// Minimal, dependency-free HTML tokenizer + HTML->JSX converter.
// The source is machine-generated WordPress output, so it is well-formed enough
// that a tolerant scanner beats pulling in a full parser.

export const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link',
  'meta', 'param', 'source', 'track', 'wbr',
]);

const RAW_TEXT_TAGS = new Set(['script', 'style', 'textarea', 'title']);

const TAG_RE = /<(\/?)([a-zA-Z][a-zA-Z0-9:-]*)((?:\s+[^\s"'>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>`]+))?)*)\s*(\/?)>/g;

/**
 * Walks `html` and yields tokens: {type:'text'|'comment'|'open'|'close'|'self', ...}
 */
export function* tokenize(html) {
  let i = 0;
  while (i < html.length) {
    const lt = html.indexOf('<', i);
    if (lt === -1) {
      if (i < html.length) yield { type: 'text', start: i, end: html.length, raw: html.slice(i) };
      return;
    }
    if (lt > i) yield { type: 'text', start: i, end: lt, raw: html.slice(i, lt) };

    if (html.startsWith('<!--', lt)) {
      const end = html.indexOf('-->', lt);
      const stop = end === -1 ? html.length : end + 3;
      yield { type: 'comment', start: lt, end: stop, raw: html.slice(lt, stop) };
      i = stop;
      continue;
    }
    if (html.startsWith('<!', lt)) {
      const end = html.indexOf('>', lt);
      const stop = end === -1 ? html.length : end + 1;
      yield { type: 'doctype', start: lt, end: stop, raw: html.slice(lt, stop) };
      i = stop;
      continue;
    }

    TAG_RE.lastIndex = lt;
    const m = TAG_RE.exec(html);
    if (!m || m.index !== lt) {
      // A stray '<' in text.
      yield { type: 'text', start: lt, end: lt + 1, raw: '<' };
      i = lt + 1;
      continue;
    }

    const [full, slash, rawName, attrs, selfSlash] = m;
    const name = rawName.toLowerCase();
    const end = lt + full.length;

    if (slash) {
      yield { type: 'close', name, start: lt, end, raw: full };
      i = end;
      continue;
    }

    const selfClosing = !!selfSlash || VOID_TAGS.has(name);
    yield {
      type: selfClosing ? 'self' : 'open',
      name,
      attrs,
      start: lt,
      end,
      raw: full,
    };

    if (!selfClosing && RAW_TEXT_TAGS.has(name)) {
      const closeRe = new RegExp(`</${name}\\s*>`, 'i');
      closeRe.lastIndex = 0;
      const rest = html.slice(end);
      const cm = closeRe.exec(rest);
      const textEnd = cm ? end + cm.index : html.length;
      if (textEnd > end) {
        yield { type: 'rawtext', start: end, end: textEnd, raw: html.slice(end, textEnd) };
      }
      if (cm) {
        yield { type: 'close', name, start: textEnd, end: textEnd + cm[0].length, raw: cm[0] };
        i = textEnd + cm[0].length;
      } else {
        i = html.length;
      }
      continue;
    }
    i = end;
  }
}

/**
 * Returns the direct element children of `html` as {name, className, start, end, html}.
 */
export function topLevelChildren(html) {
  const out = [];
  let depth = 0;
  let current = null;
  for (const t of tokenize(html)) {
    if (t.type === 'open') {
      if (depth === 0) current = { name: t.name, className: attrValue(t.attrs, 'class') || '', id: attrValue(t.attrs, 'id') || '', start: t.start };
      depth++;
    } else if (t.type === 'close') {
      // The source contains a stray `</br>`; a close tag for a void element
      // never had a matching open, so it must not affect depth.
      if (VOID_TAGS.has(t.name)) continue;
      depth--;
      if (depth === 0 && current) {
        current.end = t.end;
        current.html = html.slice(current.start, current.end);
        out.push(current);
        current = null;
      }
      if (depth < 0) depth = 0;
    } else if (t.type === 'self' && depth === 0) {
      out.push({
        name: t.name,
        className: attrValue(t.attrs, 'class') || '',
        id: attrValue(t.attrs, 'id') || '',
        start: t.start,
        end: t.end,
        html: html.slice(t.start, t.end),
      });
    }
  }
  return out;
}

export function attrValue(attrString, wanted) {
  if (!attrString) return null;
  const re = /([^\s"'>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>`]+)))?/g;
  let m;
  while ((m = re.exec(attrString))) {
    if (m[1].toLowerCase() === wanted) return m[2] ?? m[3] ?? m[4] ?? '';
  }
  return null;
}

export function parseAttrs(attrString) {
  const out = [];
  if (!attrString) return out;
  const re = /([^\s"'>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>`]+)))?/g;
  let m;
  while ((m = re.exec(attrString))) {
    const value = m[2] ?? m[3] ?? m[4] ?? null;
    out.push({ name: m[1], value });
  }
  return out;
}

// ---------------------------------------------------------------------------
// HTML attribute name -> JSX prop name
// ---------------------------------------------------------------------------

const ATTR_MAP = {
  class: 'className',
  for: 'htmlFor',
  srcset: 'srcSet',
  tabindex: 'tabIndex',
  colspan: 'colSpan',
  rowspan: 'rowSpan',
  maxlength: 'maxLength',
  minlength: 'minLength',
  readonly: 'readOnly',
  autocomplete: 'autoComplete',
  autocapitalize: 'autoCapitalize',
  autocorrect: 'autoCorrect',
  autofocus: 'autoFocus',
  autoplay: 'autoPlay',
  novalidate: 'noValidate',
  enctype: 'encType',
  formaction: 'formAction',
  formnovalidate: 'formNoValidate',
  contenteditable: 'contentEditable',
  spellcheck: 'spellCheck',
  crossorigin: 'crossOrigin',
  fetchpriority: 'fetchPriority',
  datetime: 'dateTime',
  usemap: 'useMap',
  accesskey: 'accessKey',
  playsinline: 'playsInline',
  allowfullscreen: 'allowFullScreen',
  frameborder: 'frameBorder',
  marginwidth: 'marginWidth',
  marginheight: 'marginHeight',
  referrerpolicy: 'referrerPolicy',
  srcdoc: 'srcDoc',
  itemprop: 'itemProp',
  itemscope: 'itemScope',
  itemtype: 'itemType',
  itemid: 'itemID',
  itemref: 'itemRef',
  charset: 'charSet',
  hreflang: 'hrefLang',
  'http-equiv': 'httpEquiv',
  'accept-charset': 'acceptCharset',
  nomodule: 'noModule',
  inputmode: 'inputMode',
  imagesrcset: 'imageSrcSet',
  imagesizes: 'imageSizes',
  'xlink:href': 'xlinkHref',
  'xlink:title': 'xlinkTitle',
  'xml:lang': 'xmlLang',
  'xml:space': 'xmlSpace',
  'xmlns:xlink': 'xmlnsXlink',
};

function camel(s) {
  return s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

export function jsxAttrName(name) {
  const lower = name.toLowerCase();
  if (ATTR_MAP[lower]) return ATTR_MAP[lower];
  if (lower.startsWith('data-') || lower.startsWith('aria-')) return lower;
  if (lower.startsWith('on')) return null; // inline handlers are dropped
  if (name.includes(':')) return camel(name.replace(':', '-'));
  if (name.includes('-')) return camel(lower); // SVG presentation attributes
  return name;
}

// ---------------------------------------------------------------------------
// style="..." -> style={{ ... }}
// ---------------------------------------------------------------------------

export function styleToObject(css) {
  const parts = [];
  let buf = '';
  let depth = 0;
  for (const ch of css) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ';' && depth === 0) {
      parts.push(buf);
      buf = '';
    } else {
      buf += ch;
    }
  }
  parts.push(buf);

  const entries = [];
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const idx = trimmed.indexOf(':');
    if (idx === -1) continue;
    const prop = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (!prop) continue;
    const key = prop.startsWith('--') ? `'${prop}'` : camel(prop.toLowerCase());
    entries.push(`${key}: ${JSON.stringify(decodeEntities(value))}`);
  }
  return entries.length ? `{{ ${entries.join(', ')} }}` : null;
}

// ---------------------------------------------------------------------------
// Entities: JSX text keeps named entities fine, but attribute *values* become
// JS string literals, so they must be decoded there.
// ---------------------------------------------------------------------------

const ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  ndash: '–', mdash: '—', hellip: '…', copy: '©',
  reg: '®', trade: '™', rsquo: '’', lsquo: '‘',
  ldquo: '“', rdquo: '”', middot: '·', bull: '•',
  times: '×', deg: '°', euro: '€', pound: '£',
  laquo: '«', raquo: '»', sup2: '²', frac12: '½',
};

export function decodeEntities(str) {
  return str.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z][a-zA-Z0-9]*);/g, (full, body) => {
    if (body[0] === '#') {
      const code = body[1] === 'x' || body[1] === 'X'
        ? parseInt(body.slice(2), 16)
        : parseInt(body.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : full;
    }
    const hit = ENTITIES[body];
    return hit === undefined ? full : hit;
  });
}
