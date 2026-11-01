import { SITE, APPS } from '../lib/site.mjs';
import { icon, btn, link, sectionHead, status, appIcon, checklist, playButton, ctaBand, eyebrow, logoMark } from '../lib/ui.mjs';

// Monatswerte der schematischen Illustration (rein illustrativ)
const MONTHS = [312, 284, 268, 231, 198, 176, 169, 174, 203, 244, 281, 296];
const avg = Math.round(MONTHS.reduce((a, b) => a + b, 0) / MONTHS.length);

function heroVisual() {
  const base = 470, maxH = 112, bw = 18, gap = 9, x0 = 246;
  const bars = MONTHS.map((v, i) => {
    const h = (v / Math.max(...MONTHS)) * maxH;
    return { x: x0 + i * (bw + gap), y: base - h, h };
  });
  const pts = bars.map((b) => [b.x + bw / 2, b.y - 10]);
  const trend = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const last = pts[pts.length - 1];

  return `<figure class="hv" aria-hidden="true">
  <svg viewBox="0 0 600 540" role="presentation">
    <g class="float-a">
      <rect class="panel-shadow" x="22" y="40" width="340" height="290" rx="18"/>
      <rect class="panel" x="10" y="20" width="360" height="300" rx="18"/>
      <text x="30" y="51">AUFMASS · RAUM 01</text>
      <rect class="tag" x="296" y="36" width="54" height="22" rx="11"/><text class="tag-text" x="323" y="51" text-anchor="middle">BAU</text>
      <path class="hair" d="M10 70H370"/>
      <rect class="floor draw" style="--len:740;--delay:.2s" x="80" y="110" width="220" height="150" rx="2"/>
      <path class="hair" d="M80 185H300M190 110V260" stroke-dasharray="3 4"/>
      <path class="dimline draw" style="--len:260;--delay:.7s" d="M80 92H300M80 86v12M300 86v12"/>
      <text class="dimtext pop" style="--delay:1.1s" x="190" y="84" text-anchor="middle">5,85 m</text>
      <path class="dimline draw" style="--len:190;--delay:.85s" d="M60 110V260M54 110h12M54 260h12"/>
      <g transform="translate(50 185) rotate(-90)"><text class="dimtext pop" style="--delay:1.2s" text-anchor="middle">4,20 m</text></g>
      <g class="pop" style="--delay:1.5s">
        <rect class="res" x="30" y="276" width="144" height="30" rx="15"/>
        <text class="res-text" x="102" y="296" text-anchor="middle">= 24,57 m²</text>
      </g>
    </g>

    <g class="pop" style="--delay:1.7s">
      <rect class="pill" x="398" y="64" width="176" height="36" rx="18"/>
      <circle cx="420" cy="82" r="4" fill="var(--ok)"/>
      <text class="t-strong" x="434" y="86" font-size="13">Offline-first</text>
    </g>
    <g class="pop" style="--delay:1.85s">
      <rect class="pill" x="420" y="116" width="164" height="36" rx="18"/>
      <circle cx="442" cy="134" r="4" fill="var(--signal)"/>
      <text class="t-strong" x="456" y="138" font-size="13">Kein Konto nötig</text>
    </g>
    <g class="pop" style="--delay:2s">
      <rect class="pill" x="398" y="168" width="186" height="36" rx="18"/>
      <circle cx="420" cy="186" r="4" fill="var(--br-fill)"/>
      <text class="t-strong" x="434" y="190" font-size="13">Einmalkauf statt Abo</text>
    </g>

    <g class="float-b">
      <rect class="panel-shadow" x="232" y="270" width="350" height="260" rx="18"/>
      <rect class="panel" x="220" y="244" width="370" height="282" rx="18"/>
      <text x="240" y="275">STROM · KWH / MONAT</text>
      <text class="t-strong" x="570" y="277" text-anchor="end" font-size="15">Ø ${avg} kWh</text>
      <path class="hair" d="M220 294H590"/>
      <path class="hair" d="M240 ${base}H572" />
      <path class="hair" d="M240 ${base - maxH / 2}H572" stroke-dasharray="2 5"/>
      ${bars
        .map(
          (b, i) =>
            `<rect class="bar grow${i === bars.length - 1 ? ' bar--hi' : ''}" style="--i:${i}" x="${b.x}" y="${b.y.toFixed(1)}" width="${bw}" height="${b.h.toFixed(1)}" rx="3"/>`
        )
        .join('')}
      <path class="trend draw" style="--len:420;--delay:1.1s" d="${trend}"/>
      <circle class="trend-dot pop" style="--delay:2s" cx="${last[0]}" cy="${last[1]}" r="4.5"/>
      ${'JFMAMJJASOND'
        .split('')
        .map((m, i) => `<text x="${bars[i].x + bw / 2}" y="494" text-anchor="middle" font-size="10">${m}</text>`)
        .join('')}
      <text class="vm-text" x="240" y="512" font-size="10">LOKAL GESPEICHERT</text>
    </g>
  </svg>
  <figcaption>Schematische Darstellung</figcaption>
</figure>`;
}

const chain = [
  ['ruler', 'Aufmaß', 'Räume & Wände'],
  ['calc', 'Berechnen', '15 Werkzeuge'],
  ['box', 'Material', 'Mengen & Gebinde'],
  ['euro', 'Kosten', 'inkl. MwSt.'],
  ['doc', 'Dokumentation', 'Fotos · Notizen'],
];

const meterBars = [62, 56, 52, 44, 38, 34, 33, 35, 41, 49, 56, 60];

function showcase() {
  const br = APPS.baurechner;
  const vm = APPS.verbrauchsmonitor;
  const sk = APPS.scootkompass;
  return `<div class="showcase">
    <article class="show show--baurechner reveal">
      <div class="show__copy">
        <div class="show__head">${appIcon(br, 56)}${status('live')}</div>
        <p class="show__cat">${br.category}</p>
        <h3 class="show__title">${br.name}</h3>
        <p class="show__text">${br.summary}</p>
        ${checklist([
          'Durchgängige Arbeitskette statt einzelner Taschenrechner',
          '15 Rechner – von Beton und Estrich bis Fliesen und Treppen',
          'Projekte, Fotos und Notizen lokal auf dem Gerät',
        ])}
        <div class="show__actions">${btn(br.path, 'Produkt ansehen', { variant: 'primary' })}${playButton(br, { variant: 'secondary' })}</div>
      </div>
      <div class="show__visual" aria-hidden="true">
        <div class="grid-bg"></div>
        <ol class="chain">
          ${chain.map(([ic, t, s]) => `<li class="chain__node">${icon(ic)}${t}<small>${s}</small></li>`).join('')}
        </ol>
      </div>
    </article>

    <article class="show show--verbrauchsmonitor show--reverse reveal">
      <div class="show__copy">
        <div class="show__head">${appIcon(vm, 56)}${status('live')}</div>
        <p class="show__cat">${vm.category}</p>
        <h3 class="show__title">${vm.name}</h3>
        <p class="show__text">${vm.summary}</p>
        ${checklist([
          'Mehrere Zähler für Strom, Gas, Wasser und Wärme',
          'Verbrauch, Durchschnittswerte und klar gekennzeichnete Kostenschätzungen',
          'Lokale Ableseerinnerungen und Backup',
        ])}
        <div class="show__actions">${btn(vm.path, 'Produkt ansehen', { variant: 'primary' })}${playButton(vm, { variant: 'secondary' })}</div>
      </div>
      <div class="show__visual" aria-hidden="true">
        <div class="grid-bg"></div>
        <div class="meters">
          <div class="meters__tiles">
            <span class="meter meter--strom">${icon('bolt')}Strom</span>
            <span class="meter meter--gas">${icon('flame')}Gas</span>
            <span class="meter meter--wasser">${icon('drop')}Wasser</span>
            <span class="meter meter--waerme">${icon('heat')}Wärme</span>
          </div>
          <div class="mchart">
            <div class="mchart__head"><span>Verbrauch je Monat</span><strong>Ø ${avg} kWh</strong></div>
            <div class="mchart__bars">${meterBars
              .map((h, i) => `<span style="--h:${h + 36}%;--i:${i}"${i === meterBars.length - 1 ? ' class="is-hi"' : ''}></span>`)
              .join('')}</div>
            <div class="mchart__axis"><span>Jan</span><span>Apr</span><span>Jul</span><span>Okt</span><span>Dez</span></div>
          </div>
        </div>
      </div>
    </article>

    <div class="devcard reveal">
      ${appIcon(sk, 56)}
      <div>
        <h3 class="devcard__title">${sk.name} ${status('dev')}</h3>
        <p>${sk.summary}</p>
      </div>
      ${link('/kontakt/?thema=ScootKompass', 'Über Updates informieren')}
    </div>
  </div>`;
}

const principles = [
  ['offline', 'Offline-first', 'Die Kernfunktionen arbeiten ohne Internetverbindung – auf der Baustelle genauso wie im Keller am Zähler.'],
  ['user', 'Kein Konto', 'Keine Registrierung, kein Login. Projekt- und Verbrauchsdaten bleiben lokal auf dem Gerät.'],
  ['tag', 'Einmalkauf statt Abo', 'Die Basis bleibt kostenlos nutzbar. Pro-Funktionen gibt es per einmaligem Kauf über Google Play.'],
  ['target', 'Klarer Zweck', 'Funktionen entstehen aus konkreten Abläufen – nicht aus einer möglichst langen Feature-Liste.'],
];

const services = [
  ['01', 'Mobile Anwendungen', 'Konzeption und Entwicklung moderner Apps mit klaren Abläufen, konsistenter Nutzerführung und passender Architektur.', '/leistungen/#mobile'],
  ['02', 'Produktentwicklung', 'Produktideen strukturieren, relevante Funktionen priorisieren und schrittweise zum marktfähigen Produkt entwickeln.', '/leistungen/#produkt'],
  ['03', 'Praxisorientierte Software', 'Digitale Lösungen für konkrete Einsatzbereiche – funktional, nachvollziehbar und auf reale Nutzung ausgerichtet.', '/leistungen/#software'],
];

export default {
  path: '/',
  title: 'MP Digital Labs – Software & Apps aus Bielefeld',
  description: SITE.description,
  priority: 1.0,
  jsonld: [
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      name: SITE.name,
      url: `${SITE.url}/`,
      inLanguage: 'de-DE',
      publisher: { '@id': `${SITE.url}/#organization` },
    },
  ],
  body: `
<section class="hero" aria-labelledby="hero-title">
  <div class="grid-bg"></div>
  <div class="wrap hero__grid">
    <div class="hero__copy">
      <a class="hero__kicker" href="/apps/"><b>Google Play</b>Zwei Apps jetzt verfügbar${icon('arrow')}</a>
      <h1 id="hero-title" class="display hero__title">Software mit<br>klarem Zweck. <em>Gebaut für den Alltag.</em></h1>
      <p class="lead hero__lead">MP Digital Labs ist ein unabhängiges Softwarestudio aus Bielefeld. Wir entwickeln Apps, die konkrete Aufgaben lösen – offline-first, ohne Benutzerkonto und ohne Abo.</p>
      <div class="actions">
        ${btn('/apps/', 'Unsere Apps entdecken', { variant: 'primary', size: 'lg' })}
        ${btn('/kontakt/', 'Projekt anfragen', { variant: 'secondary', size: 'lg' })}
      </div>
      <ul class="hero__meta">
        <li>${icon('phone')}Android-Apps bei Google Play</li>
        <li>${icon('pin')}Bielefeld, Deutschland</li>
      </ul>
    </div>
    ${heroVisual()}
  </div>
</section>

<section class="stats" aria-label="Kennzahlen">
  <div class="wrap stats__row">
    <div class="stat"><span class="stat__v">2</span><span class="stat__l">Apps bei Google Play veröffentlicht</span></div>
    <div class="stat"><span class="stat__v">0</span><span class="stat__l">Benutzerkonten erforderlich</span></div>
    <div class="stat"><span class="stat__v">15</span><span class="stat__l">Rechner &amp; Werkzeuge in BauRechner DE</span></div>
    <div class="stat"><span class="stat__v">4</span><span class="stat__l">Zählerarten in VerbrauchsMonitor DE</span></div>
  </div>
</section>

<section class="section" aria-labelledby="produkte">
  <div class="wrap">
    ${sectionHead({
      index: '01',
      label: 'Produkte',
      id: 'produkte',
      title: 'Werkzeuge für konkrete Aufgaben.',
      lead: 'Jede App hat einen klaren Zweck, einen abgegrenzten Funktionsumfang und eine Bedienung, die ohne lange Einarbeitung verständlich bleibt.',
    })}
    ${showcase()}
  </div>
</section>

<section class="section section--alt" aria-labelledby="prinzipien">
  <div class="wrap">
    ${sectionHead({
      index: '02',
      label: 'Prinzipien',
      id: 'prinzipien',
      title: 'Was alle unsere Produkte gemeinsam haben.',
      lead: 'Technologie ist dann gut, wenn sie sich selbstverständlich anfühlt. Diese Grundsätze gelten für jede App, die unser Studio verlässt.',
    })}
    <div class="principles">
      ${principles
        .map(
          ([ic, t, d], i) => `<div class="principle reveal" style="--d:${i}">
        <span class="principle__ico">${icon(ic)}</span>
        <h3 class="principle__title">${t}</h3>
        <p>${d}</p>
      </div>`
        )
        .join('')}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="leistungen">
  <div class="wrap">
    ${sectionHead({
      index: '03',
      label: 'Leistungen',
      id: 'leistungen',
      title: 'Von der Idee bis zum digitalen Produkt.',
      lead: 'Was wir für unsere eigenen Apps tun, bieten wir auch für Projekte und Kooperationen an – mit derselben Sorgfalt.',
    })}
    <div class="svc">
      ${services
        .map(
          ([n, t, d, h]) => `<a class="svc__row reveal" href="${h}">
        <span class="svc__n">${n}</span>
        <h3 class="svc__title">${t}</h3>
        <p>${d}</p>
        ${icon('arrow')}
      </a>`
        )
        .join('')}
    </div>
  </div>
</section>

<section class="section section--line" aria-labelledby="studio">
  <div class="wrap split split--center">
    <div class="reveal">
      ${eyebrow('04', 'Studio')}
      <p class="quote">Neue Funktionen entstehen nicht als Selbstzweck.</p>
      <div class="byline">
        <span class="byline__avatar">${logoMark()}</span>
        <div><strong>Arbeitsprinzip</strong><span>MP Digital Labs · Bielefeld</span></div>
      </div>
    </div>
    <div class="reveal" style="--d:1">
      <h2 id="studio" class="h3" style="margin-bottom:18px">Ein unabhängiges Softwarestudio mit Produktfokus.</h2>
      <div class="body-copy">
        <p>MP Digital Labs ist das Softwareunternehmen von <strong>${SITE.owner}</strong> mit Sitz in Bielefeld. Der Schwerpunkt liegt auf der Konzeption und Entwicklung digitaler Produkte mit klar definiertem Anwendungsnutzen.</p>
        <p>Funktionen werden priorisiert, getestet und an realistischen Nutzungsszenarien ausgerichtet – mit dem Ziel, verständliche, zuverlässige und langfristig nutzbare Produkte zu schaffen.</p>
      </div>
      <div class="actions" style="margin-top:28px">${link('/studio/', 'Mehr über das Studio')}</div>
    </div>
  </div>
</section>

${ctaBand({
  id: 'kontakt',
  title: 'Eine Idee, ein Projekt oder Feedback?',
  text: 'Für Projektanfragen, Kooperationen, Produktfeedback oder geschäftliche Anliegen erreichen Sie uns direkt – ohne Umwege.',
  actions: `${btn('/kontakt/', 'Kontakt aufnehmen', { variant: 'primary', size: 'lg' })}${btn(`mailto:${SITE.email}`, 'E-Mail schreiben', { variant: 'secondary', size: 'lg', iconName: 'mail' })}`,
})}
`,
};
