function analizzaLiquidita(azienda, giorni = 365) {
  const dso = (azienda.creditiClienti / azienda.fatturato) * giorni;
  const dpo = (azienda.debitiFornitori / azienda.acquisti) * giorni;
  const deltaDsoDpo = dso - dpo;
  const ccn = azienda.attivitaCorrenti - azienda.passivitaCorrenti;
  const currentRatio = azienda.attivitaCorrenti / azienda.passivitaCorrenti;

  return {
    dso: parseFloat(dso.toFixed(1)),
    dpo: parseFloat(dpo.toFixed(1)),
    deltaDsoDpo: parseFloat(deltaDsoDpo.toFixed(1)),
    ccn,
    currentRatio: parseFloat(currentRatio.toFixed(2)),
  };
}

module.exports = { analizzaLiquidita };