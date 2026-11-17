# Änderungsbericht: Zukunftsoffene Positionierung der Website-Texte

- **Datum:** 17. November 2026
- **Branch:** `content/zukunftsoffene-positionierung` (von `origin/main` = `afa8928`, aktueller Live-Stand)
- **Art:** Nur Textänderungen. Design, Layout, Navigation, Bilder, URLs, Sitemap, Produktseiten, Preise und Rechtstexte bleiben unverändert.
- **Status:** Auf den Branch gepusht. Kein Merge nach `main`, kein Deployment.
- **Commits:** `65d0862` Positionierung, `4afc7c7` Nachbesserung zur Verfügbarkeit von BauRechner DE, danach zweite Nachbesserung zu Preisdarstellung und Google-Play-Aussagen (Abschnitte unten)

## Ziel

MP Digital Labs soll nicht dauerhaft auf Offline-Apps, Android, kontolose Nutzung oder Einmalkäufe festgelegt werden. Desktop-, Online-, Cloud- oder KI-Produkte und andere Preismodelle müssen künftig möglich sein. Die beiden aktuellen Apps werden weiterhin korrekt dargestellt. Nicht angebotene Produkte werden nicht behauptet.

## Geänderte Dateien

| Datei | Wirkung |
|---|---|
| `neubau/src/pages/index.mjs` | Startseite |
| `neubau/src/pages/arbeitsweise.mjs` | Arbeitsweise |
| `neubau/src/pages/studio.mjs` | Studio |
| `neubau/src/lib/site.mjs` | nur `SITE.description` (Meta-Beschreibung der Startseite); Produktdaten und Preise unverändert |
| `neubau/src/lib/layout.mjs` | Footer-Text und Hinweis im Apps-Menü (auf allen Seiten) |
| `neubau/KONZEPT.md` | interne Positionierungsbeschreibung (wird nicht veröffentlicht) |

## 1. Startseite (`/`)

| Stelle | Vorher | Nachher |
|---|---|---|
| Seitentitel | MP Digital Labs – Eigene Apps aus Bielefeld | MP Digital Labs – Softwarestudio aus Bielefeld |
| Meta-/OG-Beschreibung | MP Digital Labs aus Bielefeld entwickelt und vertreibt eigene Apps mit klarem Zweck – offline nutzbar, ohne Benutzerkonto und mit Einmalkauf statt Abo. | MP Digital Labs ist ein unabhängiges Softwarestudio aus Bielefeld. Wir entwickeln und vertreiben eigene Softwareprodukte, die konkrete Aufgaben zuverlässig lösen. |
| Überschrift | Software mit klarem Zweck. Gebaut für den Alltag. | *unverändert* |
| Einleitung | … Wir entwickeln und vertreiben eigene Apps, die konkrete Aufgaben zuverlässig lösen – offline nutzbar, ohne Benutzerkonto und mit Einmalkauf statt Abo. | MP Digital Labs ist ein unabhängiges Softwarestudio aus Bielefeld. Wir entwickeln und vertreiben eigene Softwareprodukte, die konkrete Aufgaben zuverlässig lösen. Unser Fokus liegt auf durchdachter Technologie, verständlicher Bedienung und echtem Mehrwert im Alltag. *(wörtlich wie vorgegeben)* |
| Badges im Hero | Offline nutzbar · Kein Konto nötig · Pro ohne Abo | *unverändert*: Sie stehen direkt an den Original-Screenshots mit der Bildunterschrift „Original-Screenshots aus Google Play“ und beschreiben damit die gezeigten Apps |
| Abschnitt Kennzeichnung | Prinzipien | Aktuelle Apps |
| Abschnitt Überschrift | Was alle unsere Apps gemeinsam haben. | Was unsere aktuellen Apps auszeichnet. |
| Abschnitt Einleitung | … Diese Grundsätze gelten für jedes Produkt, das unser Studio veröffentlicht. | … Für BauRechner DE und VerbrauchsMonitor DE bedeutet das konkret: |
| Vier Merkmale (Offline nutzbar, Kein Konto, Einmalkauf statt Abo, Klarer Zweck) | – | *unverändert*: gelten jetzt ausdrücklich für die beiden aktuellen Apps |
| Arbeitsweise-Teaser, Einleitung | … jede App so lange zu verfeinern, bis sie im Alltag wirklich trägt. | … jedes Produkt so lange zu verfeinern, bis es im Alltag wirklich trägt. |
| Arbeitsweise-Teaser, Schritt 01 | Jede App beginnt bei einem konkreten Ablauf aus Handwerk oder Haushalt – nicht bei einer Technologie. | Jedes Produkt beginnt bei einer konkreten Aufgabe aus dem Alltag – nicht bei einer Technologie. |
| Studio-Band | … eigene Apps mit klar definiertem Anwendungsnutzen. | … eigene Softwareprodukte mit klar definiertem Anwendungsnutzen. |

Unverändert: Produktkacheln (Kostenlos · Pro einmalig 14,99 € / 9,99 €, Offline nutzbar, Ohne Konto), Preishinweis unter den Kacheln und der Hinweis „Google Play · Zwei Apps jetzt verfügbar“.

## 2. Arbeitsweise (`/arbeitsweise/`)

| Stelle | Vorher | Nachher |
|---|---|---|
| Meta-/OG-Beschreibung | Wie MP Digital Labs eigene Apps entwickelt: … bis zur laufenden Pflege – offline, ohne Konto, ohne Abo. | Wie MP Digital Labs eigene Software entwickelt: vom konkreten Alltagsproblem über einen bewusst abgegrenzten Funktionsumfang und die passende Technologie bis zur laufenden Pflege. |
| Einleitung | … Jede App entsteht aus einem konkreten Alltagsproblem – und wird so lange verfeinert, bis sie es zuverlässig löst. | … Jedes Produkt entsteht aus einem konkreten Alltagsproblem – und wird so lange verfeinert, bis es dieses zuverlässig löst. |
| Schritt „Beobachten“ | Jede App beginnt bei einem konkreten Ablauf: dem Aufmaß auf der Baustelle, der Ablesung am Zähler. … | Jedes Produkt beginnt bei einem konkreten Ablauf – bei unseren aktuellen Apps etwa beim Aufmaß auf der Baustelle oder der Ablesung am Zähler. … |
| Schritt „Entwickeln“ | Offline-first, lokale Datenspeicherung und eine schlanke Architektur sind von Anfang an gesetzt – nicht nachträglich ergänzt. | Die Architektur folgt der Aufgabe: Ob ein Produkt offline, online oder kombiniert arbeitet und wo seine Daten gespeichert werden, entscheiden wir nach dem tatsächlichen Nutzen – früh und bewusst, nicht nachträglich. |
| Beispiel zu „Entwickeln“ (Beide Apps) | Beide Apps speichern Projekt- und Verbrauchsdaten lokal auf dem Gerät und benötigen für ihre Kernfunktionen kein Benutzerkonto bei MP Digital Labs. | Für BauRechner DE und VerbrauchsMonitor DE haben wir uns für Offline-Nutzung und lokale Datenspeicherung entschieden: Beide Apps speichern Projekt- und Verbrauchsdaten auf dem Gerät und benötigen für ihre Kernfunktionen kein Benutzerkonto bei MP Digital Labs. |
| Standards Überschrift | Was für jede unserer Apps gilt. | Was für jedes unserer Produkte gilt. |

Qualitätsstandards (Texte wörtlich wie vorgegeben):

| Nr. | Vorher | Nachher |
|---|---|---|
| 1 | Offline nutzbar | **Passende Technologie:** Offline, online oder kombiniert – abhängig vom tatsächlichen Nutzen. |
| 2 | Kein Benutzerkonto | **Einfache Bedienung:** Keine unnötige Komplexität. Benutzerkonten nur, wenn sie für das jeweilige Produkt sinnvoll sind. |
| 3 | Datensparsam | **Verantwortungsvoller Datenschutz:** Datensparsamkeit, Sicherheit und Transparenz unabhängig von der eingesetzten Technologie. |
| 4 | Transparente Preise | **Transparente Preismodelle:** Faire, nachvollziehbare Preise. Einmalkauf oder Abonnement entsprechend dem jeweiligen Produkt. |
| 5 | Ehrliche Ergebnisse (mit „Hochrechnungen“) | **Nachvollziehbare Ergebnisse:** Berechnungen, Schätzungen und automatisierte Ergebnisse werden verständlich dargestellt. |
| 6 | Wartbar gebaut | **Langfristige Qualität:** Wartbarkeit, Stabilität, Tests und kontinuierliche Verbesserung. |

Das Symbol von Standard 1 wechselt von „offline“ zu „layers“ (vorhandenes Symbol der Website). Die übrigen Beispiele aus BauRechner DE und VerbrauchsMonitor DE (Beobachten, Reduzieren, Prüfen, Pflegen) bleiben unverändert.

## 3. Studio (`/studio/`)

| Stelle | Vorher | Nachher |
|---|---|---|
| Meta-/OG-Beschreibung | … eigene Apps mit klar definiertem Nutzen. | … eigene Softwareprodukte mit klar definiertem Nutzen. |
| Einleitung | MP Digital Labs ist das inhabergeführte Softwarestudio von Manuel Petersson. Wir entwickeln und vertreiben ausschließlich eigene Apps – … | MP Digital Labs ist das unabhängige, inhabergeführte Softwarestudio von Manuel Petersson. Wir entwickeln und vertreiben ausschließlich eigene Softwareprodukte – mit dem Anspruch, dass sie im Alltag verständlich, zuverlässig und dauerhaft nutzbar sind. Technologie, Plattform und Preismodell richten sich nach der Aufgabe des jeweiligen Produkts. |
| Abschnitt Kennzeichnung | Was wir entwickeln | Aktuelles Portfolio |
| Abschnitt Einleitung | Unsere Apps sind Produkt und Werkstatt zugleich: … | Unser aktuelles Portfolio umfasst zwei Android-Apps, erhältlich bei Google Play. Was sich dort im Alltag bewährt, prägt jede weitere Produktentscheidung. |
| Haltung „Zweck vor Umfang“ | Jede App bekommt … | Jedes Produkt bekommt … |
| Haltung „Privacy by Design“ | Datenschutz ist von Anfang an mitgedacht: lokale Speicherung, kein Konto, kein eigenes Tracking. | Datenschutz ist von Anfang an mitgedacht – unabhängig von der eingesetzten Technologie. Unsere aktuellen Apps speichern Daten lokal, benötigen kein Konto und verzichten auf eigenes Tracking. |
| Haltung „Ehrliche Produkte“ | Kostenschätzungen werden als Schätzungen ausgewiesen, die kostenlose Version bleibt nutzbar, Pro gibt es ohne Abo. | Schätzungen werden als Schätzungen ausgewiesen, Preise sind klar und nachvollziehbar. Bei unseren aktuellen Apps bleibt die kostenlose Version nutzbar, Pro gibt es als Einmalkauf ohne Abo. |
| Leitsatz-Band | … was wir selbst verantworten können: unseren eigenen Apps. | … unseren eigenen Produkten. |
| Eckdaten | Vertrieb über Google Play | Aktuelle Apps bei Google Play |

Die Überschrift „Software mit klarem Zweck – entwickelt in Bielefeld.“ und „Werkzeuge für Handwerk und Haushalt.“ bleiben. Es werden keine Desktop-, Cloud- oder KI-Produkte erwähnt oder angekündigt.

## 4. Seitenübergreifend (alle 13 Seiten)

| Stelle | Vorher | Nachher |
|---|---|---|
| Footer | … Wir entwickeln und vertreiben eigene Apps mit klarem Zweck. | … Wir entwickeln und vertreiben eigene Softwareprodukte mit klarem Zweck. |
| Apps-Menü, Hinweis „Produktportfolio“ | Eigene Apps für konkrete Aufgaben – kostenlos bei Google Play, Pro als Einmalkauf ohne Abo. | Unsere aktuellen Apps für konkrete Aufgaben – kostenlos bei Google Play, Pro als Einmalkauf ohne Abo. |

## Bewusst unverändert

- Produktseiten BauRechner DE und VerbrauchsMonitor DE, App-Übersicht `/apps/`, Support, Kontakt, Impressum, alle Datenschutzerklärungen: Ihre Angaben zu offline, Konto, Google Play, Preisen und Einmalkauf beziehen sich bereits auf die jeweilige App und bleiben so richtig.
- Alle Preise, Kostenlos- und Pro-Umfänge (`APPS` in `site.mjs`)
- Open-Graph-Bild (`og-image.png`, Text „Eigene Apps aus Bielefeld“): Die Aussage stimmt weiterhin. Eine Neugestaltung wäre eine Bildänderung und gehört nicht zu dieser Textüberarbeitung. Kann bei Bedarf separat angepasst werden.
- URLs, Sitemap, Anker (z. B. `#prinzipien`), Überschriftenstruktur, strukturierte Daten (JSON-LD), Design, CSS, JavaScript. Es gibt kein neues Tracking.

## Prüfungen

| Prüfung | Ergebnis |
|---|---|
| Build (`node neubau/scripts/build.mjs`) | 13 Seiten gebaut, alle internen Links, Anker und Bestands-URLs gültig |
| Abgleich jeder Ausgabedatei mit dem Build von `afa8928` (Live-Stand) | Dieselbe Dateiliste. Abweichungen nur in den Seiten-HTML-Dateien. Auf Produktseiten, `/apps/`, Support, Kontakt, Impressum, Datenschutz und 404 ausschließlich die zwei Zeilen Footer und Apps-Menü. `sitemap.xml`, CSS, JS und Bilder sind identisch. |
| Restaussagen zu offline/Konto/Abo/Einmalkauf/Google Play/Android auf Startseite, Arbeitsweise, Studio | Alle verbleibenden Treffer stehen ausdrücklich im Zusammenhang mit den aktuellen Apps |
| Darstellung im Browser (Desktop und 375 px mobil) | Startseite, Arbeitsweise und Studio ohne Umbruch- oder Überlauffehler, keine Konsolenfehler, je genau eine H1 |
| App-Tests | Nicht zutreffend (reine Website-Textänderung, keine App berührt) |

## Nachbesserung: BauRechner DE vorübergehend nicht erhältlich

Anlass: Bei der Prüfung des Branches fiel auf, dass BauRechner DE vorübergehend aus Google Play genommen ist (Überarbeitung und Fehlerbehebung). VerbrauchsMonitor DE ist weiterhin erhältlich. Gegenprobe am 17. November 2026: Der Google-Play-Eintrag von BauRechner DE liefert HTTP 404, der von VerbrauchsMonitor DE HTTP 200. Alle BauRechner-Links zu Google Play waren damit tote Links.

### Umsetzung: ein zentraler Schalter

In `neubau/src/lib/site.mjs` hat jede App jetzt das Feld `available`. BauRechner DE steht auf `available: false`, VerbrauchsMonitor DE auf `available: true`. Alle Hinweise unten hängen nur an diesem Feld. Der Hinweistext steht einmal zentral in `unavailableText()`:

> BauRechner DE wird derzeit überarbeitet und ist vorübergehend nicht bei Google Play erhältlich.

**Nach der erneuten Veröffentlichung:** In `site.mjs` bei BauRechner DE `available: true` setzen und neu bauen. Alle Verfügbarkeitshinweise verschwinden, Google-Play-Buttons und -Links erscheinen wieder. Mit `available: true` getestet: Die Seiten entsprechen dann wieder dem vorherigen Stand. Ausnahmen sind eine Leerzeile im Quelltext und das bewusst dauerhaft geänderte Studio-Eckdatum (siehe unten).

Es wird kein Veröffentlichungstermin genannt.

### Vorher/Nachher

| Seite | Stelle | Vorher | Nachher |
|---|---|---|---|
| Startseite | Hinweis über der Überschrift | Google Play · Zwei Apps jetzt verfügbar (Link auf `/apps/`) | Google Play · VerbrauchsMonitor DE jetzt verfügbar (Link auf die VerbrauchsMonitor-Seite) |
| Startseite | Produktkachel BauRechner, Preiszeile | Kostenlos · Pro einmalig 14,99 € | In Überarbeitung · vorübergehend nicht erhältlich |
| Startseite | Produktkachel BauRechner, Links | Zur App · Google Play | Zur App |
| Startseite | Hinweis unter den Kacheln | Kostenlos bei Google Play. Preise für Pro laut Google Play, Stand November 2026 – einmaliger Kauf, kein Abo. | wie vorher, ergänzt um: BauRechner DE wird derzeit überarbeitet und ist vorübergehend nicht bei Google Play erhältlich. |
| Studio | Abschnitt „Aktuelles Portfolio“ | Unser aktuelles Portfolio umfasst zwei Android-Apps, erhältlich bei Google Play. Was sich dort im Alltag bewährt, prägt jede weitere Produktentscheidung. | Unser aktuelles Portfolio umfasst zwei Android-Apps: VerbrauchsMonitor DE ist bei Google Play erhältlich, BauRechner DE wird derzeit überarbeitet und ist vorübergehend nicht erhältlich. Was sich im Alltag bewährt, prägt jede weitere Produktentscheidung. |
| Studio | Eckdaten | Aktuelle Apps bei Google Play | Aktueller Vertrieb über Google Play *(dauerhaft, unabhängig vom Schalter)* |
| BauRechner DE | Statusabzeichen | ● Veröffentlicht (grün) | ● In Überarbeitung (Punkt in vorhandenem Bernsteinton) |
| BauRechner DE | Hero | Button „Jetzt bei Google Play“ + „Hilfe & Support“ | Hinweisfeld (vorhandener Hinweis-Stil): BauRechner DE wird derzeit überarbeitet und ist vorübergehend nicht bei Google Play erhältlich. Darunter nur „Hilfe & Support“ |
| BauRechner DE | Faktenleiste „Download“ | kostenlos | vorübergehend nicht erhältlich |
| BauRechner DE | Abschnitt Kostenlos & Pro, Einleitung | … als einmaliger Kauf ohne Abo. | … als einmaliger Kauf ohne Abo. BauRechner DE wird derzeit überarbeitet und ist vorübergehend nicht bei Google Play erhältlich. |
| BauRechner DE | Abschlussband | „Bereit für die nächste Baustelle?“ – BauRechner DE ist kostenlos bei Google Play erhältlich – Pro schalten Sie bei Bedarf einmalig frei. … / Buttons: Jetzt bei Google Play, Zum Support | „Fragen zu BauRechner DE?“ – BauRechner DE wird derzeit überarbeitet und ist vorübergehend nicht bei Google Play erhältlich. Fragen zur App und Hinweise aus der Praxis nehmen wir weiterhin gern entgegen. / Buttons: Zum Support, Kontakt aufnehmen |
| BauRechner DE | Strukturierte Daten (JSON-LD) | `downloadUrl`/`installUrl` auf Google Play, Angebot ohne Verfügbarkeitsangabe | `downloadUrl`/`installUrl` entfallen, Angebot mit `availability: OutOfStock` |
| Apps-Übersicht | Meta-/OG-Beschreibung | … BauRechner DE und VerbrauchsMonitor DE – kostenlos bei Google Play, offline-first und ohne Benutzerkonto. | … BauRechner DE und VerbrauchsMonitor DE – offline-first, ohne Benutzerkonto und mit kostenlosem Einstieg. |
| Apps-Übersicht | Einleitung | … Beide Apps sind kostenlos bei Google Play erhältlich. | … BauRechner DE wird derzeit überarbeitet und ist vorübergehend nicht bei Google Play erhältlich. VerbrauchsMonitor DE ist kostenlos bei Google Play erhältlich. |
| Apps-Übersicht | App-Karte BauRechner: Status, Preiszeile, Links | Veröffentlicht · „Kostenlos laden · Pro einmalig 14,99 € · kein Abo“ · Mehr erfahren, Google Play | In Überarbeitung · „Wird derzeit überarbeitet · vorübergehend nicht bei Google Play erhältlich“ · Mehr erfahren |
| Apps-Übersicht | Hinweis unter der Vergleichstabelle | Preise laut Google Play, Stand November 2026. Die Abrechnung erfolgt über Google Play. | wie vorher, ergänzt um den Hinweistext |
| Support | Karte BauRechner DE, Text | Fragen zu Projekten, Aufmaß, Berechnungen, Pro-Funktionen, Backup oder Export. | wie vorher, ergänzt um: BauRechner DE wird derzeit überarbeitet und ist vorübergehend nicht bei Google Play erhältlich. Für Fragen zur bereits installierten App sind wir weiterhin erreichbar. |
| Support | Karte BauRechner DE, Buttons | Produktseite · Datenschutz · Google Play · Frage per E-Mail | Produktseite · Datenschutz · Frage per E-Mail |
| Arbeitsweise | Schritt „Pflegen“, Beispiel-App | BauRechner DE: „… Verbesserungen erhalten Sie als Update direkt über Google Play.“ | gleicher Text, Beispiel-App jetzt VerbrauchsMonitor DE |
| Alle Seiten | Apps-Menü, Hinweis | Unsere aktuellen Apps für konkrete Aufgaben – kostenlos bei Google Play, Pro als Einmalkauf ohne Abo. | wie vorher, ergänzt um: BauRechner DE ist vorübergehend nicht erhältlich. |

### Bewusst unverändert

- **Preise und Umfänge:** Kostenlos-/Pro-Karten, Vergleichstabelle und FAQ auf der BauRechner-Seite nennen weiter 14,99 € und denselben Umfang. Sie sind durch die Hinweise eingeordnet.
- **Bildunterschriften** „Original-Screenshots aus Google Play“: Die Herkunft der Bilder stimmt weiterhin.
- **BauRechner-Produktseite:** URL, Titel, Meta-Beschreibung, Canonical und Sitemap-Eintrag unverändert. Kein `noindex`, die Seite bleibt erreichbar und indexierbar.
- **VerbrauchsMonitor DE:** Inhalte, Buttons, Links und strukturierte Daten unverändert. Die Zahl der Google-Play-Links auf jeder Seite ist gleich geblieben.
- **Rechtstexte:** Impressum und alle Datenschutzerklärungen sind inhaltlich unverändert. Auf diesen Seiten ändert sich nur die Zeile im gemeinsamen Apps-Menü.
- **Design:** Kein neues CSS. Verwendet werden vorhandene Bausteine: Hinweisfeld `.note`, Statusabzeichen, Symbol „wrench“, Farbwert `--pro`.

### Prüfungen der Nachbesserung

| Prüfung | Ergebnis |
|---|---|
| Build | 13 Seiten, alle internen Links, Anker und Bestands-URLs gültig |
| Abgleich mit dem Build von `65d0862` | Nur die oben genannten Stellen geändert. `sitemap.xml` identisch. Andere Dateien weichen nur in den Zeilenenden ab (Vergleichskopie). |
| Links zu `id=de.mpdigitallabs.baurechner` im gebauten Output | keine |
| Nicht ausgewertete `${…}` im Output | keine |
| Rücknahme-Test (`available: true`) | Stand wie vor der Nachbesserung (siehe oben) |
| Desktop und Smartphone (375 px) | Startseite, Apps, BauRechner-Seite (Hero, Faktenleiste, Abschlussband), Support: kein Überlauf, keine Konsolenfehler |

## Zweite Nachbesserung: Preisdarstellung und „Kostenlos bei Google Play“

Anlass: Die Prüfung von `4afc7c7` ergab zwei Mängel:

- `plans()` in `neubau/src/lib/ui.mjs` gab unabhängig von `available` „Kostenlos bei Google Play – ohne Konto“ aus.
- Auf der Startseite und im Apps-Menü wurde die Nichtverfügbarkeit nur durch einen nachgeschobenen Satz deutlich.

Die folgenden Zeilen ersetzen die entsprechenden Zeilen im Abschnitt „Nachbesserung“. Alle Texte hängen weiterhin nur am Schalter `available`.

| Seite | Stelle | Vorher (`4afc7c7`) | Nachher bei `available: false` | Bei `available: true` |
|---|---|---|---|---|
| BauRechner DE | Preiskarte Kostenlos | 0 € · Kostenlos bei Google Play – ohne Konto | 0 € · Kostenlose Version, ohne Konto – derzeit vorübergehend nicht erhältlich | wie vorher |
| BauRechner DE | Preiskarte Pro | 14,99 € · einmalig als In-App-Kauf über Google Play | 14,99 € · einmalig als In-App-Kauf über Google Play – derzeit vorübergehend nicht erhältlich | wie vorher |
| BauRechner DE | Abschnitt Kostenlos & Pro, Überschrift | Kostenlos starten. Pro bei Bedarf. | Kostenlose Version und Pro im Überblick. | wie vorher |
| BauRechner DE | Abschnitt Kostenlos & Pro, Einleitung | Die kostenlose Version enthält … – als einmaliger Kauf ohne Abo. BauRechner DE wird derzeit überarbeitet und ist vorübergehend nicht bei Google Play erhältlich. | BauRechner DE wird derzeit überarbeitet und ist vorübergehend nicht bei Google Play erhältlich. Zur Orientierung: Die kostenlose Version enthält … – als einmaliger Kauf ohne Abo. | ohne Hinweissatz, wie vor `4afc7c7` |
| Startseite | Hinweis unter den Produktkacheln | Kostenlos bei Google Play. Preise für Pro … BauRechner DE wird derzeit überarbeitet … | BauRechner DE wird derzeit überarbeitet und ist vorübergehend nicht bei Google Play erhältlich. VerbrauchsMonitor DE ist kostenlos bei Google Play erhältlich. Preise für Pro laut Google Play, Stand November 2026 – einmaliger Kauf, kein Abo. | Kostenlos bei Google Play. Preise für Pro … |
| Startseite | Merkmal „Einmalkauf statt Abo“ | Starten Sie kostenlos. Erweiterte Funktionen gibt es mit Pro – als einmaliger Kauf über Google Play. | Kostenloser Einstieg, erweiterte Funktionen mit Pro – als einmaliger Kauf über Google Play, ohne Abo. | wie vorher |
| Alle Seiten | Apps-Menü, Hinweis | Unsere aktuellen Apps für konkrete Aufgaben – kostenlos bei Google Play, Pro als Einmalkauf ohne Abo. BauRechner DE ist vorübergehend nicht erhältlich. | Unsere aktuellen Apps für konkrete Aufgaben: BauRechner DE vorübergehend nicht erhältlich, VerbrauchsMonitor DE kostenlos bei Google Play. Pro jeweils als Einmalkauf ohne Abo. | Unsere aktuellen Apps für konkrete Aufgaben – kostenlos bei Google Play, Pro als Einmalkauf ohne Abo. |

Preise (0 €, 14,99 €, 9,99 €) und alle Listen zu kostenloser Version und Pro werden unverändert angezeigt. Die Preiskarten von VerbrauchsMonitor DE bleiben unverändert, weil `available: true`. Es gibt keine Design- oder CSS-Änderungen und keine neuen Bausteine.

### Prüfungen der zweiten Nachbesserung

| Prüfung | Ergebnis |
|---|---|
| Build (`available: false`) | 13 Seiten, alle internen Links, Anker und Bestands-URLs gültig |
| `available: false` gegen `4afc7c7` | Nur die Stellen der Tabelle geändert. Die VerbrauchsMonitor-Seite ändert sich nur in der Menüzeile. Keine Links zu `id=de.mpdigitallabs.baurechner`. |
| `available: true` gegen `65d0862` (Stand vor allen Verfügbarkeitshinweisen) | Identisch bis auf eine Leerzeile im Quelltext der BauRechner-Seite und das bewusst dauerhaft geänderte Studio-Eckdatum („Aktueller Vertrieb über Google Play“). Die BauRechner-Play-Links kehren auf Startseite, Apps-Übersicht, Produktseite und Support zurück. |
| Desktop und Smartphone (375 px) | Preiskarten, Hinweis unter den Kacheln und Apps-Menü ohne Überlauf, keine Konsolenfehler |

## Hinweise zur Freigabe

- Die neue Startseiten-Meta-Beschreibung ist inhaltlich die neue Einleitung. „Bielefeld“, „Softwarestudio“ und „MP Digital Labs“ bleiben als Suchbegriffe im Titel erhalten. Das Wort „Apps“ steht nicht mehr im Startseitentitel, aber weiterhin prominent auf der Seite und in der Navigation.
- Erst nach Freigabe: Merge nach `main`. Dadurch startet automatisch das Live-Deployment über GitHub Actions.
