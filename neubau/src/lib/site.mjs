// Zentrale Unternehmens- und Produktdaten.
// Alle Inhalte stammen aus dem bisherigen Webauftritt (Impressum, Produktseiten,
// Datenschutzerklärungen, Google-Play-Einträge). Änderungen an Fakten bitte
// ausschließlich hier pflegen. Öffentlich gezeigt werden nur veröffentlichte Apps.

export const SITE = {
  url: 'https://mp-digital-labs.de',
  name: 'MP Digital Labs',
  claim: 'Software mit klarem Zweck.',
  description:
    'Unabhängiges Softwarestudio aus Bielefeld: Wir entwickeln Apps und digitale Produkte mit klarem Nutzen – offline-first, ohne Konto und ohne Abo.',
  locale: 'de_DE',
  year: 2026,
  owner: 'Manuel Petersson',
  legalForm: 'Nicht im Handelsregister eingetragenes gewerbliches Einzelunternehmen',
  address: {
    street: 'Splittenbrede 53',
    zip: '33613',
    city: 'Bielefeld',
    country: 'Deutschland',
    countryCode: 'DE',
  },
  email: 'contact@mp-digital-labs.de',
  // Bestehender, bereits aktivierter FormSubmit-Endpunkt (siehe Datenschutzerklärung Abschnitt 4).
  formEndpoint: 'https://formsubmit.co/mpdigitallabs.contact@gmail.com',
};

export const APPS = {
  baurechner: {
    key: 'baurechner',
    name: 'BauRechner DE',
    short: 'BauRechner',
    path: '/apps/baurechner-de/',
    privacy: '/datenschutz-baurechner.html',
    support: '/support/#baurechner',
    play: 'https://play.google.com/store/apps/details?id=de.mpdigitallabs.baurechner',
    packageId: 'de.mpdigitallabs.baurechner',
    icon: '/assets/img/apps/br-icon-192.webp',
    img: 'br',
    storeName: 'BauRechner DE – Projektplaner',
    // Reihenfolge und Titel wie im Google-Play-Eintrag
    screenshots: [
      'Bauprojekte besser planen',
      'Viele praktische Rechner',
      'Aufmaß einfach erfassen',
      'Projekte übersichtlich verwalten',
      'Kosten & Kalkulation im Blick',
      'Material & Einkauf clever verwalten',
      'Fotos & Dokumentation direkt beim Projekt',
      'Auch offline nutzbar',
    ],
    status: 'live',
    category: 'Bau & Handwerk',
    tagline: 'Vom Aufmaß bis zur Projektdokumentation.',
    summary:
      'Aufmaß, Berechnungen, Material, Einkauf, Kosten und Projektdokumentation in einer kompakten Baustellen-App – für Handwerk, Renovierung und Bauprojekte.',
    facts: [
      ['Status', 'Veröffentlicht'],
      ['Plattform', 'Android'],
      ['Daten', 'lokal auf dem Gerät'],
      ['Konto', 'nicht erforderlich'],
      ['Pro', 'einmaliger In-App-Kauf'],
    ],
  },
  verbrauchsmonitor: {
    key: 'verbrauchsmonitor',
    name: 'VerbrauchsMonitor DE',
    short: 'VerbrauchsMonitor',
    path: '/apps/verbrauchsmonitor-de/',
    privacy: '/datenschutz-verbrauchsmonitor.html',
    support: '/support/#verbrauchsmonitor',
    play: 'https://play.google.com/store/apps/details?id=de.mpdigitallabs.verbrauchsmonitorde',
    packageId: 'de.mpdigitallabs.verbrauchsmonitorde',
    icon: '/assets/img/apps/vm-icon-192.webp',
    img: 'vm',
    storeName: 'VerbrauchsMonitor DE',
    screenshots: [
      'Alles auf einen Blick',
      'Zähler einfach verwalten',
      'Verbrauch besser verstehen',
      'Daten sicher verwalten',
      'Schnell startklar',
    ],
    status: 'live',
    category: 'Haushalt & Verbrauch',
    tagline: 'Verbrauch verstehen, ohne Tabellenchaos.',
    summary:
      'Zählerstände für Strom, Gas, Wasser und Wärme erfassen, Verbrauch nachvollziehen und Kosten übersichtlich im Blick behalten.',
    facts: [
      ['Status', 'Veröffentlicht'],
      ['Plattform', 'Android'],
      ['Erfassung', 'Strom · Gas · Wasser · Wärme'],
      ['Daten', 'lokal auf dem Gerät'],
      ['Konto', 'nicht erforderlich'],
    ],
  },
};

export const NAV = [
  { label: 'Apps', href: '/apps/', menu: true },
  { label: 'Leistungen', href: '/leistungen/' },
  { label: 'Studio', href: '/studio/' },
  { label: 'Support', href: '/support/' },
];
