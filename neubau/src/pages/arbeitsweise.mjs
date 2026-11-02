import { APPS } from '../lib/site.mjs';
import { icon, btn, sectionHead, breadcrumbs, steps, ctaBand, appIcon } from '../lib/ui.mjs';

const crumbs = [['Start', '/'], ['Arbeitsweise', '/arbeitsweise/']];

const process = [
  ['Beobachten', 'Jede App beginnt bei einem konkreten Ablauf: dem Aufmaß auf der Baustelle, der Ablesung am Zähler. Wir verstehen erst die Aufgabe, dann die Technik.'],
  ['Reduzieren', 'Wir grenzen den Funktionsumfang bewusst ab. Was nicht gebraucht wird, wird nicht gebaut – damit die Bedienung ohne Einarbeitung verständlich bleibt.'],
  ['Entwickeln', 'Offline-first, lokale Datenspeicherung und eine schlanke Architektur sind von Anfang an gesetzt – nicht nachträglich ergänzt.'],
  ['Prüfen', 'Funktionen werden an realistischen Nutzungsszenarien getestet. Plausibilitätsprüfungen sorgen dafür, dass Ergebnisse nachvollziehbar bleiben.'],
  ['Pflegen', 'Nach der Veröffentlichung geht die Arbeit weiter: Rückmeldungen auswerten, Funktionen verbessern, Stabilität sichern.'],
];

const standards = [
  ['offline', 'Offline nutzbar', 'Die Kernfunktionen arbeiten ohne dauerhafte Internetverbindung. Für Käufe über Google Play und deren Prüfung kann eine Verbindung nötig sein.'],
  ['user', 'Kein Benutzerkonto', 'Keine Registrierung, kein Login, kein eigenes Cloud-Backend für Ihre Daten.'],
  ['shield', 'Datensparsam', 'Projekt- und Verbrauchsdaten bleiben lokal auf dem Gerät. Kein eigenes Tracking, keine Werbe- oder Nutzungsprofile.'],
  ['tag', 'Transparente Preise', 'Kostenlos starten. Pro ist ein einmaliger Kauf über Google Play – ohne Abo und ohne wiederkehrende Kosten.'],
  ['target', 'Ehrliche Ergebnisse', 'Schätzungen und Hochrechnungen werden als solche gekennzeichnet. Unplausible Werte werden nicht still übernommen.'],
  ['wrench', 'Wartbar gebaut', 'Schlanke Produkte bleiben stabil und lassen sich zuverlässig weiterentwickeln.'],
];

const examples = [
  [APPS.baurechner, 'Werte einmal erfassen, überall weiterverwenden: Das Aufmaß eines Raums fließt direkt in die passenden Rechner, in die Materialplanung und in die Kalkulation.'],
  [APPS.verbrauchsmonitor, 'Unplausible Folgestände werden nicht stillschweigend als korrekt übernommen, und aus fehlenden Messwerten entstehen keine künstlichen Messpunkte.'],
];

export default {
  path: '/arbeitsweise/',
  title: 'Arbeitsweise',
  description:
    'Wie MP Digital Labs eigene Apps entwickelt: vom konkreten Alltagsproblem über einen bewusst abgegrenzten Funktionsumfang bis zur laufenden Pflege – offline, ohne Konto, ohne Abo.',
  priority: 0.7,
  breadcrumbs: crumbs,
  body: `
<section class="phero night" aria-labelledby="page-title">
  <div class="aura" aria-hidden="true"></div>
  <div class="wrap phero__inner">
    ${breadcrumbs(crumbs)}
    <p class="eyebrow">Arbeitsweise</p>
    <h1 id="page-title" class="phero__title">Wie bei uns Software entsteht.</h1>
    <p class="lead">MP Digital Labs entwickelt und vertreibt ausschließlich eigene Softwareprodukte. Jede App entsteht aus einem konkreten Alltagsproblem – und wird so lange verfeinert, bis sie es zuverlässig löst.</p>
  </div>
</section>

<section class="section" aria-labelledby="prozess">
  <div class="wrap">
    ${sectionHead({
      label: 'Prozess',
      id: 'prozess',
      title: 'Fünf Schritte vom Problem zum Produkt.',
      lead: 'Neue Funktionen entstehen nicht als Selbstzweck. Sie werden priorisiert, getestet und an realistischen Nutzungsszenarien ausgerichtet.',
    })}
    ${steps(process, 'steps--5')}
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

<section class="section" aria-labelledby="praxis">
  <div class="wrap">
    ${sectionHead({
      label: 'Aus der Praxis',
      id: 'praxis',
      title: 'So zeigt sich das in unseren Apps.',
    })}
    <div class="compare">
      ${examples
        .map(
          ([a, t], i) => `<a class="acard acard--${a.key} reveal" style="--d:${i}" href="${a.path}">
        <div class="acard__top">${appIcon(a, 56)}${icon('arrow')}</div>
        <p class="acard__cat">${a.category}</p>
        <h3 class="acard__title">${a.name}</h3>
        <p class="acard__text" style="margin-bottom:0">${t}</p>
      </a>`
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
