// StratoVerticale — Motore Completo
// Versione 0.2 — Sessione 5 — 3 maggio 2026
//
// Novità rispetto a v0.1:
//   - Input dinamico: i dati vengono letti da input.json (non più hardcoded)
//   - Collegamento benchmark: confrontaBenchmark() gira in automatico dopo i moduli B e C
//   - Output strutturato: la sezione benchmark è integrata nell'output finale
//
// Per analizzare una nuova azienda: modifica input.json, poi esegui `node index.js`

const { analizzaCommessa }    = require("./commessa");
const { analizzaLiquidita }   = require("./liquidita");
const { analizzaPerformance } = require("./performance");
const { confrontaBenchmark }  = require("./benchmark");

// ─── INPUT DINAMICO ──────────────────────────────────────────────
let commessa, azienda;

try {
  const input = require("./input.json");
  commessa = input.commessa;
  azienda  = input.azienda;

  const campiCommessa = ["ricavi", "costiDiretti", "budgetPrevisto", "salEmessi"];
  const campiAzienda  = ["fatturato", "acquisti", "creditiClienti", "debitiFornitori",
                        "attivitaCorrenti", "passivitaCorrenti",
                        "costoLavoro", "costoSubappalti", "altriCostiOperativi"];

  const mancanti = [
    ...campiCommessa.filter(c => commessa[c] === undefined).map(c => `commessa.${c}`),
    ...campiAzienda.filter(c => azienda[c] === undefined).map(c => `azienda.${c}`),
  ];

  if (mancanti.length > 0) {
    console.error("❌ ERRORE — Campi mancanti in input.json:", mancanti.join(", "));
    process.exit(1);
  }

} catch (e) {
  console.error("❌ ERRORE — Impossibile leggere input.json.");
  console.error("   Assicurati che il file esista nella stessa cartella di index.js.");
  console.error("   Dettaglio:", e.message);
  process.exit(1);
}

// ─── ESECUZIONE MODULI ───────────────────────────────────────────
const risultatoCommessa    = analizzaCommessa(commessa);
const risultatoLiquidita   = analizzaLiquidita(azienda);
const risultatoPerformance = analizzaPerformance(azienda);
const risultatoBenchmark   = confrontaBenchmark(risultatoLiquidita, risultatoPerformance);

// ─── OUTPUT ──────────────────────────────────────────────────────
console.log("\n╔══════════════════════════════════════════════════╗");
console.log("║         STRATOVERTICALE — ANALISI EDILIZIA       ║");
console.log("╚══════════════════════════════════════════════════╝");

console.log("\n─── MODULO A — ANALISI COMMESSA ─────────────────────");
console.log("Commessa:               ", risultatoCommessa.nomeCommessa);
console.log("Margine (€):            ", risultatoCommessa.margineEuro, "€");
console.log("Margine (%):            ", risultatoCommessa.marginePercentuale + "%");
console.log("Scostamento budget (€): ", risultatoCommessa.scostamentoEuro, "€");
console.log("Scostamento budget (%): ", risultatoCommessa.scostamentoPercentuale + "%");
console.log("Avanzamento SAL:        ", risultatoCommessa.avanzamentoPerc + "%");
console.log("CPI:                    ", risultatoCommessa.cpi);

console.log("\n─── MODULO B — DIAGNOSTICA LIQUIDITÀ ───────────────");
console.log("DSO (giorni medi incasso):          ", risultatoLiquidita.dso, "giorni");
console.log("DPO (giorni medi pagamento forni.): ", risultatoLiquidita.dpo, "giorni");
console.log("Delta DSO-DPO:                      ", risultatoLiquidita.deltaDsoDpo, "giorni");
console.log("CCN (Capitale Circolante Netto):    ", risultatoLiquidita.ccn, "€");
console.log("Current Ratio:                      ", risultatoLiquidita.currentRatio);

console.log("\n─── MODULO C — PERFORMANCE AZIENDALE ───────────────");
console.log("EBITDA (€):                  ", risultatoPerformance.ebitda, "€");
console.log("EBITDA Margin:               ", risultatoPerformance.ebitdaMargin, "%");
console.log("Incidenza costo lavoro:      ", risultatoPerformance.incidenzaCostoLavoro, "%");
console.log("Rapporto subappalto/fattur.: ", risultatoPerformance.rapportoSubappalto, "%");

console.log("\n─── CONFRONTO BENCHMARK SETTORIALE ─────────────────");
console.log("(Riferimento: PMI edilizie italiane, FNC 2024 + Allianz Trade)\n");

const icone = {
  OTTIMO: "✅", BUONO: "✅", "NELLA MEDIA": "⚠️",
  ATTENZIONE: "⚠️", CRITICO: "❌", ALLARME: "🚨", "SOTTO MEDIA": "❌"
};

for (const [kpi, risultato] of Object.entries(risultatoBenchmark)) {
  const icona = icone[risultato.stato] || "•";
  console.log(`${icona}  ${kpi.toUpperCase().padEnd(15)} [${risultato.stato}]`);
  console.log(`   ${risultato.messaggio}`);
  console.log();
}

console.log("════════════════════════════════════════════════════");
console.log("⚠️  Nota: alcuni benchmark sono stime non ancora verificate da fonte primaria.");
console.log("    Vedere benchmark.js per dettagli sull'affidabilità di ogni valore.");
console.log("════════════════════════════════════════════════════\n");