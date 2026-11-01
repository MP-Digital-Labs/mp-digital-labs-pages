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
};

export function icon(name, cls = '') {
  return `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[name] || ''}</svg>`;
}

export function logoMark(cls = '') {
  return `<svg class="logo-mark ${cls}" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><rect width="32" height="32" rx="9" class="logo-mark__bg"/><rect x="8" y="8" width="7" height="7" rx="1.8" class="logo-mark__cell"/><rect x="8" y="17" width="7" height="7" rx="1.8" class="logo-mark__cell"/><rect x="17" y="17" width="7" height="7" rx="1.8" class="logo-mark__cell"/><circle cx="20.5" cy="11.5" r="3.6" class="logo-mark__dot"/></svg>`;
}

export function brand() {
  return `<a class="brand" href="/" aria-label="MP Digital Labs – zur Startseite">${logoMark()}<span class="brand__word">MP Digital<span> Labs</span></span></a>`;
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

export function eyebrow(index, label) {
  return `<p class="eyebrow">${index ? `<span class="eyebrow__idx">${index}</span>` : ''}<span>${label}</span></p>`;
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

export function appIcon(app, size = 56) {
  if (!app.icon) {
    return `<span class="appicon appicon--placeholder" style="--s:${size}px" aria-hidden="true">${icon('compass')}</span>`;
  }
  return `<img class="appicon" src="${app.icon}" width="${size}" height="${size}" alt="" loading="lazy" decoding="async">`;
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

export function featureGrid(items, cls = '') {
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

// Kompakte App-Karte (Übersichten, Mega-Menü, Querverweise)
export function appCard(app, { headingLevel = 3 } = {}) {
  const h = `h${headingLevel}`;
  const live = app.status === 'live';
  return `<article class="acard acard--${app.key} reveal">
    <div class="acard__top">${appIcon(app, 56)}${status(app.status)}</div>
    <p class="acard__cat">${app.category}</p>
    <${h} class="acard__title">${live ? `<a href="${app.path}">${app.name}</a>` : app.name}</${h}>
    <p class="acard__text">${app.summary}</p>
    <div class="acard__links">
      ${live ? link(app.path, 'Mehr erfahren') + link(app.play, 'Google Play', 'tlink tlink--muted') : link('/kontakt/?thema=ScootKompass', 'Über Updates informieren')}
    </div>
  </article>`;
}

export const allApps = () => [APPS.baurechner, APPS.verbrauchsmonitor, APPS.scootkompass];

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

// Formularfeld-Helfer
export function field({ name, label, type = 'text', required = true, autocomplete, placeholder, maxlength, rows, options, value, hint, full }) {
  const id = `f-${name}`;
  const req = required ? ' required' : '';
  const ac = autocomplete ? ` autocomplete="${autocomplete}"` : '';
  const ph = placeholder ? ` placeholder="${esc(placeholder)}"` : '';
  const ml = maxlength ? ` maxlength="${maxlength}"` : '';
  let control;
  if (type === 'textarea') {
    control = `<textarea id="${id}" name="${name}" rows="${rows || 6}"${req}${ph}${ml}></textarea>`;
  } else if (type === 'select') {
    control = `<div class="select"><select id="${id}" name="${name}"${req}><option value="">Bitte auswählen</option>${options
      .map((o) => `<option${o === value ? ' selected' : ''}>${o}</option>`)
      .join('')}</select>${icon('chevron')}</div>`;
  } else {
    control = `<input id="${id}" name="${name}" type="${type}"${req}${ac}${ph}${ml}>`;
  }
  return `<div class="field${full ? ' field--full' : ''}">
    <label for="${id}">${label}${required ? '' : ' <span class="field__opt">optional</span>'}</label>
    ${control}
    ${hint ? `<p class="field__hint">${hint}</p>` : ''}
    <p class="field__err" id="${id}-err" hidden></p>
  </div>`;
}
