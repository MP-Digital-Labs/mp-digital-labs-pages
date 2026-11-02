import { SITE, APPS } from '../lib/site.mjs';
import { icon, btn, sectionHead, breadcrumbs, appIcon, faq, field } from '../lib/ui.mjs';

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

const tips = [
  ['phone', 'Welche App?', 'BauRechner DE oder VerbrauchsMonitor DE – und wenn möglich die installierte Version.'],
  ['flow', 'Was ist passiert?', 'Kurze Reihenfolge der Schritte: Was haben Sie gemacht, was erwartet und was ist stattdessen passiert?'],
  ['search', 'Welches Gerät?', 'Android-Version und Gerätemodell helfen bei Darstellungs- oder Systemproblemen.'],
];

export default {
  path: '/support/',
  title: 'Support',
  description: 'Hilfe, häufige Fragen, Datenschutz und direkter Kontakt für BauRechner DE und VerbrauchsMonitor DE von MP Digital Labs.',
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
<section class="phero night phero--overlap" aria-labelledby="page-title">
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
        ${btn(`#anfrage`, 'Frage stellen', { variant: 'primary', size: 'sm', iconName: 'message', cls: 'js-prefill' }).replace('href="#anfrage"', `href="?app=${encodeURIComponent(app.short)}#anfrage"`)}
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
        <a class="contact-item" href="mailto:${SITE.email}">${icon('mail')}<div><span>Support per E-Mail</span><strong>${SITE.email}</strong></div></a>
      </div>
    </div>
    <div class="formcard reveal" style="--d:1">
      <form class="form" data-form data-next="/kontakt/danke/" action="${SITE.formEndpoint}" method="POST" accept-charset="UTF-8">
        <input type="hidden" name="_subject" value="Support-Anfrage – MP Digital Labs">
        <input type="hidden" name="_template" value="table">
        <input type="hidden" name="_captcha" value="false">
        <input type="hidden" name="_next" value="">
        <input type="hidden" name="_url" value="">
        <input class="hp" type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true">
        ${field({ name: 'app', label: 'App', type: 'select', options: ['BauRechner DE', 'VerbrauchsMonitor DE', 'Andere / Allgemein'], full: true })}
        ${field({ name: 'name', label: 'Name', autocomplete: 'name', maxlength: 100 })}
        ${field({ name: 'email', label: 'E-Mail', type: 'email', autocomplete: 'email', maxlength: 180 })}
        ${field({ name: 'version', label: 'App- und Android-Version', required: false, maxlength: 120, placeholder: 'z. B. App 1.0 · Android 15', full: true })}
        ${field({ name: 'subject', label: 'Betreff', maxlength: 180, full: true })}
        ${field({ name: 'message', label: 'Nachricht', type: 'textarea', maxlength: 5000, rows: 6, full: true })}
        <p class="form__status" role="status" aria-live="polite"></p>
        <div class="form__foot">
          <p class="form__legal">Mit dem Absenden werden die eingegebenen Daten über FormSubmit an MP Digital Labs übermittelt. Details stehen in der <a href="/datenschutz.html">Datenschutzerklärung</a>.</p>
          <button class="btn btn--primary btn--lg" type="submit"><span>Anfrage senden</span>${icon('arrow')}</button>
        </div>
      </form>
    </div>
  </div>
</section>
`,
};
