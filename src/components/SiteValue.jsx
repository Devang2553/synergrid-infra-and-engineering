import { SITE } from "../config.js";

/* A company detail from src/config.js, with links where they help:
   address -> lines + "Get directions", phone -> tap to call, email -> mail link.
   Empty values show a clear placeholder until they are filled in. */
export default function SiteValue({ k, fallback = "To be added before launch", style }) {
  if (k === "address") {
    return (
      <dd style={style}>
        <address className="addr">{SITE.addressLines.map((l) => <span key={l}>{l}</span>)}</address>
        <a className="maplink" href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">Get directions</a>
      </dd>
    );
  }
  if (k === "phone") {
    return SITE.phone
      ? <dd style={style}><a href={SITE.phoneHref}>{SITE.phone}</a></dd>
      : <dd className="tbc" style={style}>{fallback}</dd>;
  }
  if (k === "email") return <dd style={style}><a href={"mailto:" + SITE.email}>{SITE.email}</a></dd>;
  const v = SITE[k];
  return v ? <dd style={style}>{v}</dd> : <dd className="tbc" style={style}>{fallback}</dd>;
}
