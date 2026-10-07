/**
 * Compares the rendered Next.js page against the original captured DOM:
 * element counts per tag, class-token histogram, and visible text.
 *
 *   node tools/fidelity.mjs            (dev server must be on :3000)
 */
import { readFileSync } from 'node:fs';
import { tokenize, attrValue, VOID_TAGS } from './htmlutil.mjs';

const CAPTURE = 'C:/Users/ADMIN/nxz/www.nextiva.com/index.html';

function profile(html, { dropScripts = true } = {}) {
  const tags = new Map();
  const classes = new Map();
  const text = [];
  let skip = null;
  let skipDepth = 0;

  for (const t of tokenize(html)) {
    if (skip) {
      if (t.type === 'open' && t.name === skip) skipDepth++;
      else if (t.type === 'close' && t.name === skip && --skipDepth === 0) skip = null;
      continue;
    }
    if ((t.type === 'open' || t.type === 'self') && dropScripts && (t.name === 'script' || t.name === 'style' || t.name === 'noscript')) {
      if (t.type === 'open') { skip = t.name; skipDepth = 1; }
      continue;
    }
    if (t.type === 'open' || t.type === 'self') {
      tags.set(t.name, (tags.get(t.name) || 0) + 1);
      const cls = attrValue(t.attrs, 'class');
      if (cls) for (const c of cls.split(/\s+/).filter(Boolean)) classes.set(c, (classes.get(c) || 0) + 1);
    } else if (t.type === 'text') {
      const s = t.raw.replace(/\s+/g, ' ').trim();
      if (s) text.push(s);
    }
  }
  return { tags, classes, text: text.join(' ') };
}

/** Same rebrand the generator applies, so the two sides are comparable. */
const rebrand = (s) =>
  s.replace(/NEXTIVA/g, 'UCAAS').replace(/Nextiva/g, 'UCaaS').replace(/nextiva/g, 'ucaas');

const captureHtml = rebrand(readFileSync(CAPTURE, 'utf8'));
const capBody = captureHtml.slice(
  captureHtml.indexOf('>', captureHtml.indexOf('<body')) + 1,
  captureHtml.lastIndexOf('</body>')
);
const cap = profile(capBody);

const rendered = await (await fetch('http://localhost:3000/')).text();
const renBody = rendered.slice(
  rendered.indexOf('>', rendered.indexOf('<body')) + 1,
  rendered.lastIndexOf('</body>')
);
const ren = profile(renBody);

function diffMap(a, b, label, limit = 25) {
  const keys = new Set([...a.keys(), ...b.keys()]);
  const rows = [];
  for (const k of keys) {
    const x = a.get(k) || 0;
    const y = b.get(k) || 0;
    if (x !== y) rows.push([k, x, y, y - x]);
  }
  rows.sort((p, q) => Math.abs(q[3]) - Math.abs(p[3]));
  console.log(`\n=== ${label}: ${rows.length} differing keys ===`);
  for (const [k, x, y, d] of rows.slice(0, limit)) {
    console.log(`  ${k.padEnd(46)} capture=${String(x).padStart(4)}  rendered=${String(y).padStart(4)}  ${d > 0 ? '+' : ''}${d}`);
  }
  return rows.length;
}

const total = (m) => [...m.values()].reduce((a, b) => a + b, 0);
console.log(`elements   capture=${total(cap.tags)}   rendered=${total(ren.tags)}`);
console.log(`class refs capture=${total(cap.classes)}   rendered=${total(ren.classes)}`);
console.log(`text chars capture=${cap.text.length}   rendered=${ren.text.length}`);

diffMap(cap.tags, ren.tags, 'tag counts');
diffMap(cap.classes, ren.classes, 'class token counts');

// Word-level text comparison, ignoring whitespace differences.
const norm = (s) => s.replace(/\s+/g, ' ').replace(/[\u2018\u2019]/g, "'").trim();
const capWords = norm(cap.text).split(' ');
const renWords = norm(ren.text).split(' ');
const capSet = new Map();
for (const w of capWords) capSet.set(w, (capSet.get(w) || 0) + 1);
for (const w of renWords) capSet.set(w, (capSet.get(w) || 0) - 1);
const missing = [...capSet].filter(([, n]) => n > 0);
const extra = [...capSet].filter(([, n]) => n < 0);
console.log(`\n=== visible text ===`);
console.log(`  words capture=${capWords.length} rendered=${renWords.length}`);
console.log(`  only in capture : ${missing.slice(0, 20).map(([w, n]) => `${w}x${n}`).join(', ') || '(none)'}`);
console.log(`  only in rendered: ${extra.slice(0, 20).map(([w, n]) => `${w}x${-n}`).join(', ') || '(none)'}`);
