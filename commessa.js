// StratoVerticale — Modulo Analisi Commessa
// Versione 0.1 — Prima bozza

function analizzaCommessa(commessa) {
  
  // MARGINE DI COMMESSA
  const margine = commessa.ricavi - commessa.costiDiretti;
  const marginePercentuale = (margine / commessa.ricavi) * 100;

  // SCOSTAMENTO BUDGET / CONSUNTIVO
  const scostamentoAssoluto = commessa.costiDiretti - commessa.budgetPrevisto;
  const scostamentoPercentuale = (scostamentoAssoluto / commessa.budgetPrevisto) * 100;

  // CPI — Cost Performance Index
  // Misura se stai spendendo più o meno rispetto al lavoro completato
  const cpi = commessa.earnedValue / commessa.costiDiretti;

  // RISULTATO
  return {
    nomeCommessa: commessa.nome,
    margineEuro: margine.toFixed(2),
    marginePercentuale: marginePercentuale.toFixed(2),
    scostamentoEuro: scostamentoAssoluto.toFixed(2),
    scostamentoPercentuale: scostamentoPercentuale.toFixed(2),
    cpi: cpi.toFixed(2),
  };
}

// ESEMPIO — Commessa di prova
const commessaEsempio = {
  nome: "Ristrutturazione Via Roma 12",
  ricavi: 80000,
  costiDiretti: 55000,
  budgetPrevisto: 50000,
  earnedValue: 40000,
};

const risultato = analizzaCommessa(commessaEsempio);
console.log("=== ANALISI COMMESSA ===");
console.log("Commessa:", risultato.nomeCommessa);
console.log("Margine (€):", risultato.margineEuro);
console.log("Margine (%):", risultato.marginePercentuale + "%");
console.log("Scostamento budget (€):", risultato.scostamentoEuro);
console.log("Scostamento budget (%):", risultato.scostamentoPercentuale + "%");
console.log("CPI:", risultato.cpi);
module.exports = { analizzaCommessa };