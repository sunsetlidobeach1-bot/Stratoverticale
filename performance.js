// StratoVerticale — Modulo Performance Aziendale
// Versione 0.3

function analizzaPerformance(azienda) {

  const ebitdaEuro = azienda.fatturato
    - azienda.acquisti
    - azienda.costoLavoro
    - azienda.costoSubappalti
    - azienda.altriCostiOperativi;

  const ebitdaMargin = (ebitdaEuro / azienda.fatturato) * 100;
  const incidenzaLavoro = (azienda.costoLavoro / azienda.fatturato) * 100;
  const incidenzaSubappalto = (azienda.costoSubappalti / azienda.fatturato) * 100;

  return {
    ebitdaEuro: parseFloat(ebitdaEuro.toFixed(2)),
    ebitdaMargin: parseFloat(ebitdaMargin.toFixed(1)),
    incidenzaLavoro: parseFloat(incidenzaLavoro.toFixed(1)),
    incidenzaSubappalto: parseFloat(incidenzaSubappalto.toFixed(1)),
  };
}

module.exports = { analizzaPerformance };