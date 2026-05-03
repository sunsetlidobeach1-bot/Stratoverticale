// StratoVerticale — Modulo Analisi Commessa
// Versione 0.2 — Sessione 5 — 3 maggio 2026
//
// Modifica rispetto a v0.1:
//   - "earnedValue" rinominato in "salEmessi" (SAL = Stato di Avanzamento Lavori)
//   - Il CPI ora confronta SAL emessi vs costi sostenuti
//   - Aggiunto "avanzamentoPerc": percentuale di fatturato emessa sul totale contratto

function analizzaCommessa(commessa) {

  // MARGINE DI COMMESSA
  const margine = commessa.ricavi - commessa.costiDiretti;
  const marginePercentuale = (margine / commessa.ricavi) * 100;

  // SCOSTAMENTO BUDGET / CONSUNTIVO
  const scostamentoAssoluto = commessa.costiDiretti - commessa.budgetPrevisto;
  const scostamentoPercentuale = (scostamentoAssoluto / commessa.budgetPrevisto) * 100;

  // AVANZAMENTO — % del contratto già fatturata al cliente
  const avanzamentoPerc = (commessa.salEmessi / commessa.ricavi) * 100;

  // CPI — Cost Performance Index
  // SAL emessi / costi sostenuti
  // Sotto 1.0: stai spendendo più di quanto hai fatturato — alert
  // Es: 0.73 → stai spendendo il 37% in più rispetto ai SAL emessi
  const cpi = commessa.salEmessi / commessa.costiDiretti;

  return {
    nomeCommessa: commessa.nome,
    margineEuro: margine.toFixed(2),
    marginePercentuale: marginePercentuale.toFixed(2),
    scostamentoEuro: scostamentoAssoluto.toFixed(2),
    scostamentoPercentuale: scostamentoPercentuale.toFixed(2),
    avanzamentoPerc: avanzamentoPerc.toFixed(1),
    cpi: cpi.toFixed(2),
  };
}

module.exports = { analizzaCommessa };