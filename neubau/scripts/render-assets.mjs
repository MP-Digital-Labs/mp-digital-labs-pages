// Erzeugt Raster-Assets (OG-Bild, Touch-Icon, Logo-PNG, favicon.ico) mit einem
// lokal installierten Chrome/Edge im Headless-Modus. Nur bei Designänderungen nötig;
// die Ergebnisse liegen versioniert unter src/static/.

import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'src', 'static');
const fonts = pathToFileURL(path.join(out, 'assets', 'fonts')).href;

const browser = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find((p) => p && existsSync(p));
if (!browser) throw new Error('Kein Chrome/Edge gefunden. CHROME_PATH setzen.');

const mark = (fg = '#0d0f12', cell = '#f4f3ee', dot = '#4338ff') =>
  `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="9" fill="${fg}"/><rect x="8" y="8" width="7" height="7" rx="1.8" fill="${cell}"/><rect x="8" y="17" width="7" height="7" rx="1.8" fill="${cell}"/><rect x="17" y="17" width="7" height="7" rx="1.8" fill="${cell}"/><circle cx="20.5" cy="11.5" r="3.6" fill="${dot}"/></svg>`;

const base = `<style>
@font-face{font-family:Geist;src:url('${fonts}/Geist-Variable.woff2') format('woff2');font-weight:100 900}
@font-face{font-family:'Geist Mono';src:url('${fonts}/GeistMono-Variable.woff2') format('woff2');font-weight:100 900}
*{margin:0;box-sizing:border-box}html,body{width:100%;height:100%;overflow:hidden}
body{font-family:Geist,sans-serif;-webkit-font-smoothing:antialiased}
</style>`;

const jobs = [
  {
    file: 'assets/img/og-image.png',
    w: 1200,
    h: 630,
    html: `${base}<style>
body{background:#f4f3ee;color:#0d0f12;position:relative;padding:72px 80px}
.g{position:absolute;inset:0;background-image:linear-gradient(rgba(13,15,18,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(13,15,18,.06) 1px,transparent 1px);background-size:48px 48px;-webkit-mask-image:radial-gradient(ellipse 70% 80% at 85% 20%,#000 25%,transparent 75%)}
.b{position:relative;display:flex;align-items:center;gap:16px;font-size:30px;font-weight:620;letter-spacing:-.025em}.b svg{width:52px;height:52px}.b span{color:#636a74;font-weight:500}
h1{position:relative;margin-top:96px;font-size:92px;line-height:.98;font-weight:600;letter-spacing:-.05em}h1 em{font-style:normal;color:#636a74}
p{position:relative;margin-top:34px;font-size:27px;color:#3b4048;letter-spacing:-.01em}
.d{position:absolute;right:80px;bottom:64px;font-family:'Geist Mono';font-size:18px;color:#4338ff;letter-spacing:.04em;display:flex;align-items:center;gap:14px}
.d i{display:block;width:180px;height:1.5px;background:#4338ff;position:relative}.d i:before,.d i:after{content:'';position:absolute;top:-6px;width:1.5px;height:13px;background:#4338ff}.d i:before{left:0}.d i:after{right:0}
</style><div class="g"></div><div class="b">${mark()}<div>MP Digital<span> Labs</span></div></div>
<h1>Software mit<br>klarem Zweck. <em>Gebaut<br>für den Alltag.</em></h1>
<div class="d"><i></i>MP-DIGITAL-LABS.DE</div>`,
  },
  { file: 'assets/img/apple-touch-icon.png', w: 180, h: 180, html: `${base}<style>body{background:#0d0f12}svg{position:absolute;left:0;top:0;width:180px;height:180px}</style>${mark('#0d0f12')}` },
  { file: 'assets/img/logo-512.png', w: 512, h: 512, html: `${base}<style>body{background:#0d0f12}svg{position:absolute;left:0;top:0;width:512px;height:512px}</style>${mark()}` },
  { file: '.favicon-32.png', w: 32, h: 32, html: `${base}<style>body{background:transparent}svg{position:absolute;left:0;top:0;width:32px;height:32px}</style>${mark()}`, transparent: true },
];

const tmp = mkdtempSync(path.join(tmpdir(), 'mpdl-assets-'));
try {
  for (const job of jobs) {
    const htmlFile = path.join(tmp, 'page.html');
    writeFileSync(htmlFile, `<!doctype html><meta charset="utf-8">${job.html}`);
    const target = path.join(job.file.startsWith('.') ? tmp : out, job.file);
    const args = [
      '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
      `--user-data-dir=${path.join(tmp, 'profile')}`, '--force-device-scale-factor=1', '--virtual-time-budget=1500',
      `--window-size=${job.w},${job.h}`, `--screenshot=${target}`,
    ];
    if (job.transparent) args.push('--default-background-color=00000000');
    execFileSync(browser, [...args, pathToFileURL(htmlFile).href], { stdio: 'ignore' });
    console.log('✓', job.file);
  }
  // favicon.ico: ICO-Container mit eingebettetem 32×32-PNG
  const png = readFileSync(path.join(tmp, '.favicon-32.png'));
  const head = Buffer.alloc(22);
  head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(1, 4);
  head.writeUInt8(32, 6); head.writeUInt8(32, 7); head.writeUInt8(0, 8); head.writeUInt8(0, 9);
  head.writeUInt16LE(1, 10); head.writeUInt16LE(32, 12); head.writeUInt32LE(png.length, 14); head.writeUInt32LE(22, 18);
  writeFileSync(path.join(out, 'favicon.ico'), Buffer.concat([head, png]));
  console.log('✓ favicon.ico');
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
