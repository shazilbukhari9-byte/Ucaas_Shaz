/** Prints just the webpack module bodies of a bundle, dropping runtime boilerplate. */
import { readFileSync } from 'node:fs';

for (const file of process.argv.slice(2)) {
  const src = readFileSync(file, 'utf8');
  const cut = src.search(/\n\s{4}function [a-z]\(\w\)\s*\{\n\s+var \w = \w\[\w\];/);
  const body = cut === -1 ? src : src.slice(0, cut);
  console.log(`\n${'#'.repeat(70)}\n# ${file}  (${body.split('\n').length} lines of module code)\n${'#'.repeat(70)}`);
  console.log(body.split('\n').filter((l) => l.trim()).join('\n'));
}
