// Google Apps Script – empfängt die Anmeldungen und schreibt sie ins Sheet.
// Einfügen unter: Google Sheet → Erweiterungen → Apps Script

const SHEET_NAME = "Anmeldungen";
const HEADERS = [
  "Zeitpunkt", "Name", "Zusage", "Essen",
  "Begleitung", "Name Begleitung", "Essen Begleitung",
  "Allergien", "Nachricht", "Personen"
];

function doPost(e) {
  const p = (e && e.parameter) || {};

  // Spam-Schutz: Bots füllen das unsichtbare Feld aus
  if (p.website) return ok_();

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet_();
    const kommt = p.zusage === "Ja";
    const personen = kommt ? (p.begleitung === "Ja" ? 2 : 1) : 0;

    sheet.appendRow([
      new Date(),
      clean_(p.name),
      clean_(p.zusage),
      clean_(p.essen),
      clean_(p.begleitung),
      clean_(p.begleitungName),
      clean_(p.begleitungEssen),
      clean_(p.allergien),
      clean_(p.nachricht),
      personen
    ]);
  } finally {
    lock.releaseLock();
  }
  return ok_();
}

// Öffnen der URL im Browser zeigt nur einen Status
function doGet() {
  return ContentService.createTextOutput("RSVP-Endpunkt läuft.");
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Kürzt Eingaben und verhindert Formel-Injection (=, +, -, @)
function clean_(v) {
  let s = String(v || "").trim().slice(0, 500);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function ok_() {
  return ContentService.createTextOutput("ok");
}
