const { analizzaCommessa } = require('./commessa');
const { analizzaLiquidita } = require('./liquidita');
const { analizzaPerformance } = require('./performance');
const { confrontaBenchmark } = require('./benchmark');

const dati = require('./input.json');
const azienda = dati.azienda;
const commessa = dati.commessa;

// Validazione campi azienda
const campiAzienda = [
  'nome', 'periodoRiferimento', 'fatturato', 'acquisti',
  'creditiClienti', 'debitiFornitori', 'attivitaCorrenti',
  'passivitaCorrenti', 'costoLavoro', 'costoSubappalti', 'altriCostiOperativi',
];
for (const campo of campiAzienda) {
  if (azienda[campo] === undefined) {
    console.error(`❌ Campo mancante in input.json → azienda.${campo}`);
    process.exit(1);
  }
}

// Validazione campi commessa
const campiCommessa = ['nome', 'valoreContratto', 'budgetPrevisto', 'costiDiretti', 'salEmessi'];
for (const campo of campiCommessa) {
  if (commessa[campo] === undefined) {
    console.error(`❌ Campo mancante in input.json → commessa.${campo}`);
    process.exit(1);
  }
}

// Mappatura periodo → giorni
const mappaGiorni = { annuale: 365, semestrale: 180, trimestrale: 90, mensile: 30 };
const giorni = mappaGiorni[azienda.periodoRiferimento] || 365;

// Esecuzione moduli
const C = analizzaCommessa(commessa);
const L = analizzaLiquidita(azienda, giorni);
const P = analizzaPerformance(azienda);
const B = confrontaBenchmark(L, P);

// Output
console.log('\n─────────────────────────────────────────');
console.log('  STRATOVERTICALE — Motore v0.4');
console.log('─────────────────────────────────────────\n');

console.log('MODULO A — ANALISI COMMESSA');
console.log(`Commessa:          ${commessa.nome}`);
console.log(`Margine (€):       ${C.margineEuro} €  |  Margine (%): ${C.marginePerc}%`);
console.log(`Scostamento (€):   ${C.scostamentoEuro >= 0 ? '+' : ''}${C.scostamentoEuro} €  |  Scostamento (%): ${C.scostamentoPerc >= 0 ? '+' : ''}${C.scostamentoPerc}%`);
console.log(`SAL emessi:        ${commessa.salEmessi} €  |  Avanzamento: ${C.avanzamentoPerc}%`);
console.log(`CPI:               ${C.cpi}`);

console.log('\nMODULO B — DIAGNOSTICA LIQUIDITÀ');
console.log(`Periodo:           ${azienda.periodoRiferimento} (${giorni} giorni)`);
console.log(`DSO: ${L.dso} gg  |  DPO: ${L.dpo} gg  |  Delta: ${L.deltaDsoDpo} gg`);
console.log(`CCN: ${L.ccn} €   |  Current Ratio: ${L.currentRatio}`);

console.log('\nMODULO C — PERFORMANCE AZIENDALE');
console.log(`EBITDA: ${P.ebitdaEuro} €  |  EBITDA Margin: ${P.ebitdaMargin}%`);
console.log(`Costo lavoro: ${P.incidenzaLavoro}%  |  Subappalto: ${P.incidenzaSubappalto}%`);

console.log('\nBENCHMARK SETTORIALE');
B.forEach(b => console.log(b));
console.log();