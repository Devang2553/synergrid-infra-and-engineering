import { useEffect } from "react";
import { SITE } from "../config.js";

/* Company details for search engines (schema.org LocalBusiness), built from
   src/config.js so the phone number appears here too once it is set. */
export default function StructuredData() {
  useEffect(() => {
    const data = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: SITE.name,
      slogan: SITE.tagline,
      description: "Turnkey EPC contractor: civil and PEB structures, MEP, power system design, electrical safety audits, testing and commissioning.",
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "F-111, Ratnam Heights, Opp. Motibhai Park, Khodiyar Nagar, New Karelibaug",
        addressLocality: "Vadodara",
        addressRegion: "Gujarat",
        postalCode: "390022",
        addressCountry: "IN",
      },
      areaServed: "IN",
      hasMap: SITE.mapsUrl,
    };
    if (SITE.phone) data.telephone = SITE.phone;
    if (SITE.domain) data.url = "https://" + SITE.domain;
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.textContent = JSON.stringify(data);
    document.head.appendChild(el);
    return () => el.remove();
  }, []);
  return null;
}
