# MP Digital Labs – Gesamtkonzept Website-Neubau

Stand: 2. November 2026 · Branch `feature/website-neubau` · Status: Vorschau, nicht veröffentlicht

## 1. Ausgangslage

| Bereich | Befund |
|---|---|
| Repository | `MP-Digital-Labs/mp-digital-labs-pages`, statische Dateien im Root |
| Hosting | GitHub Pages, Deployment per Workflow bei Push auf `main` |
| Domain | `mp-digital-labs.de` über `CNAME` |
| Bisherige Startseite | eine einzelne `index.html` mit 1,8 MB (eingebettete Bilddaten), dunkles Design, Inhalte teilweise per Workflow-Skript nachträglich gepatcht |
| Unterseiten | `/apps/`, zwei Produktseiten, `/support/`, `/impressum/`, drei Datenschutzerklärungen (`*.html`) |
| Formulare | FormSubmit (`formsubmit.co`), in der Datenschutzerklärung dokumentiert |

Die bisherige Website diente ausschließlich als Quelle für Inhalte, Unternehmensdaten und Produkte.

## 2. Positionierung

**MP Digital Labs ist ein unabhängiges, inhabergeführtes Softwarestudio aus Bielefeld, das ausschließlich eigene Softwareprodukte entwickelt und vertreibt.** Es werden keine Entwicklungs- oder Beratungsdienstleistungen für Dritte angeboten. Die Website enthält deshalb keine Projektanfragen oder Leistungsangebote.

Zielgruppen:

1. **App-Nutzer** (Handwerk, Haushalte): Produktverständnis, Vertrauen, Download, Support, Datenschutz, transparente Preise.
2. **Geschäftliche Kontakte und Presse**: wer hinter den Apps steht, Haltung, Kontakt.
3. **Google Play und Behörden**: stabile, auffindbare Rechtstexte unter den bekannten URLs.

Kernbotschaft: *Software mit klarem Zweck. Gebaut für den Alltag.* Belegt wird sie ausschließlich durch geprüfte Produkteigenschaften: offline nutzbar, kein Konto, kostenloser Einstieg, Pro als Einmalkauf ohne Abo.

Öffentlich gezeigt und verlinkt werden **nur veröffentlichte Apps** (BauRechner DE, VerbrauchsMonitor DE).

## 3. Qualitätsmaßstab

Als Referenz dienten etablierte Software-Marken. Übernommen wurden Prinzipien, keine Gestaltung:

| Referenz | Übernommenes Prinzip |
|---|---|
| Apple, Linear | dunkle, ruhige Bühnen für Produktbilder, leichte große Typografie, viel Weißraum |
| Stripe | Produkte über echte Inhalte erklären, klare Preis- und Funktionsübersichten |
| Things (Cultured Code), Panic | kleines Studio mit Haltung und Produktstolz statt Agentursprache |
| Raycast | Produktseiten: Funktionsraster, Galerie, FAQ, ruhiger Abschluss |

## 4. Gestaltung „Midnight & Silver“

Die Gestaltung leitet sich direkt aus dem offiziellen Kreislogo ab: tiefes Nachtblau, Silber (das „M“) und leuchtendes Blau (das „P“ und der Ring).

- **Rhythmus aus Nacht und Tag**: Header, Seiten-Heros, Studio-Band, Screenshot-Galerien und Footer liegen auf Nachtblau `#060a12`, die Inhaltsbereiche auf Weiß und kühlem Grau `#f4f6fa`. Logo und App-Screenshots wirken auf der dunklen Bühne wie im Store.
- **Markenmotiv Ring**: Konzentrische, feine Ringe mit einem blauen Lichtbogen greifen den Logo-Ring auf, hinter den Screenshots, dem Logo und im Abschluss-Panel. Weiche blaue Leuchtflächen ersetzen harte Effekte.
- **Silberverlauf**: Nur ein Schlüsselsatz pro Seite trägt den Verlauf Silber → Blau, analog zu „M“ und „P“ im Logo.
- **Produktfarben**: BauRechner Orange und VerbrauchsMonitor Blau, beide aus den App-Icons, als Akzent auf den jeweiligen Produktseiten.

### Typografie

| Rolle | Schrift | Schnitte |
|---|---|---|
| Überschriften, Kennzahlen, Wortmarke | **Sora** (geometrisch, verwandt mit dem Logo-Schriftzug) | 200–400; große Überschriften in 300 |
| Fließtext, Bedienelemente | **Inter** | 400–600 |

Beide Schriften sind variabel, lokal gehostet und stehen unter der SIL Open Font License. Bewusst leichte Schnitte und eine maßvolle Laufweite (−0,03 em) sorgen für Eleganz statt Wucht. Die Hierarchie entsteht über Größe und Weißraum, nicht über Fettung.

### Tokens (`src/static/assets/css/site.css`)

| Token | Hell | Dunkel / Nachtbereiche |
|---|---|---|
| Nacht | `#060a12` | – |
| Fläche | `#ffffff` / `#f4f6fa` | `#070c16` / `#0b1322` |
| Text | `#0a1020` / `#414b5f` / `#69738a` | `#f2f5fa` / 74 % / 54 % |
| Markenblau | `#1c6df2` | `#5cb5ff` |
| BauRechner | `#c2410c` / `#f26a21` | `#ff9a5c` |
| VerbrauchsMonitor | `#1060c8` / `#2f8cf0` | `#7cc0ff` |

- **Formen**: Pillen-Buttons, Radien 18 / 28 / 32 px, Haarlinien, Schatten nur für Tiefe bei Produktbildern
- **Raster**: maximal 1200 px, Rand 20–48 px, Sektionsabstand 88–144 px
- **Logo**: ausschließlich das offizielle Kreislogo. Die Vollversion steht im Footer, im Studio-Band, auf der Studio-Seite und im OG-Bild; die Kompaktversion (Original-Ring und -Monogramm) im Header und als Favicon
- **Dark Mode**: automatisch über `prefers-color-scheme`

## 5. Informationsarchitektur

```
/                               Start
├── /apps/                      Produktportfolio (Vorstellungsgrafiken) + Vergleich
│   ├── /apps/baurechner-de/        Produktseite + Screenshot-Galerie + Web-Demo „Raum-Aufmaß“
│   └── /apps/verbrauchsmonitor-de/ Produktseite + Screenshot-Galerie + Web-Demo „Verbrauch & Kosten“
├── /arbeitsweise/              Wie eigene Produkte entstehen: Prozess, Qualitätsstandards, Praxisbeispiele
├── /studio/                    Über das Unternehmen, Haltung, Profil
├── /support/                   Hilfe je App (#baurechner, #verbrauchsmonitor), FAQ, Formular
├── /kontakt/                   Kontaktformular, E-Mail, Themen  →  /kontakt/danke/
├── /impressum/
├── /datenschutz.html
├── /datenschutz-baurechner.html
└── /datenschutz-verbrauchsmonitor.html
```

**Alle bisherigen URLs und Anker bleiben erhalten**, inklusive `/#kontakt` und `/support/#…`. Das prüft der Build bei jedem Lauf automatisch.

Navigation: Header mit Mega-Menü „Apps“, Arbeitsweise, Studio, Support und dem Kontakt-Button. Auf Mobilgeräten ein Vollbild-Menü mit Fokusfalle und Escape-Unterstützung. Der Footer ist in vier Spalten gegliedert (Apps, Unternehmen, Hilfe, Rechtliches).

## 6. Inhaltliche Leitplanken

- Ausschließlich belegte Fakten aus dem bisherigen Auftritt. Keine erfundenen Kunden, Bewertungen, Downloadzahlen oder Gründungsjahre.
- Nicht veröffentlichte Apps (z. B. ScootKompass) werden nicht gezeigt.
- Ansprache durchgehend „Sie“. Die Datenschutzerklärungen der Apps bleiben wortgleich (dort „du“).
- Rechtstexte sind **unverändert übernommen**. Der Wortvergleich mit den Originalen ist identisch.
- Verwendet werden die aktuellen Daten aus der Impressum-Unterseite vom 12. Oktober 2026 mit USt-ID und `contact@mp-digital-labs.de`. Das ältere Overlay der alten Startseite ist veraltet.

## 7. Geprüfte Produktangaben

Alle Aussagen zu kostenlosen Funktionen, Pro und Preisen wurden am 2. November 2026 gegen die Google-Play-Einträge und den App-Code geprüft. Sie werden zentral in `src/lib/site.mjs` gepflegt (`pricing`, `PRICES_AS_OF`).

| | BauRechner DE (1.0.0-rc14) | VerbrauchsMonitor DE (1.0.1) |
|---|---|---|
| Kostenlos | einmalig 1 Projekt + 1 Aufmaß (bleiben bearbeitbar), alle 15 Rechner, Materialplanung, Kalkulation, Fotos, Notizen, Backup | bis zu 2 Zähler, Zählerstände, Erinnerungen, lokale Backups |
| Pro | unbegrenzte Projekte und Aufmaße, Projekt-PDF, Einkaufsliste teilen/CSV, Variantenvergleich, Budget und Ist-Ausgaben, Projektkopien, Ergebnisse teilen | unbegrenzt Zähler, Monats-/Jahresauswertungen, Jahresvergleich, Trends, Hochrechnungen, Tarife, Kostenanalysen |
| Preis Pro | 14,99 € einmalig, kein Abo | 9,99 € einmalig, kein Abo |

Korrigiert gegenüber dem vorherigen Stand: „bis zu zwei Projekte“ (BauRechner), „Kosten/Monats- und Jahresübersichten kostenlos“ und „CSV-Export“ (VerbrauchsMonitor).

## 8. Bildquellen

| Bild | Quelle | Verwendung |
|---|---|---|
| App-Icons (2) | Google-Play-Einträge (`=s0`, Originalauflösung 512 px) | Header-Menü, Karten, Produktseiten, Support |
| Screenshots (BauRechner 8, VerbrauchsMonitor 5) | Google-Play-Einträge, Original 941 × 1672 px | Start (Hero, Showcase), Produktseiten (Hero, Galerie mit Lightbox) |
| Vorstellungsgrafiken (2) | Google-Play-Einträge, 1024 × 500 px | App-Übersicht, OG-Bild der Produktseiten |
| Firmenlogo | vom Auftraggeber bereitgestellt | siehe Abschnitt 4 |

Die heruntergeladenen Store-Dateien stimmen byte-genau mit den lokalen Originalen überein, die bei MP Digital Labs liegen (Marketing- und Play-Store-Ordner). Ausgeliefert wird WebP in 480 px (Galerie) und 941 px (Originalbreite, Lightbox). Neu erzeugen mit `npm run images`.

## 9. Technik

- **Statischer Build ohne Laufzeitabhängigkeiten** (Node ≥ 20, kein npm install nötig). Seiten sind JavaScript-Module mit Template-Literalen, Layout und Komponenten liegen zentral.
- **Single Source of Truth** für Firmendaten und Produkte: `src/lib/site.mjs`.
- **Qualitätssicherung im Build**: Prüfung aller internen Links und Anker sowie aller bisherigen URLs. Bei Fehlern bricht der Build ab.
- **Ausgabe**: rund 4 MB inklusive aller Bildvarianten. Pro Seite werden dank responsiver Bilder und Lazy Loading nur die sichtbaren Screenshots geladen; es gibt keine Frameworks und keine Drittanbieter-Requests.
- **Hosting** bleibt GitHub Pages. Die Workflow-Vorlage liegt unter `deploy/pages.yml`.

## 10. SEO

- Eigener `<title>`, eigene Description und Canonical pro Seite. Open Graph und Twitter Cards mit einem eigens gerendertem OG-Bild (1200 × 630).
- Strukturierte Daten (JSON-LD): Organization, WebSite, MobileApplication je App, BreadcrumbList, ItemList, FAQPage, ContactPage.
- `sitemap.xml` wird mit Prioritäten generiert. App-Datenschutzseiten bleiben `noindex, follow` wie bisher.
- Semantisches HTML, genau eine H1 pro Seite, keine übersprungenen Überschriftenebenen (geprüft).

## 11. Barrierefreiheit (Ziel: WCAG 2.2 AA)

- Skip-Link, Landmarks, `aria-current`, beschriftete Navigationen und sichtbare Fokus-Indikatoren
- Kontraste: Text auf Papier ≥ 4,5 : 1; Produktfarben haben je eine textsichere Variante
- Formulare mit Labels, Inline-Fehlermeldungen (`aria-invalid`, `aria-describedby`) und Statusmeldungen über `aria-live`
- Mega-Menü und Mobilmenü sind vollständig per Tastatur bedienbar (Escape, Fokusfalle)
- `prefers-reduced-motion` schaltet alle Animationen ab. Ohne JavaScript bleiben alle Inhalte sichtbar
- Dekorative Illustrationen sind `aria-hidden`, Inhalte stehen immer zusätzlich als Text da

## 12. Datenschutz

- Keine Cookies, kein Tracking, keine externen Schriften, CDNs oder Einbettungen
- Die Mini-Demos rechnen ausschließlich im Browser
- Kontakt- und Supportformulare nutzen weiterhin den bestehenden FormSubmit-Endpunkt (bereits in der Datenschutzerklärung beschrieben). Kein `localStorage`
- Alle Bilder werden von der eigenen Domain ausgeliefert, nicht von Google-Servern
