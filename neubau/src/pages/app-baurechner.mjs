import { SITE, APPS, PRICES_AS_OF } from '../lib/site.mjs';
import { icon, btn, link, sectionHead, appIcon, status, facts, faq, checklist, featureGrid, steps, breadcrumbs, playButton, ctaBand, numInput, shot, gallery, plans } from '../lib/ui.mjs';

const app = APPS.baurechner;
const crumbs = [['Start', '/'], ['Apps', '/apps/'], [app.name, app.path]];

const features = [
  ['folder', 'Projekte & Baustellen', 'Das Projekt als gemeinsame Arbeitsakte – mit Berechnungen, Material, Aufgaben, Notizen und Fotos. Beliebig viele Projekte mit Pro.'],
  ['ruler', 'Aufmaß', 'Räume und Wände strukturiert erfassen, Öffnungen berücksichtigen und gespeicherte Aufmaße in passenden Rechnern wiederverwenden.'],
  ['calc', '15 Rechner & Werkzeuge', 'Von Fläche & Volumen über Beton, Estrich und Mauerwerk bis Fliesen, Trockenbau, Holz, Dämmung und Treppen – alle in der kostenlosen Version.'],
  ['box', 'Materialplanung', 'Berechnungsergebnisse in konkrete Materialmengen überführen und benötigte Gebinde oder Mengen nachvollziehbar planen.'],
  ['euro', 'Kosten & Kalkulation', 'Arbeitszeit, weitere Kosten, Aufschlag und Mehrwertsteuer zusammenführen und den Projektstand nachvollziehbar kalkulieren.'],
  ['doc', 'Dokumentation', 'Notizen, Aufgaben und lokale Baustellenfotos direkt am Projekt halten. Pro ergänzt das Projekt-PDF und den CSV-Export der Einkaufsliste.'],
];

const flow = [
  ['Projekt anlegen', 'Baustelle oder Renovierung als eigenes Projekt starten und die relevanten Daten an einem Ort sammeln.'],
  ['Aufmaß erfassen', 'Räume, Wände und Öffnungen strukturiert aufnehmen und als Grundlage für weitere Berechnungen nutzen.'],
  ['Berechnen', 'Passenden Rechner wählen und die gespeicherten Maße direkt weiterverwenden.'],
  ['Material ableiten', 'Aus den Berechnungen Materialmengen und Gebinde ableiten und den Einkauf vorbereiten.'],
  ['Kosten kalkulieren', 'Material, Arbeitszeit und weitere Kosten zu einer nachvollziehbaren Projektkalkulation zusammenführen.'],
  ['Dokumentieren', 'Notizen, Aufgaben und Fotos ergänzen; mit Pro zusätzlich ein Projekt-PDF erzeugen und teilen.'],
];

// Rechnerkatalog der App (CalculatorCatalog, Version 1.0.0-rc14)
const calculators = ['Fläche & Volumen', 'Gefälle & Höhe', 'Treppen-Vorplanung', 'Mischungsverhältnis', 'Beton', 'Mauerwerk', 'Estrich', 'Mörtel', 'Putz', 'Pflaster', 'Fliesen', 'Trockenbau', 'Farbe', 'Holz', 'Dämmung'];

const faqs = [
  ['Brauche ich ein Benutzerkonto?', 'Nein. Für die Nutzung der Kernfunktionen ist kein Benutzerkonto bei MP Digital Labs erforderlich.'],
  ['Funktioniert die App ohne Internet?', 'Die eigentliche Projektarbeit, Berechnungen und lokale Datenspeicherung funktionieren offline. Für Google-Play-Käufe und deren Prüfung kann eine Verbindung erforderlich sein.'],
  ['Was passiert mit meinen Baustellenfotos?', 'Ausgewählte Fotos werden lokal in den App-Bereich übernommen und nicht automatisch auf Server von MP Digital Labs hochgeladen.'],
  ['Was ist in der kostenlosen Version enthalten?', 'Sie legen einmalig ein Projekt und ein Aufmaß an – beides bleibt dauerhaft bearbeitbar. Alle 15 Rechner, Materialplanung, Kalkulation, Fotos, Notizen sowie Backup und Wiederherstellung stehen ebenfalls zur Verfügung.'],
  ['Ist BauRechner Pro ein Abo?', `Nein. Pro ist ein einmaliger Kauf über Google Play (derzeit ${app.pricing.proPrice}). Für die regelmäßige Bestätigung des Kaufs kann eine Verbindung zu Google Play erforderlich sein.`],
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
      <div class="aura" aria-hidden="true"></div>
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
      <p class="demo__note">${icon('sparkle')}<span>Vereinfachte Web-Demo ohne Öffnungen – keine Abbildung der App-Oberfläche. In der App werden Aufmaße im Projekt gespeichert, Öffnungen berücksichtigt und die Werte in passenden Rechnern weiterverwendet.</span></p>
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
  ogImage: { src: '/assets/img/apps/br-feature.jpg', w: 1024, h: 500, alt: 'BauRechner DE – Vorstellungsgrafik' },
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
      image: `${SITE.url}${app.icon}`,
      screenshot: app.screenshots.map((_, i) => `${SITE.url}/assets/img/apps/br-shot-${i + 1}-941.webp`),
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      publisher: { '@id': `${SITE.url}/#organization` },
    },
  ],
  body: `
<section class="phero night prodhero" aria-labelledby="page-title">
  <div class="aura" aria-hidden="true"></div>
  <div class="wrap phero__inner">
    ${breadcrumbs(crumbs)}
    <div class="prodhero__grid">
      <div>
        <div class="prodhero__id">${appIcon(app, 72)}<div><span class="prodhero__cat">${app.category}</span>${status('live')}</div></div>
        <h1 id="page-title" class="phero__title">Vom Aufmaß bis zur Dokumentation.</h1>
        <p class="lead"><strong>${app.name}</strong> bündelt Aufmaß, Berechnungen, Material, Einkauf, Kalkulation und Projektdokumentation in einer App – für Handwerk, Renovierung und Bauprojekte.</p>
        <div class="actions">${playButton(app, { size: 'lg' })}${btn(app.support, 'Hilfe & Support', { variant: 'secondary', size: 'lg' })}</div>
      </div>
      <figure class="pshots">
        <div class="pshots__stage">
          <div class="rings" aria-hidden="true"></div>
          <div class="pshots__phone pshots__phone--a">${shot(app, 0, { sizes: '(max-width: 960px) 44vw, 250px', lazy: false })}</div>
          <div class="pshots__phone pshots__phone--b">${shot(app, 3, { sizes: '(max-width: 960px) 44vw, 250px', lazy: false })}</div>
        </div>
        <figcaption>${icon('play', 'ico--fill')}Original-Screenshots aus Google Play</figcaption>
      </figure>
    </div>
    <div class="factstrip" aria-label="Produktinformationen">${facts(app.facts)}</div>
  </div>
</section>

<section class="section" aria-labelledby="funktionen">
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

<section class="section night" aria-labelledby="einblicke">
  <div class="aura" aria-hidden="true"></div>
  <div class="wrap">
    ${sectionHead({
      index: '02',
      label: 'Einblicke',
      id: 'einblicke',
      title: 'So sieht die App aus.',
      lead: 'Die offiziellen Screenshots aus dem Google-Play-Eintrag. Zum Vergrößern einfach antippen – mit den Pfeiltasten blättern Sie durch alle Bilder.',
    })}
  </div>
  <div class="wrap wrap--bleed">${gallery(app)}</div>
</section>

<section class="section" aria-labelledby="demo-title">
  <div class="wrap">
    ${sectionHead({
      index: '03',
      label: 'Ausprobieren',
      id: 'demo-title',
      title: 'Ein Raum, fünf Kennzahlen.',
      lead: 'So fühlt sich das Prinzip an: Maße einmal eingeben, alle abgeleiteten Werte sofort sehen. Diese kleine Demo rechnet direkt in Ihrem Browser – es werden keine Daten übertragen.',
    })}
    ${demo()}
    <div class="reveal" style="margin-top:48px">
      <p class="eyebrow">Alle 15 Rechner der App</p>
      <ul class="chips">${calculators.map((c) => `<li class="chip">${icon('calc')}${c}</li>`).join('')}</ul>
    </div>
  </div>
</section>

<section class="section section--alt" aria-labelledby="ablauf">
  <div class="wrap">
    ${sectionHead({
      index: '04',
      label: 'Arbeitsablauf',
      id: 'ablauf',
      title: 'Werte einmal erfassen. Überall weiterverwenden.',
      lead: 'Die einzelnen Bereiche sind miteinander verbunden, damit Werte nicht ständig neu eingetragen werden müssen.',
    })}
    ${steps(flow)}
  </div>
</section>

<section class="section" aria-labelledby="preise">
  <div class="wrap">
    ${sectionHead({
      index: '05',
      label: 'Kostenlos & Pro',
      id: 'preise',
      title: 'Kostenlos starten. Pro bei Bedarf.',
      lead: 'Die kostenlose Version enthält alle 15 Rechner, Materialplanung und Kalkulation für ein Projekt. Pro ergänzt unbegrenzte Projekte, Exporte und Budgetfunktionen – als einmaliger Kauf ohne Abo.',
    })}
    ${plans(app, PRICES_AS_OF)}
  </div>
</section>

<section class="section section--alt" aria-labelledby="daten">
  <div class="wrap split">
    <div class="reveal">
      ${sectionHead({ index: '06', label: 'Offline & Daten', id: 'daten', title: 'Für den Einsatz vor Ort gedacht.', cls: 'shead--stack' })}
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
  text: 'BauRechner DE ist kostenlos bei Google Play erhältlich – Pro schalten Sie bei Bedarf einmalig frei. Fragen beantworten wir gern im Support-Bereich.',
  actions: `${playButton(app, { size: 'lg' })}${btn(app.support, 'Zum Support', { variant: 'secondary', size: 'lg' })}`,
})}
`,
};
