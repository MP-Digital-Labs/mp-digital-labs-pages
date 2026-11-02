/* MP Digital Labs – Interaktionen. Kein Tracking, keine Cookies, kein Speicher. */
(() => {
  'use strict';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fineHover = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Header ---------- */
  const hdr = $('[data-hdr]');
  const onScroll = () => hdr && hdr.classList.toggle('is-scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mega-Menü ---------- */
  $$('[data-menu]').forEach((item) => {
    const btn = $('.nav__toggle', item);
    const panel = $('.mega', item);
    let timer;
    const open = () => {
      clearTimeout(timer);
      if (btn.getAttribute('aria-expanded') === 'true') return;
      panel.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      requestAnimationFrame(() => panel.classList.add('is-visible'));
    };
    const close = (delay = 0) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        btn.setAttribute('aria-expanded', 'false');
        panel.classList.remove('is-visible');
        setTimeout(() => { if (btn.getAttribute('aria-expanded') === 'false') panel.hidden = true; }, 200);
      }, delay);
    };
    btn.addEventListener('click', () => (btn.getAttribute('aria-expanded') === 'true' ? close() : open()));
    if (fineHover) {
      item.addEventListener('pointerenter', open);
      item.addEventListener('pointerleave', () => close(160));
    }
    item.addEventListener('focusout', (e) => { if (!item.contains(e.relatedTarget)) close(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { close(); btn.focus(); }
    });
    document.addEventListener('click', (e) => { if (!item.contains(e.target)) close(); });
  });

  /* ---------- Mobile Navigation ---------- */
  const burger = $('.burger');
  const mnav = $('#mobile-nav');
  if (burger && mnav) {
    const setOpen = (open) => {
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
      mnav.hidden = !open;
      hdr.classList.toggle('is-open', open);
      document.body.classList.toggle('is-locked', open);
      if (open) {
        mnav.classList.add('is-anim');
        $('a', mnav)?.focus({ preventScroll: true });
      }
    };
    burger.addEventListener('click', () => setOpen(burger.getAttribute('aria-expanded') !== 'true'));
    $$('a', mnav).forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mnav.hidden) { setOpen(false); burger.focus(); }
      // Fokus innerhalb des geöffneten Menüs halten
      if (e.key === 'Tab' && !mnav.hidden) {
        const f = [burger, ...$$('a', mnav)];
        const i = f.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    });
    matchMedia('(min-width: 921px)').addEventListener('change', (e) => e.matches && setOpen(false));
  }

  /* ---------- Einblenden beim Scrollen ---------- */
  const reveals = $$('.reveal');
  if (!reduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- Zahlenformat ---------- */
  const fmt = (n, d = 2) => new Intl.NumberFormat('de-DE', { minimumFractionDigits: d, maximumFractionDigits: d }).format(n);

  /* ---------- Gekoppelte Eingaben (Slider + Zahl) ---------- */
  const bindPair = (root, onChange) => {
    $$('[data-num]', root).forEach((wrap) => {
      const range = $('input[type="range"]', wrap);
      const num = $('input[type="number"]', wrap);
      const paint = () => {
        if (!range) return;
        const p = ((range.value - range.min) / (range.max - range.min)) * 100;
        range.style.setProperty('--p', `${Math.max(0, Math.min(100, p))}%`);
      };
      range?.addEventListener('input', () => { num.value = range.value; paint(); onChange(); });
      num.addEventListener('input', () => {
        if (range && num.value !== '') range.value = num.value;
        paint(); onChange();
      });
      paint();
    });
    $$('input[type="checkbox"], input[type="radio"]', root).forEach((i) => i.addEventListener('change', onChange));
  };
  const val = (root, name) => {
    const el = $(`[name="${name}"]`, root);
    const v = parseFloat(String(el?.value ?? '').replace(',', '.'));
    return Number.isFinite(v) ? v : 0;
  };
  const set = (root, key, text) => { const el = $(`[data-out="${key}"]`, root); if (el) el.textContent = text; };

  /* ---------- Demo: Raum-Aufmaß (BauRechner) ---------- */
  $$('[data-demo="aufmass"]').forEach((root) => {
    const room = $('.room', root);
    const update = () => {
      const l = Math.max(0, val(root, 'laenge'));
      const b = Math.max(0, val(root, 'breite'));
      const h = Math.max(0, val(root, 'hoehe'));
      const waste = $('[name="verschnitt"]', root).checked ? 1.1 : 1;
      const area = l * b;
      const perim = 2 * (l + b);
      set(root, 'flaeche', fmt(area));
      set(root, 'umfang', fmt(perim));
      set(root, 'wand', fmt(perim * h));
      set(root, 'material', fmt(area * waste));
      set(root, 'volumen', fmt(area * h, 1));
      // Grundriss maßstäblich zeichnen
      const maxW = 280, maxH = 150;
      const s = Math.min(maxW / Math.max(l, 0.1), maxH / Math.max(b, 0.1));
      const w = Math.max(24, l * s), hh = Math.max(24, b * s);
      const x = 40 + (maxW - w) / 2, y = 20 + (maxH - hh) / 2;
      room.setAttribute('x', x); room.setAttribute('y', y);
      room.setAttribute('width', w); room.setAttribute('height', hh);
      const top = $('.dl-top', root), left = $('.dl-left', root);
      top.setAttribute('d', `M${x} ${y - 12}H${x + w}M${x} ${y - 17}v10M${x + w} ${y - 17}v10`);
      left.setAttribute('d', `M${x - 12} ${y}V${y + hh}M${x - 17} ${y}h10M${x - 17} ${y + hh}h10`);
      const tl = $('.t-top', root), tlft = $('.t-left', root);
      tl.setAttribute('x', x + w / 2); tl.setAttribute('y', y - 20); tl.textContent = `${fmt(l)} m`;
      tlft.setAttribute('transform', `translate(${x - 22} ${y + hh / 2}) rotate(-90)`); tlft.textContent = `${fmt(b)} m`;
      const ta = $('.t-area', root);
      ta.setAttribute('x', x + w / 2); ta.setAttribute('y', y + hh / 2 + 4); ta.textContent = `${fmt(area)} m²`;
    };
    bindPair(root, update);
    update();
  });

  /* ---------- Demo: Verbrauch & Kostenschätzung (VerbrauchsMonitor) ---------- */
  $$('[data-demo="verbrauch"]').forEach((root) => {
    const PRESETS = {
      strom: { unit: 'kWh', price: 32, priceUnit: 'ct/kWh', div: 100, alt: 18240, neu: 18492, factor: 1 },
      gas: { unit: 'm³', price: 11, priceUnit: 'ct/kWh', div: 100, alt: 5230, neu: 5318, factor: 11.2 * 0.95 },
      wasser: { unit: 'm³', price: 4.5, priceUnit: '€/m³', div: 1, alt: 712, neu: 721, factor: 1 },
    };
    let current = 'strom';
    const apply = (type) => {
      const p = PRESETS[type];
      current = type;
      $('[name="alt"]', root).value = p.alt;
      $('[name="neu"]', root).value = p.neu;
      $('[name="preis"]', root).value = p.price;
      $$('[data-unit]', root).forEach((el) => (el.textContent = p.unit));
      $('[data-price-unit]', root).textContent = p.priceUnit;
      $('[data-gas-note]', root).hidden = type !== 'gas';
    };
    const update = () => {
      const p = PRESETS[current];
      const alt = val(root, 'alt');
      const neu = val(root, 'neu');
      const tage = Math.max(1, val(root, 'tage'));
      const preis = val(root, 'preis') / p.div;
      const warn = $('[data-warn]', root);
      const diff = neu - alt;
      if (diff < 0) {
        warn.hidden = false;
        ['verbrauch', 'tag', 'kosten', 'jahr'].forEach((k) => set(root, k, '–'));
      } else {
        warn.hidden = true;
        const billable = current === 'gas' ? diff * p.factor : diff;
        set(root, 'verbrauch', fmt(diff, current === 'strom' ? 0 : 1));
        set(root, 'tag', fmt(diff / tage, 2));
        set(root, 'kosten', fmt(billable * preis));
        set(root, 'jahr', fmt(billable * preis * (365 / tage), 0));
      }
      // Zählerwerk
      const digits = String(Math.max(0, Math.round(neu))).padStart(6, '0').slice(-6);
      $$('[data-digit]', root).forEach((el, i) => (el.textContent = digits[i]));
    };
    $$('[name="medium"]', root).forEach((r) => r.addEventListener('change', () => { apply(r.value); update(); }));
    bindPair(root, update);
    apply('strom');
    update();
  });

  /* ---------- Formulare (FormSubmit) ---------- */
  const params = new URLSearchParams(location.search);
  $$('form[data-form]').forEach((form) => {
    const next = $('[name="_next"]', form);
    if (next) next.value = new URL(form.dataset.next || '/kontakt/danke/', location.origin).href;
    const url = $('[name="_url"]', form);
    if (url) url.value = location.href.split('?')[0];

    // Vorauswahl über ?thema= bzw. ?app=
    const pre = params.get('thema') || params.get('app');
    if (pre) {
      const sel = $('select', form);
      const opt = sel && [...sel.options].find((o) => o.text.toLowerCase().includes(pre.toLowerCase()));
      if (opt) sel.value = opt.value || opt.text;
    }

    const msg = (field, text) => {
      const err = $(`#${field.id}-err`, form);
      field.setAttribute('aria-invalid', text ? 'true' : 'false');
      if (err) {
        err.textContent = text;
        err.hidden = !text;
        if (text) field.setAttribute('aria-describedby', err.id);
      }
    };
    const check = (field) => {
      const v = field.validity;
      if (v.valid) return msg(field, ''), true;
      if (v.valueMissing) msg(field, 'Bitte füllen Sie dieses Feld aus.');
      else if (v.typeMismatch) msg(field, 'Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      else msg(field, 'Bitte prüfen Sie Ihre Eingabe.');
      return false;
    };
    const fields = $$('input:not([type="hidden"]):not(.hp), select, textarea', form);
    fields.forEach((f) => f.addEventListener('blur', () => f.value && check(f)));
    fields.forEach((f) => f.addEventListener('input', () => f.getAttribute('aria-invalid') === 'true' && check(f)));
    form.setAttribute('novalidate', '');
    form.addEventListener('submit', (e) => {
      const invalid = fields.filter((f) => !check(f));
      const status = $('.form__status', form);
      if (invalid.length) {
        e.preventDefault();
        status.textContent = 'Bitte prüfen Sie die markierten Felder.';
        status.classList.add('is-error');
        invalid[0].focus();
        return;
      }
      status.classList.remove('is-error');
      status.textContent = 'Nachricht wird übermittelt …';
      const btn = $('button[type="submit"]', form);
      btn.disabled = true;
      btn.setAttribute('aria-busy', 'true');
    });
  });
  /* ---------- Screenshot-Galerie & Lightbox ---------- */
  const galleries = $$('[data-gallery]');
  if (galleries.length) {
    let box, img, cap, count, items = [], index = 0, opener = null;
    const ico = (d) => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>`;
    const build = () => {
      box = document.createElement('dialog');
      box.className = 'lightbox';
      box.setAttribute('aria-label', 'Screenshot-Ansicht');
      box.innerHTML = `<div class="lightbox__top"><span data-count></span><button type="button" data-close aria-label="Schließen">${ico('M6 6l12 12M18 6 6 18')}</button></div>
        <div class="lightbox__stage">
          <button class="lightbox__prev" type="button" aria-label="Vorheriger Screenshot">${ico('m15 6-6 6 6 6')}</button>
          <img class="lightbox__img" alt="">
          <button class="lightbox__next" type="button" aria-label="Nächster Screenshot">${ico('m9 6 6 6-6 6')}</button>
        </div>
        <p class="lightbox__cap" aria-live="polite"></p>`;
      document.body.append(box);
      img = $('.lightbox__img', box); cap = $('.lightbox__cap', box); count = $('[data-count]', box);
      $('[data-close]', box).addEventListener('click', () => box.close());
      $('.lightbox__prev', box).addEventListener('click', () => show(index - 1));
      $('.lightbox__next', box).addEventListener('click', () => show(index + 1));
      box.addEventListener('click', (e) => { if (e.target === box || e.target.classList.contains('lightbox__stage')) box.close(); });
      box.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1); }
      });
      box.addEventListener('close', () => { document.body.classList.remove('is-locked'); opener?.focus(); });
      // Wischen auf Touch-Geräten
      let x0 = null;
      box.addEventListener('touchstart', (e) => (x0 = e.touches[0].clientX), { passive: true });
      box.addEventListener('touchend', (e) => {
        if (x0 === null) return;
        const dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
        x0 = null;
      });
    };
    const show = (i) => {
      index = (i + items.length) % items.length;
      const b = items[index];
      const thumb = $('img', b);
      img.src = b.dataset.full;
      img.alt = thumb.alt;
      cap.textContent = b.dataset.caption;
      count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
      const nxt = items[(index + 1) % items.length];
      new Image().src = nxt.dataset.full; // nächstes Bild vorladen
    };
    galleries.forEach((g) => {
      const track = $('.gallery__track', g);
      const btns = $$('.gallery__btn', g);
      btns.forEach((b, i) => b.addEventListener('click', () => {
        if (!box) build();
        items = btns; opener = b;
        show(i);
        box.showModal();
        document.body.classList.add('is-locked');
      }));
      const arrows = $$('.gallery__arrow', g);
      const step = () => (btns[0]?.closest('li').offsetWidth || 250) + 20;
      arrows.forEach((a) => a.addEventListener('click', () => track.scrollBy({ left: step() * Number(a.dataset.dir) * 2, behavior: reduced ? 'auto' : 'smooth' })));
      const sync = () => {
        arrows[0].disabled = track.scrollLeft < 4;
        arrows[1].disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      };
      track.addEventListener('scroll', sync, { passive: true });
      addEventListener('resize', sync);
      sync();
    });
  }
})();
