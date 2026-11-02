// Zentrale Unternehmens- und Produktdaten.
// Alle Inhalte stammen aus dem bisherigen Webauftritt (Impressum, Produktseiten,
// Datenschutzerklärungen, Google-Play-Einträge). Änderungen an Fakten bitte
// ausschließlich hier pflegen. Öffentlich gezeigt werden nur veröffentlichte Apps.

export const SITE = {
  url: 'https://mp-digital-labs.de',
  name: 'MP Digital Labs',
  claim: 'Software mit klarem Zweck.',
  description:
    'MP Digital Labs aus Bielefeld entwickelt und vertreibt eigene Apps mit klarem Zweck – offline nutzbar, ohne Benutzerkonto und mit Einmalkauf statt Abo.',
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
    // Geprüft am 2. November 2026 gegen Google-Play-Eintrag (Version 1.0.0-rc14) und App-Code
    // (BauRechner-DE-RC14-Clean, versionName 1.0.0-rc14: CalculatorCatalog, ProjectProTools, ProScreen)
    pricing: {
      proPrice: '14,99 €',
      free: [
        'einmalig ein Projekt und ein Aufmaß – dauerhaft bearbeitbar',
        'alle 15 Rechner und Werkzeuge',
        'Materialplanung und Kalkulation',
        'Fotos und Notizen zum Projekt',
        'Backup und Wiederherstellung',
      ],
      pro: [
        'unbegrenzte Projekte und Aufmaße',
        'Projekt-PDF erzeugen und teilen',
        'Einkaufslisten teilen und als CSV exportieren',
        'Berechnungsvarianten vergleichen',
        'Budget und Ist-Ausgaben verfolgen',
        'Projekte kopieren und Ergebnisse teilen',
      ],
    },
    facts: [
      ['Plattform', 'Android · Google Play'],
      ['Download', 'kostenlos'],
      ['Pro', 'einmalig 14,99 € · kein Abo'],
      ['Daten', 'lokal auf dem Gerät'],
      ['Konto', 'nicht erforderlich'],
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
      'Zählerstände für Strom, Gas, Wasser und Wärme erfassen und die Verbrauchsentwicklung übersichtlich im Blick behalten.',
    // Geprüft am 2. November 2026 gegen Google-Play-Eintrag (Version 1.0.1) und App-Code.
    // Lokal lag nur der Stand 1.0.0+12 vor (MeterLimitPolicy, AnalysisScreen, AddTariffScreen);
    // Abweichungen in 1.0.1 sind daher nicht ausgeschlossen.
    pricing: {
      proPrice: '9,99 €',
      free: [
        'bis zu 2 Zähler verwalten',
        'Strom, Gas, Wasser und Wärme',
        'Zählerstände schnell erfassen',
        'individuelle Ableseerinnerungen',
        'lokale Backups und Wiederherstellung',
        'offline nutzbar, kein Konto',
      ],
      pro: [
        'unbegrenzt viele Zähler',
        'Monats- und Jahresauswertungen',
        'Jahresvergleich, Trends und Hochrechnungen',
        'Tarife mit Grund- und Arbeitspreis',
        'Kostenanalysen und Kostenschätzungen',
      ],
    },
    facts: [
      ['Plattform', 'Android · Google Play'],
      ['Download', 'kostenlos'],
      ['Pro', 'einmalig 9,99 € · kein Abo'],
      ['Erfassung', 'Strom · Gas · Wasser · Wärme'],
      ['Konto', 'nicht erforderlich'],
    ],
  },
};

// Preisangaben laut Google Play (Abrechnung über Google, Stand siehe PRICES_AS_OF)
export const PRICES_AS_OF = 'November 2026';

export const NAV = [
  { label: 'Apps', href: '/apps/', menu: true },
  { label: 'Arbeitsweise', href: '/arbeitsweise/' },
  { label: 'Studio', href: '/studio/' },
  { label: 'Support', href: '/support/' },
];
