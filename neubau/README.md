# MP Digital Labs – Website (Neubau)

Vollständiger Neubau der Unternehmenswebsite **mp-digital-labs.de**. Das gestalterische und inhaltliche Konzept steht in [KONZEPT.md](KONZEPT.md).

> **Status:** lokaler Entwicklungsstand auf `feature/website-neubau`. Nicht veröffentlicht.
> Die bisherige Website im Repository-Root ist unverändert. Der Workflow `.github/workflows/pages.yml` ist in diesem Branch bereits auf den Neubau umgestellt und wird erst mit dem Merge nach `main` aktiv.

## Schnellstart

Benötigt wird nur Node.js ≥ 20. Es gibt keine Abhängigkeiten, ein `npm install` ist nicht nötig.

```bash
cd neubau
npm run preview      # baut nach dist/ und startet http://localhost:4173
```

| Befehl | Zweck |
|---|---|
| `npm run build` | Build nach `dist/` inkl. Prüfung aller internen Links, Anker und Bestands-URLs |
| `npm run serve` | Vorschau-Server für `dist/` (verhält sich wie GitHub Pages) |
| `npm run preview` | beides nacheinander |
| `npm run images` | lädt die Originalbilder aus Google Play und erzeugt alle Logo- und App-Bildvarianten, Favicon und Touch-Icon (benötigt lokal Chrome/Edge) |
| `npm run assets` | rendert das OG-Bild neu (benötigt lokal Chrome/Edge) |

## Struktur

```
neubau/
├── KONZEPT.md             Gesamtkonzept, Designsystem, IA, SEO, Barrierefreiheit
├── brand-src/            offizielles Firmenlogo (Original)
├── GO-LIVE.md             Go-live- und Rollback-Plan
├── AUDIT-2026-11-02.md    Audit vor Veröffentlichung inkl. Nachtrag
├── scripts/
│   ├── build.mjs          Static-Site-Generator + Link-Checker + Sitemap
│   ├── serve.mjs          lokaler Vorschau-Server
│   ├── process-images.mjs Store-Bilder + Logo-Varianten (Originalquellen)
│   └── render-assets.mjs  OG-Bild per Headless-Browser
└── src/
    ├── lib/
    │   ├── site.mjs       ★ Firmen- und Produktdaten (einzige Quelle)
    │   ├── layout.mjs     <head>, Header/Navigation, Footer, JSON-LD
    │   └── ui.mjs         Komponenten (Buttons, Karten, FAQ, E-Mail-Karte …)
    ├── pages/             eine Datei pro Seite bzw. Seitengruppe
    ├── legal/             Rechtstexte (Website-Datenschutz am 2.11.2026 angepasst, Rest unverändert)
    └── static/            CSS, JS, Schriften, Bilder, CNAME, robots.txt, Favicons
```

## Inhalte pflegen

- **Firmendaten, App-Links, Preise und Kostenlos-/Pro-Umfang:** `src/lib/site.mjs` (bei Preisänderungen auch `PRICES_AS_OF` anpassen)
- **Texte einer Seite:** die passende Datei in `src/pages/`
- **Rechtstexte:** `src/legal/*.html`. Die HTML-Fragmente werden 1:1 eingebettet; die erste Zeile enthält den Stand
- **Neue Seite:** neue Datei in `src/pages/` mit `export default { path, title, description, body }`
- **Neue Store-Bilder:** Bild-IDs in `scripts/process-images.mjs` aktualisieren, `.cache/` löschen, `npm run images`, Titel der Screenshots in `site.mjs` anpassen
- **Neue App** (erst nach Veröffentlichung): Eintrag in `APPS` (site.mjs), Bild-IDs in `process-images.mjs`, Produktseite nach Vorlage einer bestehenden

## Go-live (nur nach ausdrücklicher Freigabe)

Der vollständige, verbindliche Ablauf mit GitHub-Einstellungen, Freigaben, Abnahme und Rollback steht in **[GO-LIVE.md](GO-LIVE.md)**.

Kurzfassung: Der Workflow `.github/workflows/pages.yml` in diesem Branch ersetzt den alten Workflow. Er veröffentlicht nur `neubau/dist`, ändert das Repository nicht und bricht ab, solange *Settings → Pages → Source* nicht auf „GitHub Actions“ steht. **Der Merge nach `main` ist der Go-live.**
