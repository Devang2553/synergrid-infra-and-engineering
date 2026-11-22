/**
 * SYNERGRID · website enquiry receiver (Google Apps Script)
 *
 * Every request sent from the website's contact form:
 *   1. is emailed to NOTIFY_EMAIL as a point-wise summary, with the client's
 *      PDF/ZIP attached and one-tap buttons to reply, call or WhatsApp them;
 *   2. becomes a new row in the "Enquiries" tab of this Google Sheet, with a
 *      Status dropdown (New, Contacted, Site visit planned, Proposal sent, Won,
 *      Lost, Not relevant), a follow-up date and space for internal remarks;
 *   3. has its attachment saved to a Drive folder, linked from the row.
 *
 * Changing a Status in the sheet stamps the "Status updated" column.
 *
 * First-time setup (5 minutes, see README "Connect enquiries"):
 *   - Paste this file into the sheet: Extensions > Apps Script.
 *   - Run setup() once and allow access.
 *   - Run testEnquiry() and check the inbox and the sheet.
 *   - Deploy > New deployment > Web app (Execute as: Me, Who has access: Anyone).
 *   - Paste the /exec URL into RFQ_ENDPOINT in the website's src/config.js.
 */

// ---- settings ---------------------------------------------------------------
var CONFIG = {
  // The SYNERGRID Enquiries sheet. Works whether this script is opened from the
  // sheet (Extensions > Apps Script) or created separately at script.google.com.
  SPREADSHEET_ID: "1tCq4EmRzriVT79dna7IMDVJCMuTLyP02KDEnnQg-lU4",
  NOTIFY_EMAIL: "synergrid.eng@gmail.com",   // every enquiry is emailed here
  CC_EMAILS: "",                              // optional, comma separated
  SHEET_NAME: "Enquiries",
  DRIVE_FOLDER_NAME: "SYNERGRID enquiry attachments",
  TIMEZONE: "Asia/Kolkata",
  MAX_BYTES: 10 * 1024 * 1024,                // matches the 10 MB limit on the website
  SEND_CLIENT_ACK: false,                     // true: also email the client a short "we received it" note
  COMPANY: "Synergrid Infra LLP"
};
// ------------------------------------------------------------------------------

var STATUSES = ["New", "Contacted", "Site visit planned", "Proposal sent", "Won", "Lost", "Not relevant"];
var STATUS_COLOURS = {
  "New":                ["#FDE7B0", "#6B4300"],
  "Contacted":          ["#D6E4FF", "#1E3A8A"],
  "Site visit planned": ["#E4DAF7", "#4B2C83"],
  "Proposal sent":      ["#D2EEF3", "#0E5866"],
  "Won":                ["#CDEFD9", "#16613A"],
  "Lost":               ["#F6D5D0", "#8A2A1B"],
  "Not relevant":       ["#E6E8EB", "#555E6B"]
};
var COLUMNS = [
  ["Enquiry ID", 140], ["Received", 140], ["Status", 160], ["Follow-up date", 120],
  ["Name", 170], ["Company", 190], ["Email", 220], ["Phone", 140],
  ["Scope", 230], ["Facility location", 210], ["Expected timeline", 200], ["Project notes", 340],
  ["Attachment", 220], ["Source page", 200], ["Status updated", 140], ["Internal remarks", 300]
];
var COL = {};
COLUMNS.forEach(function (c, i) { COL[c[0]] = i + 1; });

/* ============================ web app ============================ */

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    var data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    return json_(handleEnquiry_(data));
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}

// Open the /exec URL in a browser: this confirms the deployment is live.
function doGet() {
  return json_({ ok: true, service: "SYNERGRID enquiries" });
}

/* ============================ the work ============================ */

function handleEnquiry_(d) {
  if (d.hp) return { ok: true, skipped: "spam" };            // hidden field filled in: a bot
  if (!d.name || !d.email) return { ok: false, error: "Name and email are required." };

  var sheet = getSheet_();
  var ref = /^SG-\d{6}-\d{4}$/.test(d.ref || "") ? d.ref : makeRef_();
  if (findRow_(sheet, ref)) return { ok: true, duplicate: true, ref: ref };   // double click, already saved

  // attachment -> Drive
  var blob = null, fileUrl = "", fileName = "";
  if (d.file && d.file.data) {
    var bytes = Utilities.base64Decode(d.file.data);
    if (bytes.length <= CONFIG.MAX_BYTES && /\.(pdf|zip)$/i.test(d.file.name || "")) {
      fileName = String(d.file.name);
      blob = Utilities.newBlob(bytes, d.file.type || "application/octet-stream", fileName);
      var saved = getFolder_().createFile(blob.copyBlob().setName(ref + " · " + (d.company || "Enquiry") + " · " + fileName));
      fileUrl = saved.getUrl();
    }
  }

  // one row per enquiry
  var now = new Date();
  var row = [];
  for (var i = 0; i < COLUMNS.length; i++) row.push("");
  row[COL["Enquiry ID"] - 1] = ref;
  row[COL["Received"] - 1] = now;
  row[COL["Status"] - 1] = "New";
  row[COL["Name"] - 1] = clean_(d.name);
  row[COL["Company"] - 1] = clean_(d.company);
  row[COL["Email"] - 1] = clean_(d.email);
  row[COL["Phone"] - 1] = clean_(d.phone);
  row[COL["Scope"] - 1] = clean_(d.scope);
  row[COL["Facility location"] - 1] = clean_(d.location);
  row[COL["Expected timeline"] - 1] = clean_(d.timeline);
  row[COL["Project notes"] - 1] = clean_(d.notes);
  row[COL["Attachment"] - 1] = fileUrl ? "" : "None";
  row[COL["Source page"] - 1] = clean_(d.page);
  row[COL["Status updated"] - 1] = now;
  sheet.appendRow(row);

  var r = sheet.getLastRow();
  formatRow_(sheet, r);
  if (fileUrl) sheet.getRange(r, COL["Attachment"]).setFormula('=HYPERLINK("' + fileUrl + '","' + fileName.replace(/"/g, "'") + '")');

  sendTeamEmail_(d, ref, now, fileUrl, blob, sheet, r);
  if (CONFIG.SEND_CLIENT_ACK) sendClientAck_(d, ref);
  return { ok: true, ref: ref, row: r };
}

/* ============================ email ============================ */

function sendTeamEmail_(d, ref, when, fileUrl, blob, sheet, r) {
  var points = [
    ["Reference", ref],
    ["Received", Utilities.formatDate(when, CONFIG.TIMEZONE, "dd MMM yyyy, hh:mm a")],
    ["Name", d.name],
    ["Company", d.company],
    ["Email", d.email],
    ["Phone", d.phone || "Not given"],
    ["Scope", d.scope],
    ["Facility location", d.location],
    ["Expected timeline", d.timeline],
    ["Project notes", d.notes || "None"],
    ["Attachment", fileUrl ? (d.file.name + " (attached, also saved in Drive)") : "None"],
    ["Sent from", d.page || "Website"]
  ];
  var sheetUrl = sheet.getParent().getUrl() + "#gid=" + sheet.getSheetId() + "&range=A" + r;
  var phoneDigits = waDigits_(d.phone);
  var firstName = String(d.name || "").split(" ")[0];

  var buttons = [
    btn_("Reply by email", "mailto:" + encodeURIComponent(d.email || "") + "?subject=" + encodeURIComponent("Your enquiry " + ref + " · Synergrid Infra LLP"), "#0B1A33", "#ffffff")
  ];
  if (phoneDigits) {
    buttons.push(btn_("WhatsApp " + firstName, "https://wa.me/" + phoneDigits + "?text=" + encodeURIComponent("Hello " + firstName + ", this is Synergrid Infra LLP regarding your enquiry " + ref + ". "), "#1F8A5B", "#ffffff"));
    buttons.push(btn_("Call " + firstName, "tel:+" + phoneDigits, "#ffffff", "#0B1A33", true));
  }
  buttons.push(btn_("Open enquiry sheet", sheetUrl, "#F2A51A", "#0B1A33"));

  var rows = points.map(function (p, i) {
    return '<tr style="background:' + (i % 2 ? "#ffffff" : "#F4F6F8") + '">' +
      '<td style="padding:10px 14px;width:150px;font:600 12px Arial,sans-serif;color:#556274;text-transform:uppercase;letter-spacing:.5px;vertical-align:top">' + esc_(p[0]) + '</td>' +
      '<td style="padding:10px 14px;font:15px/1.45 Arial,sans-serif;color:#0B1A33;vertical-align:top">' + esc_(p[1]).replace(/\n/g, "<br>") + '</td></tr>';
  }).join("");

  var html =
    '<div style="max-width:640px;margin:0 auto;border:1px solid #D5DAE0">' +
      '<div style="background:#0B1A33;padding:20px 24px">' +
        '<div style="font:700 12px Arial,sans-serif;letter-spacing:2px;color:#F2A51A">NEW WEBSITE ENQUIRY · ' + esc_(ref) + '</div>' +
        '<div style="font:700 22px/1.25 Arial,sans-serif;color:#ffffff;margin-top:8px">' + esc_(d.company || d.name) + '</div>' +
        '<div style="font:14px Arial,sans-serif;color:#A9B8D2;margin-top:4px">' + esc_(d.scope || "") + '</div>' +
      '</div>' +
      '<table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">' + rows + '</table>' +
      '<div style="padding:18px 20px;background:#ffffff">' + buttons.join(" ") + '</div>' +
      '<div style="padding:12px 20px;background:#F4F6F8;font:12px Arial,sans-serif;color:#556274">Status is set to <b>New</b> in the enquiry sheet. Update it there as the enquiry moves along. Replying to this email goes straight to the client.</div>' +
    '</div>';

  var text = "NEW WEBSITE ENQUIRY · " + ref + "\n\n" +
    points.map(function (p) { return "• " + p[0] + ": " + p[1]; }).join("\n") +
    "\n\nEnquiry sheet: " + sheetUrl;

  var mail = {
    to: CONFIG.NOTIFY_EMAIL,
    subject: "New enquiry " + ref + " · " + (d.company || d.name) + " · " + (d.scope || "Website"),
    body: text,
    htmlBody: html,
    name: "SYNERGRID Website",
    replyTo: d.email
  };
  if (CONFIG.CC_EMAILS) mail.cc = CONFIG.CC_EMAILS;
  if (blob) mail.attachments = [blob];
  MailApp.sendEmail(mail);
}

function sendClientAck_(d, ref) {
  var first = String(d.name || "").split(" ")[0] || "there";
  MailApp.sendEmail({
    to: d.email,
    subject: "We have received your enquiry · " + ref,
    name: CONFIG.COMPANY,
    replyTo: CONFIG.NOTIFY_EMAIL,
    body: "Hello " + first + ",\n\nThank you for contacting " + CONFIG.COMPANY + ". We have received your request for proposal (reference " + ref + ").\n\n" +
      "• Scope: " + (d.scope || "") + "\n• Facility location: " + (d.location || "") + "\n• Expected timeline: " + (d.timeline || "") + "\n\n" +
      "An engineer will review it and contact you to confirm the details.\n\nRegards,\nSynergrid Infra LLP\nF-111, Ratnam Heights, Opp. Motibhai Park, Khodiyar Nagar, New Karelibaug, Vadodara, Gujarat 390022"
  });
}

/* ============================ the sheet ============================ */

function book_() {
  return CONFIG.SPREADSHEET_ID ? SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
}

function getSheet_() {
  var ss = book_();
  var sh = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sh) { sh = ss.insertSheet(CONFIG.SHEET_NAME, 0); layout_(sh); }
  else if (sh.getLastRow() === 0) layout_(sh);
  return sh;
}

function layout_(sh) {
  var head = sh.getRange(1, 1, 1, COLUMNS.length);
  head.setValues([COLUMNS.map(function (c) { return c[0]; })]);
  head.setFontWeight("bold").setFontColor("#ffffff").setBackground("#0B1A33").setVerticalAlignment("middle").setWrap(true);
  sh.getRange(1, COL["Status"]).setBackground("#F2A51A").setFontColor("#0B1A33");
  sh.setRowHeight(1, 36);
  sh.setFrozenRows(1);
  sh.setFrozenColumns(1);
  COLUMNS.forEach(function (c, i) { sh.setColumnWidth(i + 1, c[1]); });
  sh.setTabColor("#F2A51A");

  var L = colLetter_;
  // Status dropdown and date picker for the whole column, plus formats
  sh.getRange(L(COL["Status"]) + "2:" + L(COL["Status"])).setDataValidation(statusRule_());
  sh.getRange(L(COL["Follow-up date"]) + "2:" + L(COL["Follow-up date"])).setDataValidation(
    SpreadsheetApp.newDataValidation().requireDate().setAllowInvalid(false).setHelpText("Pick the date to follow up.").build());
  sh.getRange(L(COL["Received"]) + "2:" + L(COL["Received"])).setNumberFormat("dd-mmm-yyyy hh:mm");
  sh.getRange(L(COL["Status updated"]) + "2:" + L(COL["Status updated"])).setNumberFormat("dd-mmm-yyyy hh:mm");
  sh.getRange(L(COL["Follow-up date"]) + "2:" + L(COL["Follow-up date"])).setNumberFormat("dd-mmm-yyyy");
  sh.getRange(L(COL["Project notes"]) + "2:" + L(COL["Project notes"])).setWrap(true);

  // Status colours
  var statusRange = sh.getRange(L(COL["Status"]) + "2:" + L(COL["Status"]));
  var rules = STATUSES.map(function (s) {
    return SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo(s)
      .setBackground(STATUS_COLOURS[s][0]).setFontColor(STATUS_COLOURS[s][1]).setBold(s === "New")
      .setRanges([statusRange]).build();
  });
  // Follow-up date in the past while the enquiry is still open: highlight it
  var fu = L(COL["Follow-up date"]), st = L(COL["Status"]);
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=AND($' + fu + '2<>"",$' + fu + '2<=TODAY(),NOT(OR($' + st + '2="Won",$' + st + '2="Lost",$' + st + '2="Not relevant")))')
    .setBackground("#F6D5D0").setFontColor("#8A2A1B").setBold(true)
    .setRanges([sh.getRange(fu + "2:" + fu)]).build());
  sh.setConditionalFormatRules(rules);
}

function formatRow_(sh, r) {
  sh.getRange(r, COL["Status"]).setDataValidation(statusRule_());
  sh.getRange(r, COL["Received"]).setNumberFormat("dd-mmm-yyyy hh:mm");
  sh.getRange(r, COL["Status updated"]).setNumberFormat("dd-mmm-yyyy hh:mm");
  sh.getRange(r, 1, 1, COLUMNS.length).setVerticalAlignment("top");
  sh.getRange(r, COL["Project notes"]).setWrap(true);
}

function statusRule_() {
  return SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).setAllowInvalid(false)
    .setHelpText("Choose a status: " + STATUSES.join(", ")).build();
}

/* Changing a Status stamps the "Status updated" column (simple trigger, no setup needed). */
function onEdit(e) {
  if (!e || !e.range) return;
  var rg = e.range, sh = rg.getSheet();
  if (sh.getName() !== CONFIG.SHEET_NAME || rg.getLastRow() < 2) return;
  var c = COL["Status"];
  if (rg.getColumn() > c || rg.getLastColumn() < c) return;
  var from = Math.max(rg.getRow(), 2), to = rg.getLastRow();
  for (var r = from; r <= to; r++) sh.getRange(r, COL["Status updated"]).setValue(new Date());
}

/* ============================ run these by hand ============================ */

/* Run once after pasting the script: builds the Enquiries tab and asks for permissions. */
function setup() {
  var ss = book_();
  ss.setSpreadsheetTimeZone(CONFIG.TIMEZONE);
  var sh = getSheet_();
  if (sh.getLastRow() <= 1) layout_(sh);
  var blank = ss.getSheetByName("Sheet1");
  if (blank && blank.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(blank);
  getFolder_();
  Logger.log("Ready. Enquiries tab: " + ss.getUrl() + "#gid=" + sh.getSheetId());
}

/* Sends one test enquiry through the full path: email + sheet row. Delete the row afterwards. */
function testEnquiry() {
  var res = handleEnquiry_({
    ref: makeRef_(),
    name: "Test Engineer",
    company: "Test Company (delete this row)",
    email: CONFIG.NOTIFY_EMAIL,
    phone: "",
    scope: "Civil & PEB, MEP",
    location: "Savli GIDC, Vadodara",
    timeline: "1 to 3 months",
    notes: "This is a test enquiry sent from the Apps Script editor.\nIf you can read this in the inbox and see the row in the sheet, everything works.",
    page: "Apps Script test"
  });
  Logger.log(JSON.stringify(res));
}

/* ============================ helpers ============================ */

function makeRef_() {
  return "SG-" + Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "yyMMdd") + "-" + ("000" + Math.floor(Math.random() * 10000)).slice(-4);
}

function findRow_(sh, ref) {
  if (sh.getLastRow() < 2) return 0;
  var hit = sh.getRange(2, COL["Enquiry ID"], sh.getLastRow() - 1, 1).createTextFinder(ref).matchEntireCell(true).findNext();
  return hit ? hit.getRow() : 0;
}

function getFolder_() {
  var it = DriveApp.getFoldersByName(CONFIG.DRIVE_FOLDER_NAME);
  return it.hasNext() ? it.next() : DriveApp.createFolder(CONFIG.DRIVE_FOLDER_NAME);
}

// Indian mobile numbers to wa.me format: 9876543210 -> 919876543210
function waDigits_(phone) {
  var d = String(phone || "").replace(/\D/g, "");
  if (d.length === 11 && d.charAt(0) === "0") d = d.slice(1);
  if (d.length === 10) d = "91" + d;
  return d.length >= 11 && d.length <= 15 ? d : "";
}

// Stop spreadsheet formula injection from form text
function clean_(v) {
  v = v == null ? "" : String(v).slice(0, 5000);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function esc_(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function btn_(label, href, bg, fg, outline) {
  return '<a href="' + esc_(href) + '" style="display:inline-block;margin:0 8px 8px 0;padding:11px 16px;background:' + bg + ';color:' + fg +
    ';font:700 13px Arial,sans-serif;letter-spacing:.5px;text-decoration:none;' + (outline ? 'border:1.5px solid ' + fg + ';' : '') + '">' + esc_(label) + '</a>';
}

function colLetter_(n) {
  var s = "";
  while (n > 0) { var m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); }
  return s;
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
