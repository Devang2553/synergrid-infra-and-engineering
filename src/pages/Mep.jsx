import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { usePage } from "../lib/usePage.js";
import { init } from "../lib/pages/mep.js";

export default function Mep() {
  const ref = usePage({ init, stage: .565 });
  return (
    <>
      <Seo
        title={"Industrial MEP Contracting | SYNERGRID INFRA & ENGINEERING SERVICES - Turnkey EPC Solutions"}
        description={"Integrated industrial MEP contracting: chilled water HVAC, HT/LT electrical, plumbing and effluent drainage, fire suppression and ELV automation."}
      />
      <section ref={ref} className="view page" data-view="mep">
        <section className="phero">
          <div className="wrap phero__grid">
            <div className="stack">
              <nav className="crumbs" aria-label="Breadcrumb"><Link to="/">SYNERGRID</Link><span>/</span><span>MEP</span></nav>
              <h1 className="disp disp--3" data-split="">Integrated Industrial MEP Contracting <em>(HVAC, Electrical, Plumbing, Fire, ELV)</em></h1>
              <p className="lede">Five service packages designed on one coordinated model and installed by one contractor, so ducts, pipes and cable trays meet on site the way they met on the drawing.</p>
              <div className="glance"><div><b>Five packages</b><span>One contractor</span></div><div><b>One model</b><span>Clash-checked routes</span></div><div><b>NBC 2016</b><span>Fire &amp; life safety</span></div></div>
              <div className="row"><Link className="btn btn--amber" to="/contact" data-scope="scope-mep" data-magnet="">Request a proposal</Link><a className="tlink" href="#void-h">See the ceiling void</a></div>
            </div>
            <div className="phero__art" data-plant-slot=""><span className="stagechip">Services routed in the shed</span></div>
          </div>
        </section>

        <section className="sec panel" aria-labelledby="void-h">
          <div className="wrap">
            <div className="sched__head">
              <div className="stack"><span className="kicker">Explainer</span><h2 className="disp disp--2" id="void-h" data-split="">Five systems. One ceiling void.</h2></div>
              <p className="lede">Above a production floor, five separate systems share the same few metres of space. Switch them on one at a time, then all together, to see why they have to be designed as one.</p>
            </div>
            <div className="lab">
              <div className="lab__view"><svg id="void-svg" viewBox="0 0 720 420" role="img" aria-label="Section through a factory bay showing the routes of HVAC, electrical, plumbing, fire and ELV services."></svg></div>
              <div className="lab__side">
                <div className="chipsel" role="group" aria-label="Systems">
                  <button type="button" data-sys="hvac" aria-pressed="true">HVAC</button><button type="button" data-sys="elec" aria-pressed="false">Electrical</button><button type="button" data-sys="plumb" aria-pressed="false">Plumbing</button><button type="button" data-sys="fire" aria-pressed="false">Fire</button><button type="button" data-sys="elv" aria-pressed="false">ELV</button><button type="button" data-sys="all" aria-pressed="false">All together</button>
                </div>
                <div className="out" id="void-out" aria-live="polite"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="sec" aria-labelledby="mep-h">
          <div className="wrap">
            <span className="kicker">Scope</span>
            <h2 className="disp disp--2" id="mep-h" data-split="" style={{ "margin": "16px 0 32px" }}>The five packages, explained.</h2>
            <div className="specs">
              <article className="spec"><div className="spec__head"><span className="mono">Mechanical</span><h3 className="disp disp--1">Mechanical &amp; HVAC</h3></div><div className="spec__body"><dl><dt>What it is</dt><dd>Cooling and air handling for production floors, cleanrooms and offices, sized to the process heat load.</dd><dt>Why it matters</dt><dd>Cleanrooms are held to an ISO class by air changes and pressure, not by the room alone. Get the HVAC wrong and the room fails its classification.</dd></dl><ul className="ticks"><li>Central chilled water plants</li><li>VRF / VRV networks</li><li>Cleanroom HVAC (ISO classes)</li><li>Industrial ventilation</li><li>Ductwork fabrication and installation</li></ul></div></article>
              <article className="spec"><div className="spec__head"><span className="mono">Electrical</span><h3 className="disp disp--1">Industrial electrical turnkey contracting</h3></div><div className="spec__body"><dl><dt>What it is</dt><dd>Supply, installation, testing and commissioning of the full power distribution, from the incoming transformer to the last light fitting.</dd><dt>Why it matters</dt><dd>The people installing it are the people who studied it and will test it, so the panels built match the protection settings designed.</dd></dl><ul className="ticks"><li>Power transformers</li><li>HT switchgear</li><li>LT panels (PCC, MCC, PDB)</li><li>Busducts</li><li>Cable trays and cabling</li><li>Industrial lighting</li></ul></div></article>
              <article className="spec"><div className="spec__head"><span className="mono">Plumbing</span><h3 className="disp disp--1">Plumbing &amp; process drainage</h3></div><div className="spec__body"><dl><dt>What it is</dt><dd>Water in, wastewater out, treated and compliant with your consent conditions.</dd><dt>Why it matters</dt><dd>Trade effluent has to be kept apart from storm water and routed to treatment. Mixing them is a compliance problem, not a plumbing one.</dd></dl><ul className="ticks"><li>Hydro-pneumatic water distribution</li><li>Trade effluent drainage networks</li><li>Rainwater harvesting</li><li>STP / WTP integration</li></ul></div></article>
              <article className="spec"><div className="spec__head"><span className="mono">Fire</span><h3 className="disp disp--1">Fire fighting &amp; suppression</h3></div><div className="spec__body"><dl><dt>What it is</dt><dd>Detection-to-discharge fire protection designed to NBC 2016 and the hazard of each area.</dd><dt>Why it matters</dt><dd>A battery room, a server room and a warehouse need different systems. Water spray, sprinklers and clean agent are chosen per area, not per building.</dd></dl><ul className="ticks"><li>Automatic fire sprinkler mains</li><li>Hydrant networks</li><li>Medium / high velocity water spray</li><li>Clean agent suppression (FM200 / Novec 1230)</li></ul></div></article>
              <article className="spec"><div className="spec__head"><span className="mono">ELV</span><h3 className="disp disp--1">Extra low voltage (ELV) &amp; automation</h3></div><div className="spec__body"><dl><dt>What it is</dt><dd>The systems that watch, secure and run the building once it is handed over.</dd><dt>Why it matters</dt><dd>ELV is usually the last trade in and the first to be squeezed. Planning its routes with the power cabling avoids interference and rework.</dd></dl><ul className="ticks"><li>IP CCTV surveillance</li><li>Access control</li><li>Public address (PA / GA)</li><li>Building management systems (BMS)</li><li>Optical fibre cabling</li></ul></div></article>
            </div>
          </div>
        </section>
        <section className="sec night"><div className="wrap"><div className="cta"><div className="stack"><h2 className="disp disp--2">One MEP contractor instead of five?</h2><p className="lede">Share your layout and process loads. We will propose the full MEP package, or MEP within a turnkey EPC contract.</p></div><Link className="btn btn--amber" to="/contact" data-scope="scope-mep" data-magnet="">Request a proposal</Link></div></div></section>
        <div className="wrap"><Link className="next" to="/power-system-design"><span className="stack stack--sm"><span className="mono">Next</span><b>Power system design</b></span><svg viewBox="0 0 64 24" aria-hidden="true"><path d="M2 12h58M50 2l10 10-10 10" fill="none" stroke="currentColor" strokeWidth="2.5" /></svg></Link></div>
      </section>
    </>
  );
}
