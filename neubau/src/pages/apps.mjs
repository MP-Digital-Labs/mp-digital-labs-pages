import { APPS } from '../lib/site.mjs';
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
    'Alle Apps von MP Digital Labs im Überblick: BauRechner DE und VerbrauchsMonitor DE bei Google Play sowie ScootKompass in Entwicklung.',
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
<section class="phero" aria-labelledby="page-title">
  <div class="grid-bg"></div>
  <div class="wrap phero__inner">
    ${breadcrumbs(crumbs)}
    <p class="eyebrow"><span>Produktportfolio</span></p>
    <h1 id="page-title" class="phero__title">Klare Werkzeuge für konkrete Aufgaben.</h1>
    <p class="lead">Ohne unnötige Komplexität und mit einem Fokus auf verlässliche, verständliche Nutzung. Zwei Apps sind bei Google Play verfügbar, eine weitere ist in Entwicklung.</p>
  </div>
</section>

<section class="section section--line" style="padding-top:clamp(48px,6vw,80px)" aria-label="Alle Apps">
  <div class="wrap">
    <div class="agrid">${allApps().map((a) => appCard(a, { headingLevel: 2 })).join('')}</div>
  </div>
</section>

<section class="section section--alt" aria-labelledby="vergleich">
  <div class="wrap">
    ${sectionHead({
      index: '01',
      label: 'Auf einen Blick',
      id: 'vergleich',
      title: 'Gleiche Haltung, unterschiedliche Aufgaben.',
      lead: 'Beide veröffentlichten Apps folgen denselben Grundsätzen: lokale Daten, kein Konto und ein fairer Einmalkauf für Pro-Funktionen.',
    })}
    <div class="table-wrap reveal">
      <table class="table">
        <caption class="sr-only">Vergleich der veröffentlichten Apps</caption>
        <thead>
          <tr><td></td><th scope="col">${br.name}<small>${br.category}</small></th><th scope="col">${vm.name}<small>${vm.category}</small></th></tr>
        </thead>
        <tbody>
          <tr><th scope="row">Wofür</th><td>Aufmaß, Berechnungen, Material, Kosten und Projektdokumentation</td><td>Zählerstände, Verbrauch und Kostenschätzungen für Strom, Gas, Wasser und Wärme</td></tr>
          <tr><th scope="row">Plattform</th><td>Android · Google Play</td><td>Android · Google Play</td></tr>
          <tr><th scope="row">Datenspeicherung</th><td>${ok('lokal auf dem Gerät')}</td><td>${ok('lokal auf dem Gerät')}</td></tr>
          <tr><th scope="row">Benutzerkonto</th><td>${ok('nicht erforderlich')}</td><td>${ok('nicht erforderlich')}</td></tr>
          <tr><th scope="row">Kostenlose Basis</th><td>alle Rechner, bis zu zwei Projekte</td><td>bis zu zwei Zähler</td></tr>
          <tr><th scope="row">Pro</th><td>einmaliger In-App-Kauf</td><td>einmaliger Kauf – kein Abo</td></tr>
          <tr><th scope="row">Mehr</th><td><a class="tlink" href="${br.path}">Zur Produktseite${icon('arrow')}</a></td><td><a class="tlink" href="${vm.path}">Zur Produktseite${icon('arrow')}</a></td></tr>
        </tbody>
      </table>
    </div>
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
