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
    text: 'Jedes Produkt beginnt bei einem konkreten Ablauf – bei unseren aktuellen Apps etwa beim Aufmaß auf der Baustelle oder der Ablesung am Zähler. Wir verstehen erst die Aufgabe, dann die Technik.',
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
    text: 'Die Architektur folgt der Aufgabe: Ob ein Produkt offline, online oder kombiniert arbeitet und wo seine Daten gespeichert werden, entscheiden wir nach dem tatsächlichen Nutzen – früh und bewusst, nicht nachträglich.',
    who: null,
    example: 'Für BauRechner DE und VerbrauchsMonitor DE haben wir uns für Offline-Nutzung und lokale Datenspeicherung entschieden: Beide Apps speichern Projekt- und Verbrauchsdaten auf dem Gerät und benötigen für ihre Kernfunktionen kein Benutzerkonto bei MP Digital Labs.',
  },
  {
    id: 'pruefen',
    title: 'Prüfen',
    text: 'Funktionen werden an realistischen Nutzungsszenarien getestet. Plausibilitätsprüfungen sorgen dafür, dass Ergebnisse nachvollziehbar bleiben.',
    who: vm,
    example: 'Ein Zählerstand unter dem vorherigen wird nicht übernommen, und Backup-Dateien werden vor der Wiederherstellung unter anderem per Prüfsumme auf Integrität geprüft.',
  },
  {
    id: 'pflegen',
    title: 'Pflegen',
    text: 'Nach der Veröffentlichung geht die Arbeit weiter: Rückmeldungen auswerten, Funktionen verbessern, Stabilität sichern.',
    // Beispiel-App muss bei Google Play erhältlich sein (Updates über Google Play)
    who: br.available ? br : vm,
    example: 'Hinweise aus der Praxis erreichen uns über den Support. Verbesserungen erhalten Sie als Update direkt über Google Play.',
  },
];

const standards = [
  ['layers', 'Passende Technologie', 'Offline, online oder kombiniert – abhängig vom tatsächlichen Nutzen.'],
  ['user', 'Einfache Bedienung', 'Keine unnötige Komplexität. Benutzerkonten nur, wenn sie für das jeweilige Produkt sinnvoll sind.'],
  ['shield', 'Verantwortungsvoller Datenschutz', 'Datensparsamkeit, Sicherheit und Transparenz unabhängig von der eingesetzten Technologie.'],
  ['tag', 'Transparente Preismodelle', 'Faire, nachvollziehbare Preise. Einmalkauf oder Abonnement entsprechend dem jeweiligen Produkt.'],
  ['target', 'Nachvollziehbare Ergebnisse', 'Berechnungen, Schätzungen und automatisierte Ergebnisse werden verständlich dargestellt.'],
  ['wrench', 'Langfristige Qualität', 'Wartbarkeit, Stabilität, Tests und kontinuierliche Verbesserung.'],
];

export default {
  path: '/arbeitsweise/',
  title: 'Arbeitsweise',
  description:
    'Wie MP Digital Labs eigene Software entwickelt: vom konkreten Alltagsproblem über einen bewusst abgegrenzten Funktionsumfang und die passende Technologie bis zur laufenden Pflege.',
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
        <p class="lead">MP Digital Labs entwickelt und vertreibt ausschließlich eigene Softwareprodukte. Jedes Produkt entsteht aus einem konkreten Alltagsproblem – und wird so lange verfeinert, bis es dieses zuverlässig löst.</p>
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
      title: 'Was für jedes unserer Produkte gilt.',
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
  actions: `${btn('/kontakt/', 'Feedback senden', { variant: 'primary', size: 'lg' })}${btn('/apps/', 'Apps ansehen', { variant: 'secondary', size: 'lg' })}`,
})}
`,
};
