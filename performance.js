// StratoVerticale — Modulo C: Performance Aziendale
// Versione 0.2 — Sessione 5 — 3 maggio 2026
//
// Modifica rispetto a v0.1:
//   - EBITDA non più inserito dall'utente ma calcolato dal motore
//   - Aggiunto campo "altriCostiOperativi" (aggregato — da scomporre in versioni future)
//   - Formula: EBITDA = fatturato - acquisti - costoLavoro - costoSubappalti - altriCostiOperativi

function analizzaPerformance(azienda) {

  // EBITDA — calcolato dal motore, non inserito dall'utente
  const ebitda = azienda.fatturato
    - azienda.acquisti
    - azienda.costoLavoro
    - azienda.costoSubappalti
    - azienda.altriCostiOperativi;

  const ebitdaMargin = (ebitda / azienda.fatturato) * 100;

  // INCIDENZA COSTO LAVORO
  const incidenzaCostoLavoro = (azienda.costoLavoro / azienda.fatturato) * 100;

  // RAPPORTO SUBAPPALTO / FATTURATO
  const rapportoSubappalto = (azienda.costoSubappalti / azienda.fatturato) * 100;

  return {
    ebitda: ebitda.toFixed(2),
    ebitdaMargin: ebitdaMargin.toFixed(1),
    incidenzaCostoLavoro: incidenzaCostoLavoro.toFixed(1),
    rapportoSubappalto: rapportoSubappalto.toFixed(1),
  };
}

module.exports = { analizzaPerformance };