import { SITE, APPS, PRICES_AS_OF } from '../lib/site.mjs';
import { icon, btn, link, sectionHead, appIcon, ctaBand, eyebrow, logo, shot } from '../lib/ui.mjs';

const br = APPS.baurechner;
const vm = APPS.verbrauchsmonitor;

// Hero: Original-Screenshots beider Apps aus Google Play vor dem Ring-Motiv des Logos
function heroVisual() {
  return `<figure class="hshots">
  <div class="hshots__stage">
    <div class="rings" aria-hidden="true"></div>
    <a class="hshots__phone hshots__phone--a" href="${br.path}" aria-label="${br.name} ansehen">${shot(br, 0, { sizes: '(max-width: 980px) 44vw, 270px', lazy: false })}</a>
    <a class="hshots__phone hshots__phone--b" href="${vm.path}" aria-label="${vm.name} ansehen">${shot(vm, 0, { sizes: '(max-width: 980px) 44vw, 270px', lazy: false })}</a>
    <span class="hshots__chip hshots__chip--3" aria-hidden="true"><i style="background:#3ee08f"></i>Offline nutzbar</span>
    <span class="hshots__chip hshots__chip--1" aria-hidden="true"><i style="background:#5cb5ff"></i>Kein Konto nötig</span>
    <span class="hshots__chip hshots__chip--2" aria-hidden="true"><i style="background:#f6a04d"></i>Pro ohne Abo</span>
  </div>
  <figcaption>${icon('play', 'ico--fill')}Original-Screenshots aus Google Play</figcaption>
</figure>`;
}

// Kompakte Produktkachel: Screenshots, Kurzinfo, Fakten im Kontext, Aktionen
function tile(app, { shots, meta }) {
  return `<article class="tile tile--${app.key} reveal">
    <div class="tile__media" aria-hidden="true">
      <div class="tile__phones">${shots.map((i) => shot(app, i, { sizes: '(max-width: 860px) 36vw, 230px' })).join('')}</div>
    </div>
    <div class="tile__body">
      <div class="tile__head">${appIcon(app, 52)}<div><p class="tile__cat">${app.category}</p><h3 class="tile__title"><a href="${app.path}">${app.name}</a></h3></div></div>
      <p class="tile__text">${app.summary}</p>
      <ul class="tile__meta">${meta.map(([ic, t]) => `<li>${icon(ic)}${t}</li>`).join('')}</ul>
      <div class="tile__foot">
        <p class="tile__price">Kostenlos · <strong>Pro einmalig ${app.pricing.proPrice}</strong></p>
        <div class="tile__links">${link(app.path, 'Zur App')}${link(app.play, 'Google Play', 'tlink tlink--muted')}</div>
      </div>
    </div>
  </article>`;
}

const principles = [
  ['offline', 'Offline nutzbar', 'Die Kernfunktionen arbeiten ohne dauerhafte Internetverbindung – auf der Baustelle genauso wie im Keller am Zähler.'],
  ['user', 'Kein Konto', 'Keine Registrierung, kein Login. Projekt- und Verbrauchsdaten bleiben lokal auf dem Gerät.'],
  ['tag', 'Einmalkauf statt Abo', 'Starten Sie kostenlos. Erweiterte Funktionen gibt es mit Pro – als einmaliger Kauf über Google Play.'],
  ['target', 'Klarer Zweck', 'Funktionen entstehen aus konkreten Abläufen – nicht aus einer möglichst langen Feature-Liste.'],
];

const method = [
  ['01', 'Beobachten', 'Jede App beginnt bei einem konkreten Ablauf aus Handwerk oder Haushalt – nicht bei einer Technologie.'],
  ['02', 'Reduzieren', 'Wir grenzen den Funktionsumfang bewusst ab, damit die Bedienung ohne Einarbeitung verständlich bleibt.'],
  ['03', 'Pflegen', 'Nach der Veröffentlichung geht die Arbeit weiter: Rückmeldungen auswerten, verbessern, stabil halten.'],
];

export default {
  path: '/',
  title: 'MP Digital Labs – Eigene Apps aus Bielefeld',
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
<section class="hero night" aria-labelledby="hero-title">
  <div class="aura" aria-hidden="true"></div>
  <div class="wrap">
    <div class="hero__grid">
      <div class="hero__copy">
        <a class="hero__kicker" href="/apps/"><b>Google Play</b>Zwei Apps jetzt verfügbar${icon('arrow')}</a>
        <h1 id="hero-title" class="display hero__title">Software mit klarem Zweck. <em class="shine">Gebaut für den Alltag.</em></h1>
        <p class="lead hero__lead">MP Digital Labs ist ein unabhängiges Softwarestudio aus Bielefeld. Wir entwickeln und vertreiben eigene Apps, die konkrete Aufgaben zuverlässig lösen – offline nutzbar, ohne Benutzerkonto und mit Einmalkauf statt Abo.</p>
        <div class="actions">
          ${btn('/apps/', 'Unsere Apps entdecken', { variant: 'primary', size: 'lg' })}
          ${btn('/studio/', 'Über das Studio', { variant: 'secondary', size: 'lg' })}
        </div>
      </div>
      ${heroVisual()}
    </div>
    <div class="hero__foot">
      <div>
        ${eyebrow('', 'Produkte')}
        <h2 id="produkte">Zwei Apps. Jede mit einer klaren Aufgabe.</h2>
      </div>
      ${link('/apps/', 'Alle Apps im Vergleich')}
    </div>
  </div>
</section>

<section class="section duo-section" aria-labelledby="produkte">
  <div class="wrap">
    <div class="duo">
      ${tile(br, { shots: [1, 3], meta: [['calc', '15 Rechner'], ['offline', 'Offline nutzbar'], ['user', 'Ohne Konto']] })}
      ${tile(vm, { shots: [1, 2], meta: [['gauge', 'Strom · Gas · Wasser · Wärme'], ['offline', 'Offline nutzbar'], ['user', 'Ohne Konto']] })}
    </div>
    <p class="duo-note">Kostenlos bei Google Play. Preise für Pro laut Google Play, Stand ${PRICES_AS_OF} – einmaliger Kauf, kein Abo.</p>
  </div>
</section>

<section class="section section--alt" aria-labelledby="prinzipien">
  <div class="wrap lay-aside">
    ${sectionHead({
      label: 'Prinzipien',
      id: 'prinzipien',
      title: 'Was alle unsere Apps gemeinsam haben.',
      lead: 'Technologie ist dann gut, wenn sie sich selbstverständlich anfühlt. Diese Grundsätze gelten für jedes Produkt, das unser Studio veröffentlicht.',
      cls: 'shead--stack lay-aside__head',
    })}
    <div class="principles principles--2">
      ${principles
        .map(
          ([ic, t, d], i) => `<div class="principle reveal" style="--d:${i % 2}">
        <span class="principle__ico">${icon(ic)}</span>
        <h3 class="principle__title">${t}</h3>
        <p>${d}</p>
      </div>`
        )
        .join('')}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="arbeitsweise">
  <div class="wrap">
    ${sectionHead({
      label: 'Arbeitsweise',
      id: 'arbeitsweise',
      title: 'Wie bei uns Software entsteht.',
      lead: 'Wir entwickeln ausschließlich eigene Produkte. Das erlaubt uns, sorgfältig zu priorisieren – und jede App so lange zu verfeinern, bis sie im Alltag wirklich trägt.',
    })}
    <div class="svc">
      ${method
        .map(
          ([n, t, d]) => `<a class="svc__row reveal" href="/arbeitsweise/">
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

<section class="section night" aria-labelledby="studio">
  <div class="aura" aria-hidden="true"></div>
  <div class="wrap studio-teaser">
    <div class="studio-teaser__logo reveal"><div class="rings" aria-hidden="true"></div>${logo(320, 'logo--xl')}</div>
    <div class="reveal" style="--d:1">
      ${eyebrow('', 'Studio')}
      <h2 id="studio" class="h2" style="margin-bottom:22px">Ein unabhängiges Softwarestudio aus Bielefeld.</h2>
      <div class="body-copy">
        <p>MP Digital Labs ist das Softwareunternehmen von <strong>${SITE.owner}</strong>. Wir konzipieren, entwickeln und vertreiben eigene Apps mit klar definiertem Anwendungsnutzen.</p>
        <p>Neue Funktionen entstehen nicht als Selbstzweck. Sie werden priorisiert, getestet und an realistischen Nutzungsszenarien ausgerichtet – für Produkte, die verständlich, zuverlässig und langfristig nutzbar sind.</p>
      </div>
      <div class="actions" style="margin-top:30px">${btn('/studio/', 'Mehr über das Studio', { variant: 'secondary' })}</div>
    </div>
  </div>
</section>

${ctaBand({
  id: 'kontakt',
  title: 'Fragen, Feedback oder Ideen zu unseren Apps?',
  text: 'Wir freuen uns über Rückmeldungen aus der Praxis. Für Hilfe zu einer App finden Sie im Support-Bereich direkte Antworten.',
  actions: `${btn('/kontakt/', 'Kontakt aufnehmen', { variant: 'primary', size: 'lg' })}${btn('/support/', 'Zum Support', { variant: 'secondary', size: 'lg' })}`,
})}
`,
};
