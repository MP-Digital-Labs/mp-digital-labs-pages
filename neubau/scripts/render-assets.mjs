// Erzeugt das Open-Graph-Bild (mit dem offiziellen Logo) mit einem
// lokal installierten Chrome/Edge im Headless-Modus. Nur bei Designänderungen nötig;
// die Ergebnisse liegen versioniert unter src/static/.

import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, existsSync, rmSync } from 'node:fs';
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

const logo = pathToFileURL(path.join(out, 'assets', 'img', 'brand', 'mpdl-logo-640.webp')).href;

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
body{background:#f4f3ee;color:#0d0f12;position:relative;padding:76px 80px}
.g{position:absolute;inset:0;background-image:linear-gradient(rgba(13,15,18,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(13,15,18,.06) 1px,transparent 1px);background-size:48px 48px;-webkit-mask-image:radial-gradient(ellipse 60% 90% at 85% 50%,#000 25%,transparent 75%)}
.b{position:relative;font-size:26px;font-weight:300;letter-spacing:.12em;text-transform:uppercase}.b b{font-weight:750;letter-spacing:.05em}
h1{position:relative;margin-top:70px;font-size:80px;line-height:.98;font-weight:600;letter-spacing:-.05em;max-width:640px}h1 em{font-style:normal;color:#636a74}
p{position:relative;margin-top:30px;font-size:24px;color:#3b4048;letter-spacing:-.01em}
img{position:absolute;right:70px;top:115px;width:400px;height:400px;border-radius:50%;box-shadow:0 30px 80px -24px rgba(5,12,24,.55)}
</style><div class="g"></div><div class="b"><b>MP</b> Digital Labs</div>
<h1>Software mit klarem Zweck. <em>Gebaut für den Alltag.</em></h1>
<p>Unabhängiges Softwarestudio aus Bielefeld</p>
<img src="${logo}" alt="">`,
  },
];

const tmp = mkdtempSync(path.join(tmpdir(), 'mpdl-assets-'));
try {
  for (const job of jobs) {
    const htmlFile = path.join(tmp, 'page.html');
    writeFileSync(htmlFile, `<!doctype html><meta charset="utf-8">${job.html}`);
    const target = path.join(out, job.file);
    const args = [
      '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
      `--user-data-dir=${path.join(tmp, 'profile')}`, '--force-device-scale-factor=1', '--virtual-time-budget=1500',
      `--window-size=${job.w},${job.h}`, `--screenshot=${target}`,
    ];
    execFileSync(browser, [...args, pathToFileURL(htmlFile).href], { stdio: 'ignore' });
    console.log('✓', job.file);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
