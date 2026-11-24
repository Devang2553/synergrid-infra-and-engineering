import { Link } from "react-router-dom";
import { Brand } from "./Mark.jsx";
import { SITE } from "../config.js";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot__grid">
          <div className="stack">
            <Link className="mark" to="/" aria-label="Synergrid Infra LLP home"><Brand tone="dark" /></Link>
            <p style={{ margin: 0, maxWidth: "40ch" }}>Powering Trust, Engineering Excellence. Turnkey EPC and concept-to-commissioning solutions for industrial plants across India.</p>
          </div>
          <div>
            <h3>Pages</h3>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/civil-peb">Civil &amp; PEB</Link></li>
              <li><Link to="/mep">MEP</Link></li>
              <li><Link to="/power-system-design">Power design</Link></li>
              <li><Link to="/audits-testing">Audits &amp; testing</Link></li>
              <li><Link to="/compliance">Compliance</Link></li>
            </ul>
          </div>
          <div>
            <h3>Corporate office</h3>
            <ul>
              <li><address className="addr">{SITE.addressLines.map((l) => <span key={l}>{l}</span>)}</address></li>
              <li><a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">Get directions</a></li>
              {SITE.phones.map((p) => <li key={p.href}><a href={p.href}>{p.label}</a></li>)}
              <li><a href={"mailto:" + SITE.email}>{SITE.email}</a></li>
              <li><Link to="/contact">Request a proposal</Link></li>
            </ul>
          </div>
        </div>
        <div className="foot__base">
          <span>
            &copy; {new Date().getFullYear()} Synergrid Infra LLP
            {/* plain <a>, not <Link>: sitemap.xml is a file written at build time, not an app page */}
            {" · "}<a href="/sitemap.xml">Sitemap</a>
          </span>
          <span>CEA 2023 · NBC 2016 · IEEE · NFPA · IEC · IS</span>
        </div>
      </div>
    </footer>
  );
}
