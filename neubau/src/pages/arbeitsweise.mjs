import { APPS } from '../lib/site.mjs';
import { icon, btn, sectionHead, breadcrumbs, ctaBand, appIcon, mark } from '../lib/ui.mjs';

const crumbs = [['Start', '/'], ['Arbeitsweise', '/arbeitsweise/']];
const br = APPS.baurechner;
const vm = APPS.verbrauchsmonitor;

// Jeder Schritt mit einem belegbaren Beispiel aus den veröffentlichten Apps
const process = [
  {
    id: 'beobachten',
    title: 'Beobachten',
    text: 'Jede App beginnt bei einem konkreten Ablauf: dem Aufmaß auf der Baustelle, der Ablesung am Zähler. Wir verstehen erst die Aufgabe, dann die Technik.',
    who: br,
    example: 'Auf der Baustelle wird zuerst gemessen. Deshalb beginnt die Arbeit in BauRechner DE mit dem Aufmaß – die Werte fließen danach in Rechner, Material und Kalkulation.',
  },
  {
    id: 'reduzieren',
    title: 'Reduzieren',
    text: 'Wir grenzen den Funktionsumfang bewusst ab. Was nicht gebraucht wird, wird nicht gebaut – damit die Bedienung ohne Einarbeitung verständlich bleibt.',
    who: vm,
    example: 'VerbrauchsMonitor DE setzt auf einfache manuelle Erfassung. Eine automatische Datenquelle ist nicht nötig – Sie entscheiden, wann Sie welche Werte eintragen.',
  },
  {
    id: 'entwickeln',
    title: 'Entwickeln',
    text: 'Offline-first, lokale Datenspeicherung und eine schlanke Architektur sind von Anfang an gesetzt – nicht nachträglich ergänzt.',
    who: null,
    example: 'Beide Apps speichern Projekt- und Verbrauchsdaten lokal auf dem Gerät und benötigen für ihre Kernfunktionen kein Benutzerkonto bei MP Digital Labs.',
  },
  {
    id: 'pruefen',
    title: 'Prüfen',
    text: 'Funktionen werden an realistischen Nutzungsszenarien getestet. Plausibilitätsprüfungen sorgen dafür, dass Ergebnisse nachvollziehbar bleiben.',
    who: vm,
    example: 'Unplausible Folgestände werden nicht still als korrekt übernommen, und Backup-Dateien werden vor der Wiederherstellung unter anderem per Prüfsumme auf Integrität geprüft.',
  },
  {
    id: 'pflegen',
    title: 'Pflegen',
    text: 'Nach der Veröffentlichung geht die Arbeit weiter: Rückmeldungen auswerten, Funktionen verbessern, Stabilität sichern.',
    who: br,
    example: 'Hinweise aus der Praxis erreichen uns über den Support. Verbesserungen erhalten Sie als Update direkt über Google Play.',
  },
];

const standards = [
  ['offline', 'Offline nutzbar', 'Die Kernfunktionen arbeiten ohne dauerhafte Internetverbindung. Für Käufe über Google Play und deren Prüfung kann eine Verbindung nötig sein.'],
  ['user', 'Kein Benutzerkonto', 'Keine Registrierung, kein Login, kein eigenes Cloud-Backend für Ihre Daten.'],
  ['shield', 'Datensparsam', 'Projekt- und Verbrauchsdaten bleiben lokal auf dem Gerät. Kein eigenes Tracking, keine Werbe- oder Nutzungsprofile.'],
  ['tag', 'Transparente Preise', 'Kostenlos starten. Pro ist ein einmaliger Kauf über Google Play – ohne Abo und ohne wiederkehrende Kosten.'],
  ['target', 'Ehrliche Ergebnisse', 'Schätzungen und Hochrechnungen werden als solche gekennzeichnet. Unplausible Werte werden nicht still übernommen.'],
  ['wrench', 'Wartbar gebaut', 'Schlanke Produkte bleiben stabil und lassen sich zuverlässig weiterentwickeln.'],
];

export default {
  path: '/arbeitsweise/',
  title: 'Arbeitsweise',
  description:
    'Wie MP Digital Labs eigene Apps entwickelt: vom konkreten Alltagsproblem über einen bewusst abgegrenzten Funktionsumfang bis zur laufenden Pflege – offline, ohne Konto, ohne Abo.',
  priority: 0.7,
  breadcrumbs: crumbs,
  body: `
<section class="phero" aria-labelledby="page-title">
  <div class="wrap phero__inner">
    ${breadcrumbs(crumbs)}
    <div class="phero__split">
      <div>
        <p class="eyebrow">Arbeitsweise</p>
        <h1 id="page-title" class="phero__title">Wie bei uns Software entsteht.</h1>
        <p class="lead">MP Digital Labs entwickelt und vertreibt ausschließlich eigene Softwareprodukte. Jede App entsteht aus einem konkreten Alltagsproblem – und wird so lange verfeinert, bis sie es zuverlässig löst.</p>
      </div>
      <nav class="toc" aria-label="Die fünf Schritte">
        <p class="toc__label">Fünf Schritte</p>
        <ol>${process.map((s, i) => `<li><a href="#${s.id}"><span>${i + 1}</span>${s.title}</a></li>`).join('')}</ol>
      </nav>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="prozess">
  <div class="wrap">
    ${sectionHead({
      label: 'Prozess',
      id: 'prozess',
      title: 'Vom Problem zum Produkt.',
      lead: 'Neue Funktionen entstehen nicht als Selbstzweck. Zu jedem Schritt zeigen wir, wie er sich in unseren veröffentlichten Apps niederschlägt.',
    })}
    <ol class="timeline">
      ${process
        .map(
          (s, i) => `<li class="tl reveal" id="${s.id}">
        <span class="tl__n" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        <div class="tl__body"><h3>${s.title}</h3><p>${s.text}</p></div>
        <p class="tl__ex">${s.who ? appIcon(s.who, 36) : mark(36)}<span><strong>${s.who ? s.who.name : 'Beide Apps'}</strong>${s.example}</span></p>
      </li>`
        )
        .join('')}
    </ol>
  </div>
</section>

<section class="section section--alt" aria-labelledby="standards">
  <div class="wrap">
    ${sectionHead({
      label: 'Qualitätsstandards',
      id: 'standards',
      title: 'Was für jede unserer Apps gilt.',
      lead: 'Diese Standards sind keine Zusatzfunktionen, sondern Grundlage jeder Produktentscheidung.',
    })}
    <div class="fgrid">
      ${standards
        .map(
          ([ic, t, d], i) => `<article class="fcard reveal" style="--d:${i % 3}">
        <span class="fcard__ico">${icon(ic)}</span>
        <h3 class="fcard__title">${t}</h3>
        <p>${d}</p>
      </article>`
        )
        .join('')}
    </div>
  </div>
</section>

${ctaBand({
  title: 'Rückmeldungen machen unsere Apps besser.',
  text: 'Sie nutzen BauRechner DE oder VerbrauchsMonitor DE und haben eine Idee oder einen Hinweis? Schreiben Sie uns.',
  actions: `${btn('/kontakt/?thema=Produktfeedback', 'Feedback senden', { variant: 'primary', size: 'lg' })}${btn('/apps/', 'Apps ansehen', { variant: 'secondary', size: 'lg' })}`,
})}
`,
};
