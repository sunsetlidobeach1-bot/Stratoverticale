// StratoVerticale — Modulo Benchmark Settoriale
// Versione 0.1 — Prima bozza
// Sessione 4 — 2 maggio 2026
//
// LEGENDA AFFIDABILITÀ:
//   ✅ VERIFICATO   — fonte primaria citata
//   ⚠️ INFERENZA    — ragionamento fondato, non ancora verificato da fonte primaria
//   ❌ PLACEHOLDER  — dato mancante, da aggiornare
//
// FONTI:
//   - FNC Osservatorio Bilanci Focus Costruzioni, marzo 2026
//   - Allianz Trade — DSO per settore
//   - iCRIBIS — DSO settore costruzioni

const benchmarkEdilizia = {

  dso: {
    mediaSettore: 80,
    sogliaAttenzione: 90,
    sogliaAllarme: 120,
    note: "80 giorni è considerato normale per edilizia/meccanica. Media generale italiana: 65 giorni.",
    affidabilita: "VERIFICATO",
  },

  dpo: {
    mediaSettore: null,
    note: "Benchmark specifico non trovato. Il delta DSO-DPO è il dato più rilevante.",
    affidabilita: "PLACEHOLDER",
  },

  currentRatio: {
    sogliaMinima: 1.0,
    mediaSettore: null,
    note: "Soglia 1.0 è convenzionale. Benchmark PMI edilizie da verificare.",
    affidabilita: "INFERENZA",
  },

  ebitdaMargin: {
    stimaPMI: { min: 5, max: 8 },
    valoreAggiunto: 36.2,
    note: "Stima 5-8% è inferenza. Valore aggiunto/ricavi 36,2% è verificato FNC 2024.",
    affidabilita: "INFERENZA",
  },

  incidenzaCostoLavoro: {
    mediaSettore: null,
    note: "Stima derivata 28-30% (inferenza per sottrazione da dati FNC). Da verificare con ISTAT SBS settore F.",
    affidabilita: "PLACEHOLDER",
  },

  rapportoSubappalto: {
    stimaPMI: { min: 15, max: 35 },
    note: "Nessuna fonte pubblica verificabile. Da validare con interviste.",
    affidabilita: "INFERENZA",
  },

  margineLordoCommessa: {
    stimaPMI: { min: 25, max: 35 },
    note: "Fonte non primaria. Da confermare con FNC o Cerved.",
    affidabilita: "INFERENZA",
  },

  redditivita: {
    roi2024: 18.2,
    roe2024: 17.6,
    note: "Dati FNC 2024 aggregati su tutte le classi dimensionali. Non specifici per PMI sotto 5M.",
    affidabilita: "VERIFICATO — aggregato, non specifico per PMI",
  },

};

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

module.exports = { benchmarkEdilizia, confrontaBenchmark };