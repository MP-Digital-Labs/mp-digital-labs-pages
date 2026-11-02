// Wiederverwendbare UI-Bausteine. Alle Funktionen liefern HTML-Strings.

import { APPS } from './site.mjs';

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const ICONS = {
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  external: '<path d="M7 17 17 7M8 7h9v9"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  offline: '<path d="M3 3l18 18"/><path d="M8.5 6.4A6 6 0 0 1 17.6 10 4 4 0 0 1 20 17.2M17 18H7a5 5 0 0 1-1.6-9.7"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/>',
  tag: '<path d="M3 12V4.5A1.5 1.5 0 0 1 4.5 3H12l9 9-9 9-9-9z"/><circle cx="8" cy="8" r="1.6"/>',
  shield: '<path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.3 7.5 9.5 4.4-1.2 7.5-4.9 7.5-9.5V6z"/><path d="m8.8 12 2.3 2.3 4.2-4.6"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".9" fill="currentColor"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  phone: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10.5 18.5h3"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  wrench: '<path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.5-7.5a4 4 0 0 0-2-2z"/>',
  flow: '<rect x="3" y="4" width="6" height="6" rx="1.5"/><rect x="15" y="14" width="6" height="6" rx="1.5"/><path d="M9 7h4a2 2 0 0 1 2 2v5"/>',
  bolt: '<path d="M13 2.5 4.5 13.5H12L11 21.5l8.5-11H12z"/>',
  flame: '<path d="M12 21.5c-3.6 0-6-2.3-6-5.6 0-3.4 3.2-5.5 4.2-9.4 1.6 1.4 2.4 3 2.4 4.6 1-.6 1.7-1.7 1.9-3 2 2 3.5 4.6 3.5 7.6 0 3.4-2.4 5.8-6 5.8z"/>',
  drop: '<path d="M12 3c-3.3 4.5-6 7.8-6 11a6 6 0 0 0 12 0c0-3.2-2.7-6.5-6-11z"/>',
  heat: '<path d="M8 4c-1.5 2 1.5 4 0 6s1.5 4 0 6M12 4c-1.5 2 1.5 4 0 6s1.5 4 0 6M16 4c-1.5 2 1.5 4 0 6s1.5 4 0 6"/><path d="M5 20h14"/>',
  ruler: '<rect x="2.5" y="8" width="19" height="8" rx="1.5"/><path d="M6.5 8v3M10 8v4M13.5 8v3M17 8v4"/>',
  calc: '<rect x="5" y="2.5" width="14" height="19" rx="2.5"/><path d="M8.5 6.5h7M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 14.5h.01M12 14.5h.01M15.5 14.5v3.5M8.5 18h.01M12 18h.01"/>',
  box: '<path d="m12 2.8 8.5 4.6v9.2L12 21.2 3.5 16.6V7.4z"/><path d="m3.8 7.6 8.2 4.5 8.2-4.5M12 12.1v9"/>',
  euro: '<path d="M17.5 6.5A6.5 6.5 0 1 0 17.5 17.5M4 10.5h9M4 13.5h9"/>',
  doc: '<path d="M14 2.5H6.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8z"/><path d="M14 2.5V8h5.5M8.5 13h7M8.5 17h5"/>',
  folder: '<path d="M3 6.5a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  gauge: '<path d="M4.2 17.5a9 9 0 1 1 15.6 0"/><path d="m12 13 4-4.5"/><circle cx="12" cy="13.5" r="1.4"/>',
  chart: '<path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  bell: '<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  backup: '<path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v4.5h4.5"/><path d="M12 8v4l2.8 1.8"/>',
  play: '<path d="M6.5 4.2v15.6a.8.8 0 0 0 1.2.7l13-7.8a.8.8 0 0 0 0-1.4l-13-7.8a.8.8 0 0 0-1.2.7z"/>',
  sparkle: '<path d="M12 3.5 13.8 10 20.5 12l-6.7 2L12 20.5 10.2 14 3.5 12l6.7-2z"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.4-4.4"/>',
  message: '<path d="M4 5.5h16v11H9l-5 4z"/>',
  code: '<path d="m8.5 7-5 5 5 5M15.5 7l5 5-5 5"/>',
  copy: '<rect x="8.5" y="8.5" width="12" height="12" rx="2.5"/><path d="M15.5 8.5V6a2.5 2.5 0 0 0-2.5-2.5H6A2.5 2.5 0 0 0 3.5 6v7A2.5 2.5 0 0 0 6 15.5h2.5"/>',
};

export function icon(name, cls = '') {
  return `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[name] || ''}</svg>`;
}

// Offizielles MP-Digital-Labs-Logo (Kreisform). „mark“ ist die aus dem Original
// abgeleitete Kompaktversion für kleine Größen (Ring + Monogramm, ohne Schriftzeilen).
const LOGO = '/assets/img/brand/';

export function logo(size = 160, cls = '', { lazy = true } = {}) {
  const src = size > 160 ? 'mpdl-logo-640.webp' : 'mpdl-logo-320.webp';
  return `<img class="logo ${cls}" src="${LOGO}${src}" srcset="${LOGO}mpdl-logo-320.webp 320w, ${LOGO}mpdl-logo-640.webp 640w" sizes="${size}px" width="${size}" height="${size}" alt="MP Digital Labs – Ideas drive progress"${lazy ? ' loading="lazy"' : ''} decoding="async">`;
}

export function mark(size = 40, cls = '', alt = '') {
  return `<img class="mark ${cls}" src="${LOGO}${size > 48 ? 'mpdl-mark-160.webp' : 'mpdl-mark-96.webp'}" srcset="${LOGO}mpdl-mark-96.webp 96w, ${LOGO}mpdl-mark-160.webp 160w" sizes="${size}px" width="${size}" height="${size}" alt="${alt}" decoding="async">`;
}

export function brand() {
  return `<a class="brand" href="/" aria-label="MP Digital Labs – zur Startseite">${mark(52, 'brand__mark')}<span class="brand__word"><b>MP</b> Digital Labs</span></a>`;
}

const isExternal = (href) => /^https?:\/\//.test(href);

export function btn(href, label, { variant = 'primary', size = '', iconName, cls = '' } = {}) {
  const ext = isExternal(href);
  const ic = iconName ?? (ext ? 'external' : 'arrow');
  const attrs = ext ? ' target="_blank" rel="noopener noreferrer"' : '';
  const sr = ext ? '<span class="sr-only"> (öffnet in neuem Tab)</span>' : '';
  return `<a class="btn btn--${variant}${size ? ` btn--${size}` : ''} ${cls}" href="${href}"${attrs}><span>${label}</span>${ic ? icon(ic) : ''}${sr}</a>`;
}

export function link(href, label, cls = 'tlink') {
  const ext = isExternal(href);
  const attrs = ext ? ' target="_blank" rel="noopener noreferrer"' : '';
  return `<a class="${cls}" href="${href}"${attrs}>${label}${icon(ext ? 'external' : 'arrow')}${ext ? '<span class="sr-only"> (öffnet in neuem Tab)</span>' : ''}</a>`;
}

export function playButton(app, { variant = 'primary', size = '' } = {}) {
  return `<a class="btn btn--${variant}${size ? ` btn--${size}` : ''} btn--play" href="${app.play}" target="_blank" rel="noopener noreferrer">${icon('play', 'ico--fill')}<span><small>Jetzt bei</small>Google Play</span><span class="sr-only"> – ${esc(app.name)} (öffnet in neuem Tab)</span></a>`;
}

export function eyebrow(_index, label) {
  return `<p class="eyebrow">${label}</p>`;
}

export function proTag() {
  return '<span class="pro-tag">Pro</span>';
}

export function sectionHead({ index, label, title, lead, cls = '', id }) {
  return `<header class="shead ${cls}">
    <div class="shead__main">${label ? eyebrow(index, label) : ''}<h2${id ? ` id="${id}"` : ''} class="shead__title">${title}</h2></div>
    ${lead ? `<p class="shead__lead">${lead}</p>` : ''}
  </header>`;
}

export function status(s) {
  return s === 'live'
    ? '<span class="status status--live"><span class="status__dot"></span>Veröffentlicht</span>'
    : '<span class="status status--dev"><span class="status__dot"></span>In Entwicklung</span>';
}

export function appIcon(app, size = 56, { lazy = true } = {}) {
  return `<img class="appicon" src="${app.icon}" width="${size}" height="${size}" alt=""${lazy ? ' loading="lazy"' : ''} decoding="async">`;
}

// Original-Screenshot aus dem Google-Play-Eintrag
export function shot(app, i, { sizes = '260px', lazy = true, cls = '' } = {}) {
  const base = `/assets/img/apps/${app.img}-shot-${i + 1}`;
  return `<img class="shot ${cls}" src="${base}-480.webp" srcset="${base}-480.webp 480w, ${base}-941.webp 941w" sizes="${sizes}" width="480" height="853" alt="${esc(app.name)} – ${esc(app.screenshots[i])}"${lazy ? ' loading="lazy"' : ''} decoding="async">`;
}

export function feature(app, { sizes = '(max-width: 700px) 100vw, 560px', lazy = true, cls = '' } = {}) {
  const base = `/assets/img/apps/${app.img}-feature`;
  return `<img class="feature ${cls}" src="${base}-640.webp" srcset="${base}-640.webp 640w, ${base}-1024.webp 1024w" sizes="${sizes}" width="1024" height="500" alt="${esc(app.name)} – Vorstellungsgrafik aus Google Play"${lazy ? ' loading="lazy"' : ''} decoding="async">`;
}

// Screenshot-Galerie mit Vergrößerung (Lightbox in site.js)
export function gallery(app) {
  return `<div class="gallery" data-gallery>
    <ul class="gallery__track" aria-label="Screenshots ${esc(app.name)}" tabindex="0">
      ${app.screenshots
        .map(
          (t, i) => `<li class="gallery__item">
        <button class="gallery__btn" type="button" data-full="/assets/img/apps/${app.img}-shot-${i + 1}-941.webp" data-caption="${esc(t)}" aria-label="Screenshot vergrößern: ${esc(t)}">
          ${shot(app, i, { sizes: '(max-width: 600px) 64vw, 250px' })}
          <span class="gallery__zoom" aria-hidden="true">${icon('search')}</span>
        </button>
        <p class="gallery__cap"><span>${String(i + 1).padStart(2, '0')}</span>${t}</p>
      </li>`
        )
        .join('')}
    </ul>
    <div class="gallery__bar">
      <p class="gallery__src">${icon('play', 'ico--fill')}Originalbilder aus dem Google-Play-Eintrag · ${app.screenshots.length} Screenshots</p>
      <div class="gallery__nav">
        <button class="gallery__arrow" type="button" data-dir="-1" aria-label="Vorherige Screenshots">${icon('arrow', 'ico--flip')}</button>
        <button class="gallery__arrow" type="button" data-dir="1" aria-label="Weitere Screenshots">${icon('arrow')}</button>
      </div>
    </div>
  </div>`;
}

export function facts(list) {
  return `<dl class="facts__dl">${list
    .map(([k, v]) => `<div class="facts__row"><dt>${k}</dt><dd>${v}</dd></div>`)
    .join('')}</dl>`;
}

export function faq(items, cls = '') {
  return `<div class="faq ${cls}">${items
    .map(
      ([q, a]) =>
        `<details class="faq__item"><summary><span>${q}</span>${icon('plus', 'faq__ico')}</summary><div class="faq__body"><p>${a}</p></div></details>`
    )
    .join('')}</div>`;
}

export function checklist(items, cls = '') {
  return `<ul class="checks ${cls}">${items.map((i) => `<li>${icon('check')}<span>${i}</span></li>`).join('')}</ul>`;
}

export function featureGrid(items, cls = 'fgrid--plain') {
  return `<div class="fgrid ${cls}">${items
    .map(
      ([ic, t, d], i) => `<article class="fcard reveal" style="--d:${i % 3}">
        <span class="fcard__ico">${icon(ic)}</span>
        <h3 class="fcard__title">${t}</h3>
        <p>${d}</p>
      </article>`
    )
    .join('')}</div>`;
}

export function steps(items, cls = '') {
  return `<ol class="steps ${cls}">${items
    .map(
      ([t, d], i) => `<li class="step reveal" style="--d:${i % 3}">
        <span class="step__n">${String(i + 1).padStart(2, '0')}</span>
        <h3 class="step__title">${t}</h3>
        <p>${d}</p>
      </li>`
    )
    .join('')}</ol>`;
}

export function breadcrumbs(items) {
  return `<nav class="crumbs" aria-label="Brotkrümelnavigation"><ol>${items
    .map(([label, href], i) =>
      i === items.length - 1
        ? `<li><span aria-current="page">${label}</span></li>`
        : `<li><a href="${href}">${label}</a></li>`
    )
    .join('')}</ol></nav>`;
}

export function ctaBand({ title, text, actions = '', id, cls = '' }) {
  return `<section class="cta ${cls}"${id ? ` id="${id}"` : ''} aria-labelledby="${id || 'cta'}-title">
    <div class="wrap">
      <div class="cta__panel reveal">
        <div class="cta__grid" aria-hidden="true"></div>
        <div class="cta__copy">
          <h2 id="${id || 'cta'}-title" class="cta__title">${title}</h2>
          ${text ? `<p class="cta__text">${text}</p>` : ''}
        </div>
        <div class="cta__actions">${actions}</div>
      </div>
    </div>
  </section>`;
}

// App-Karte mit Original-Vorstellungsgrafik (Übersichten)
export function appCard(app, { headingLevel = 3 } = {}) {
  const h = `h${headingLevel}`;
  return `<article class="acard acard--${app.key} reveal">
    <div class="acard__media">${feature(app, { sizes: '(max-width: 760px) 100vw, 600px' })}</div>
    <div class="acard__body">
      <div class="acard__top">${appIcon(app, 56)}${status(app.status)}</div>
      <p class="acard__cat">${app.category}</p>
      <${h} class="acard__title"><a href="${app.path}">${app.name}</a></${h}>
      <p class="acard__text">${app.summary}</p>
      <p class="acard__price">Kostenlos laden · <strong>Pro einmalig ${app.pricing.proPrice}</strong> · kein Abo</p>
      <div class="acard__links">${link(app.path, 'Mehr erfahren')}${link(app.play, 'Google Play', 'tlink tlink--muted')}</div>
    </div>
  </article>`;
}

export const allApps = () => Object.values(APPS).filter((a) => a.status === 'live');

// Kostenlos & Pro – Inhalte aus APPS[x].pricing (geprüft gegen Google Play und App)
export function plans(app, asOf) {
  return `<div class="compare">
      <article class="plan reveal">
        <p class="plan__label">Kostenlos</p>
        <h3 class="plan__title">${app.name}</h3>
        <p class="plan__price"><b>0 €</b>Kostenlos bei Google Play – ohne Konto</p>
        ${checklist(app.pricing.free)}
      </article>
      <article class="plan plan--pro night reveal" style="--d:1">
        <p class="plan__label">Einmaliger Kauf · kein Abo</p>
        <h3 class="plan__title">${app.short} Pro</h3>
        <p class="plan__price"><b>${app.pricing.proPrice}</b>einmalig als In-App-Kauf über Google Play</p>
        ${checklist(app.pricing.pro)}
        <p class="plan__note">Preis laut Google Play, Stand ${asOf}. Die Abrechnung erfolgt über Google Play.</p>
      </article>
    </div>`;
}

// Zahleneingabe mit optionalem Schieberegler (Mini-Demos)
export function numInput({ name, label, min, max, step, value, unit, range = true, dataUnit = false }) {
  const id = `d-${name}`;
  const u = dataUnit ? `<span data-${dataUnit}>${unit}</span>` : `<span>${unit}</span>`;
  return `<div class="num" data-num>
    <div class="num__top">
      <label for="${id}">${label}</label>
      <span class="num__val"><input id="${id}" name="${name}" type="number" inputmode="decimal" min="${min}" max="${max}" step="${step}" value="${value}">${u}</span>
    </div>
    ${range ? `<input type="range" min="${min}" max="${max}" step="${step}" value="${value}" aria-label="${label} (Schieberegler)">` : ''}
  </div>`;
}

// mailto-Link mit vorbelegtem Betreff und optionaler Textvorlage
export function mailto(email, { subject = '', body = '' } = {}) {
  const q = [subject && `subject=${encodeURIComponent(subject)}`, body && `body=${encodeURIComponent(body)}`].filter(Boolean).join('&');
  return esc(`mailto:${email}${q ? `?${q}` : ''}`);
}

// E-Mail-Karte: Adresse als markierbarer Text, mailto-Button und Kopier-Button.
// Der Kopier-Button erscheint nur mit JavaScript; ohne JS bleibt die Adresse markierbar.
export function mailCard({ email, title, text, subject = '', body = '', id = 'mail', cls = '' }) {
  return `<div class="mailcard ${cls}">
    <h2 class="h3 mailcard__title">${title}</h2>
    ${text ? `<p class="mailcard__text">${text}</p>` : ''}
    <div class="mailcard__addr">
      ${icon('mail')}
      <span class="mailcard__value" id="${id}-addr">${email.split('@').map((part, i) => `<span class="nowrap">${i ? '@' : ''}${part}</span>`).join('<wbr>')}</span>
    </div>
    <div class="mailcard__actions">
      <a class="btn btn--primary btn--lg" href="${mailto(email, { subject, body })}"><span>E-Mail schreiben</span>${icon('arrow')}</a>
      <button class="btn btn--secondary btn--lg" type="button" data-copy="${email}" data-copy-target="${id}-addr" aria-describedby="${id}-status"><span>Adresse kopieren</span>${icon('copy')}</button>
    </div>
    <p class="mailcard__status" id="${id}-status" role="status" aria-live="polite"></p>
    <p class="mailcard__hint">Kein E-Mail-Programm eingerichtet? Kopieren Sie die Adresse und schreiben Sie uns aus Ihrem Webmail-Postfach.</p>
    <p class="mailcard__legal">Wie wir mit Ihrer E-Mail umgehen, steht in der <a href="/datenschutz.html#kontakt">Datenschutzerklärung</a>.</p>
  </div>`;
}
