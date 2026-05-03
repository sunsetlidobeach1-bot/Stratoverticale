// StratoVerticale — Modulo C: Performance Aziendale
// Versione 0.1 — Prima bozza
// Sessione 3 — 2 maggio 2026
//
// Questo modulo risponde alla domanda:
// "Questa impresa sta guadagnando, e quanto rispetto al settore?"
//
// Fa parte di un motore di analisi economico-finanziaria verticale per PMI edilizie.
// Gli altri moduli sono:
//   - Modulo A: Analisi Commessa (margine, scostamento budget/consuntivo, CPI)
//   - Modulo B: Diagnostica Liquidità (DSO, DPO, delta, CCN, Current Ratio)
//   - Modulo C: Performance Aziendale ← questo file
//
// Struttura standard: funzione(oggetto) → return con valori .toFixed()
// L'oggetto "azienda" sarà condiviso tra tutti e tre i moduli in index.js

function analizzaPerformance(azienda) {

  // EBITDA MARGIN — Redditività operativa lorda
  // Quanto rimane del fatturato dopo aver tolto i costi operativi,
  // prima di ammortamenti, interessi e tasse.
  // Benchmark settore edilizia italiana: 4%–8% [Non verificato — DA CERCARE FONTE]
  const ebitdaMargin = (azienda.ebitda / azienda.fatturato) * 100;

  // INCIDENZA COSTO LAVORO — Peso del personale sul fatturato
  // Nell'edilizia il costo lavoro diretto è una delle voci più pesanti.
  // Include dipendenti diretti, non i subappaltatori (voce separata sotto).
  // Benchmark settore edilizia italiana: 25%–35% [Non verificato — DA CERCARE FONTE]
  const incidenzaCostoLavoro = (azienda.costoLavoro / azienda.fatturato) * 100;

  // RAPPORTO SUBAPPALTO / FATTURATO
  // Misura quanto lavoro viene esternalizzato a terzi.
  // Un valore alto indica dipendenza da subappaltatori e margine compresso.
  // Benchmark settore edilizia italiana: 20%–40% [Non verificato — DA CERCARE FONTE]
  const rapportoSubappalto = (azienda.costoSubappalti / azienda.fatturato) * 100;

  // ROI — Return on Investment
  // Quanto rende il capitale investito nell'impresa.
  // ⚠️ PLACEHOLDER — richiede "capitaleInvestito" come input aggiuntivo.
  // Non ancora incluso nell'oggetto azienda. Da definire nella fase di input dinamico.
  // const roi = (azienda.utileOperativo / azienda.capitaleInvestito) * 100;

  return {
    ebitdaMargin: ebitdaMargin.toFixed(1),         // in percentuale
    incidenzaCostoLavoro: incidenzaCostoLavoro.toFixed(1), // in percentuale
    rapportoSubappalto: rapportoSubappalto.toFixed(1),     // in percentuale
    // roi: roi.toFixed(1),                          // PLACEHOLDER — vedere sopra
  };
}
module.exports = { analizzaPerformance };