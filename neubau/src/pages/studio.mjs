import { SITE } from '../lib/site.mjs';
import { btn, sectionHead, breadcrumbs, facts, ctaBand, logo, mark, eyebrow } from '../lib/ui.mjs';

const crumbs = [['Start', '/'], ['Studio', '/studio/']];

const values = [
  ['Zweck vor Umfang', 'Jede App bekommt einen klaren Zweck und einen bewusst abgegrenzten Funktionsumfang. Was nicht gebraucht wird, wird nicht gebaut.'],
  ['Privacy by Design', 'Datenschutz ist von Anfang an mitgedacht: lokale Speicherung, kein Konto, kein Tracking – wo immer es dem Produkt dient.'],
  ['Ehrliche Produkte', 'Kostenschätzungen werden als Schätzungen ausgewiesen, kostenlose Funktionen nicht künstlich beschnitten, Pro gibt es ohne Abo.'],
  ['Langfristig wartbar', 'Schlanke Produkte sind stabiler und lassen sich zuverlässig weiterentwickeln. Qualität entsteht durch Verzicht auf Unnötiges.'],
];

export default {
  path: '/studio/',
  title: 'Studio',
  description:
    'MP Digital Labs ist ein unabhängiges Softwarestudio von Manuel Petersson mit Sitz in Bielefeld – mit Fokus auf digitale Produkte mit klar definiertem Nutzen.',
  priority: 0.7,
  breadcrumbs: crumbs,
  body: `
<section class="phero night" aria-labelledby="page-title">
  <div class="aura" aria-hidden="true"></div>
  <div class="wrap phero__inner">
    ${breadcrumbs(crumbs)}
    <p class="eyebrow"><span>Über uns</span></p>
    <h1 id="page-title" class="phero__title">Ein unabhängiges Softwarestudio mit Produktfokus.</h1>
    <p class="lead">Technologie ist dann gut, wenn sie sich selbstverständlich anfühlt. Deshalb entstehen bei MP Digital Labs Produkte mit klarer Struktur, sauberer Nutzerführung und einem konkreten Zweck.</p>
  </div>
</section>

<section class="section section--line" aria-labelledby="wer">
  <div class="wrap split">
    <div class="reveal">
      ${eyebrow('01', 'Wer wir sind')}
      <h2 id="wer" class="h2" style="margin-bottom:28px">Inhabergeführt.<br>Aus Bielefeld.</h2>
      <div class="body-copy">
        <p>MP Digital Labs ist ein unabhängiges Softwareunternehmen von <strong>${SITE.owner}</strong> mit Sitz in Bielefeld. Das Unternehmen konzipiert, entwickelt und vertreibt ausschließlich eigene Softwareprodukte mit klar definiertem Anwendungsnutzen.</p>
        <p>Neue Funktionen entstehen nicht als Selbstzweck. Sie werden priorisiert, getestet und an realistischen Nutzungsszenarien ausgerichtet – mit dem Ziel, verständliche, zuverlässige und langfristig nutzbare Produkte zu schaffen.</p>
        <p>Die eigenen Apps sind dabei Produkt und Werkstatt zugleich: Was sich im Alltag von Handwerk und Haushalt bewährt, prägt auch jedes weitere Produkt.</p>
      </div>
    </div>
    <aside class="profile reveal" style="--d:1" aria-label="Unternehmensprofil">
      <div class="profile__head">${mark(52)}<div><strong>${SITE.name}</strong><span>Software · Apps · Digitale Produkte</span></div></div>
      ${facts([
        ['Inhaber', SITE.owner],
        ['Sitz', `${SITE.address.city}, ${SITE.address.country}`],
        ['Unternehmensform', 'Einzelunternehmen'],
        ['Geschäftsmodell', 'Eigene Softwareprodukte'],
        ['Apps', 'BauRechner DE · VerbrauchsMonitor DE'],
        ['Vertrieb', 'Google Play'],
      ])}
    </aside>
  </div>
</section>

<section class="section section--alt" aria-labelledby="werte">
  <div class="wrap">
    ${sectionHead({
      index: '02',
      label: 'Haltung',
      id: 'werte',
      title: 'Wofür wir stehen.',
      lead: 'Digitale Produkte sollen Probleme lösen – nicht neue schaffen. Diese vier Grundsätze leiten jede Entscheidung.',
    })}
    <div class="values">
      ${values
        .map(
          ([t, d], i) => `<article class="value reveal" style="--d:${i % 2}">
        <span class="value__n">${String(i + 1).padStart(2, '0')}</span>
        <h3>${t}</h3>
        <p>${d}</p>
      </article>`
        )
        .join('')}
    </div>
  </div>
</section>

<section class="section" aria-label="Leitsatz">
  <div class="wrap motto-grid">
    <div>
      <p class="motto reveal">Ideas <span>drive</span><br>progress.</p>
      <p class="lead reveal" style="margin-top:28px">Gute Produkte entstehen dort, wo klare Ideen, konsequente Entwicklung und echter Nutzwert zusammenkommen.</p>
    </div>
    <div class="motto-grid__logo reveal" style="--d:1">${logo(340, 'logo--xl')}</div>
  </div>
</section>

${ctaBand({
  title: 'Lernen wir uns kennen.',
  text: 'Ob Frage, Idee oder Feedback zu unseren Apps – wir freuen uns über Ihre Nachricht.',
  actions: `${btn('/kontakt/', 'Kontakt aufnehmen', { variant: 'primary', size: 'lg' })}${btn('/arbeitsweise/', 'Unsere Arbeitsweise', { variant: 'secondary', size: 'lg' })}`,
})}
`,
};
