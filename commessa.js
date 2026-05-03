// StratoVerticale — Modulo Analisi Commessa
// Versione 0.4 — aggiunto budgetPrevisto e scostamento

function analizzaCommessa(commessa) {

  const margine = commessa.valoreContratto - commessa.costiDiretti;
  const marginePerc = (margine / commessa.valoreContratto) * 100;

  const scostamentoEuro = commessa.costiDiretti - commessa.budgetPrevisto;
  const scostamentoPerc = (scostamentoEuro / commessa.budgetPrevisto) * 100;

  const avanzamentoPerc = (commessa.salEmessi / commessa.valoreContratto) * 100;
  const cpi = commessa.salEmessi / commessa.costiDiretti;

  return {
    margineEuro: parseFloat(margine.toFixed(2)),
    marginePerc: parseFloat(marginePerc.toFixed(2)),
    scostamentoEuro: parseFloat(scostamentoEuro.toFixed(2)),
    scostamentoPerc: parseFloat(scostamentoPerc.toFixed(2)),
    avanzamentoPerc: parseFloat(avanzamentoPerc.toFixed(1)),
    cpi: parseFloat(cpi.toFixed(2)),
  };
}

module.exports = { analizzaCommessa };