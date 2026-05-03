const { analizzaCommessa } = require('./commessa');
const { analizzaLiquidita } = require('./liquidita');
const { analizzaPerformance } = require('./performance');
const { confrontaBenchmark } = require('./benchmark');

const dati = require('./input.json');
const azienda = dati.azienda;
const commessa = dati.commessa;

// Validazione campi azienda
const campiAzienda = [
  'nome',
  'periodoRiferimento',
  'fatturato',
  'acquisti',
  'creditiClienti',
  'debitiFornitori',
  'attivitaCorrenti',
  'passivitaCorrenti',
  'costoLavoro',
  'costoSubappalti',
  'altriCostiOperativi',
];

for (const campo of campiAzienda) {
  if (azienda[campo] === undefined) {
    console.error(`❌ Campo mancante in input.json → azienda.${campo}`);
    process.exit(1);
  }
}

// Mappatura periodo → giorni
const mappaGiorni = { annuale: 365, semestrale: 180, trimestrale: 90, mensile: 30 };
const giorni = mappaGiorni[azienda.periodoRiferimento] || 365;

// Esecuzione moduli
const risultatoCommessa = analizzaCommessa(commessa);
const risultatoLiquidita = analizzaLiquidita(azienda, giorni);
const risultatoPerformance = analizzaPerformance(azienda);
const benchmark = confrontaBenchmark(risultatoLiquidita, risultatoPerformance);

// Output
console.log('\nMODULO A — ANALISI COMMESSA');
console.log(`Commessa: ${commessa.nome}`);
console.log(`Margine (€): ${risultatoCommessa.margineEuro} € | Margine (%): ${risultatoCommessa.marginePerc}%`);
console.log(`SAL emessi: ${commessa.salEmessi} € | Avanzamento: ${risultatoCommessa.avanzamentoPerc}%`);
console.log(`CPI: ${risultatoCommessa.cpi}`);

console.log('\nMODULO B — DIAGNOSTICA LIQUIDITÀ');
console.log(`Periodo di riferimento:      ${azienda.periodoRiferimento} (${giorni} giorni)`);
console.log(`DSO: ${risultatoLiquidita.dso} giorni | DPO: ${risultatoLiquidita.dpo} giorni | Delta: ${risultatoLiquidita.deltaDsoDpo} giorni`);
console.log(`CCN: ${risultatoLiquidita.ccn} € | Current Ratio: ${risultatoLiquidita.currentRatio}`);

console.log('\nMODULO C — PERFORMANCE AZIENDALE');
console.log(`EBITDA Margin: ${risultatoPerformance.ebitdaMargin}% | Costo lavoro: ${risultatoPerformance.incidenzaLavoro}% | Subappalto: ${risultatoPerformance.incidenzaSubappalto}%`);

console.log('\nBENCHMARK SETTORIALE');
benchmark.forEach(b => console.log(b));