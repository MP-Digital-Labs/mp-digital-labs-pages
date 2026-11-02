// Erzeugt alle Rasterbilder der Website aus Originalquellen:
//  1. offizielle Produktbilder aus den öffentlichen Google-Play-Einträgen
//     (Download in Originalauflösung über „=s0“, Zwischenspeicher .cache/play/)
//  2. das offizielle, kreisförmige MP-Digital-Labs-Logo (brand-src/)
// Skalierung und Kodierung übernimmt ein lokal installierter Chrome/Edge (Canvas),
// es werden keine Bildinhalte verändert – nur zugeschnitten und skaliert.
//
// Aufruf: node scripts/process-images.mjs   (nur bei neuen Store-Bildern oder Logo-Änderung)

import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync, existsSync, rmSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'src', 'static');
const cache = path.join(root, '.cache', 'play');
mkdirSync(cache, { recursive: true });

// Bild-IDs aus play.google.com/store/apps/details?id=… (Stand: 2. November 2026)
const LH = 'https://play-lh.googleusercontent.com/';
const PLAY = {
  'br-icon': 'cBTNMOjHGhUkUQqvLbUKiEKJadsrMYbF6ISs4hugtZZuJUnff3U1HmC_U9qC10zfznHGnxIhac03OI_4-tBXfQ',
  'br-feature': 'J8zYKqGJP_9h-IDWXzSgKlvaS0gxPZ5Iy7vgWZmaVGizTmrqaf0IQqS8qAA8G1nBohWttuUzyEqoYYXS7P1yag',
  'br-shot-1': 'QI60MDMfFT2_n2zoOI_MfFFPLeJA-oobQf3jDxZUE2H5uEakcz5n7z4bQbOvROzShikPtnbUf8DlEIoDY6HU',
  'br-shot-2': 'bSSEkLyoPtDCM5X2HvAUvnCrOFt7TCRyFnrZZbRrkaPkD11NpYjC-GWB96e4xkjusFFVoA3pZxNCGNFBnagE',
  'br-shot-3': 'nFW-zkuQZI37elYk3daVZxu8H_Z5eGNffjn17LoLFyh6Pi28zAHvDgB_hW30c5oJFeH5DQiRAikrRgivfd21PQ',
  'br-shot-4': 'S7CXyXo-nAQwrSG582uFtnuU_nPEW4Qq_pIpor9LVGBYqFwK8RamCisUBu5fZtlDmEXt2lZIWXVG49zo-oCc3w',
  'br-shot-5': 'RKhsbSkjepOtatk26Ahnu1s8uIRmtBEHenGq2I494Z7832o3CLT72CPYpq3ivXOqWC8n6G8mvZURgBfm8pSDdg',
  'br-shot-6': 'XbKxdfa4PuTf-1MeoWyCwVYFmiDRnq7R_JIqW7_VxPBsYQDXChmW2p4vJANBK_c9ao1Hw_vSXFuu4cVBZU-yTg',
  'br-shot-7': '3zooSNZpbD3fCHeEJBRdKMiNIEJHJh8c8QfOH5mtZ4W3yxOvGy_JYeIoSltccKwmKnZ72M864Ms1hpMdZKBJV5I',
  'br-shot-8': 'Zi-6e4Wq6vQXP_wkhPov3IMn2IcL1w1LlIGuYVC55Znl_Dclc88_1WcjaPQ4ZvuYJMA8OKH3F36zfKTckihUSg',
  'vm-icon': 'Vmq0F5qizeRfaeDThbv_blh_On5HF1mQa-hat32oXH1B1edEkpPawEtWHprkT9-smCZwuiLweX5QhcodXXZ1Xsk',
  'vm-feature': 'vDY7UXa6aqhFC08Mze5FawqodgzeAzC7BWkM8Pl7614KXqKD4DRjgR0OMtxOwv-1ZsWoreRUrCkm3xpogBh4RQ',
  'vm-shot-1': 'uHyS8TkQ4SoJ2iWXm7k7dZBxu92p0BFuSgKC74vFWXotwxIQxRL1f5wq5zUMmrnGyC5Kx2_fWLPZB47mTg14NHQ',
  'vm-shot-2': '34GY93dsXSiW-UNKL1oo7axji0ABrG6ZySGiGTqX2kbsWH8fIwXiBRZpMYHLH5X9feCK8Zg5daVeQl0Ja_SWoA',
  'vm-shot-3': 'sAXZDabEMpAW9ohobjIDJBzZ_k1yR1lmFJl7i3V02of9_Cj-489SWWp8lW94PQ0o3bwKnkbc0atXe2Gkp9djKSw',
  'vm-shot-4': 'WW7FlDve4BUz_11gXbiWzazBwkLaKUsDFiUsRPYz20d2-OBwpA2SgRan2Y4BqGF75dcFlTxqmEtNzI5r6dTkyw',
  'vm-shot-5': 'S_CK9-UL2pz25dMwRr65liSRfRHESG3WBHXC5T3ul-q1wQL_F9ad8830z6LVfnSOyjpOgUoD2i6MqBgl50r6',
};

const sources = { logo: path.join(root, 'brand-src', 'mpdl-logo-original.webp') };
for (const [name, id] of Object.entries(PLAY)) {
  const file = path.join(cache, `${name}.png`);
  if (!existsSync(file)) {
    const res = await fetch(`${LH}${id}=s0`);
    if (!res.ok) throw new Error(`Store-Bild nicht abrufbar: ${name} (${res.status})`);
    writeFileSync(file, Buffer.from(await res.arrayBuffer()));
    console.log('↓', name);
  }
  sources[name] = file;
}

// Ausgaben: [Name, Quelle, Operation, Zielgröße, Format, Qualität]
const W = 'image/webp', P = 'image/png', J = 'image/jpeg';
const jobs = [
  // Offizielles Logo – Original-Kreis, Ecken transparent
  { out: 'assets/img/brand/mpdl-logo-640.webp', src: 'logo', op: 'circle', size: 640, type: W, q: 0.9 },
  { out: 'assets/img/brand/mpdl-logo-320.webp', src: 'logo', op: 'circle', size: 320, type: W, q: 0.9 },
  { out: 'assets/img/logo-512.png', src: 'logo', op: 'circle', size: 512, type: P },
  // Kompakte Variante für kleine Größen: Original-Ring + Original-Monogramm, ohne Schriftzeilen
  { out: 'assets/img/brand/mpdl-mark-160.webp', src: 'logo', op: 'mark', size: 160, type: W, q: 0.92 },
  { out: 'assets/img/brand/mpdl-mark-96.webp', src: 'logo', op: 'mark', size: 96, type: W, q: 0.92 },
  { out: 'assets/img/icon-192.png', src: 'logo', op: 'mark', size: 192, type: P },
  { out: 'assets/img/icon-512.png', src: 'logo', op: 'mark', size: 512, type: P },
  { out: 'assets/img/apple-touch-icon.png', src: 'logo', op: 'mark-square', size: 180, type: P },
  { out: '.favicon-32.png', src: 'logo', op: 'mark', size: 32, type: P },
  { out: '.favicon-48.png', src: 'logo', op: 'mark', size: 48, type: P },
];
for (const k of ['br', 'vm']) {
  jobs.push({ out: `assets/img/apps/${k}-icon-192.webp`, src: `${k}-icon`, op: 'fit', size: 192, type: W, q: 0.9 });
  jobs.push({ out: `assets/img/apps/${k}-feature-1024.webp`, src: `${k}-feature`, op: 'width', size: 1024, type: W, q: 0.86 });
  jobs.push({ out: `assets/img/apps/${k}-feature-640.webp`, src: `${k}-feature`, op: 'width', size: 640, type: W, q: 0.86 });
  jobs.push({ out: `assets/img/apps/${k}-feature.jpg`, src: `${k}-feature`, op: 'width', size: 1024, type: J, q: 0.88 });
}
for (const name of Object.keys(PLAY).filter((n) => n.includes('-shot-'))) {
  jobs.push({ out: `assets/img/apps/${name}-480.webp`, src: name, op: 'width', size: 480, type: W, q: 0.84 });
  jobs.push({ out: `assets/img/apps/${name}-941.webp`, src: name, op: "width", size: 941, type: W, q: 0.86 }); // Originalbreite
}

const page = `<!doctype html><meta charset="utf-8"><body><script>
const jobs = ${JSON.stringify(jobs)};
const load = (k) => new Promise((ok, err) => { const i = new Image(); i.onload = () => ok(i); i.onerror = err; i.src = '/src/' + k; });
const send = (body) => fetch('/result', { method: 'POST', body: JSON.stringify(body) });
const canvas = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); x.imageSmoothingQuality = 'high'; return [c, x]; };

// Schrittweise Verkleinerung für maximale Schärfe
function scaled(img, w, h, sx = 0, sy = 0, sw = img.naturalWidth || img.width, sh = img.naturalHeight || img.height) {
  let [c, x] = canvas(sw, sh); x.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
  while (c.width / 2 > w) { const [n, nx] = canvas(Math.round(c.width / 2), Math.round(c.height / 2)); nx.drawImage(c, 0, 0, n.width, n.height); c = n; }
  const [f, fx] = canvas(w, h); fx.drawImage(c, 0, 0, w, h); return f;
}

// Geometrie des Original-Logos ermitteln (Ring, Hintergrund, Monogramm)
function analyse(img) {
  const N = img.naturalWidth, [c, x] = canvas(N, N); x.drawImage(img, 0, 0);
  const d = x.getImageData(0, 0, N, N).data, px = (X, Y) => { const i = (Y * N + X) * 4; return [d[i], d[i + 1], d[i + 2]]; };
  // Außenkante des blauen Rings in vier Richtungen → exakter Mittelpunkt und Radius
  const blue = (p) => p[2] > 70 && p[2] > p[0] + 35;
  const H = N / 2;
  let L = 0; while (L < H && !blue(px(L, H))) L++;
  let Rr = N - 1; while (Rr > H && !blue(px(Rr, H))) Rr--;
  let T = 0; while (T < H && !blue(px(H, T))) T++;
  let B = N - 1; while (B > H && !blue(px(H, B))) B--;
  const cx = (L + Rr) / 2, cy = (T + B) / 2;
  const ringOuter = Math.min(Rr - L, B - T) / 2 - 1;
  let ringInner = 0;
  for (let X = Math.round(cx + ringOuter); X > cx; X--) { const [r, g, b] = px(X, Math.round(cy)); if (!(b > 45 && b > r + 20)) { ringInner = X - cx; break; } }
  // Hintergrundfarbe: Mittel aus Punkten zwischen Ring und Inhalt
  let acc = [0, 0, 0], n = 0;
  for (let a = 0; a < 360; a += 15) { const R = ringInner * 0.9, X = Math.round(cx + R * Math.cos(a * Math.PI / 180)), Y = Math.round(cy + R * Math.sin(a * Math.PI / 180)); const p = px(X, Y); acc = acc.map((v, i) => v + p[i]); n++; }
  const bg = acc.map((v) => Math.round(v / n));
  // Monogramm: helle/blaue Pixel in der oberen Hälfte bis zum Beginn der Schriftzeile
  let minX = N, minY = N, maxX = 0, maxY = 0;
  const lum = (p) => Math.max(p[0], p[1], p[2]) - Math.max(bg[0], bg[1], bg[2]);
  const inside = (X, Y) => Math.hypot(X - cx, Y - cy) < ringInner - 30; // Ring ausschließen
  const rowHas = (Y) => { for (let X = Math.round(cx - ringInner * 0.85); X < cx + ringInner * 0.85; X += 2) if (inside(X, Y) && lum(px(X, Y)) > 70) return true; return false; };
  let Y0 = Math.round(cy - ringInner * 0.8); while (Y0 < cy && !rowHas(Y0)) Y0++;
  let Y1 = Y0; while (Y1 < N && rowHas(Y1)) Y1++; // erster durchgehender Block = Monogramm
  for (let Y = Y0; Y < Y1; Y++) for (let X = Math.round(cx - ringInner * 0.85); X < cx + ringInner * 0.85; X++) if (inside(X, Y) && lum(px(X, Y)) > 70) { if (X < minX) minX = X; if (X > maxX) maxX = X; }
  minY = Y0; maxY = Y1;
  // Hintergrund direkt um das Monogramm (für eine nahtlose Fläche)
  let a2 = [0, 0, 0], n2 = 0;
  for (let X = minX - 60; X <= maxX + 60; X += 6) for (const Y of [minY - 50, maxY + 30]) { const p = px(X, Y); a2 = a2.map((v, i) => v + p[i]); n2++; }
  const monoBg = a2.map((v) => Math.round(v / n2));
  return { N, cx, cy, ringOuter, ringInner, bg: monoBg, ringBg: bg, mono: [minX, minY, maxX - minX, maxY - minY] };
}

(async () => {
  const imgs = {}; let geo;
  for (const j of jobs) {
    const img = imgs[j.src] ||= await load(j.src);
    let c;
    if (j.op === 'width') {
      const h = Math.round(img.naturalHeight * j.size / img.naturalWidth); c = scaled(img, j.size, h);
    } else if (j.op === 'fit') {
      c = scaled(img, j.size, j.size);
    } else if (j.op === 'circle') {
      geo ||= analyse(img);
      const R = geo.ringOuter + 5, s = scaled(img, j.size, j.size, geo.cx - R, geo.cy - R, 2 * R, 2 * R);
      const [o, x] = canvas(j.size, j.size); x.beginPath(); x.arc(j.size / 2, j.size / 2, j.size / 2, 0, Math.PI * 2); x.clip(); x.drawImage(s, 0, 0); c = o;
    } else {
      // „mark“: Original-Ring und Original-Monogramm, Schriftzeilen entfernt
      geo ||= analyse(img);
      const N = geo.N, R = geo.ringOuter + 5;
      const [m, mx] = canvas(N, N);
      mx.save(); mx.beginPath(); mx.arc(geo.cx, geo.cy, R, 0, Math.PI * 2); mx.clip(); mx.drawImage(img, 0, 0); mx.restore();
      mx.fillStyle = 'rgb(' + geo.bg.join(',') + ')'; mx.beginPath(); mx.arc(geo.cx, geo.cy, geo.ringInner - 2, 0, Math.PI * 2); mx.fill();
      const [x0, y0, w0, h0] = geo.mono, pad = 40, scale = (geo.ringInner * 1.36) / (w0 + 2 * pad);
      const dw = (w0 + 2 * pad) * scale, dh = (h0 + 2 * pad) * scale;
      // Der Hintergrund des Originals ist einfarbig – das Monogramm wird unverändert übernommen
      const [t, tx] = canvas(Math.round(dw), Math.round(dh));
      tx.drawImage(img, x0 - pad, y0 - pad, w0 + 2 * pad, h0 + 2 * pad, 0, 0, t.width, t.height);
      // nur der Randbereich (außerhalb des Monogramms) wird weich ausgeblendet
      const f = pad * scale, [mk, mkx] = canvas(t.width, t.height);
      mkx.filter = 'blur(' + (f / 3) + 'px)'; mkx.fillStyle = '#000'; mkx.fillRect(f * 0.6, f * 0.6, t.width - f * 1.2, t.height - f * 1.2);
      tx.globalCompositeOperation = 'destination-in'; tx.drawImage(mk, 0, 0);
      mx.save(); mx.beginPath(); mx.arc(geo.cx, geo.cy, geo.ringInner - 2, 0, Math.PI * 2); mx.clip();
      mx.drawImage(t, geo.cx - dw / 2, geo.cy - dh / 2 + h0 * scale * 0.02); mx.restore();
      if (j.op === 'mark-square') {
        const [q, qx] = canvas(j.size, j.size); qx.fillStyle = 'rgb(' + geo.bg.join(',') + ')'; qx.fillRect(0, 0, j.size, j.size);
        const inner = Math.round(j.size * 0.86), s = scaled(m, inner, inner, geo.cx - R, geo.cy - R, 2 * R, 2 * R);
        qx.save(); qx.beginPath(); qx.arc(j.size / 2, j.size / 2, inner / 2, 0, Math.PI * 2); qx.clip(); qx.drawImage(s, (j.size - inner) / 2, (j.size - inner) / 2); qx.restore(); c = q;
      } else {
        const s = scaled(m, j.size, j.size, geo.cx - R, geo.cy - R, 2 * R, 2 * R);
        const [o, x] = canvas(j.size, j.size); x.beginPath(); x.arc(j.size / 2, j.size / 2, j.size / 2, 0, Math.PI * 2); x.clip(); x.drawImage(s, 0, 0); c = o;
      }
    }
    await send({ out: j.out, data: c.toDataURL(j.type, j.q), w: c.width, h: c.height });
  }
  await send({ done: true, geo });
})().catch((e) => send({ error: String(e && e.stack || e) }));
</script>`;

const browser = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find((p) => p && existsSync(p));
if (!browser) throw new Error('Kein Chrome/Edge gefunden. CHROME_PATH setzen.');

const tmp = mkdtempSync(path.join(tmpdir(), 'mpdl-img-'));
let child;
const done = new Promise((resolve, reject) => {
  const server = createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') return res.end(page);
    if (req.method === 'GET' && req.url.startsWith('/src/')) {
      const file = sources[decodeURIComponent(req.url.slice(5))];
      if (!file) return res.writeHead(404).end();
      res.writeHead(200, { 'Content-Type': file.endsWith('.webp') ? 'image/webp' : 'image/png' });
      return res.end(readFileSync(file));
    }
    if (req.method === 'POST' && req.url === '/result') {
      let body = '';
      req.on('data', (c) => (body += c));
      req.on('end', () => {
        res.end('ok');
        const r = JSON.parse(body);
        if (r.error) { server.close(); reject(new Error(r.error)); return; }
        if (r.done) { server.close(); resolve(r.geo); return; }
        const buf = Buffer.from(r.data.split(',')[1], 'base64');
        const target = r.out.startsWith('.') ? path.join(tmp, r.out) : path.join(out, r.out);
        mkdirSync(path.dirname(target), { recursive: true });
        writeFileSync(target, buf);
        console.log(`✓ ${r.out.padEnd(44)} ${r.w}×${r.h}  ${(buf.length / 1024).toFixed(1)} KB`);
      });
      return;
    }
    res.writeHead(404).end();
  }).listen(0, '127.0.0.1', () => {
    const { port } = server.address();
    child = spawn(browser, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', `--user-data-dir=${path.join(tmp, 'profile')}`, '--remote-debugging-port=0', `http://127.0.0.1:${port}/`], { stdio: 'ignore' });
  });
});

try {
  const geo = await done;
  console.log('Logo-Geometrie:', JSON.stringify(geo));
  // favicon.ico mit 32×32 und 48×48 (PNG-kodiert)
  const imgs = [32, 48].map((s) => [s, readFileSync(path.join(tmp, `.favicon-${s}.png`))]);
  const head = Buffer.alloc(6 + 16 * imgs.length);
  head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(imgs.length, 4);
  let offset = head.length;
  imgs.forEach(([s, png], i) => {
    const o = 6 + i * 16;
    head.writeUInt8(s, o); head.writeUInt8(s, o + 1); head.writeUInt16LE(1, o + 4); head.writeUInt16LE(32, o + 6);
    head.writeUInt32LE(png.length, o + 8); head.writeUInt32LE(offset, o + 12); offset += png.length;
  });
  writeFileSync(path.join(out, 'favicon.ico'), Buffer.concat([head, ...imgs.map(([, p]) => p)]));
  console.log('✓ favicon.ico (32, 48)');
} finally {
  child?.kill();
  setTimeout(() => rmSync(tmp, { recursive: true, force: true }), 500);
}
