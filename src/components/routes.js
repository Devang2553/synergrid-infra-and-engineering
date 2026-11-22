/* Every page, in reading order. */
export const PAGES = [
  { path: "/", name: "Home", menu: "Home", note: "The plant, built in front of you" },
  { path: "/about", name: "About us", menu: "About us", nav: "About", note: "One accountable EPC partner" },
  { path: "/civil-peb", name: "Civil & PEB", menu: "Civil & PEB", nav: "Civil & PEB", note: "Foundations and steel buildings" },
  { path: "/mep", name: "MEP", menu: "MEP", nav: "MEP", note: "HVAC, electrical, plumbing, fire, ELV" },
  { path: "/power-system-design", name: "Power design", menu: "Power design", nav: "Power Design", note: "Fourteen studies in ETAP and SKM" },
  { path: "/audits-testing", name: "Audits & testing", menu: "Audits & testing", nav: "Audits & Testing", note: "Sixteen audit, test and commissioning services" },
  { path: "/compliance", name: "Compliance", menu: "Compliance", nav: "Compliance", note: "Codes, sectors and equipment" },
  { path: "/contact", name: "Request a proposal", menu: "Contact & RFQ", note: "Request a turnkey proposal" },
];

export const pageName = (path) => (PAGES.find((p) => p.path === path) || { name: "Synergrid Infra LLP" }).name;
