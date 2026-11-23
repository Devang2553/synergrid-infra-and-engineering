/* ==================================================================
   SITE SETTINGS
   Edit the three values below, rebuild (npm run build), and the whole
   site updates: header, footer, contact page and WhatsApp button.
   ================================================================== */

/* 1. Mobile number, used for BOTH the call link and WhatsApp.
      Leave it empty until the client sends it. Any format works:
      "98765 43210", "+91 98765 43210", "919876543210".
      While it is empty the WhatsApp button stays hidden and the contact
      page shows "To be added before launch". */
export const MOBILE_NUMBER = "9725009355";

/* 1b. Second phone number, shown after the main one (call link only).
       Leave it empty to show just the main number. */
export const SECOND_NUMBER = "70482 82112";

/* 2. Google Apps Script web app URL that receives enquiries (ends in /exec).
      See README, "Connect enquiries". Until it is set, the form still works
      as a demo and shows the request summary without sending it. */
export const RFQ_ENDPOINT = "https://script.google.com/macros/s/AKfycbzlaojpzc2jZEkFShd-E4TRHmOjH8Zr2_ikj0nbPh0JMW8z_2AZo4c74pH5MCrnjCdmDQ/exec";

/* 3. Inbox shown on the site. Enquiries are emailed to the address set in
      apps-script/Code.gs (NOTIFY_EMAIL), which is the same inbox. */
export const ENQUIRY_EMAIL = "synergrid.eng@gmail.com";

/* ------------------------------------------------------------------ */

const ADDRESS_LINES = [
  "F-111, Ratnam Heights",
  "Opp. Motibhai Park, Khodiyar Nagar",
  "New Karelibaug, Vadodara",
  "Gujarat 390022",
];

/* "98765 43210" -> "919876543210" (wa.me and tel: format) */
function toDigits(n) {
  let d = String(n || "").replace(/\D/g, "");
  if (d.length === 11 && d[0] === "0") d = d.slice(1);
  if (d.length === 10) d = "91" + d;
  return d.length >= 11 && d.length <= 15 ? d : "";
}
/* "919876543210" -> "+91 98765 43210" */
function toPretty(d) {
  if (!d) return "";
  if (d.length === 12 && d.startsWith("91")) return "+91 " + d.slice(2, 7) + " " + d.slice(7);
  return "+" + d;
}

const env = (import.meta && import.meta.env) || {};
const mobileDigits = toDigits(MOBILE_NUMBER || env.VITE_MOBILE_NUMBER);
const secondDigits = toDigits(SECOND_NUMBER);

export const SITE = {
  name: "Synergrid Infra LLP",
  tagline: "Powering Trust, Engineering Excellence",
  city: "Vadodara, Gujarat, India",

  email: ENQUIRY_EMAIL,
  address: ADDRESS_LINES.join(", "),
  addressLines: ADDRESS_LINES,
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Ratnam Heights, Khodiyar Nagar, New Karelibaug, Vadodara, Gujarat 390022"),

  phone: toPretty(mobileDigits),          // shown on the site, "" until set
  phoneHref: mobileDigits ? "tel:+" + mobileDigits : "",
  whatsapp: mobileDigits,                 // wa.me digits, "" until set
  /* every number to show, main first: [{ label: "+91 ...", href: "tel:+91..." }] */
  phones: [mobileDigits, secondDigits].filter(Boolean).map((d) => ({ label: toPretty(d), href: "tel:+" + d })),

  domain: "www.synergridinfra.com",       // live address; SEO URLs are set in src/seo/meta.js
  rfqEndpoint: RFQ_ENDPOINT || env.VITE_RFQ_ENDPOINT || "",
};

