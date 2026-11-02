// Rechtliche Seiten. Die Texte liegen unverändert unter src/legal/ und
// werden nur in das neue Layout eingebettet. URLs bleiben exakt erhalten.

import { breadcrumbs } from '../lib/ui.mjs';

const DOCS = [
  { key: 'impressum', path: '/impressum/', title: 'Impressum', h1: 'Impressum', nav: 'Impressum', noindex: false,
    description: 'Impressum von MP Digital Labs – Manuel Petersson, Bielefeld.' },
  { key: 'datenschutz', path: '/datenschutz.html', title: 'Datenschutz', h1: 'Datenschutzerklärung', nav: 'Datenschutz Website', noindex: false,
    description: 'Datenschutzhinweise für die Website von MP Digital Labs.' },
  { key: 'datenschutz-baurechner', path: '/datenschutz-baurechner.html', title: 'Datenschutzerklärung – BauRechner DE', h1: 'Datenschutzerklärung<br><span class="muted">BauRechner DE</span>', nav: 'Datenschutz BauRechner DE', noindex: true,
    description: 'Datenschutzerklärung für die Android-App BauRechner DE von MP Digital Labs.' },
  { key: 'datenschutz-verbrauchsmonitor', path: '/datenschutz-verbrauchsmonitor.html', title: 'Datenschutzerklärung – VerbrauchsMonitor DE', h1: 'Datenschutzerklärung<br><span class="muted">VerbrauchsMonitor DE</span>', nav: 'Datenschutz VerbrauchsMonitor DE', noindex: true,
    description: 'Datenschutzerklärung für die Android-App VerbrauchsMonitor DE von MP Digital Labs.' },
];

export default DOCS.map((doc) => {
  const crumbs = [['Start', '/'], [doc.nav, doc.path]];
  return {
    path: doc.path,
    title: doc.title,
    description: doc.description,
    noindex: doc.noindex,
    priority: 0.3,
    breadcrumbs: crumbs,
    body: async (ctx) => {
      const raw = await ctx.legal(doc.key);
      const stand = (raw.match(/Stand: ([^-]+?) -->/) || [])[1]?.trim() ?? '';
      const html = raw.replace(/^<!--.*?-->\s*/s, '');
      return `
<section class="phero night phero--compact" aria-labelledby="page-title">
  <div class="wrap phero__inner">
    ${breadcrumbs(crumbs)}
    <p class="eyebrow">Rechtliches</p>
    <h1 id="page-title" class="phero__title" style="max-width:16em">${doc.h1}</h1>
  </div>
</section>
<section class="section section--alt" style="padding-top:clamp(2.5rem,4vw,4rem)">
  <div class="wrap legal">
    <aside class="legal__aside">
      ${stand ? `<p class="legal__stand">Stand: ${stand}</p>` : ''}
      <nav aria-label="Rechtliche Dokumente">
        ${DOCS.map((d) => `<a href="${d.path}"${d.key === doc.key ? ' aria-current="page"' : ''}>${d.nav}</a>`).join('')}
      </nav>
    </aside>
    <article class="prose">
      ${html}
    </article>
  </div>
</section>
`;
    },
  };
});
