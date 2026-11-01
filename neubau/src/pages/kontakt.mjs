import { SITE } from '../lib/site.mjs';
import { icon, btn, breadcrumbs, field, eyebrow } from '../lib/ui.mjs';

const crumbs = [['Start', '/'], ['Kontakt', '/kontakt/']];

const topics = [
  ['flow', 'Projektanfragen', 'Sie planen eine App oder ein digitales Produkt.'],
  ['layers', 'Kooperationen', 'Sie möchten gemeinsam etwas entwickeln oder anbieten.'],
  ['message', 'Produktfeedback', 'Sie nutzen eine unserer Apps und haben Ideen oder Hinweise.'],
];

export default [
  {
    path: '/kontakt/',
    title: 'Kontakt',
    description:
      'Kontakt zu MP Digital Labs in Bielefeld: für Projektanfragen, Kooperationen, Produktfeedback und geschäftliche Anliegen – per Formular oder E-Mail.',
    priority: 0.8,
    breadcrumbs: crumbs,
    jsonld: [{ '@type': 'ContactPage', name: 'Kontakt – MP Digital Labs', url: `${SITE.url}/kontakt/` }],
    body: `
<section class="phero" aria-labelledby="page-title" style="padding-bottom:clamp(40px,5vw,64px)">
  <div class="grid-bg"></div>
  <div class="wrap phero__inner">
    ${breadcrumbs(crumbs)}
    <p class="eyebrow"><span>Kontakt</span></p>
    <h1 id="page-title" class="phero__title">Lassen Sie uns sprechen.</h1>
    <p class="lead">Für Projektanfragen, Kooperationen, Produktfeedback oder geschäftliche Anliegen können Sie uns direkt über das Formular schreiben.</p>
  </div>
</section>

<section class="section section--line" style="padding-top:clamp(48px,6vw,80px)" aria-label="Kontaktmöglichkeiten">
  <div class="wrap contact-grid">
    <div>
      ${eyebrow('', 'Direkt erreichen')}
      <div class="contact-list">
        <a class="contact-item" href="mailto:${SITE.email}">${icon('mail')}<div><span>E-Mail</span><strong>${SITE.email}</strong></div></a>
        <div class="contact-item">${icon('pin')}<div><span>Standort</span><strong>${SITE.address.city}, ${SITE.address.country}</strong></div></div>
        <a class="contact-item" href="/support/">${icon('wrench')}<div><span>Hilfe zu einer App?</span><strong>Zum Support-Bereich</strong></div></a>
      </div>
      <ul class="topic-list">
        ${topics.map(([ic, t, d]) => `<li>${icon(ic)}<div><strong>${t}</strong><span>${d}</span></div></li>`).join('')}
      </ul>
    </div>
    <div class="formcard">
      <h2 class="h3" style="margin-bottom:8px">Nachricht senden</h2>
      <p class="muted" style="margin-bottom:28px;font-size:0.95rem">Die Nachricht wird direkt über diese Website übermittelt. Es öffnet sich kein E-Mail-Programm.</p>
      <form class="form" data-form data-next="/kontakt/danke/" action="${SITE.formEndpoint}" method="POST" accept-charset="UTF-8">
        <input type="hidden" name="_subject" value="Neue Website-Anfrage – MP Digital Labs">
        <input type="hidden" name="_template" value="table">
        <input type="hidden" name="_captcha" value="false">
        <input type="hidden" name="_next" value="">
        <input type="hidden" name="_url" value="">
        <input class="hp" type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true">
        ${field({ name: 'name', label: 'Name', autocomplete: 'name', maxlength: 100, placeholder: 'Ihr Name' })}
        ${field({ name: 'email', label: 'E-Mail', type: 'email', autocomplete: 'email', maxlength: 180, placeholder: 'ihre@email.de' })}
        ${field({ name: 'thema', label: 'Thema', type: 'select', options: ['Projektanfrage', 'Kooperation', 'Produktfeedback', 'ScootKompass – Updates', 'Sonstiges'], full: true })}
        ${field({ name: 'subject', label: 'Betreff', maxlength: 180, placeholder: 'Worum geht es?', full: true })}
        ${field({ name: 'message', label: 'Nachricht', type: 'textarea', maxlength: 5000, rows: 6, placeholder: 'Ihre Nachricht an MP Digital Labs', full: true })}
        <p class="form__status" role="status" aria-live="polite"></p>
        <div class="form__foot">
          <p class="form__legal">Mit dem Absenden werden Ihre Angaben über den Dienst FormSubmit an MP Digital Labs übermittelt. Details finden Sie in der <a href="/datenschutz.html">Datenschutzerklärung</a>. Alternativ erreichen Sie uns direkt per E-Mail.</p>
          <button class="btn btn--primary btn--lg" type="submit"><span>Nachricht senden</span>${icon('arrow')}</button>
        </div>
      </form>
    </div>
  </div>
</section>
`,
  },
  {
    path: '/kontakt/danke/',
    title: 'Vielen Dank',
    description: 'Ihre Nachricht an MP Digital Labs wurde übermittelt.',
    noindex: true,
    body: `
<section class="phero err" aria-labelledby="page-title">
  <div class="grid-bg"></div>
  <div class="wrap phero__inner">
    <span class="err__code">${icon('check')} Nachricht übermittelt</span>
    <h1 id="page-title" class="phero__title">Vielen Dank für Ihre Nachricht.</h1>
    <p class="lead">Wir haben Ihre Anfrage erhalten und melden uns per E-Mail bei Ihnen.</p>
    <div class="actions">${btn('/', 'Zur Startseite', { variant: 'primary', size: 'lg' })}${btn('/apps/', 'Apps ansehen', { variant: 'secondary', size: 'lg' })}</div>
  </div>
</section>
`,
  },
];
