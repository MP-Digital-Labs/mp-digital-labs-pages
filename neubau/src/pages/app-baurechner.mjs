import { SITE, APPS } from '../lib/site.mjs';
import { icon, btn, link, sectionHead, appIcon, status, facts, faq, checklist, featureGrid, steps, breadcrumbs, playButton, ctaBand, numInput } from '../lib/ui.mjs';

const app = APPS.baurechner;
const crumbs = [['Start', '/'], ['Apps', '/apps/'], [app.name, app.path]];

const features = [
  ['folder', 'Projekte & Baustellen', 'Mehrere Projekte als gemeinsame Arbeitsakte verwalten – mit Berechnungen, Material, Aufgaben, Notizen und Fotos.'],
  ['ruler', 'Aufmaß', 'Räume und Wände strukturiert erfassen, Öffnungen berücksichtigen und gespeicherte Aufmaße in passenden Rechnern wiederverwenden.'],
  ['calc', '15 Rechner & Werkzeuge', 'Unter anderem für Fläche, Volumen, Beton, Mauerwerk, Estrich, Putz, Pflaster, Fliesen, Trockenbau, Farbe, Dämmung, Gefälle und Treppen.'],
  ['box', 'Materialplanung', 'Berechnungsergebnisse in konkrete Materialmengen überführen und benötigte Gebinde oder Mengen nachvollziehbar planen.'],
  ['euro', 'Kosten & Kalkulation', 'Arbeitszeit, weitere Kosten, Aufschlag und Mehrwertsteuer zusammenführen und den Projektstand nachvollziehbar kalkulieren.'],
  ['doc', 'Dokumentation', 'Notizen, Aufgaben und lokale Baustellenfotos direkt am Projekt halten. Pro erweitert die Dokumentation um PDF- und CSV-Exporte.'],
];

const flow = [
  ['Projekt anlegen', 'Baustelle oder Renovierung als eigenes Projekt starten und die relevanten Daten an einem Ort sammeln.'],
  ['Aufmaß erfassen', 'Räume, Wände und Öffnungen strukturiert aufnehmen und als Grundlage für weitere Berechnungen nutzen.'],
  ['Berechnen', 'Passenden Rechner wählen und die gespeicherten Maße direkt weiterverwenden.'],
  ['Material ableiten', 'Aus den Berechnungen Materialmengen und Gebinde ableiten und den Einkauf vorbereiten.'],
  ['Kosten kalkulieren', 'Material, Arbeitszeit und weitere Kosten zu einer nachvollziehbaren Projektkalkulation zusammenführen.'],
  ['Dokumentieren', 'Notizen, Aufgaben und Fotos ergänzen; mit Pro zusätzlich strukturierte Exporte für die weitere Nutzung erzeugen.'],
];

const calculators = ['Fläche', 'Volumen', 'Beton', 'Mauerwerk', 'Estrich', 'Putz', 'Pflaster', 'Fliesen', 'Trockenbau', 'Farbe', 'Dämmung', 'Gefälle', 'Treppen'];

const faqs = [
  ['Brauche ich ein Benutzerkonto?', 'Nein. Für die Nutzung der Kernfunktionen ist kein Benutzerkonto bei MP Digital Labs erforderlich.'],
  ['Funktioniert die App ohne Internet?', 'Die eigentliche Projektarbeit, Berechnungen und lokale Datenspeicherung funktionieren offline. Für Google-Play-Käufe und deren Prüfung kann eine Verbindung erforderlich sein.'],
  ['Was passiert mit meinen Baustellenfotos?', 'Ausgewählte Fotos werden lokal in den App-Bereich übernommen und nicht automatisch auf Server von MP Digital Labs hochgeladen.'],
  ['Werden bestehende Projekte gesperrt, wenn ich das kostenlose Limit erreiche?', 'Nein. Das Limit betrifft das Anlegen weiterer Projekte. Bereits vorhandene Projekte bleiben weiter bearbeitbar.'],
  ['Wo finde ich die Datenschutzerklärung?', `Die vollständige <a class="inline-link" href="${app.privacy}">Datenschutzerklärung für BauRechner DE</a> ist jederzeit online abrufbar.`],
];

function demo() {
  return `<div class="demo reveal" data-demo="aufmass">
    <div class="demo__form" role="group" aria-labelledby="demo-title">
      <p class="demo__label"><span>Eingabe</span><span>Raum 01</span></p>
      ${numInput({ name: 'laenge', label: 'Länge', min: 0.5, max: 15, step: 0.05, value: 5.85, unit: 'm' })}
      ${numInput({ name: 'breite', label: 'Breite', min: 0.5, max: 15, step: 0.05, value: 4.2, unit: 'm' })}
      ${numInput({ name: 'hoehe', label: 'Raumhöhe', min: 2, max: 4, step: 0.05, value: 2.5, unit: 'm' })}
      <label class="toggle"><span>10 % Verschnitt einrechnen<small>z. B. für Fliesen oder Bodenbelag</small></span><input type="checkbox" name="verschnitt" checked><span class="toggle__ui" aria-hidden="true"></span></label>
    </div>
    <div class="demo__out">
      <div class="grid-bg"></div>
      <div class="demo__fig" aria-hidden="true">
        <svg viewBox="0 0 360 190">
          <rect class="room" x="40" y="20" width="280" height="150" rx="2"/>
          <path class="dl dl-top" d=""/>
          <path class="dl dl-left" d=""/>
          <text class="t-top" text-anchor="middle"></text>
          <text class="t-left" text-anchor="middle"></text>
          <text class="t-area" text-anchor="middle" style="fill:var(--ink)"></text>
        </svg>
      </div>
      <div class="demo__res">
        <div class="demo__kpi demo__kpi--main" aria-live="polite"><span>Bodenfläche</span><strong><span data-out="flaeche">24,57</span><small>m²</small></strong></div>
        <div class="demo__kpi"><span>Umfang</span><strong><span data-out="umfang">–</span><small>m</small></strong></div>
        <div class="demo__kpi"><span>Wandfläche</span><strong><span data-out="wand">–</span><small>m²</small></strong></div>
        <div class="demo__kpi"><span>Material inkl. Verschnitt</span><strong><span data-out="material">–</span><small>m²</small></strong></div>
        <div class="demo__kpi"><span>Raumvolumen</span><strong><span data-out="volumen">–</span><small>m³</small></strong></div>
      </div>
      <p class="demo__note">${icon('sparkle')}<span>Vereinfachte Web-Demo ohne Öffnungen. In der App werden Aufmaße im Projekt gespeichert, Öffnungen berücksichtigt und die Werte in passenden Rechnern weiterverwendet.</span></p>
    </div>
  </div>`;
}

export default {
  path: app.path,
  title: 'BauRechner DE – App für Aufmaß & Kalkulation',
  description:
    'BauRechner DE bündelt Aufmaß, 15 Rechner, Materialplanung, Kosten und Projektdokumentation in einer Android-App für Bau und Handwerk – offline und ohne Konto.',
  theme: 'baurechner',
  priority: 0.9,
  breadcrumbs: crumbs,
  jsonld: [
    {
      '@type': 'MobileApplication',
      name: app.name,
      operatingSystem: 'Android',
      applicationCategory: 'BusinessApplication',
      description: app.summary,
      url: `${SITE.url}${app.path}`,
      downloadUrl: app.play,
      installUrl: app.play,
      inLanguage: 'de',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      publisher: { '@id': `${SITE.url}/#organization` },
    },
  ],
  body: `
<section class="phero prodhero" aria-labelledby="page-title">
  <div class="grid-bg"></div>
  <div class="wrap phero__inner">
    ${breadcrumbs(crumbs)}
    <div class="prodhero__grid">
      <div>
        <div class="prodhero__id">${appIcon(app, 72)}<div><span class="prodhero__cat">${app.category}</span>${status('live')}</div></div>
        <h1 id="page-title" class="phero__title">Vom Aufmaß bis zur Dokumentation.</h1>
        <p class="lead"><strong style="color:var(--ink);font-weight:600">${app.name}</strong> bündelt Aufmaß, Berechnungen, Material, Einkauf, Kalkulation und Projektdokumentation in einer App – für Handwerk, Renovierung und Bauprojekte.</p>
        <div class="actions">${playButton(app, { size: 'lg' })}${btn(app.support, 'Hilfe & Support', { variant: 'secondary', size: 'lg' })}</div>
      </div>
      <aside aria-label="Produktinformationen">
        <div class="facts">
          <div class="facts-card__head"><span>Produktinfo</span><span>${app.short}</span></div>
          ${facts(app.facts)}
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="section section--line" aria-labelledby="funktionen">
  <div class="wrap">
    ${sectionHead({
      index: '01',
      label: 'Was die App abdeckt',
      id: 'funktionen',
      title: 'Ein durchgängiger Ablauf statt einzelner Taschenrechner.',
      lead: 'Der Kern ist bewusst als Arbeitskette gedacht: Aufmaß aufnehmen, Werte weiterverwenden, Material ableiten, Kosten kalkulieren und das Projekt sauber dokumentieren.',
    })}
    ${featureGrid(features)}
  </div>
</section>

<section class="section section--alt" aria-labelledby="demo-title">
  <div class="wrap">
    ${sectionHead({
      index: '02',
      label: 'Ausprobieren',
      id: 'demo-title',
      title: 'Ein Raum, fünf Kennzahlen.',
      lead: 'So fühlt sich das Prinzip an: Maße einmal eingeben, alle abgeleiteten Werte sofort sehen. Diese kleine Demo rechnet direkt in Ihrem Browser – es werden keine Daten übertragen.',
    })}
    ${demo()}
    <div class="chips reveal" style="margin-top:32px" aria-label="Rechner in BauRechner DE (Auswahl)">
      ${calculators.map((c) => `<span class="chip">${icon('calc')}${c}</span>`).join('')}
      <span class="chip" style="border-style:dashed">u. a. – insgesamt 15 Rechner &amp; Werkzeuge</span>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="ablauf">
  <div class="wrap">
    ${sectionHead({
      index: '03',
      label: 'Arbeitsablauf',
      id: 'ablauf',
      title: 'Werte einmal erfassen. Überall weiterverwenden.',
      lead: 'Die einzelnen Bereiche sind miteinander verbunden, damit Werte nicht ständig neu eingetragen werden müssen.',
    })}
    ${steps(flow)}
  </div>
</section>

<section class="section section--line" aria-labelledby="preise">
  <div class="wrap">
    ${sectionHead({
      index: '04',
      label: 'Free & Pro',
      id: 'preise',
      title: 'Die Basis bleibt nutzbar. Pro ergänzt Komfort.',
      lead: 'Die kostenlosen Kernfunktionen werden nicht künstlich unbrauchbar gemacht. Pro erweitert vor allem Vergleich, Export, Budget und Projektanzahl.',
    })}
    <div class="compare">
      <article class="plan reveal">
        <p class="plan__label">Kostenlos</p>
        <h3 class="plan__title">BauRechner DE</h3>
        <p class="plan__price">Kostenlose Basis – ohne Konto, ohne Abo</p>
        ${checklist(['alle Rechner und Werkzeuge', 'Aufmaß und Materialplanung', 'Preisgedächtnis und normale Kalkulation', 'Fotos, Notizen und Aufgaben', 'Backup und Wiederherstellung', 'bis zu zwei Projekte'])}
      </article>
      <article class="plan plan--pro reveal" style="--d:1">
        <p class="plan__label">Einmaliger Kauf</p>
        <h3 class="plan__title">BauRechner Pro</h3>
        <p class="plan__price">Einmaliger In-App-Kauf über Google Play</p>
        ${checklist(['Berechnungsvarianten vergleichen', 'Zielbudget, Planung und Ist-Ausgaben verfolgen', 'Einkaufsliste teilen und als CSV exportieren', 'Projekt-PDF erzeugen', 'Berechnungsergebnisse teilen', 'Projekte als Varianten kopieren', 'unbegrenzt neue Projekte anlegen'])}
      </article>
    </div>
  </div>
</section>

<section class="section section--alt" aria-labelledby="daten">
  <div class="wrap split">
    <div class="reveal">
      ${sectionHead({ index: '05', label: 'Offline & Daten', id: 'daten', title: 'Für den Einsatz vor Ort gedacht.', cls: 'shead--stack' })}
      <div class="body-copy">
        <p>BauRechner DE benötigt für seine Kernfunktionen <strong>kein MP-Digital-Labs-Konto</strong> und <strong>kein eigenes Cloud-Backend</strong>. Projekt-, Material-, Foto- und Eingabedaten werden lokal auf dem Gerät gespeichert.</p>
        <p class="note">${icon('shield')}<span>Backups und Exporte werden nur durch eine bewusste Aktion des Nutzers erstellt und an einen selbst gewählten Speicherort oder eine andere App übergeben.</span></p>
      </div>
      <div class="actions" style="margin-top:28px">${link(app.privacy, 'Datenschutzerklärung BauRechner DE')}</div>
    </div>
    <div class="reveal" style="--d:1">
      <h2 class="h3" style="margin-bottom:12px">Häufige Fragen</h2>
      ${faq(faqs)}
    </div>
  </div>
</section>

${ctaBand({
  title: 'Bereit für die nächste Baustelle?',
  text: 'BauRechner DE ist kostenlos bei Google Play erhältlich. Fragen beantworten wir gern im Support-Bereich.',
  actions: `${playButton(app, { size: 'lg' })}${btn(app.support, 'Zum Support', { variant: 'secondary', size: 'lg' })}`,
})}
`,
};
