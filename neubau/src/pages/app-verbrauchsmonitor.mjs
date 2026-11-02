import { SITE, APPS, PRICES_AS_OF } from '../lib/site.mjs';
import { icon, btn, link, sectionHead, appIcon, status, facts, faq, checklist, featureGrid, steps, breadcrumbs, playButton, ctaBand, numInput, shot, gallery, plans, proTag, mark } from '../lib/ui.mjs';

const app = APPS.verbrauchsmonitor;
const crumbs = [['Start', '/'], ['Apps', '/apps/'], [app.name, app.path]];

const features = [
  ['gauge', 'Zähler verwalten', 'Strom, Gas, Wasser und Wärme getrennt anlegen. Bis zu zwei Zähler sind kostenlos, mit Pro beliebig viele.'],
  ['calendar', 'Zählerstände', 'Messwerte mit Datum und optionaler Notiz erfassen. Unplausible Folgestände werden nicht still als korrekt übernommen.'],
  ['bell', 'Erinnerungen', 'Individuelle, lokale Ableseerinnerungen – damit regelmäßige Zählerstände nicht untergehen.'],
  ['chart', `Auswertungen${proTag()}`, 'Verbrauchsentwicklung nach Monaten und Jahren, Jahresvergleich, Trends und Hochrechnungen.'],
  ['euro', `Tarife & Kosten${proTag()}`, 'Grund- und Arbeitspreise hinterlegen und daraus klar gekennzeichnete Kostenschätzungen ableiten – ohne eine Versorgerabrechnung vorzutäuschen.'],
  ['backup', 'Backup', 'Lokale Sicherung als Datei an einem selbst gewählten Ort – mit Integritätsprüfung vor der Wiederherstellung.'],
];

const flow = [
  ['Zähler anlegen', 'Typ, Name, Einheit und bei Bedarf Zählernummer oder Startwert hinterlegen.'],
  ['Erinnerung einrichten', 'Ableseintervall, Tag und Uhrzeit festlegen – die App erinnert lokal an die nächste Ablesung.'],
  ['Zählerstand eintragen', 'Datum und Messwert erfassen und bei Bedarf eine Notiz ergänzen.'],
  ['Verlauf auswerten', 'Mit Pro Monats- und Jahresauswertungen, Trends und Hochrechnungen betrachten.'],
  ['Kosten einschätzen', 'Mit Pro Tarife mit Gültigkeitsbeginn hinterlegen und eine klar als Schätzung ausgewiesene Kostenentwicklung sehen.'],
  ['Verlauf sichern', 'Lokales Backup nutzen und vorhandene Daten bei Bedarf wiederherstellen.'],
];

const faqs = [
  ['Welche Zähler kann ich verwalten?', 'Strom, Gas, Wasser sowie Wärme beziehungsweise Heizung.'],
  ['Was ist kostenlos, was enthält Pro?', `Kostenlos verwalten Sie bis zu zwei Zähler, erfassen Zählerstände, nutzen Erinnerungen und Backups. Pro schaltet unbegrenzt viele Zähler sowie Auswertungen, Trends und Tarif- und Kostenanalysen frei – einmalig ${app.pricing.proPrice}, kein Abo.`],
  ['Brauche ich ein Benutzerkonto?', 'Nein. Für die Kernfunktionen ist kein MP-Digital-Labs-Konto erforderlich.'],
  ['Sind die Kostenwerte eine exakte Abrechnung?', 'Nein. Die Kostenanalyse (Pro) berechnet nachvollziehbare Schätzungen auf Basis Ihrer Eingaben und ersetzt keine Abrechnung des Versorgers.'],
  ['Wo finde ich die Datenschutzerklärung?', `Die vollständige <a class="inline-link" href="${app.privacy}">Datenschutzerklärung für VerbrauchsMonitor DE</a> ist jederzeit online abrufbar.`],
];

function demo() {
  return `<div class="demo reveal" data-demo="verbrauch">
    <div class="demo__form" role="group" aria-labelledby="demo-title">
      <p class="demo__label"><span>Eingabe</span><span>Ablesung</span></p>
      <fieldset class="seg" aria-label="Zählerart" style="border:0;margin:0;min-width:0">
        <label><input type="radio" name="medium" value="strom" checked><span>${icon('bolt')}Strom</span></label>
        <label><input type="radio" name="medium" value="gas"><span>${icon('flame')}Gas</span></label>
        <label><input type="radio" name="medium" value="wasser"><span>${icon('drop')}Wasser</span></label>
      </fieldset>
      ${numInput({ name: 'alt', label: 'Letzter Zählerstand', min: 0, max: 999999, step: 1, value: 18240, unit: 'kWh', range: false, dataUnit: 'unit' })}
      ${numInput({ name: 'neu', label: 'Aktueller Zählerstand', min: 0, max: 999999, step: 1, value: 18492, unit: 'kWh', range: false, dataUnit: 'unit' })}
      ${numInput({ name: 'tage', label: 'Tage seit letzter Ablesung', min: 1, max: 365, step: 1, value: 30, unit: 'Tage' })}
      ${numInput({ name: 'preis', label: 'Arbeitspreis', min: 0, max: 1000, step: 0.1, value: 32, unit: 'ct/kWh', range: false, dataUnit: 'price-unit' })}
    </div>
    <div class="demo__out">
      <div class="aura" aria-hidden="true"></div>
      <div class="odo" aria-hidden="true">
        <span class="odo__label">Zählerwerk</span>
        <span class="odo__digits">${'<span data-digit>0</span>'.repeat(6)}</span>
        <span class="odo__unit" data-unit>kWh</span>
      </div>
      <p class="note" data-warn hidden>${icon('shield')}<span><strong>Unplausibler Folgestand:</strong> Der aktuelle Zählerstand liegt unter dem letzten. Die App übernimmt solche Werte nicht stillschweigend als korrekt.</span></p>
      <div class="demo__res">
        <div class="demo__kpi demo__kpi--main" aria-live="polite"><span>Verbrauch im Zeitraum</span><strong><span data-out="verbrauch">252</span><small data-unit>kWh</small></strong></div>
        <div class="demo__kpi"><span>Ø pro Tag</span><strong><span data-out="tag">–</span><small data-unit>kWh</small></strong></div>
        <div class="demo__kpi"><span>Kosten (Schätzung)</span><strong><span data-out="kosten">–</span><small>€</small></strong></div>
        <div class="demo__kpi" style="grid-column:1/-1"><span>Hochrechnung auf ein Jahr (Schätzung)</span><strong><span data-out="jahr">–</span><small>€</small></strong></div>
      </div>
      <p class="demo__note" data-gas-note hidden>${icon('flame')}<span>Gas wird mit Beispielwerten von m³ in kWh umgerechnet (Brennwert 11,2 × Zustandszahl 0,95). In der App hinterlegen Sie die Werte Ihres Versorgers.</span></p>
      <p class="demo__note">${icon('sparkle')}<span>Vereinfachte Web-Demo ohne Grundpreis – keine Abbildung der App-Oberfläche. In der App (Pro) gelten Tarife mit Gültigkeitszeitraum, Kosten werden stets als Schätzung ausgewiesen.</span></p>
    </div>
  </div>`;
}

export default {
  path: app.path,
  title: 'VerbrauchsMonitor DE – Zählerstände & Verbrauch',
  description:
    'VerbrauchsMonitor DE erfasst Zählerstände für Strom, Gas, Wasser und Wärme offline und macht Verbrauch und Kosten nachvollziehbar – ohne Konto.',
  theme: 'verbrauchsmonitor',
  priority: 0.9,
  breadcrumbs: crumbs,
  ogImage: { src: '/assets/img/apps/vm-feature.jpg', w: 1024, h: 500, alt: 'VerbrauchsMonitor DE – Vorstellungsgrafik' },
  jsonld: [
    {
      '@type': 'MobileApplication',
      name: app.name,
      operatingSystem: 'Android',
      applicationCategory: 'UtilitiesApplication',
      description: app.summary,
      url: `${SITE.url}${app.path}`,
      downloadUrl: app.play,
      installUrl: app.play,
      inLanguage: 'de',
      image: `${SITE.url}${app.icon}`,
      screenshot: app.screenshots.map((_, i) => `${SITE.url}/assets/img/apps/vm-shot-${i + 1}-941.webp`),
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      publisher: { '@id': `${SITE.url}/#organization` },
    },
  ],
  body: `
<section class="phero prodhero" aria-labelledby="page-title">
  <div class="aura" aria-hidden="true"></div>
  <div class="wrap phero__inner">
    ${breadcrumbs(crumbs)}
    <div class="prodhero__grid">
      <div>
        <div class="prodhero__id">${appIcon(app, 72)}<div><span class="prodhero__cat">${app.category}</span>${status('live')}</div></div>
        <h1 id="page-title" class="phero__title">Verbrauch verstehen, ohne Tabellenchaos.</h1>
        <p class="lead"><strong>${app.name}</strong>: Zählerstände für Strom, Gas, Wasser und Wärme erfassen und die Verbrauchsentwicklung im Blick behalten – mit Pro inklusive Auswertungen und Kostenanalysen.</p>
        <div class="actions">${playButton(app, { size: 'lg' })}${btn(app.support, 'Hilfe & Support', { variant: 'secondary', size: 'lg' })}</div>
        <p class="maker">${mark(26)}<span>Eine App von <a href="/studio/">MP Digital Labs</a> aus Bielefeld</span></p>
      </div>
      <figure class="pshots">
        <div class="pshots__stage">
          <div class="rings" aria-hidden="true"></div>
          <div class="pshots__phone pshots__phone--a">${shot(app, 0, { sizes: '(max-width: 960px) 44vw, 250px', lazy: false })}</div>
          <div class="pshots__phone pshots__phone--b">${shot(app, 2, { sizes: '(max-width: 960px) 44vw, 250px', lazy: false })}</div>
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
      label: 'Funktionen',
      id: 'funktionen',
      title: 'Alles, was es für den Überblick braucht.',
      lead: 'Die App konzentriert sich auf eine einfache manuelle Erfassung und nachvollziehbare Auswertung – ohne eigenes Cloud-Konto und ohne unnötige Zusatzdienste.',
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
      title: 'Zwei Zählerstände. Ein klares Bild.',
      lead: 'Probieren Sie das Grundprinzip aus: Aus zwei Ablesungen werden Verbrauch, Tagesdurchschnitt und eine Kostenschätzung. Die Demo rechnet ausschließlich in Ihrem Browser – in der App sind Kostenanalysen Teil von Pro.',
    })}
    ${demo()}
  </div>
</section>

<section class="section section--alt" aria-labelledby="ablauf">
  <div class="wrap">
    ${sectionHead({
      index: '04',
      label: 'So funktioniert es',
      id: 'ablauf',
      title: 'In wenigen Schritten zum eigenen Verlauf.',
      lead: 'Keine automatische Datenquelle ist nötig. Sie entscheiden selbst, wann Sie welche Werte eintragen.',
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
      title: 'Einfach starten, bei Bedarf erweitern.',
      lead: 'Bis zu zwei Zähler verwalten Sie kostenlos. Pro schaltet unbegrenzt viele Zähler sowie Auswertungen und Kostenanalysen dauerhaft frei – als einmaliger Kauf ohne Abo.',
    })}
    ${plans(app, PRICES_AS_OF)}
  </div>
</section>

<section class="section section--alt" aria-labelledby="daten">
  <div class="wrap split">
    <div class="reveal">
      ${sectionHead({ index: '06', label: 'Datenschutz', id: 'daten', title: 'Die Verbrauchsdaten bleiben bei Ihnen.', cls: 'shead--stack' })}
      <div class="body-copy">
        <p>VerbrauchsMonitor DE ist <strong>offline-first</strong> aufgebaut. Für die Kernfunktionen ist kein MP-Digital-Labs-Konto und kein eigener Cloud-Dienst erforderlich.</p>
        <p class="note">${icon('shield')}<span>Die App erzeugt aus fehlenden Messwerten keine künstlichen Messpunkte. Hochrechnungen und Kostenschätzungen (Pro) werden als solche gekennzeichnet.</span></p>
      </div>
      <div class="actions" style="margin-top:28px">${link(app.privacy, 'Datenschutzerklärung VerbrauchsMonitor DE')}</div>
    </div>
    <div class="reveal" style="--d:1">
      <h2 class="h3" style="margin-bottom:12px">Häufige Fragen</h2>
      ${faq(faqs)}
    </div>
  </div>
</section>

${ctaBand({
  title: 'Den eigenen Verbrauch im Blick behalten.',
  text: 'VerbrauchsMonitor DE ist kostenlos bei Google Play erhältlich – Pro schalten Sie bei Bedarf einmalig frei. Fragen beantworten wir gern im Support-Bereich.',
  actions: `${playButton(app, { size: 'lg' })}${btn(app.support, 'Zum Support', { variant: 'secondary', size: 'lg' })}`,
})}
`,
};
