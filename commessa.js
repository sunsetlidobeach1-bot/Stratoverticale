// StratoVerticale — Modulo Analisi Commessa
// Versione 0.3

function analizzaCommessa(commessa) {

  const margine = commessa.valoreContratto - commessa.costiDiretti;
  const marginePerc = (margine / commessa.valoreContratto) * 100;
  const avanzamentoPerc = (commessa.salEmessi / commessa.valoreContratto) * 100;
  const cpi = commessa.salEmessi / commessa.costiDiretti;

  return {
    margineEuro: parseFloat(margine.toFixed(2)),
    marginePerc: parseFloat(marginePerc.toFixed(2)),
    avanzamentoPerc: parseFloat(avanzamentoPerc.toFixed(1)),
    cpi: parseFloat(cpi.toFixed(2)),
  };
}

module.exports = { analizzaCommessa };