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

**MP Digital Labs ist ein unabhängiges, inhabergeführtes Softwarestudio aus Bielefeld, das Werkzeuge mit klarem Zweck baut.**

Die Website muss drei Zielgruppen gleichzeitig bedienen:

1. **App-Nutzer** (Handwerk, Haushalte): Produktverständnis, Vertrauen, Download, Support, Datenschutz.
2. **Potenzielle Auftraggeber und Partner**: Kompetenz, Arbeitsweise, Ansprechpartner, Kontakt.
3. **Google Play und Behörden**: stabile, auffindbare Rechtstexte unter den bekannten URLs.

Kernbotschaft: *Software mit klarem Zweck. Gebaut für den Alltag.* Belegt wird sie ausschließlich durch echte Produkteigenschaften: offline-first, kein Konto, Einmalkauf statt Abo, lokale Datenspeicherung.

Öffentlich gezeigt und verlinkt werden **nur veröffentlichte Apps** (BauRechner DE, VerbrauchsMonitor DE).

## 3. Referenzanalyse

Untersucht wurden Auftritte etablierter Softwareunternehmen und unabhängiger Produktstudios. Übernommen wurden nur die Prinzipien, nicht die Gestaltung:

| Referenz | Prinzip, das übernommen wurde |
|---|---|
| Linear, Vercel | präzise Typografie, ruhige Flächen, hohe Informationsdichte ohne Lärm |
| Stripe | Produkte erklären sich über interaktive, echte Rechenbeispiele |
| Cultured Code (Things), Panic | kleines Studio mit Haltung und Produktstolz statt aufgeblasener Agentursprache |
| Raycast | klare Produktseiten mit Funktionsraster, FAQ und starkem Abschluss-CTA |
| Teenage Engineering | technisch-ästhetische Details wie Messraster, Mono-Labels und Bemaßungen |

## 4. Gestaltungsidee „Präzision“

Beide veröffentlichten Apps **messen und rechnen**: Aufmaß und Material bei BauRechner, Zählerstände und Verbrauch beim VerbrauchsMonitor. Daraus leitet sich die visuelle Sprache ab:

- **Messraster** als feiner Hintergrund in Hero-Bereichen, zu den Rändern hin ausgeblendet
- **Bemaßungslinien und Mono-Labels** (Geist Mono) für Kennzeichnungen, Indizes und Daten
- **Papier und Tinte**: warmes Off-White `#f4f3ee`, tiefe Tinte `#0d0f12`, Haarlinien statt Schatten
- **Eine Signalfarbe**: das Blau aus dem offiziellen Logo (`#1769e0`). Jede Produktseite übernimmt die Farbe ihres App-Icons (BauRechner Orange, VerbrauchsMonitor Blau)
- **Nur Originalbilder**: App-Icons, Screenshots und Vorstellungsgrafiken stammen unverändert aus den öffentlichen Google-Play-Einträgen und sind als solche gekennzeichnet. Es gibt keine nachgebauten App-Oberflächen. Die interaktiven Rechenbeispiele sind ausdrücklich als Web-Demo gekennzeichnet

### Designsystem (Tokens in `src/static/assets/css/site.css`)

| Token | Hell | Dunkel |
|---|---|---|
| `--paper` | `#f4f3ee` | `#0b0c0e` |
| `--surface` | `#ffffff` | `#14161a` |
| `--ink` / `--ink-2` / `--ink-3` | `#0d0f12` / `#3b4048` / `#636a74` | `#f1f0eb` / `#c0c4cb` / `#8e959f` |
| `--signal` | `#1769e0` | `#4fb0ff` |
| BauRechner | `#c2410c` (Text), `#f05a18` (Fläche) | `#ff8a52` |
| VerbrauchsMonitor | `#0a6fb5` (Text), `#2f9ae4` (Fläche) | `#5cb8f5` |

- **Typografie**: Geist (variabel, 100–900) und Geist Mono, lokal gehostet (OFL-Lizenz). Display mit −0,048 em Laufweite, Fließtext 17 px / 1,6.
- **Raster**: maximal 1240 px, Rand 16–40 px fluid, Sektionsabstand 80–148 px fluid.
- **Formen**: Radien 10 / 16 / 24 px, 1-px-Haarlinien, Schatten nur bei Hover.
- **Logo**: ausschließlich das offizielle, kreisförmige MP-Digital-Labs-Logo (Quelle: `brand-src/mpdl-logo-original.webp`). Daraus erzeugt `scripts/process-images.mjs` zwei weboptimierte Varianten:
  - *Vollversion* (Kreis mit transparenten Ecken, 320/640/512 px) für Footer, Startseite (Studio), Studio-Seite, OG-Bild und strukturierte Daten
  - *Kompaktversion* für kleine Größen wie Header (40 px), Favicon, Touch-Icon und Web-App-Icons. Sie besteht aus dem Original-Ring und dem Original-Monogramm ohne die Schriftzeilen, die unter 100 px unlesbar wären. Daneben steht im Header der Firmenname in der Schreibweise des Logos (**MP** DIGITAL LABS)
  - Es wird nichts neu gezeichnet oder umgefärbt, nur zugeschnitten und skaliert
- **Dark Mode**: automatisch über `prefers-color-scheme`, ohne Umschalter. So wird nichts im Browser gespeichert, und die Datenschutzerklärung bleibt unverändert zutreffend.

## 5. Informationsarchitektur

```
/                               Start
├── /apps/                      Produktportfolio (Vorstellungsgrafiken) + Vergleich
│   ├── /apps/baurechner-de/        Produktseite + Screenshot-Galerie + Web-Demo „Raum-Aufmaß“
│   └── /apps/verbrauchsmonitor-de/ Produktseite + Screenshot-Galerie + Web-Demo „Verbrauch & Kosten“
├── /leistungen/                Mobile Apps · Produktentwicklung · Praxisorientierte Software
├── /studio/                    Über das Unternehmen, Haltung, Profil
├── /support/                   Hilfe je App (#baurechner, #verbrauchsmonitor), FAQ, Formular
├── /kontakt/                   Kontaktformular, E-Mail, Themen  →  /kontakt/danke/
├── /impressum/
├── /datenschutz.html
├── /datenschutz-baurechner.html
└── /datenschutz-verbrauchsmonitor.html
```

**Alle bisherigen URLs und Anker bleiben erhalten**, inklusive `/#kontakt` und `/support/#…`. Das prüft der Build bei jedem Lauf automatisch.

Navigation: Header mit Mega-Menü „Apps“, Leistungen, Studio, Support und dem Kontakt-Button. Auf Mobilgeräten ein Vollbild-Menü mit Fokusfalle und Escape-Unterstützung. Der Footer ist in vier Spalten gegliedert (Apps, Unternehmen, Hilfe, Rechtliches).

## 6. Inhaltliche Leitplanken

- Ausschließlich belegte Fakten aus dem bisherigen Auftritt. Keine erfundenen Kunden, Bewertungen, Downloadzahlen oder Gründungsjahre.
- Nicht veröffentlichte Apps (z. B. ScootKompass) werden nicht gezeigt.
- Ansprache durchgehend „Sie“. Die Datenschutzerklärungen der Apps bleiben wortgleich (dort „du“).
- Rechtstexte sind **unverändert übernommen**. Der Wortvergleich mit den Originalen ist identisch.
- Verwendet werden die aktuellen Daten aus der Impressum-Unterseite vom 12. Oktober 2026 mit USt-ID und `contact@mp-digital-labs.de`. Das ältere Overlay der alten Startseite ist veraltet.

## 7. Bildquellen

| Bild | Quelle | Verwendung |
|---|---|---|
| App-Icons (2) | Google-Play-Einträge (`=s0`, Originalauflösung 512 px) | Header-Menü, Karten, Produktseiten, Support |
| Screenshots (BauRechner 8, VerbrauchsMonitor 5) | Google-Play-Einträge, Original 941 × 1672 px | Start (Hero, Showcase), Produktseiten (Hero, Galerie mit Lightbox) |
| Vorstellungsgrafiken (2) | Google-Play-Einträge, 1024 × 500 px | App-Übersicht, OG-Bild der Produktseiten |
| Firmenlogo | vom Auftraggeber bereitgestellt | siehe Abschnitt 4 |

Die heruntergeladenen Store-Dateien stimmen byte-genau mit den lokalen Originalen überein, die bei MP Digital Labs liegen (Marketing- und Play-Store-Ordner). Ausgeliefert wird WebP in 480 px (Galerie) und 941 px (Originalbreite, Lightbox). Neu erzeugen mit `npm run images`.

## 8. Technik

- **Statischer Build ohne Laufzeitabhängigkeiten** (Node ≥ 20, kein npm install nötig). Seiten sind JavaScript-Module mit Template-Literalen, Layout und Komponenten liegen zentral.
- **Single Source of Truth** für Firmendaten und Produkte: `src/lib/site.mjs`.
- **Qualitätssicherung im Build**: Prüfung aller internen Links und Anker sowie aller bisherigen URLs. Bei Fehlern bricht der Build ab.
- **Ausgabe**: rund 550 KB inklusive Schriften und Bildern. Eine einzelne Seite liegt typischerweise unter 120 KB übertragen, ohne Frameworks und ohne Drittanbieter-Requests.
- **Hosting** bleibt GitHub Pages. Die Workflow-Vorlage liegt unter `deploy/pages.yml`.

## 9. SEO

- Eigener `<title>`, eigene Description und Canonical pro Seite. Open Graph und Twitter Cards mit einem eigens gerendertem OG-Bild (1200 × 630).
- Strukturierte Daten (JSON-LD): Organization, WebSite, MobileApplication je App, BreadcrumbList, ItemList, FAQPage, ContactPage.
- `sitemap.xml` wird mit Prioritäten generiert. App-Datenschutzseiten bleiben `noindex, follow` wie bisher.
- Semantisches HTML, genau eine H1 pro Seite, keine übersprungenen Überschriftenebenen (geprüft).

## 10. Barrierefreiheit (Ziel: WCAG 2.2 AA)

- Skip-Link, Landmarks, `aria-current`, beschriftete Navigationen und sichtbare Fokus-Indikatoren
- Kontraste: Text auf Papier ≥ 4,5 : 1; Produktfarben haben je eine textsichere Variante
- Formulare mit Labels, Inline-Fehlermeldungen (`aria-invalid`, `aria-describedby`) und Statusmeldungen über `aria-live`
- Mega-Menü und Mobilmenü sind vollständig per Tastatur bedienbar (Escape, Fokusfalle)
- `prefers-reduced-motion` schaltet alle Animationen ab. Ohne JavaScript bleiben alle Inhalte sichtbar
- Dekorative Illustrationen sind `aria-hidden`, Inhalte stehen immer zusätzlich als Text da

## 11. Datenschutz

- Keine Cookies, kein Tracking, keine externen Schriften, CDNs oder Einbettungen
- Die Mini-Demos rechnen ausschließlich im Browser
- Kontakt- und Supportformulare nutzen weiterhin den bestehenden FormSubmit-Endpunkt (bereits in der Datenschutzerklärung beschrieben). Kein `localStorage`
- Alle Bilder werden von der eigenen Domain ausgeliefert, nicht von Google-Servern
