import { SITE } from '../lib/site.mjs';
import { icon, breadcrumbs, eyebrow, mailto, mailCard } from '../lib/ui.mjs';

const crumbs = [['Start', '/'], ['Kontakt', '/kontakt/']];

// Themen öffnen eine E-Mail mit passendem Betreff
const topics = [
  ['message', 'Produktfeedback & Ideen', 'Sie nutzen eine unserer Apps und haben Vorschläge oder Hinweise.', 'Produktfeedback'],
  ['phone', 'Fragen zu einer App', 'Antworten und Hilfe finden Sie auch direkt im Support-Bereich.', 'Frage zu einer App'],
  ['mail', 'Geschäftliche Anliegen', 'Alle weiteren Themen rund um MP Digital Labs.', 'Geschäftliches Anliegen'],
];

export default {
  path: '/kontakt/',
  title: 'Kontakt',
  description:
    'Kontakt zu MP Digital Labs in Bielefeld: Feedback, Fragen zu unseren Apps und geschäftliche Anliegen – direkt per E-Mail an contact@mp-digital-labs.de.',
  priority: 0.8,
  breadcrumbs: crumbs,
  jsonld: [{ '@type': 'ContactPage', name: 'Kontakt – MP Digital Labs', url: `${SITE.url}/kontakt/` }],
  body: `
<section class="phero phero--compact" aria-labelledby="page-title">
  <div class="aura" aria-hidden="true"></div>
  <div class="wrap phero__inner">
    ${breadcrumbs(crumbs)}
    <p class="eyebrow"><span>Kontakt</span></p>
    <h1 id="page-title" class="phero__title">Schreiben Sie uns.</h1>
    <p class="lead">Feedback, Fragen zu unseren Apps oder geschäftliche Anliegen – schreiben Sie uns direkt per E-Mail. Wir antworten persönlich.</p>
  </div>
</section>

<section class="section" aria-label="Kontaktmöglichkeiten">
  <div class="wrap contact-grid">
    <div>
      ${eyebrow('', 'Worum geht es?')}
      <ul class="topic-list topic-list--links">
        ${topics
          .map(
            ([ic, t, d, subject]) => `<li><a href="${mailto(SITE.email, { subject: `${subject} – MP Digital Labs` })}">${icon(ic)}<div><strong>${t}</strong><span>${d}</span></div></a></li>`
          )
          .join('')}
      </ul>
      <div class="contact-list" style="margin-top:36px">
        <div class="contact-item">${icon('pin')}<div><span>Standort</span><strong>${SITE.address.city}, ${SITE.address.country}</strong></div></div>
        <a class="contact-item" href="/support/">${icon('wrench')}<div><span>Hilfe zu einer App?</span><strong>Zum Support-Bereich</strong></div></a>
      </div>
    </div>
    ${mailCard({
      email: SITE.email,
      id: 'kontakt',
      title: 'E-Mail an MP Digital Labs',
      text: 'Der direkte Weg zu uns – ohne zwischengeschalteten Formulardienst. Die Themen öffnen eine E-Mail mit passendem Betreff.',
      subject: 'Anfrage – MP Digital Labs',
    })}
  </div>
</section>
`,
};
