const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

const setNav = (open) => {
  menuToggle?.classList.toggle('open', open);
  mainNav?.classList.toggle('open', open);
  document.body.classList.toggle('nav-open', open);
  menuToggle?.setAttribute('aria-expanded', String(open));
  menuToggle?.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
};

addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', scrollY > 24);
}, { passive: true });

menuToggle?.addEventListener('click', () => {
  setNav(!mainNav.classList.contains('open'));
});

mainNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => setNav(false));
});

addEventListener('resize', () => {
  if (innerWidth > 980) setNav(false);
});

const observer = 'IntersectionObserver' in window
  ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
  : null;

document.querySelectorAll('.reveal').forEach(el => {
  if (observer) observer.observe(el);
  else el.classList.add('in');
});

const openLegal = (name) => {
  const overlay = document.getElementById(`legal-${name}`);
  if (!overlay) return;
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  overlay.querySelector('.legal-close')?.focus();
};

const closeLegal = (overlay) => {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

document.querySelectorAll('[data-legal]').forEach(trigger => {
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    openLegal(trigger.dataset.legal);
  });
});

document.querySelectorAll('.legal-overlay').forEach(overlay => {
  overlay.querySelector('.legal-close')?.addEventListener('click', () => closeLegal(overlay));
  overlay.addEventListener('click', event => {
    if (event.target === overlay) closeLegal(overlay);
  });
});

addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    const openOverlay = document.querySelector('.legal-overlay.open');
    if (openOverlay) closeLegal(openOverlay);
    if (mainNav?.classList.contains('open')) setNav(false);
  }
});

const imprint = document.querySelector('#legal-impressum .legal-sheet');
if (imprint) {
  const headings = [...imprint.querySelectorAll('h3')];
  const vatHeading = headings.find(h => h.textContent.trim() === 'Umsatzsteuer');
  if (vatHeading) {
    vatHeading.textContent = 'Steuerliche Angaben';
    const vatText = vatHeading.nextElementSibling;
    if (vatText?.tagName === 'P') {
      vatText.innerHTML = [
        '<strong>Steuernummer:</strong> 305/5173/4081',
        '<strong>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:</strong> DE465689244',
        '<strong>Wirtschafts-Identifikationsnummer:</strong> DE465689244-00001'
      ].join('<br>');
    }
  }
  const note = imprint.querySelector('.legal-note');
  if (note) note.textContent = 'Stand: 12. Oktober 2026';
}

const form = document.getElementById('contactForm');
const contactNext = document.getElementById('contactNext');
const contactUrl = document.getElementById('contactUrl');
const formStatus = document.getElementById('formStatus');

if (form) {
  if (contactNext) contactNext.value = `${location.origin}${location.pathname}#kontakt`;
  if (contactUrl) contactUrl.value = location.href;

  form.addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      form.reportValidity();
      if (formStatus) formStatus.textContent = 'Bitte füllen Sie die markierten Felder aus.';
      return;
    }
    if (formStatus) formStatus.textContent = 'Nachricht wird gesendet …';
  });
}
