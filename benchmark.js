// StratoVerticale — Modulo Benchmark Settoriale
// Versione 0.1 — Prima bozza
// Sessione 4 — 2 maggio 2026
//
// Questo modulo contiene i valori di riferimento del settore edilizia/impiantistica
// italiana per PMI (fatturato 100k–5M). Serve a contestualizzare i KPI calcolati
// dai Moduli A, B e C — non basta sapere il tuo numero, bisogna sapere se è buono
// o cattivo rispetto al settore.
//
// LEGENDA AFFIDABILITÀ:
//   ✅ VERIFICATO   — fonte primaria citata
//   ⚠️ INFERENZA    — ragionamento fondato, non ancora verificato da fonte primaria
//   ❌ PLACEHOLDER  — dato mancante, da aggiornare nella prossima sessione
//
// FONTI USATE:
//   - FNC Osservatorio Bilanci Focus Costruzioni, marzo 2026 (bilanci 2024, 83k società)
//   - Allianz Trade — DSO per settore
//   - iCRIBIS — DSO settore costruzioni
//   - YouBuild / Rapporto Classifiche 2024 — redditività imprese edili
//   - softwarebusinessplan.it — margine lordo commessa (fonte non primaria)
//
// DA AGGIORNARE nelle prossime sessioni:
//   - EBITDA margin PMI: leggere tabelle finali PDF FNC + ISTAT SBS settore F
//   - Incidenza costo lavoro/fatturato: ISTAT SBS settore F
//   - Rapporto subappalto/fatturato: interviste Binario B

const benchmarkEdilizia = {

  // ─── LIVELLO 1 — DIAGNOSTICA LIQUIDITÀ ───────────────────────────────────

  // DSO — Days Sales Outstanding (Giorni medi di incasso)
  // ✅ VERIFICATO — Fonti: Allianz Trade, iCRIBIS
  dso: {
    mediaSettore: 80,        // giorni — soglia "normale" per il settore
    sogliaAttenzione: 90,    // giorni — sopra questa soglia: monitorare
    sogliaAllarme: 120,      // giorni — sopra questa soglia: rischio liquidità
    note: "80 giorni è considerato normale per edilizia/meccanica. Media generale italiana: 65 giorni.",
    affidabilita: "VERIFICATO",
  },

  // DPO — Days Payable Outstanding (Giorni medi di pagamento fornitori)
  // ❌ PLACEHOLDER — benchmark specifico settore non trovato
  dpo: {
    mediaSettore: null,      // da aggiornare — ISTAT SBS o interviste
    note: "Benchmark specifico non trovato. Il delta DSO-DPO è il dato più rilevante.",
    affidabilita: "PLACEHOLDER",
  },

  // Current Ratio — Indice di liquidità corrente
  // ⚠️ INFERENZA — soglia 1.0 è convenzionale, non specifica per edilizia
  currentRatio: {
    sogliaMinima: 1.0,       // sotto questa soglia: segnale critico
    mediaSettore: null,      // ❌ da verificare con fonte primaria
    note: "Soglia 1.0 è convenzionale. Benchmark PMI edilizie da verificare.",
    affidabilita: "INFERENZA",
  },

  // ─── LIVELLO 2 — PERFORMANCE AZIENDALE ───────────────────────────────────

  // EBITDA Margin
  // ⚠️ INFERENZA — stima 5-8% per PMI, non ancora verificata da fonte primaria
  // Dato parziale verificato: valore aggiunto/ricavi PMI costruzioni = 36,2% (FNC 2024)
  // Il 36,2% include ancora il costo del lavoro — non è EBITDA ma è verificato ✅
  ebitdaMargin: {
    stimaPMI: { min: 5, max: 8 },     // % — inferenza per PMI generaliste
    valoreAggiunto: 36.2,              // % ricavi — ✅ VERIFICATO FNC 2024 (83k società)
    note: "Stima 5-8% è inferenza. Valore aggiunto/ricavi 36,2% è verificato FNC 2024. EBITDA specifico da estrarre da tabelle FNC o ISTAT SBS.",
    affidabilita: "INFERENZA",
  },

  // Incidenza costo lavoro su fatturato
  // ❌ PLACEHOLDER — i dati trovati riguardano il costo per progetto, non il bilancio aziendale
  incidenzaCostoLavoro: {
    mediaSettore: null,      // da aggiornare — ISTAT SBS settore F
    note: "Dati trovati (20-40%) riguardano incidenza sul singolo progetto, non sul fatturato aziendale. Concetti diversi. Fonte corretta: ISTAT SBS settore F (Costruzioni).",
    affidabilita: "PLACEHOLDER",
  },

  // Rapporto subappalto/fatturato
  // ⚠️ INFERENZA — nessuna fonte pubblica misura questo KPI per PMI
  rapportoSubappalto: {
    stimaPMI: { min: 15, max: 35 },   // % — inferenza logica
    note: "Nessuna fonte pubblica verificabile. Da validare con interviste Binario B. KPI critico per la differenziazione del prodotto.",
    affidabilita: "INFERENZA",
  },

  // Margine lordo di commessa
  // ⚠️ INFERENZA — fonte non primaria (softwarebusinessplan.it)
  margineLordoCommessa: {
    stimaPMI: { min: 25, max: 35 },   // % sul fatturato
    margineNettoStima: { min: 5, max: 12 }, // % — dopo costi fissi
    note: "Fonte non primaria. Da confermare con FNC o Cerved.",
    affidabilita: "INFERENZA",
  },

  // ROI e ROE — dati FNC verificati ma aggregati (non solo PMI)
  // ✅ VERIFICATO per il campione aggregato FNC 2024
  redditivita: {
    roi2024: 18.2,           // % — aggregato 83k società settore costruzioni
    roe2024: 17.6,           // % — aggregato 83k società settore costruzioni
    note: "Dati FNC 2024 aggregati su tutte le classi dimensionali. Non specifici per PMI sotto 5M. ROI e ROE calcolati solo su società con patrimonio netto e utile positivi (88,3% del campione).",
    affidabilita: "VERIFICATO — aggregato, non specifico per PMI",
  },

};

// FUNZIONE DI CONFRONTO
// Riceve i risultati dei moduli B e C e li confronta con i benchmark
function confrontaBenchmark(risultatoLiquidita, risultatoPerformance) {

  const confronto = {};

  // DSO
  const dso = parseFloat(risultatoLiquidita.dso);
  if (dso <= benchmarkEdilizia.dso.mediaSettore) {
    confronto.dso = { valore: dso, stato: "BUONO", messaggio: `DSO di ${dso} giorni — sotto la media di settore (${benchmarkEdilizia.dso.mediaSettore} giorni)` };
  } else if (dso <= benchmarkEdilizia.dso.sogliaAttenzione) {
    confronto.dso = { valore: dso, stato: "ATTENZIONE", messaggio: `DSO di ${dso} giorni — sopra la media di settore (${benchmarkEdilizia.dso.mediaSettore} giorni)` };
  } else if (dso <= benchmarkEdilizia.dso.sogliaAllarme) {
    confronto.dso = { valore: dso, stato: "CRITICO", messaggio: `DSO di ${dso} giorni — soglia critica superata` };
  } else {
    confronto.dso = { valore: dso, stato: "ALLARME", messaggio: `DSO di ${dso} giorni — rischio liquidità elevato` };
  }

  // Current Ratio
  const cr = parseFloat(risultatoLiquidita.currentRatio);
  if (cr >= benchmarkEdilizia.currentRatio.sogliaMinima) {
    confronto.currentRatio = { valore: cr, stato: "BUONO", messaggio: `Current Ratio ${cr} — sopra la soglia minima di 1.0` };
  } else {
    confronto.currentRatio = { valore: cr, stato: "CRITICO", messaggio: `Current Ratio ${cr} — sotto 1.0: l'impresa non copre le uscite a breve` };
  }

  // EBITDA Margin
  const ebitda = parseFloat(risultatoPerformance.ebitdaMargin);
  const { min, max } = benchmarkEdilizia.ebitdaMargin.stimaPMI;
  if (ebitda >= max) {
    confronto.ebitdaMargin = { valore: ebitda, stato: "OTTIMO", messaggio: `EBITDA Margin ${ebitda}% — sopra la stima di settore (${min}–${max}%) ⚠️ benchmark non verificato` };
  } else if (ebitda >= min) {
    confronto.ebitdaMargin = { valore: ebitda, stato: "NELLA MEDIA", messaggio: `EBITDA Margin ${ebitda}% — nella stima di settore (${min}–${max}%) ⚠️ benchmark non verificato` };
  } else {
    confronto.ebitdaMargin = { valore: ebitda, stato: "SOTTO MEDIA", messaggio: `EBITDA Margin ${ebitda}% — sotto la stima di settore (${min}–${max}%) ⚠️ benchmark non verificato` };
  }

  return confronto;
}

// ESEMPIO
const { analizzaLiquidita } = require("./liquidita");
const { analizzaPerformance } = require("./performance");

const aziendaEsempio = {
  fatturato: 500000,
  acquisti: 200000,
  creditiClienti: 120000,
  debitiFornitori: 40000,
  attivitaCorrenti: 180000,
  passivitaCorrenti: 160000,
  ebitda: 35000,
  costoLavoro: 140000,
  costoSubappalti: 120000,
};

const liquidita = analizzaLiquidita(aziendaEsempio);
const performance = analizzaPerformance(aziendaEsempio);
const confronto = confrontaBenchmark(liquidita, performance);

console.log("=== CONFRONTO BENCHMARK SETTORIALE ===");
console.log("DSO:          ", confronto.dso.stato, "—", confronto.dso.messaggio);
console.log("Current Ratio:", confronto.currentRatio.stato, "—", confronto.currentRatio.messaggio);
console.log("EBITDA Margin:", confronto.ebitdaMargin.stato, "—", confronto.ebitdaMargin.messaggio);

module.exports = { benchmarkEdilizia, confrontaBenchmark };