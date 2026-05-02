// StratoVerticale — Motore Completo
// Versione 0.1 — Prima bozza
// Sessione 3 — 2 maggio 2026
//
// Questo file collega i tre moduli del motore di analisi:
//   - Modulo A: analizzaCommessa()   → analisi del singolo cantiere
//   - Modulo B: analizzaLiquidita()  → diagnostica finanziaria aziendale
//   - Modulo C: analizzaPerformance() → redditività e struttura dei costi
//
// Per ora i dati sono hardcoded. Il prossimo step è l'input dinamico:
// l'utente inserirà i propri numeri invece di modificare questo file.
//
// NOTA: il Modulo A lavora su una singola commessa. In futuro gestirà
// un array di commesse e produrrà un'analisi aggregata multi-cantiere.

// ─── IMPORT MODULI ───────────────────────────────────────────────
const { analizzaCommessa } = require("./commessa");
const { analizzaLiquidita } = require("./liquidita");
const { analizzaPerformance } = require("./performance");

// ─── INPUT DATI ──────────────────────────────────────────────────

// Dati della commessa (Modulo A)
const commessa = {
  nome: "Ristrutturazione Via Roma 12",
  ricavi: 80000,
  costiDiretti: 55000,
  budgetPrevisto: 50000,
  earnedValue: 40000,
};

// Dati aziendali (Moduli B e C)
const azienda = {
  // Modulo B — Diagnostica Liquidità
  fatturato: 500000,
  acquisti: 200000,
  creditiClienti: 120000,
  debitiFornitori: 40000,
  attivitaCorrenti: 180000,
  passivitaCorrenti: 160000,

  // Modulo C — Performance Aziendale
  ebitda: 35000,
  costoLavoro: 140000,
  costoSubappalti: 120000,
};

// ─── ESECUZIONE ──────────────────────────────────────────────────
const risultatoCommessa = analizzaCommessa(commessa);
const risultatoLiquidita = analizzaLiquidita(azienda);
const risultatoPerformance = analizzaPerformance(azienda);

// ─── OUTPUT ──────────────────────────────────────────────────────
console.log("=== ANALISI COMMESSA ===");
console.log("Commessa:", risultatoCommessa.nomeCommessa);
console.log("Margine (€):", risultatoCommessa.margineEuro);
console.log("Margine (%):", risultatoCommessa.marginePercentuale + "%");
console.log("Scostamento budget (€):", risultatoCommessa.scostamentoEuro);
console.log("Scostamento budget (%):", risultatoCommessa.scostamentoPercentuale + "%");
console.log("CPI:", risultatoCommessa.cpi);

console.log("\n=== DIAGNOSTICA LIQUIDITÀ ===");
console.log("DSO (giorni medi incasso):", risultatoLiquidita.dso, "giorni");
console.log("DPO (giorni medi pagamento fornitori):", risultatoLiquidita.dpo, "giorni");
console.log("Delta DSO-DPO:", risultatoLiquidita.deltaDsoDpo, "giorni");
console.log("CCN (Capitale Circolante Netto):", risultatoLiquidita.ccn, "€");
console.log("Current Ratio:", risultatoLiquidita.currentRatio);

console.log("\n=== PERFORMANCE AZIENDALE ===");
console.log("EBITDA Margin:", risultatoPerformance.ebitdaMargin, "%");
console.log("Incidenza costo lavoro:", risultatoPerformance.incidenzaCostoLavoro, "%");
console.log("Rapporto subappalto/fatturato:", risultatoPerformance.rapportoSubappalto, "%");