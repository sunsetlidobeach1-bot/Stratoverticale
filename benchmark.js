// StratoVerticale — Modulo Benchmark Settoriale
// Versione 0.2 — Sessione 5 — 3 maggio 2026

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
  const righe = [];

  const dso = parseFloat(risultatoLiquidita.dso);
  if (dso <= benchmarkEdilizia.dso.mediaSettore) {
    righe.push(`✅  DSO [BUONO] — ${dso} giorni, sotto la media settore (${benchmarkEdilizia.dso.mediaSettore})`);
  } else if (dso <= benchmarkEdilizia.dso.sogliaAttenzione) {
    righe.push(`⚠️  DSO [ATTENZIONE] — ${dso} giorni, sopra media settore (${benchmarkEdilizia.dso.mediaSettore})`);
  } else {
    righe.push(`❌  DSO [CRITICO] — ${dso} giorni, soglia critica superata`);
  }

  const cr = parseFloat(risultatoLiquidita.currentRatio);
  if (cr >= benchmarkEdilizia.currentRatio.sogliaMinima) {
    righe.push(`✅  Current Ratio [BUONO] — ${cr}, sopra soglia minima 1.0`);
  } else {
    righe.push(`❌  Current Ratio [CRITICO] — ${cr}, sotto 1.0`);
  }

  const ebitda = parseFloat(risultatoPerformance.ebitdaMargin);
  const { min, max } = benchmarkEdilizia.ebitdaMargin.stimaPMI;
  if (ebitda >= max) {
    righe.push(`✅  EBITDA Margin [SOPRA MEDIA] — ${ebitda}%, stima settore ${min}–${max}% ⚠️ INFERENZA`);
  } else if (ebitda >= min) {
    righe.push(`⚠️  EBITDA Margin [NELLA MEDIA] — ${ebitda}%, stima settore ${min}–${max}% ⚠️ INFERENZA`);
  } else {
    righe.push(`❌  EBITDA Margin [SOTTO MEDIA] — ${ebitda}%, stima settore ${min}–${max}% ⚠️ INFERENZA`);
  }

  return righe;
}

module.exports = { benchmarkEdilizia, confrontaBenchmark };