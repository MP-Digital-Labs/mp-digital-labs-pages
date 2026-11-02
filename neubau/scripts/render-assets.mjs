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
@font-face{font-family:Sora;src:url('${fonts}/Sora-Variable-latin.woff2') format('woff2');font-weight:100 800}
@font-face{font-family:Inter;src:url('${fonts}/Inter-Variable-latin.woff2') format('woff2');font-weight:100 900}
*{margin:0;box-sizing:border-box}html,body{width:100%;height:100%;overflow:hidden}
body{font-family:Inter,sans-serif;-webkit-font-smoothing:antialiased}
</style>`;

const jobs = [
  {
    file: 'assets/img/og-image.png',
    w: 1200,
    h: 630,
    html: `${base}<style>
body{background:#060a12;color:#f2f5fa;position:relative;padding:78px 80px;overflow:hidden}
.glow{position:absolute;right:-180px;top:-260px;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(36,120,255,.32),rgba(36,120,255,.08) 40%,transparent 66%)}
.rings{position:absolute;right:-60px;top:-10px;width:650px;height:650px;border-radius:50%;background:repeating-radial-gradient(circle,transparent 0 51px,rgba(255,255,255,.08) 51px 52px);-webkit-mask-image:radial-gradient(circle,#000 25%,transparent 70%)}
.b{position:relative;font-family:Sora;font-size:24px;font-weight:300;letter-spacing:.18em;text-transform:uppercase}.b b{font-weight:600;letter-spacing:.08em}
h1{position:relative;margin-top:84px;font-family:Sora;font-size:72px;line-height:1.06;font-weight:300;letter-spacing:-.03em;max-width:640px}
h1 em{font-style:normal;background:linear-gradient(100deg,#f4f7fb 0%,#c3ccd9 40%,#73c9ff 70%,#2f80f6 100%);-webkit-background-clip:text;color:transparent}
p{position:relative;margin-top:30px;font-size:24px;color:rgba(226,233,244,.72)}
img{position:absolute;right:96px;top:130px;width:370px;height:370px;border-radius:50%;box-shadow:0 0 0 1px rgba(92,181,255,.2),0 0 120px -10px rgba(40,140,255,.45)}
</style><div class="glow"></div><div class="rings"></div><div class="b"><b>MP</b> Digital Labs</div>
<h1>Software mit klarem Zweck. <em>Gebaut für den Alltag.</em></h1>
<p>Eigene Apps aus Bielefeld</p>
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
