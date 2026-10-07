import { readFileSync } from 'node:fs';
import { topLevelChildren } from './htmlutil.mjs';

const CAPTURE = 'C:/Users/ADMIN/nxz/www.nextiva.com/index.html';
const html = readFileSync(CAPTURE, 'utf8');

const bodyOpen = html.indexOf('<body');
const bodyTagEnd = html.indexOf('>', bodyOpen) + 1;
const bodyClose = html.lastIndexOf('</body>');
const body = html.slice(bodyTagEnd, bodyClose);

function dump(label, frag, depth) {
  console.log(`\n--- ${label} (${frag.length} chars) ---`);
  const kids = topLevelChildren(frag);
  for (const c of kids) {
    if (c.name === 'script' || c.name === 'noscript') continue;
    console.log(
      String(c.end - c.start).padStart(7),
      c.name.padEnd(8),
      (c.id ? '#' + c.id + ' ' : '') + c.className.slice(0, 74)
    );
  }
  return kids;
}

const kids = dump('<body>', body);
const siteBlocks = kids.find((k) => k.className.includes('wp-site-blocks'));
const inner = dump('div.wp-site-blocks', stripOuter(siteBlocks.html));

for (const c of inner) {
  if (c.name === 'script' || c.name === 'noscript') continue;
  if (c.end - c.start < 4000) continue;
  dump(`  > ${c.name}.${c.className.split(' ')[0]}`, stripOuter(c.html));
}

function stripOuter(h) {
  const open = h.indexOf('>') + 1;
  const close = h.lastIndexOf('<');
  return h.slice(open, close);
}
