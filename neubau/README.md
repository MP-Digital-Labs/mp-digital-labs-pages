# MP Digital Labs – Website (Neubau)

Vollständiger Neubau der Unternehmenswebsite **mp-digital-labs.de**. Das gestalterische und inhaltliche Konzept steht in [KONZEPT.md](KONZEPT.md).

> **Status:** lokaler Entwicklungsstand auf `feature/website-neubau`. Nicht veröffentlicht.
> Die bisherige Website im Repository-Root und ihr Deployment sind unverändert.

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
├── deploy/pages.yml       Workflow-Vorlage für den Go-live (inaktiv)
├── scripts/
│   ├── build.mjs          Static-Site-Generator + Link-Checker + Sitemap
│   ├── serve.mjs          lokaler Vorschau-Server
│   ├── process-images.mjs Store-Bilder + Logo-Varianten (Originalquellen)
│   └── render-assets.mjs  OG-Bild per Headless-Browser
└── src/
    ├── lib/
    │   ├── site.mjs       ★ Firmen- und Produktdaten (einzige Quelle)
    │   ├── layout.mjs     <head>, Header/Navigation, Footer, JSON-LD
    │   └── ui.mjs         Komponenten (Buttons, Karten, FAQ, Formularfelder …)
    ├── pages/             eine Datei pro Seite bzw. Seitengruppe
    ├── legal/             Rechtstexte, unverändert aus der bisherigen Website
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

1. Branch prüfen und in `main` übernehmen (Pull Request).
2. `.github/workflows/pages.yml` durch `neubau/deploy/pages.yml` ersetzen. Wichtig: Der bisherige Workflow patcht die alte `index.html` und pusht selbst auf `main`. Er muss vollständig ersetzt werden.
3. Nach dem ersten Deployment prüfen:
   - alle Bestands-URLs (`/apps/…`, `/support/#…`, `/datenschutz-*.html`, `/impressum/`)
   - Preise und Pro-Umfang erneut mit Google Play abgleichen
   - die in der Google Play Console hinterlegten Datenschutz-URLs
   - Kontaktformular: einen echten Testversand durchführen und prüfen, ob die Weiterleitung auf `/kontakt/danke/` funktioniert
4. Optional danach: die alten Root-Dateien (`index.html`, `site.css`, `site.js`, …) entfernen. Sie werden mit dem neuen Workflow nicht mehr ausgeliefert.

Rollback: den Workflow auf den alten Stand zurücksetzen. Die Root-Dateien bleiben bis Schritt 4 vollständig erhalten.
