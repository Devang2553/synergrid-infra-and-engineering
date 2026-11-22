/* Sending an enquiry to the Google Apps Script web app
   (apps-script/Code.gs), which emails it and adds it to the Google Sheet. */
import { SITE } from "../config.js";

/* Reference shown to the visitor and used as the Enquiry ID in the sheet,
   e.g. SG-281026-4821 (date + 4 digits). */
export function makeRef() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  const date = String(d.getFullYear()).slice(2) + p(d.getMonth() + 1) + p(d.getDate());
  return "SG-" + date + "-" + String(Math.floor(Math.random() * 10000)).padStart(4, "0");
}

export function readAsBase64(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1] || "");
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

export const isConnected = () => Boolean(SITE.rfqEndpoint);

/* fields: { ref, name, company, email, phone, scope, location, timeline, notes, summary, hp }
   file:   a File or null.
   Resolves with the script's reply ({ ok: true, ref, row }) once the enquiry is
   emailed and in the sheet. Rejects when it did not get there: a network error,
   a web app that is not shared with "Anyone" (Google answers with a sign-in
   page, which the browser blocks), or the script itself reporting an error. */
export async function sendEnquiry(fields, file) {
  const payload = {
    ...fields,
    submittedAt: new Date().toISOString(),
    page: window.location.href,
    file: file
      ? { name: file.name, type: file.type || "application/octet-stream", size: file.size, data: await readAsBase64(file) }
      : null,
  };
  // text/plain is a "simple" request, so there is no CORS preflight (Apps Script
  // does not answer one). The web app's JSON reply carries CORS headers, so we
  // can read it and know the enquiry really arrived.
  const res = await fetch(SITE.rfqEndpoint, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
    redirect: "follow",
  });
  if (!res.ok) throw new Error("Enquiry endpoint answered HTTP " + res.status);
  let reply;
  try { reply = await res.json(); } catch (e) { throw new Error("Enquiry endpoint did not answer with JSON (is the web app shared with Anyone?)"); }
  if (!reply || reply.ok !== true) throw new Error("Enquiry was not saved: " + ((reply && reply.error) || "unknown error"));
  return reply;
}
