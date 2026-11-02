import { SITE, APPS } from '../lib/site.mjs';
import { icon, btn, sectionHead, breadcrumbs, ctaBand, logo, eyebrow, appIcon } from '../lib/ui.mjs';

const crumbs = [['Start', '/'], ['Studio', '/studio/']];

const values = [
  ['Zweck vor Umfang', 'Jede App bekommt einen klaren Zweck und einen bewusst abgegrenzten Funktionsumfang. Was nicht gebraucht wird, wird nicht gebaut.'],
  ['Privacy by Design', 'Datenschutz ist von Anfang an mitgedacht: lokale Speicherung, kein Konto, kein eigenes Tracking.'],
  ['Ehrliche Produkte', 'Kostenschätzungen werden als Schätzungen ausgewiesen, die kostenlose Version bleibt nutzbar, Pro gibt es ohne Abo.'],
  ['Langfristig wartbar', 'Schlanke Produkte sind stabiler und lassen sich zuverlässig weiterentwickeln. Qualität entsteht durch Verzicht auf Unnötiges.'],
];

const keyfacts = [
  ['user', `Inhabergeführt von ${SITE.owner}`],
  ['pin', `Sitz in ${SITE.address.city}`],
  ['layers', 'Ausschließlich eigene Softwareprodukte'],
  ['play', 'Vertrieb über Google Play'],
  ['doc', 'Einzelunternehmen'],
];

export default {
  path: '/studio/',
  title: 'Studio',
  description:
    'MP Digital Labs ist das inhabergeführte Softwarestudio von Manuel Petersson in Bielefeld. Wir entwickeln und vertreiben eigene Apps mit klar definiertem Nutzen.',
  priority: 0.7,
  breadcrumbs: crumbs,
  body: `
<section class="phero" aria-labelledby="page-title">
  <div class="wrap phero__inner">
    ${breadcrumbs(crumbs)}
    <div class="phero__split">
      <div>
        <p class="eyebrow">Studio</p>
        <h1 id="page-title" class="phero__title">Software mit klarem Zweck – entwickelt in Bielefeld.</h1>
        <p class="lead">MP Digital Labs ist das inhabergeführte Softwarestudio von ${SITE.owner}. Wir entwickeln und vertreiben ausschließlich eigene Apps – mit dem Anspruch, dass sie im Alltag verständlich, zuverlässig und dauerhaft nutzbar sind.</p>
      </div>
      <div class="brandstage"><div class="rings" aria-hidden="true"></div>${logo(300, 'logo--xl', { lazy: false })}</div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="produkte">
  <div class="wrap">
    ${sectionHead({
      label: 'Was wir entwickeln',
      id: 'produkte',
      title: 'Werkzeuge für Handwerk und Haushalt.',
      lead: 'Unsere Apps sind Produkt und Werkstatt zugleich: Was sich im Alltag bewährt, prägt jede weitere Entscheidung.',
    })}
    <div class="appline">
      ${[APPS.baurechner, APPS.verbrauchsmonitor]
        .map(
          (a, i) => `<article class="appline__item reveal" style="--d:${i}">
        ${appIcon(a, 60)}
        <div><p class="tile__cat" style="color:var(--${a.key === 'baurechner' ? 'br' : 'vm'})">${a.category}</p><h3><a href="${a.path}">${a.name}</a></h3><p>${a.tagline}</p></div>
        ${icon('arrow')}
      </article>`
        )
        .join('')}
    </div>
  </div>
</section>

<section class="section section--alt" aria-labelledby="werte">
  <div class="wrap lay-aside">
    ${sectionHead({
      label: 'Haltung',
      id: 'werte',
      title: 'Wofür wir stehen.',
      lead: 'Digitale Produkte sollen Probleme lösen – nicht neue schaffen. Diese vier Grundsätze leiten jede Entscheidung.',
      cls: 'shead--stack lay-aside__head',
    })}
    <ol class="vlist">
      ${values
        .map(
          ([t, d], i) => `<li class="reveal"><span>${String(i + 1).padStart(2, '0')}</span><div><h3>${t}</h3><p>${d}</p></div></li>`
        )
        .join('')}
    </ol>
  </div>
</section>

<section class="section night" aria-labelledby="leitsatz">
  <div class="aura" aria-hidden="true"></div>
  <div class="wrap split split--center">
    <div class="reveal">
      ${eyebrow('', 'Unser Anspruch')}
      <h2 id="leitsatz" class="motto">Ideas drive<br><span class="shine">progress.</span></h2>
    </div>
    <div class="reveal" style="--d:1">
      <p class="lead">Gute Produkte entstehen dort, wo klare Ideen, konsequente Entwicklung und echter Nutzwert zusammenkommen. Deshalb bleiben wir bewusst bei dem, was wir selbst verantworten können: unseren eigenen Apps.</p>
      <ul class="facts-inline" aria-label="Eckdaten">${keyfacts.map(([ic, t]) => `<li>${icon(ic)}${t}</li>`).join('')}</ul>
    </div>
  </div>
</section>

${ctaBand({
  title: 'Lernen wir uns kennen.',
  text: 'Ob Frage, Idee oder Feedback zu unseren Apps – wir freuen uns über Ihre Nachricht.',
  actions: `${btn('/kontakt/', 'Kontakt aufnehmen', { variant: 'primary', size: 'lg' })}${btn('/arbeitsweise/', 'Unsere Arbeitsweise', { variant: 'secondary', size: 'lg' })}`,
})}
`,
};
