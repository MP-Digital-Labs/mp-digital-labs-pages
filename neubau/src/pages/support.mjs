import { SITE, APPS } from '../lib/site.mjs';
import { icon, btn, sectionHead, breadcrumbs, appIcon, faq, mailto, mailCard } from '../lib/ui.mjs';

const crumbs = [['Start', '/'], ['Support', '/support/']];
const br = APPS.baurechner;
const vm = APPS.verbrauchsmonitor;

const cards = [
  {
    app: br,
    text: 'Fragen zu Projekten, Aufmaß, Berechnungen, Pro-Funktionen, Backup oder Export.',
    faqs: [
      ['Brauche ich ein Benutzerkonto?', 'Nein. Für die Nutzung der Kernfunktionen ist kein Benutzerkonto bei MP Digital Labs erforderlich.'],
      ['Funktioniert die App ohne Internet?', 'Projektarbeit, Berechnungen und lokale Datenspeicherung funktionieren offline. Für Google-Play-Käufe und deren Prüfung kann eine Verbindung erforderlich sein.'],
      ['Wie viele Projekte kann ich kostenlos anlegen?', 'Kostenlos legen Sie einmalig ein Projekt und ein Aufmaß an; beides bleibt dauerhaft bearbeitbar. Weitere Projekte und Aufmaße sind mit BauRechner Pro möglich.'],
    ],
  },
  {
    app: vm,
    text: 'Fragen zu Zählern, Messwerten, Kosten, Erinnerungen, Pro-Funktionen oder Datensicherung.',
    faqs: [
      ['Welche Zähler kann ich verwalten?', 'Strom, Gas, Wasser sowie Wärme beziehungsweise Heizung. In der kostenlosen Basis sind bis zu zwei Zähler möglich.'],
      ['Sind die Kostenwerte eine exakte Abrechnung?', 'Nein. Die Kostenanalyse (Pro) berechnet nachvollziehbare Schätzungen auf Basis Ihrer Eingaben und ersetzt keine Abrechnung des Versorgers.'],
      ['Wie sichere ich meine Daten?', 'Über die lokale Backup-Funktion. Speicherort und Datei wählen Sie selbst über den Dateidialog des Systems.'],
    ],
  },
];

// Vorlage für Support-E-Mails: die drei Angaben aus „Vor dem Schreiben“
const supportMail = (appName = '') => ({
  subject: appName ? `Support: ${appName}` : 'Support-Anfrage – MP Digital Labs',
  // Zeilenumbrüche als CRLF (RFC 6068), damit alle Mailprogramme sie übernehmen
  body: ['App: ' + appName, 'App-Version: ', 'Android-Version und Gerät: ', '', 'Was ist passiert?', ''].join('\r\n'),
});

const tips = [
  ['phone', 'Welche App?', 'BauRechner DE oder VerbrauchsMonitor DE – und wenn möglich die installierte Version.'],
  ['flow', 'Was ist passiert?', 'Kurze Reihenfolge der Schritte: Was haben Sie gemacht, was erwartet und was ist stattdessen passiert?'],
  ['search', 'Welches Gerät?', 'Android-Version und Gerätemodell helfen bei Darstellungs- oder Systemproblemen.'],
];

export default {
  path: '/support/',
  title: 'Support',
  description: 'Hilfe, häufige Fragen, Datenschutz und direkter E-Mail-Kontakt für BauRechner DE und VerbrauchsMonitor DE von MP Digital Labs.',
  priority: 0.7,
  breadcrumbs: crumbs,
  jsonld: [
    {
      '@type': 'FAQPage',
      mainEntity: cards.flatMap((c) =>
        c.faqs.map(([q, a]) => ({ '@type': 'Question', name: `${c.app.name}: ${q}`, acceptedAnswer: { '@type': 'Answer', text: a } }))
      ),
    },
  ],
  body: `
<section class="phero phero--overlap" aria-labelledby="page-title">
  <div class="aura" aria-hidden="true"></div>
  <div class="wrap phero__inner">
    ${breadcrumbs(crumbs)}
    <p class="eyebrow"><span>Hilfe &amp; Kontakt</span></p>
    <h1 id="page-title" class="phero__title">Wobei können wir helfen?</h1>
    <p class="lead">Wählen Sie die passende App. Dort finden Sie die wichtigsten Antworten, Datenschutzinformationen und eine direkte Kontaktmöglichkeit.</p>
  </div>
</section>

<section class="section section--overlap" aria-label="Hilfe nach App">
  <div class="wrap support-cards">
    ${cards
      .map(
        ({ app, text, faqs }) => `<article class="scard scard--${app.key}" id="${app.key}">
      <div class="scard__head">${appIcon(app, 52)}<div><p class="acard__cat" style="margin:0">${app.category}</p><h2 class="scard__title">${app.name}</h2></div></div>
      <p>${text}</p>
      ${faq(faqs)}
      <div class="scard__links">
        ${btn(app.path, 'Produktseite', { variant: 'secondary', size: 'sm' })}
        ${btn(app.privacy, 'Datenschutz', { variant: 'secondary', size: 'sm', iconName: 'shield' })}
        ${btn(app.play, 'Google Play', { variant: 'secondary', size: 'sm' })}
        <a class="btn btn--primary btn--sm" href="${mailto(SITE.email, supportMail(app.name))}"><span>Frage per E-Mail</span>${icon('mail')}</a>
      </div>
    </article>`
      )
      .join('')}
  </div>
</section>

<section class="section section--alt" aria-labelledby="tipps">
  <div class="wrap">
    ${sectionHead({
      index: '01',
      label: 'Vor dem Schreiben',
      id: 'tipps',
      title: 'Drei Angaben helfen meistens sofort.',
      lead: 'Damit nicht erst mehrere Rückfragen nötig sind, sind diese Informationen bei technischen Problemen besonders nützlich.',
    })}
    <div class="principles principles--3">
      ${tips
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

<section class="section" aria-labelledby="anfrage">
  <div class="wrap contact-grid">
    <div class="reveal">
      ${sectionHead({ index: '02', label: 'Direkter Kontakt', id: 'anfrage', title: 'Problem nicht gefunden?', cls: 'shead--stack' })}
      <p class="lead" style="font-size:1.0625rem">Schreiben Sie kurz, um welche App es geht und was genau passiert. Wir antworten per E-Mail.</p>
      <div class="contact-list" style="margin-top:32px">
        ${[br, vm]
          .map((a) => `<a class="contact-item" href="${mailto(SITE.email, supportMail(a.name))}">${appIcon(a, 44)}<div><span>E-Mail mit Vorlage</span><strong>Support ${a.name}</strong></div></a>`)
          .join('')}
      </div>
    </div>
    <div class="reveal" style="--d:1">
      ${mailCard({
        email: SITE.email,
        id: 'support',
        title: 'Support per E-Mail',
        text: 'Der Button öffnet eine E-Mail mit einer kurzen Vorlage für App, Version und Gerät – so sind die wichtigsten Angaben gleich dabei.',
        ...supportMail(),
      })}
    </div>
  </div>
</section>
`,
};
