/* ==================================================================
   SEO SETTINGS: one place for every page's title, description and the
   business details search engines read.

   Used in two places:
   - in the browser, by src/components/Seo.jsx, when a visitor moves
     between pages;
   - at build time, by the seo plugin in vite.config.js, which writes a
     ready-made HTML file per page (dist/about/index.html, ...) plus
     sitemap.xml, so Google and link previews (WhatsApp, LinkedIn,
     Facebook, X) see the right title, description and image without
     running any JavaScript.

   Keep this file free of browser-only code: it also runs in Node.
   ================================================================== */

/* The live address. Every canonical URL, the sitemap and the share
   image are built from it. No trailing slash. */
export const SITE_URL = "https://www.synergridinfra.com";

export const BRAND = "Synergrid Infra LLP";
export const LEGAL_NAME = "Synergrid Infra LLP";

/* Share image shown in link previews: 1200 x 630, in public/. */
export const OG_IMAGE = {
  path: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Synergrid Infra LLP: turnkey industrial EPC, concept to commissioning. Vadodara, Gujarat.",
};

/* Every indexable page. `crumb` is the name shown in Google's breadcrumb
   trail; `service` marks pages that describe one service line. Titles stay
   under about 65 characters and descriptions under about 160 so Google
   shows them in full. */
export const ROUTES = [
  {
    path: "/",
    crumb: "Home",
    title: "Turnkey Industrial EPC Contractor in Gujarat | Synergrid Infra LLP",
    description: "Synergrid Infra LLP, Vadodara: turnkey industrial EPC from concept to commissioning. Civil & PEB, MEP, power system design, safety audits and testing.",
    priority: "1.0",
  },
  {
    path: "/about",
    crumb: "About us",
    title: "About Synergrid Infra LLP | Industrial EPC Partner, Vadodara",
    description: "One accountable EPC partner from bare land to a running plant. Meet the civil, MEP and electrical safety engineers behind Synergrid Infra LLP in Vadodara, Gujarat.",
    priority: "0.7",
  },
  {
    path: "/civil-peb",
    crumb: "Civil & PEB",
    title: "Industrial Civil & PEB Construction | Synergrid Infra LLP",
    description: "Greenfield civil works, RCC foundations, pre-engineered steel buildings (PEB), epoxy and ESD flooring, and STAAD.Pro structural design for industrial plants.",
    priority: "0.9",
    service: "Industrial civil construction and PEB steel structures",
  },
  {
    path: "/mep",
    crumb: "MEP",
    title: "Industrial MEP: HVAC, Electrical & Fire | Synergrid Infra LLP",
    description: "Integrated industrial MEP contracting in Gujarat: chilled water HVAC, HT/LT electrical, plumbing and effluent drainage, fire suppression and ELV automation.",
    priority: "0.9",
    service: "Industrial MEP contracting (HVAC, electrical, plumbing, fire, ELV)",
  },
  {
    path: "/power-system-design",
    crumb: "Power system design",
    title: "Power System Analysis in ETAP & SKM | Synergrid Infra LLP",
    description: "Power system studies in ETAP and SKM: load flow, short circuit, relay coordination, arc flash, harmonics, substation design up to 400 kV and solar PV design.",
    priority: "0.9",
    service: "Electrical power system design and ETAP studies",
  },
  {
    path: "/audits-testing",
    crumb: "Audits & testing",
    title: "Electrical Safety Audit & Testing in Vadodara | Synergrid Infra LLP",
    description: "CEA 2023 electrical safety audits, earthing and lightning risk assessment, relay and breaker testing, cable testing and transformer oil filtration in Gujarat.",
    priority: "0.9",
    service: "Electrical safety audits, testing and commissioning",
  },
  {
    path: "/compliance",
    crumb: "Compliance",
    title: "Compliance Standards & Industrial Sectors | Synergrid Infra LLP",
    description: "The IS, IEC, CEA and NBC codes behind every Synergrid design and test report, the industrial sectors we serve and the diagnostic equipment we measure with.",
    priority: "0.6",
  },
  {
    path: "/contact",
    crumb: "Request a proposal",
    title: "Request a Turnkey EPC Proposal | Synergrid Infra LLP",
    description: "Send Synergrid Infra LLP your scope, facility location, timeline and BOQ to request a turnkey EPC proposal. Corporate office in New Karelibaug, Vadodara, Gujarat.",
    priority: "0.8",
  },
];

export const NOT_FOUND = {
  title: "Page Not Found | Synergrid Infra LLP",
  description: "This page is not part of the Synergrid Infra LLP site.",
};

export const routeMeta = (path) => ROUTES.find((r) => r.path === path);
export const absUrl = (path) => SITE_URL + (path === "/" ? "/" : path);

/* ---------- structured data (schema.org JSON-LD) ---------- */

const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "F-111, Ratnam Heights, Opp. Motibhai Park, Khodiyar Nagar, New Karelibaug",
  addressLocality: "Vadodara",
  addressRegion: "Gujarat",
  postalCode: "390022",
  addressCountry: "IN",
};

const ORG_ID = SITE_URL + "/#organization";

/* The company, as one LocalBusiness that Google can show in search and
   match to a Google Business Profile. `site` is SITE from src/config.js. */
export function organizationLd(site) {
  const org = {
    "@type": ["ProfessionalService", "GeneralContractor"],
    "@id": ORG_ID,
    name: LEGAL_NAME,
    alternateName: ["Synergrid", "Synergrid Infra", "SYNERGRID INFRA & ENGINEERING SERVICES"],
    slogan: site.tagline,
    description: "Turnkey industrial EPC contractor in Vadodara, Gujarat: civil and PEB structures, MEP, power system design, electrical safety audits, testing and commissioning, from concept to commissioning.",
    url: SITE_URL + "/",
    logo: { "@type": "ImageObject", url: SITE_URL + "/logo.png", width: 1200, height: 512 },
    image: SITE_URL + OG_IMAGE.path,
    email: site.email,
    address: ADDRESS,
    hasMap: site.mapsUrl,
    areaServed: [
      { "@type": "State", name: "Gujarat" },
      { "@type": "Country", name: "India" },
    ],
    knowsAbout: [
      "Turnkey EPC", "Industrial construction", "Pre-engineered buildings", "MEP contracting",
      "HVAC", "Power system analysis", "ETAP", "Electrical safety audit", "Relay coordination",
      "Arc flash study", "Transformer oil filtration", "Testing and commissioning",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Turnkey EPC services",
      itemListElement: ROUTES.filter((r) => r.service).map((r) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: r.service, url: absUrl(r.path) },
      })),
    },
  };
  if (site.phone) org.telephone = site.phone;
  return org;
}

export function websiteLd() {
  return {
    "@type": "WebSite",
    "@id": SITE_URL + "/#website",
    url: SITE_URL + "/",
    name: BRAND,
    alternateName: "Synergrid",
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  };
}

/* Page-level data: the breadcrumb trail, plus a Service for service pages. */
export function pageLd(route) {
  const out = [];
  if (route.path !== "/") {
    out.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
        { "@type": "ListItem", position: 2, name: route.crumb, item: absUrl(route.path) },
      ],
    });
  }
  if (route.service) {
    out.push({
      "@type": "Service",
      name: route.service,
      description: route.description,
      url: absUrl(route.path),
      provider: { "@id": ORG_ID },
      areaServed: { "@type": "Country", name: "India" },
    });
  }
  return out;
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* The per-page <head> tags, as an HTML string, for the build step. */
export function headTags(route, site) {
  const url = absUrl(route.path);
  const img = SITE_URL + OG_IMAGE.path;
  const graph = route.path === "/" ? [organizationLd(site), websiteLd()] : [organizationLd(site), ...pageLd(route)];
  const ld = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  return [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}">`,
    `<link rel="canonical" href="${url}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${esc(BRAND)}">`,
    `<meta property="og:locale" content="en_IN">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:title" content="${esc(route.title)}">`,
    `<meta property="og:description" content="${esc(route.description)}">`,
    `<meta property="og:image" content="${img}">`,
    `<meta property="og:image:secure_url" content="${img}">`,
    `<meta property="og:image:type" content="image/jpeg">`,
    `<meta property="og:image:width" content="${OG_IMAGE.width}">`,
    `<meta property="og:image:height" content="${OG_IMAGE.height}">`,
    `<meta property="og:image:alt" content="${esc(OG_IMAGE.alt)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(route.title)}">`,
    `<meta name="twitter:description" content="${esc(route.description)}">`,
    `<meta name="twitter:image" content="${img}">`,
    `<meta name="twitter:image:alt" content="${esc(OG_IMAGE.alt)}">`,
    `<script type="application/ld+json">${ld}</script>`,
  ].join("\n");
}

export function sitemapXml(lastmod) {
  const rows = ROUTES.map((r) =>
    `  <url>\n    <loc>${absUrl(r.path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${r.priority}</priority>\n  </url>`
  ).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</urlset>\n`;
}
