/* WhatsApp links with a drafted message. The visitor's WhatsApp opens with
   the text already typed; they can edit it before sending.
   Everything is driven by MOBILE_NUMBER in src/config.js. */
import { SITE } from "../config.js";

export const hasWhatsApp = () => Boolean(SITE.whatsapp);

export function waLink(text) {
  return "https://wa.me/" + SITE.whatsapp + "?text=" + encodeURIComponent(text);
}

/* What the visitor is probably asking about, from the page they are on */
const SERVICE_BY_PATH = {
  "/about": "turnkey EPC",
  "/civil-peb": "Civil & PEB structures",
  "/mep": "MEP (HVAC, electrical, plumbing, fire, ELV)",
  "/power-system-design": "power system design and studies",
  "/audits-testing": "electrical safety audit and testing",
  "/compliance": "compliance and statutory audit",
  "/contact": "turnkey EPC",
};

/* Draft for the floating button: a short, polite opener with blanks to fill */
export function pageDraft(pathname) {
  const service = SERVICE_BY_PATH[pathname];
  return [
    "Hello SYNERGRID team,",
    "",
    service
      ? "I found you on your website and I am interested in your " + service + " services."
      : "I found you on your website and would like to discuss a project.",
    "",
    "Name: ",
    "Company: ",
    "Project location: ",
    "Expected timeline: ",
    "",
    "Please call me back. Thank you.",
  ].join("\n");
}

/* Draft built from the contact form, filled or half filled */
export function formDraft(f) {
  const line = (label, v) => "• " + label + ": " + (v && String(v).trim() ? String(v).trim() : "");
  const out = [
    "Hello SYNERGRID team,",
    "",
    f.ref
      ? "I have just sent a request for proposal on your website (reference " + f.ref + ")."
      : "I would like to request a proposal.",
    "",
    line("Name", f.name),
    line("Company", f.company),
    line("Scope", f.scope),
    line("Project location", f.location),
    line("Expected timeline", f.timeline),
  ];
  if (f.notes && String(f.notes).trim()) out.push(line("Notes", f.notes));
  out.push("", "Looking forward to hearing from you.");
  return out.join("\n");
}
