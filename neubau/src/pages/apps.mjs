import { APPS, PRICES_AS_OF } from '../lib/site.mjs';
import { icon, btn, sectionHead, breadcrumbs, appCard, allApps, ctaBand } from '../lib/ui.mjs';

const crumbs = [['Start', '/'], ['Apps', '/apps/']];
const br = APPS.baurechner;
const vm = APPS.verbrauchsmonitor;
const ok = (t) => `${icon('check')}${t}`;

const principles = [
  ['target', 'Praxisnah', 'Funktionen entstehen aus konkreten Abläufen und nicht aus einer möglichst langen Feature-Liste.'],
  ['shield', 'Datensparsam', 'Wo es sinnvoll ist, bleiben Daten lokal auf dem Gerät und ein Konto ist nicht nötig.'],
  ['wrench', 'Wartbar', 'Produkte werden bewusst schlank gehalten, damit Stabilität und Weiterentwicklung nicht unter unnötiger Komplexität leiden.'],
];

export default {
  path: '/apps/',
  title: 'Apps',
  description:
    'Alle Apps von MP Digital Labs im Überblick: BauRechner DE und VerbrauchsMonitor DE – kostenlos bei Google Play, offline-first und ohne Benutzerkonto.',
  priority: 0.9,
  breadcrumbs: crumbs,
  jsonld: [
    {
      '@type': 'ItemList',
      name: 'Apps von MP Digital Labs',
      itemListElement: [br, vm].map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: `https://mp-digital-labs.de${a.path}`, name: a.name })),
    },
  ],
  body: `
<section class="phero night phero--overlap" aria-labelledby="page-title">
  <div class="aura" aria-hidden="true"></div>
  <div class="wrap phero__inner">
    ${breadcrumbs(crumbs)}
    <p class="eyebrow"><span>Produktportfolio</span></p>
    <h1 id="page-title" class="phero__title">Klare Werkzeuge für konkrete Aufgaben.</h1>
    <p class="lead">Ohne unnötige Komplexität und mit einem Fokus auf verlässliche, verständliche Nutzung. Beide Apps sind kostenlos bei Google Play erhältlich.</p>
  </div>
</section>

<section class="section section--overlap" aria-label="Alle Apps">
  <div class="wrap">
    <div class="agrid agrid--2">${allApps().map((a) => appCard(a, { headingLevel: 2 })).join('')}</div>
  </div>
</section>

<section class="section section--alt" aria-labelledby="vergleich">
  <div class="wrap">
    ${sectionHead({
      index: '01',
      label: 'Auf einen Blick',
      id: 'vergleich',
      title: 'Gleiche Haltung, unterschiedliche Aufgaben.',
      lead: 'Beide Apps folgen denselben Grundsätzen: lokale Daten, kein Konto, kostenloser Einstieg und ein einmaliger Kauf für Pro – ohne Abo.',
    })}
    <div class="table-wrap reveal">
      <table class="table">
        <caption class="sr-only">Vergleich der veröffentlichten Apps</caption>
        <thead>
          <tr><td></td><th scope="col">${br.name}<small>${br.category}</small></th><th scope="col">${vm.name}<small>${vm.category}</small></th></tr>
        </thead>
        <tbody>
          <tr><th scope="row">Wofür</th><td>Aufmaß, Berechnungen, Material, Kalkulation und Projektdokumentation</td><td>Zählerstände und Verbrauchsentwicklung für Strom, Gas, Wasser und Wärme</td></tr>
          <tr><th scope="row">Plattform</th><td>Android · Google Play</td><td>Android · Google Play</td></tr>
          <tr><th scope="row">Datenspeicherung</th><td>${ok('lokal auf dem Gerät')}</td><td>${ok('lokal auf dem Gerät')}</td></tr>
          <tr><th scope="row">Benutzerkonto</th><td>${ok('nicht erforderlich')}</td><td>${ok('nicht erforderlich')}</td></tr>
          <tr><th scope="row">Kostenlos</th><td>ein Projekt und ein Aufmaß, alle 15 Rechner, Materialplanung, Kalkulation, Backup</td><td>bis zu 2 Zähler, Zählerstände, Erinnerungen, Backup</td></tr>
          <tr><th scope="row">Pro</th><td>einmalig ${br.pricing.proPrice} · unbegrenzte Projekte, PDF, CSV, Varianten, Budget</td><td>einmalig ${vm.pricing.proPrice} · unbegrenzt Zähler, Auswertungen, Tarife &amp; Kosten</td></tr>
          <tr><th scope="row">Abo</th><td>${ok('kein Abo')}</td><td>${ok('kein Abo')}</td></tr>
          <tr><th scope="row">Mehr</th><td><a class="tlink" href="${br.path}">Zur Produktseite${icon('arrow')}</a></td><td><a class="tlink" href="${vm.path}">Zur Produktseite${icon('arrow')}</a></td></tr>
        </tbody>
      </table>
    </div>
    <p class="table-note">Preise laut Google Play, Stand ${PRICES_AS_OF}. Die Abrechnung erfolgt über Google Play.</p>
  </div>
</section>

<section class="section" aria-labelledby="prinzip">
  <div class="wrap">
    ${sectionHead({
      index: '02',
      label: 'Produktprinzip',
      id: 'prinzip',
      title: 'Nicht möglichst viel. Sondern genau das, was gebraucht wird.',
      lead: 'Jede App bekommt einen klaren Zweck, einen abgegrenzten Funktionsumfang und eine Bedienung, die ohne lange Einarbeitung verständlich bleibt.',
    })}
    <div class="principles principles--3">
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

${ctaBand({
  title: 'Fragen zu einer unserer Apps?',
  text: 'Im Support-Bereich finden Sie Antworten, Datenschutzinformationen und eine direkte Kontaktmöglichkeit.',
  actions: `${btn('/support/', 'Zum Support', { variant: 'primary', size: 'lg' })}${btn('/kontakt/', 'Kontakt', { variant: 'secondary', size: 'lg' })}`,
})}
`,
};
