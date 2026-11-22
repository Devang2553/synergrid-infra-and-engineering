import { gsap } from "gsap";
import { ScrollTrigger as ST } from "gsap/ScrollTrigger";
import { $, $$, svgEl, esc, clamp, RM, FINE, SMALLQ } from "../dom.js";
import { SITE } from "../../config.js";
import { makeRef, sendEnquiry } from "../enquiry.js";
import { hasWhatsApp, waLink, formDraft } from "../whatsapp.js";

/* cleanups for the current mount; init() returns a function that runs them */
let cleanups = [];

/* ================================================================
   CONTACT: three-step request with a live request sheet
   ================================================================ */
export function init(view, api = {}) {
  cleanups = [];
  /* Every listener is tied to this mount and removed on cleanup. Without this a
     second mount (React StrictMode in dev, or a re-render) left the first set of
     listeners alive, so one click on "Issue request" sent the enquiry twice. */
  var ac = new AbortController(), on = { signal: ac.signal };
  cleanups.push(function () { ac.abort(); });
  var sending = false;
  var form = $("#rfq", view), step = 1, MAX = 10 * 1024 * 1024;
  var panes = $$(".pane", form), steps = $$(".steps li", form);
  var back = $("#wiz-back", form), next = $("#wiz-next", form), send = $("#wiz-send", form);
  var sheet = $("#sheet", view), done = $("#rfq-done", form);
  var v = function (id) { return ($("#" + id, form).value || "").trim(); };
  function err(id, msg) {
    var f = $("#" + id, form), e = $("#" + id + "-err", form);
    if (e) { e.textContent = msg || ""; e.hidden = !msg; }
    if (f) { if (msg) f.setAttribute("aria-invalid", "true"); else f.removeAttribute("aria-invalid"); }
    return !msg;
  }
  function scopes() { return $$("input[name='scope']:checked", form).map(function (c) { return c.value; }); }
  function file() { var f = $("#rfq-file", form); return f.files && f.files[0]; }
  function fileErr(f) { if (!f) return ""; if (!/\.(pdf|zip)$/i.test(f.name)) return "Attach a PDF or ZIP file."; if (f.size > MAX) return "This file is larger than 10 MB. Compress it or send a smaller ZIP."; return ""; }
  function setDD(k, val) { var dd = $("[data-k='" + k + "']", sheet); if (dd.textContent === val) return; dd.textContent = val; dd.classList.remove("just"); void dd.offsetWidth; dd.classList.add("just"); }
  function live() {
    setDD("scope", scopes().join(", "));
    setDD("location", v("rfq-location")); setDD("timeline", v("rfq-timeline"));
    var f = file(); setDD("file", f ? f.name + " · " + (f.size / 1048576).toFixed(1) + " MB" : "");
    setDD("client", [v("rfq-name"), v("rfq-company")].filter(Boolean).join(", ")); setDD("email", v("rfq-email"));
  }
  // WhatsApp buttons carry a draft built from what has been typed so far
  var waBtn = $("#rfq-wa", form), waDone = $("#rfq-wa-done", form), refNo = "", lastState = "";
  function draft(withRef) {
    return formDraft({ ref: withRef ? refNo : "", name: v("rfq-name"), company: v("rfq-company"), scope: scopes().join(", "),
      location: v("rfq-location"), timeline: v("rfq-timeline"), notes: v("rfq-notes") });
  }
  function refreshWa() { if (hasWhatsApp() && waBtn) waBtn.href = waLink(draft(false)); }
  form.addEventListener("input", live, on); form.addEventListener("change", live, on);
  form.addEventListener("input", refreshWa, on); form.addEventListener("change", refreshWa, on);
  $("#rfq-file", form).addEventListener("change", function () { var f = file(); $("#rfq-file-name", form).textContent = f ? f.name + " · " + (f.size / 1048576).toFixed(1) + " MB" : "No file chosen"; err("rfq-file", fileErr(f)); }, on);
  function validate(s) {
    var ok = true;
    if (s === 1) ok = err("rfq-scope", scopes().length ? "" : "Choose at least one scope.");
    if (s === 2) {
      ok = err("rfq-location", v("rfq-location") ? "" : "Enter the facility location.") && ok;
      ok = err("rfq-timeline", v("rfq-timeline") ? "" : "Choose an expected timeline.") && ok;
      ok = err("rfq-file", fileErr(file())) && ok;
    }
    if (s === 3) {
      ok = err("rfq-name", v("rfq-name") ? "" : "Enter your name.") && ok;
      ok = err("rfq-company", v("rfq-company") ? "" : "Enter your company name.") && ok;
      var em = v("rfq-email");
      ok = err("rfq-email", !em ? "Enter your work email." : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em) ? "" : "Check the email address, it needs an @ and a domain.") && ok;
    }
    if (!ok) { var first = $("[aria-invalid='true']", form) || $("#rfq-scope", form); if (first) first.focus(); }
    return ok;
  }
  function goStep(s) {
    step = s;
    panes.forEach(function (p) { p.hidden = +p.getAttribute("data-pane") !== s; });
    steps.forEach(function (li) { var k = +li.getAttribute("data-step"); li.classList.toggle("is-now", k === s); li.classList.toggle("is-done", k < s); });
    back.hidden = s === 1; next.hidden = s === 3; send.hidden = s !== 3;
    var pane = $("[data-pane='" + s + "']", form);
    if (!RM && gsap) gsap.fromTo(pane, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: "power3.out" });
    var h = $("h2", pane); if (h && s > 1) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
  }
  next.addEventListener("click", function () { if (validate(step)) goStep(step + 1); }, on);
  back.addEventListener("click", function () { goStep(step - 1); }, on);
  var doneH = $("#rfq-done h2", form), doneP = $("#rfq-done p", form);
  var MSG = {
    preview: ["Your request sheet is ready.", "This form is not connected to an inbox yet, so nothing has been sent. Once the RFQ endpoint is set in src/config.js, requests go straight to the SYNERGRID engineering team by email and into their enquiry sheet. For now, copy the summary."],
    sent: ["Request received.", "Your request has gone to the SYNERGRID engineering team, who will reply to the email you gave. Keep a copy of the summary for your records."],
    failed: ["We could not send your request.", "It did not reach us this time. Please issue it again in a moment, or copy the summary and email it to us" + (SITE.email ? " at " + SITE.email : "") + "."]
  };
  function finish(state) {
    doneH.textContent = MSG[state][0]; doneP.textContent = MSG[state][1];
    lastState = state;
    send.disabled = false; send.firstChild.textContent = "Issue request ";
    var refP = $("#rfq-ref", form);
    refP.hidden = state !== "sent"; $(".ref", refP).textContent = refNo;
    if (state === "sent") $(".sheet__top b", sheet).textContent = refNo;
    if (waDone) { waDone.href = waLink(draft(state === "sent")); waDone.lastChild.textContent = state === "sent" ? " Also send on WhatsApp" : " Send on WhatsApp"; }
    if (waBtn) waBtn.parentNode.hidden = true;
    steps.forEach(function (li) { li.classList.remove("is-now"); li.classList.add("is-done"); });
    panes.forEach(function (p) { p.hidden = true; }); back.hidden = true; send.hidden = true;
    done.hidden = false; sheet.classList.toggle("is-issued", state !== "failed");
    done.scrollIntoView({ behavior: RM ? "auto" : "smooth", block: "start" }); done.focus({ preventScroll: true });
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (sending) return;   // already on its way: a double click or Enter must not send it twice
    if (step < 3) { if (validate(step)) goStep(step + 1); return; }
    if (!validate(3)) return;
    var f = file();
    if (!(refNo && lastState === "failed")) refNo = makeRef();   // a retry keeps its reference
    var summary = [
      "REQUEST FOR PROPOSAL · SYNERGRID",
      "Reference: " + refNo,
      "Name: " + v("rfq-name"), "Company: " + v("rfq-company"), "Email: " + v("rfq-email"), "Phone: " + (v("rfq-phone") || "Not given"),
      "Scope: " + scopes().join(", "), "Facility location: " + v("rfq-location"), "Expected timeline: " + v("rfq-timeline"),
      "Attachment: " + (f ? f.name + " (" + (f.size / 1048576).toFixed(1) + " MB)" : "None"), "Project notes: " + (v("rfq-notes") || "None")
    ].join("\n");
    $("#rfq-summary", form).textContent = summary;
    if (!SITE.rfqEndpoint) { finish("preview"); return; }
    sending = true;
    send.disabled = true; send.firstChild.textContent = "Sending request ";
    // Goes to apps-script/Code.gs: emailed to the team and added to the Google Sheet as a new row (Status: New)
    sendEnquiry({
      ref: refNo, hp: ($("#rfq-website", form).value || ""),
      name: v("rfq-name"), company: v("rfq-company"), email: v("rfq-email"), phone: v("rfq-phone"),
      scope: scopes().join(", "), location: v("rfq-location"), timeline: v("rfq-timeline"), notes: v("rfq-notes"), summary: summary
    }, f).then(function () { sending = false; finish("sent"); }, function (e) { sending = false; console.error("[RFQ] enquiry not delivered:", e); finish("failed"); });
  }, on);
  $("#rfq-copy", form).addEventListener("click", function () {
    var b = this, t = $("#rfq-summary", form).textContent;
    var ok = function () { b.textContent = "Copied"; setTimeout(function () { b.textContent = "Copy summary"; }, 1800); };
    var fb = function () { var r = document.createRange(); r.selectNodeContents($("#rfq-summary", form)); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = "Selected, press Ctrl+C"; };
    try { navigator.clipboard.writeText(t).then(ok, fb); } catch (x) { fb(); }
  }, on);
  $("#rfq-edit", form).addEventListener("click", function () { done.hidden = true; sheet.classList.remove("is-issued"); if (waBtn) waBtn.parentNode.hidden = false; goStep(1); }, on);
  if (api.scope) { var c = $("#" + api.scope, form); if (c) c.checked = true; }
  goStep(1); live(); refreshWa();
  return () => { const list = cleanups; cleanups = []; list.forEach((f) => { try { f(); } catch (e) {} }); };
}

