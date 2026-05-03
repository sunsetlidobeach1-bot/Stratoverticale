// StratoVerticale — Modulo Diagnostica Liquidità
// Versione 0.1 — Prima bozza

function analizzaLiquidita(azienda) {

  // DSO — Days Sales Outstanding (Giorni medi di incasso)
  // Quanti giorni in media passa tra fattura emessa e incasso effettivo
  const dso = (azienda.creditiClienti / azienda.fatturato) * 365;

  // DPO — Days Payable Outstanding (Giorni medi di pagamento fornitori)
  // Quanti giorni in media impiega l'azienda a pagare i fornitori
  const dpo = (azienda.debitiFornitori / azienda.acquisti) * 365;

  // DELTA DSO - DPO
  // Se positivo: l'azienda paga i fornitori prima di incassare dai clienti
  // Più è alto, più è sotto pressione finanziaria
  const deltaDsoDpo = dso - dpo;

  // CCN — Capitale Circolante Netto
  // Se negativo: l'azienda non copre le uscite a breve con le entrate a breve
  const ccn = azienda.attivitaCorrenti - azienda.passivitaCorrenti;

  // CURRENT RATIO — Indice di liquidità corrente
  // Sotto 1.0 è segnale critico
  const currentRatio = azienda.attivitaCorrenti / azienda.passivitaCorrenti;

  // RISULTATO
  return {
    dso: dso.toFixed(1),
    dpo: dpo.toFixed(1),
    deltaDsoDpo: deltaDsoDpo.toFixed(1),
    ccn: ccn.toFixed(2),
    currentRatio: currentRatio.toFixed(2),
  };
}
module.exports = { analizzaLiquidita };