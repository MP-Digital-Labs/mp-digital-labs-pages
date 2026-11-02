// Statischer Build ohne externe Abhängigkeiten.
// Rendert alle Seiten aus src/pages nach dist/, kopiert statische Dateien,
// erzeugt sitemap.xml und prüft interne Links.

import { readdir, readFile, writeFile, mkdir, rm, cp, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { layout } from '../src/lib/layout.mjs';
import { SITE } from '../src/lib/site.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'src');
const dist = path.join(root, 'dist');

const t0 = Date.now();
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(path.join(src, 'static'), dist, { recursive: true });

// Cache-Busting über Inhalts-Hash von CSS und JS
const hash = createHash('sha1');
for (const f of ['assets/css/site.css', 'assets/js/site.js']) hash.update(await readFile(path.join(dist, f)));
const assetVersion = hash.digest('hex').slice(0, 10);

const ctx = {
  legal: async (name) => readFile(path.join(src, 'legal', `${name}.html`), 'utf8'),
};

const pageFiles = (await readdir(path.join(src, 'pages'))).filter((f) => f.endsWith('.mjs')).sort();
const pages = [];
for (const f of pageFiles) {
  const mod = await import(pathToFileURL(path.join(src, 'pages', f)).href);
  const defs = [].concat(mod.default);
  for (const def of defs) {
    const body = typeof def.body === 'function' ? await def.body(ctx) : def.body;
    const html = layout({ ...def, body, assetVersion });
    const rel = def.path.endsWith('/') ? path.join(def.path, 'index.html') : def.path;
    const out = path.join(dist, rel);
    await mkdir(path.dirname(out), { recursive: true });
    await writeFile(out, html, 'utf8');
    pages.push({ ...def, file: out, html });
  }
}

// Sitemap
const urls = pages
  .filter((p) => !p.noindex)
  .sort((a, b) => (a.priority ?? 0.5) < (b.priority ?? 0.5) ? 1 : -1)
  .map(
    (p) =>
      `  <url><loc>${SITE.url}${p.path}</loc>${p.lastmod ? `<lastmod>${p.lastmod}</lastmod>` : ''}<priority>${(p.priority ?? 0.5).toFixed(1)}</priority></url>`
  )
  .join('\n');
await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  'utf8'
);

// Interne Links und Anker prüfen
const problems = [];
const idsByFile = new Map();
const idsOf = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const resolve = (href) => {
  const clean = href.split('#')[0].split('?')[0];
  if (clean === '') return null;
  if (clean.endsWith('/')) return path.join(dist, clean, 'index.html');
  return path.join(dist, clean);
};
for (const p of pages) {
  idsByFile.set(p.file, idsOf(p.html));
}
for (const p of pages) {
  for (const m of p.html.matchAll(/\s(?:href|src)="(\/[^"]*)"/g)) {
    const href = m[1];
    const file = resolve(href) ?? p.file;
    if (!existsSync(file)) {
      problems.push(`${p.path}: Ziel fehlt → ${href}`);
      continue;
    }
    const hashPart = href.includes('#') ? href.split('#')[1] : '';
    if (hashPart && file.endsWith('.html')) {
      const ids = idsByFile.get(file) ?? idsOf(await readFile(file, 'utf8'));
      if (!ids.has(hashPart)) problems.push(`${p.path}: Anker fehlt → ${href}`);
    }
  }
  for (const m of p.html.matchAll(/\shref="#([^"]+)"/g)) {
    if (!idsByFile.get(p.file).has(m[1])) problems.push(`${p.path}: Anker fehlt → #${m[1]}`);
  }
}

// Bestehende URLs der bisherigen Website müssen weiterhin existieren
const legacy = [
  '/',
  '/apps/',
  '/apps/baurechner-de/',
  '/apps/verbrauchsmonitor-de/',
  '/support/',
  '/support/#baurechner',
  '/support/#verbrauchsmonitor',
  '/impressum/',
  '/datenschutz.html',
  '/datenschutz-baurechner.html',
  '/datenschutz-verbrauchsmonitor.html',
  '/#kontakt',
  '/404.html',
  '/CNAME',
  '/robots.txt',
];
for (const href of legacy) {
  const file = resolve(href) ?? path.join(dist, 'index.html');
  if (!existsSync(file)) problems.push(`Bestands-URL fehlt → ${href}`);
  const hashPart = href.includes('#') ? href.split('#')[1] : '';
  if (hashPart && existsSync(file) && !idsOf(await readFile(file, 'utf8')).has(hashPart))
    problems.push(`Bestands-Anker fehlt → ${href}`);
}

let bytes = 0;
const walk = async (d) => {
  for (const e of await readdir(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) await walk(p);
    else bytes += (await stat(p)).size;
  }
};
await walk(dist);

console.log(`✓ ${pages.length} Seiten gebaut in ${Date.now() - t0} ms · ${(bytes / 1024).toFixed(0)} KB gesamt · Assets v${assetVersion}`);
if (problems.length) {
  console.error(`✗ ${problems.length} Problem(e):\n  ` + problems.join('\n  '));
  process.exitCode = 1;
} else {
  console.log('✓ Alle internen Links, Anker und Bestands-URLs gültig');
}
