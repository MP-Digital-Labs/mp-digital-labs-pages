// Seitengerüst: <head>, Header mit Navigation, Footer und strukturierte Daten.

import { SITE, APPS, NAV } from './site.mjs';
import { esc, icon, brand, logo, appIcon } from './ui.mjs';

const abs = (p) => SITE.url + p;

export const orgLd = {
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  url: `${SITE.url}/`,
  logo: `${SITE.url}/assets/img/logo-512.png`,
  email: SITE.email,
  founder: { '@type': 'Person', name: SITE.owner },
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    postalCode: SITE.address.zip,
    addressLocality: SITE.address.city,
    addressCountry: SITE.address.countryCode,
  },
};

function megaMenu() {
  const live = [APPS.baurechner, APPS.verbrauchsmonitor];
  return `<div class="mega" id="menu-apps" hidden>
    <div class="mega__inner">
      <div class="mega__apps">
        ${live
          .map(
            (a) => `<a class="mega__app" href="${a.path}">
              ${appIcon(a, 44)}
              <span><strong>${a.name}</strong><small>${a.tagline}</small></span>
            </a>`
          )
          .join('')}
      </div>
      <div class="mega__aside">
        <p class="mega__label">Produktportfolio</p>
        <p>Werkzeuge für konkrete Aufgaben – offline-first, ohne Benutzerkonto und bei Google Play verfügbar.</p>
        <a class="tlink" href="/apps/">Alle Apps ansehen${icon('arrow')}</a>
      </div>
    </div>
  </div>`;
}

function header(path) {
  const current = (href) => (path === href || (href !== '/' && path.startsWith(href)) ? ' aria-current="page"' : '');
  const items = NAV.map((n) =>
    n.menu
      ? `<li class="nav__item nav__item--menu" data-menu>
          <button class="nav__link nav__toggle" type="button" aria-expanded="false" aria-controls="menu-apps"${path.startsWith('/apps/') ? ' data-active' : ''}>${n.label}${icon('chevron')}</button>
          ${megaMenu()}
        </li>`
      : `<li class="nav__item"><a class="nav__link" href="${n.href}"${current(n.href)}>${n.label}</a></li>`
  ).join('');

  const mobile = `<div class="mnav" id="mobile-nav" hidden>
    <nav class="mnav__inner" aria-label="Mobile Navigation">
      <p class="mnav__label">Apps</p>
      <ul class="mnav__apps">
        <li><a href="${APPS.baurechner.path}">${appIcon(APPS.baurechner, 36)}<span>${APPS.baurechner.name}</span></a></li>
        <li><a href="${APPS.verbrauchsmonitor.path}">${appIcon(APPS.verbrauchsmonitor, 36)}<span>${APPS.verbrauchsmonitor.name}</span></a></li>
        <li><a href="/apps/">${icon('layers')}<span>Alle Apps</span></a></li>
      </ul>
      <p class="mnav__label">Unternehmen</p>
      <ul class="mnav__list">
        <li><a href="/leistungen/"${current('/leistungen/')}>Leistungen</a></li>
        <li><a href="/studio/"${current('/studio/')}>Studio</a></li>
        <li><a href="/support/"${current('/support/')}>Support</a></li>
        <li><a href="/kontakt/"${current('/kontakt/')}>Kontakt</a></li>
      </ul>
      <a class="btn btn--primary btn--block" href="/kontakt/"><span>Projekt anfragen</span>${icon('arrow')}</a>
    </nav>
  </div>`;

  return `<a class="skip" href="#main">Zum Inhalt springen</a>
<header class="hdr" data-hdr>
  <div class="wrap hdr__row">
    ${brand()}
    <nav class="nav" aria-label="Hauptnavigation"><ul class="nav__list">${items}</ul></nav>
    <div class="hdr__actions">
      <a class="btn btn--primary btn--sm hdr__cta" href="/kontakt/"${current('/kontakt/')}><span>Kontakt</span></a>
      <button class="burger" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Menü öffnen"><span></span><span></span></button>
    </div>
  </div>
  ${mobile}
</header>`;
}

function footer() {
  const col = (title, links) =>
    `<div class="ftr__col"><p class="ftr__title">${title}</p><ul>${links
      .map(([l, h]) => `<li><a href="${h}">${l}</a></li>`)
      .join('')}</ul></div>`;
  return `<footer class="ftr">
  <div class="wrap">
    <div class="ftr__top">
      <div class="ftr__brand">
        ${logo(132, 'ftr__logo')}
        <p>Unabhängiges Softwarestudio aus Bielefeld. Wir entwickeln digitale Produkte mit klarem Zweck.</p>
        <a class="ftr__mail" href="mailto:${SITE.email}">${icon('mail')}${SITE.email}</a>
      </div>
      <div class="ftr__cols">
        ${col('Apps', [
          [APPS.baurechner.name, APPS.baurechner.path],
          [APPS.verbrauchsmonitor.name, APPS.verbrauchsmonitor.path],
          ['Alle Apps', '/apps/'],
        ])}
        ${col('Unternehmen', [
          ['Leistungen', '/leistungen/'],
          ['Studio', '/studio/'],
          ['Kontakt', '/kontakt/'],
        ])}
        ${col('Hilfe', [
          ['Support', '/support/'],
          ['Datenschutz BauRechner', APPS.baurechner.privacy],
          ['Datenschutz VerbrauchsMonitor', APPS.verbrauchsmonitor.privacy],
        ])}
        ${col('Rechtliches', [
          ['Impressum', '/impressum/'],
          ['Datenschutz', '/datenschutz.html'],
        ])}
      </div>
    </div>
    <div class="ftr__bottom">
      <p>© ${SITE.year} ${SITE.name} · ${SITE.owner} · ${SITE.address.city}</p>
      <p class="ftr__note">${icon('shield')}Keine Cookies. Kein Tracking. Schriften lokal gehostet.</p>
    </div>
    <p class="ftr__slogan" aria-hidden="true">Ideas drive progress.</p>
  </div>
</footer>`;
}

export function layout({
  path,
  title,
  description,
  body,
  theme = '',
  noindex = false,
  jsonld = [],
  breadcrumbs = null,
  ogType = 'website',
  assetVersion = '',
  bodyClass = '',
  ogImage = null,
}) {
  const fullTitle = path === '/' ? title : `${title} – ${SITE.name}`;
  const canonical = abs(path);
  const graph = [orgLd, ...jsonld];
  if (breadcrumbs) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map(([name, href], i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name,
        item: abs(href),
      })),
    });
  }
  const ld = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  const v = assetVersion ? `?v=${assetVersion}` : '';

  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<script>document.documentElement.classList.add('js')</script>
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow">'}
<link rel="canonical" href="${canonical}">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#f4f3ee" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0b0c0e" media="(prefers-color-scheme: dark)">
<meta property="og:type" content="${ogType}">
<meta property="og:locale" content="${SITE.locale}">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE.url}${ogImage?.src ?? '/assets/img/og-image.png'}">
<meta property="og:image:width" content="${ogImage?.w ?? 1200}">
<meta property="og:image:height" content="${ogImage?.h ?? 630}">
<meta property="og:image:alt" content="${esc(ogImage?.alt ?? 'MP Digital Labs – Software mit klarem Zweck')}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="32x32 48x48">
<link rel="icon" href="/assets/img/icon-192.png" type="image/png" sizes="192x192">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/assets/fonts/Geist-Variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css${v}">
<script src="/assets/js/site.js${v}" defer></script>
<script type="application/ld+json">${ld}</script>
</head>
<body class="${[theme && `theme-${theme}`, bodyClass].filter(Boolean).join(' ')}">
${header(path)}
<main id="main" tabindex="-1">
${body}
</main>
${footer()}
</body>
</html>
`;
}
