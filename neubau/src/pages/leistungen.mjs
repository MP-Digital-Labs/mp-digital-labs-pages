import { APPS } from '../lib/site.mjs';
import { icon, btn, sectionHead, breadcrumbs, checklist, steps, ctaBand, appIcon } from '../lib/ui.mjs';

const crumbs = [['Start', '/'], ['Leistungen', '/leistungen/']];

const services = [
  {
    id: 'mobile',
    n: '01',
    ic: 'phone',
    title: 'Mobile Anwendungen',
    text: 'Konzeption und Entwicklung moderner Apps mit klaren Abläufen, konsistenter Nutzerführung und einer Architektur, die auf den jeweiligen Anwendungsfall zugeschnitten ist – für Android, iOS und weitere Plattformen gedacht.',
    points: ['Nutzerführung, die ohne lange Einarbeitung verständlich bleibt', 'Offline-first, wo es dem Einsatz dient', 'Datensparsame Architektur ohne unnötige Konten', 'Veröffentlichung und Pflege im Store'],
  },
  {
    id: 'produkt',
    n: '02',
    ic: 'flow',
    title: 'Produktentwicklung',
    text: 'Strukturierung digitaler Produktideen, Priorisierung relevanter Funktionen und schrittweise Entwicklung vom ersten Konzept bis zum marktfähigen Produkt.',
    points: ['Produktidee schärfen und Zielgruppe klären', 'Funktionsumfang bewusst abgrenzen', 'Priorisierte, schrittweise Umsetzung', 'Prüfung an realistischen Nutzungsszenarien'],
  },
  {
    id: 'software',
    n: '03',
    ic: 'code',
    title: 'Praxisorientierte Software',
    text: 'Digitale Lösungen für konkrete Einsatzbereiche – funktional, nachvollziehbar und konsequent auf reale Nutzungssituationen ausgerichtet.',
    points: ['Werkzeuge für Handwerk, Alltag und kleine Unternehmen', 'Abläufe statt isolierter Einzelfunktionen', 'Nachvollziehbare Berechnungen und Ergebnisse', 'Schlank und langfristig wartbar'],
  },
];

const process = [
  ['Verstehen', 'Worum geht es wirklich? Wir klären Aufgabe, Nutzungssituation und Rahmenbedingungen.'],
  ['Strukturieren', 'Funktionen werden priorisiert und klar abgegrenzt – was gebraucht wird, nicht was möglich wäre.'],
  ['Entwickeln', 'Umsetzung in überschaubaren Schritten mit sauberer, wartbarer Architektur.'],
  ['Prüfen', 'Jede Funktion wird getestet und an realistischen Nutzungsszenarien ausgerichtet.'],
  ['Weiterentwickeln', 'Nach dem Start geht es weiter: Feedback auswerten, verbessern, stabil halten.'],
];

const promises = [
  ['user', 'Direkter Ansprechpartner', 'Als inhabergeführtes Studio sprechen Sie direkt mit der Person, die Ihr Projekt verantwortet.'],
  ['shield', 'Datenschutz von Anfang an', 'Privacy wird nicht nachträglich ergänzt, sondern ist Teil der ersten Entscheidung.'],
  ['target', 'Ehrliche Einschätzung', 'Wir sagen klar, was sinnvoll ist – und was nicht. Auch wenn das weniger Umfang bedeutet.'],
];

export default {
  path: '/leistungen/',
  title: 'Leistungen',
  description:
    'Mobile Anwendungen, Produktentwicklung und praxisorientierte Software: MP Digital Labs begleitet digitale Produkte von der Idee bis zur Veröffentlichung.',
  priority: 0.8,
  breadcrumbs: crumbs,
  body: `
<section class="phero" aria-labelledby="page-title">
  <div class="grid-bg"></div>
  <div class="wrap phero__inner">
    ${breadcrumbs(crumbs)}
    <p class="eyebrow"><span>Leistungen</span></p>
    <h1 id="page-title" class="phero__title">Von der Idee bis zum digitalen Produkt.</h1>
    <p class="lead">Wir entwickeln nicht nur eigene Apps. Für Projektanfragen und Kooperationen bringen wir dieselbe Haltung ein: klarer Zweck, saubere Umsetzung, nachvollziehbarer Mehrwert.</p>
    <div class="actions">${btn('/kontakt/?thema=Projektanfrage', 'Projekt anfragen', { variant: 'primary', size: 'lg' })}${btn('#ablauf', 'Arbeitsweise ansehen', { variant: 'secondary', size: 'lg', iconName: 'chevron' })}</div>
  </div>
</section>

<section class="section section--line" aria-label="Leistungsbereiche">
  <div class="wrap" style="display:grid;gap:20px">
    ${services
      .map(
        (s, i) => `<article class="show show--svc reveal" id="${s.id}">
      <div class="show__copy">
        <p class="eyebrow"><span class="eyebrow__idx">${s.n}</span><span>Leistung</span></p>
        <h2 class="show__title">${s.title}</h2>
        <p class="show__text">${s.text}</p>
      </div>
      <div class="show__copy">
        <span class="fcard__ico">${icon(s.ic)}</span>
        ${checklist(s.points)}
      </div>
    </article>`
      )
      .join('')}
  </div>
</section>

<section class="section section--alt" aria-labelledby="ablauf">
  <div class="wrap">
    ${sectionHead({
      index: '01',
      label: 'Arbeitsweise',
      id: 'ablauf',
      title: 'Fünf Schritte. Ohne Umwege.',
      lead: 'Neue Funktionen entstehen nicht als Selbstzweck. Sie werden priorisiert, getestet und an realistischen Nutzungsszenarien ausgerichtet.',
    })}
    ${steps(process, 'steps--5')}
  </div>
</section>

<section class="section" aria-labelledby="erwartung">
  <div class="wrap">
    ${sectionHead({
      index: '02',
      label: 'Was Sie erwarten können',
      id: 'erwartung',
      title: 'Klein genug für Nähe. Konsequent in der Qualität.',
    })}
    <div class="principles principles--3">
      ${promises
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

<section class="section section--line" aria-labelledby="referenzen">
  <div class="wrap">
    ${sectionHead({
      index: '03',
      label: 'Referenzen',
      id: 'referenzen',
      title: 'Unsere eigenen Apps zeigen, wie wir arbeiten.',
      lead: 'Beide Produkte wurden von der Idee bis zur Veröffentlichung bei Google Play im Studio konzipiert und entwickelt.',
    })}
    <div class="compare">
      ${[APPS.baurechner, APPS.verbrauchsmonitor]
        .map(
          (a, i) => `<a class="acard acard--${a.key} reveal" style="--d:${i}" href="${a.path}">
        <div class="acard__top">${appIcon(a, 56)}${icon('arrow')}</div>
        <p class="acard__cat">${a.category}</p>
        <h3 class="acard__title">${a.name}</h3>
        <p class="acard__text" style="margin-bottom:0">${a.tagline}</p>
      </a>`
        )
        .join('')}
    </div>
  </div>
</section>

${ctaBand({
  title: 'Sie haben eine Produktidee?',
  text: 'Beschreiben Sie kurz, worum es geht. Wir melden uns mit einer ehrlichen ersten Einschätzung.',
  actions: `${btn('/kontakt/?thema=Projektanfrage', 'Projekt anfragen', { variant: 'primary', size: 'lg' })}`,
})}
`,
};
