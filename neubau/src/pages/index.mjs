import { SITE, APPS } from '../lib/site.mjs';
import { icon, btn, link, sectionHead, status, appIcon, checklist, playButton, ctaBand, eyebrow, logo, shot } from '../lib/ui.mjs';

const br = APPS.baurechner;
const vm = APPS.verbrauchsmonitor;

// Hero: Original-Screenshots beider Apps aus Google Play
function heroVisual() {
  return `<figure class="hshots">
  <div class="hshots__stage">
    <a class="hshots__phone hshots__phone--a" href="${br.path}" aria-label="${br.name} ansehen">${shot(br, 0, { sizes: '(max-width: 980px) 46vw, 270px', lazy: false })}</a>
    <a class="hshots__phone hshots__phone--b" href="${vm.path}" aria-label="${vm.name} ansehen">${shot(vm, 0, { sizes: '(max-width: 980px) 46vw, 270px', lazy: false })}</a>
    <span class="hshots__chip hshots__chip--1"><i style="background:var(--ok)"></i>Offline-first</span>
    <span class="hshots__chip hshots__chip--2"><i style="background:var(--signal)"></i>Kein Konto nötig</span>
    <span class="hshots__chip hshots__chip--3"><i style="background:var(--br-fill)"></i>Einmalkauf statt Abo</span>
  </div>
  <figcaption>${icon('play', 'ico--fill')}Original-Screenshots aus Google Play</figcaption>
</figure>`;
}

// Produkt-Showcase: drei Original-Screenshots je App
function fan(app, idx) {
  return `<div class="fan" aria-hidden="true">${idx
    .map((i, n) => `<div class="fan__item fan__item--${n}">${shot(app, i, { sizes: '(max-width: 900px) 40vw, 230px' })}</div>`)
    .join('')}</div>`;
}

function showcase() {
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
      <div class="show__visual">
        <div class="grid-bg"></div>
        ${fan(br, [1, 3, 2])}
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
      <div class="show__visual">
        <div class="grid-bg"></div>
        ${fan(vm, [1, 0, 2])}
      </div>
    </article>
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
        <li>${appIcon(br, 28, { lazy: false })}${appIcon(vm, 28, { lazy: false })}<span>BauRechner DE &amp; VerbrauchsMonitor DE</span></li>
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
  <div class="wrap studio-teaser">
    <div class="studio-teaser__logo reveal">${logo(300, 'logo--xl')}</div>
    <div class="reveal" style="--d:1">
      ${eyebrow('04', 'Studio')}
      <h2 id="studio" class="h2" style="margin-bottom:22px">Ein unabhängiges Softwarestudio mit Produktfokus.</h2>
      <div class="body-copy">
        <p>MP Digital Labs ist das Softwareunternehmen von <strong>${SITE.owner}</strong> mit Sitz in Bielefeld. Der Schwerpunkt liegt auf der Konzeption und Entwicklung digitaler Produkte mit klar definiertem Anwendungsnutzen.</p>
        <p>Neue Funktionen entstehen nicht als Selbstzweck. Sie werden priorisiert, getestet und an realistischen Nutzungsszenarien ausgerichtet – mit dem Ziel, verständliche, zuverlässige und langfristig nutzbare Produkte zu schaffen.</p>
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
