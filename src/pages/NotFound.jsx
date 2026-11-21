import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { usePage } from "../lib/usePage.js";
import { PAGES } from "../components/routes.js";

export default function NotFound() {
  const ref = usePage({ stage: 0.1 });
  return (
    <>
      <Seo title="Page Not Found | SYNERGRID INFRA & ENGINEERING SERVICES - Turnkey EPC Solutions" description="This page is not part of the SYNERGRID site." />
      <section ref={ref} className="view page">
        <section className="phero">
          <div className="wrap phero__grid">
            <div className="stack">
              <span className="kicker">Not built yet</span>
              <h1 className="disp disp--3" data-split="">Nothing has been built <em>here.</em></h1>
              <p className="lede">The link may be old or mistyped. Pick a page below.</p>
              <ul className="sectors" style={{ marginTop: 8 }}>
                {PAGES.map((p) => (
                  <li key={p.path}><Link to={p.path} style={{ display: "block", padding: "14px 0", textDecoration: "none" }}><b style={{ font: "800 1.6rem/1 var(--f-disp)", textTransform: "uppercase" }}>{p.menu}</b></Link></li>
                ))}
              </ul>
            </div>
            <div className="phero__art" data-plant-slot=""><span className="stagechip">An empty site</span></div>
          </div>
        </section>
      </section>
    </>
  );
}
