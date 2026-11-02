// Lokaler Vorschau-Server für dist/ – verhält sich wie GitHub Pages
// (Verzeichnis-URLs → index.html, unbekannte Pfade → 404.html).

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const port = Number(process.env.PORT || 4173);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '': 'text/plain; charset=utf-8',
};

async function resolveFile(urlPath) {
  let p = path.normalize(decodeURIComponent(urlPath)).replace(/^([/\\])+/, '');
  let file = path.join(root, p);
  if (!file.startsWith(root)) return null;
  try {
    const s = await stat(file);
    if (s.isDirectory()) {
      if (!urlPath.endsWith('/')) return { redirect: urlPath + '/' };
      file = path.join(file, 'index.html');
      await stat(file);
    }
    return { file };
  } catch {
    try {
      await stat(file + '.html');
      return { file: file + '.html' };
    } catch {
      return null;
    }
  }
}

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const r = await resolveFile(url.pathname);
  if (r?.redirect) {
    res.writeHead(301, { Location: r.redirect + url.search });
    return res.end();
  }
  const file = r?.file ?? path.join(root, '404.html');
  const body = await readFile(file);
  res.writeHead(r ? 200 : 404, {
    'Content-Type': TYPES[path.extname(file)] ?? 'application/octet-stream',
    'Cache-Control': 'no-cache',
  });
  res.end(body);
}).listen(port, () => console.log(`Vorschau: http://localhost:${port}/`));
