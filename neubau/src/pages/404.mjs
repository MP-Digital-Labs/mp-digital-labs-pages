import { btn } from '../lib/ui.mjs';

export default {
  path: '/404.html',
  title: 'Seite nicht gefunden',
  description: 'Die angeforderte Seite wurde nicht gefunden.',
  noindex: true,
  body: `
<section class="phero err" aria-labelledby="page-title">
  <div class="grid-bg"></div>
  <div class="wrap phero__inner">
    <span class="err__code">Fehler 404</span>
    <h1 id="page-title" class="phero__title">Diese Seite gibt es hier nicht.</h1>
    <p class="lead">Der Link ist möglicherweise veraltet oder die Adresse wurde falsch eingegeben. Über die Startseite oder die App-Übersicht kommen Sie direkt weiter.</p>
    <div class="actions">${btn('/', 'Zur Startseite', { variant: 'primary', size: 'lg' })}${btn('/apps/', 'Apps ansehen', { variant: 'secondary', size: 'lg' })}</div>
  </div>
</section>
`,
};
