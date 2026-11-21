import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { usePage } from "../lib/usePage.js";
import { init } from "../lib/pages/power.js";

export default function PowerSystemDesign() {
  const ref = usePage({ init, stage: .735 });
  return (
    <>
      <Seo />
      <section ref={ref} className="view page" data-view="power">
        <section className="phero">
          <div className="wrap phero__grid">
            <div className="stack">
              <nav className="crumbs" aria-label="Breadcrumb"><Link to="/">SYNERGRID</Link><span>/</span><span>Power system design</span></nav>
              <h1 className="disp disp--3" data-split="">Advanced Electrical Power System Design &amp; <em>Grid Simulations</em></h1>
              <p className="lede">Fourteen study and design services that decide how your plant's power system behaves before a single breaker is bought. Modelled in ETAP and SKM.</p>
              <div className="glance"><div><b>14 services</b><span>Studies &amp; design</span></div><div><b>ETAP 2024</b><span>&amp; SKM software</span></div><div><b>Up to 400kV</b><span>Substations</span></div></div>
              <div className="row"><Link className="btn btn--amber" to="/contact" data-scope="scope-power" data-magnet="">Request a proposal</Link><a className="tlink" href="#sld-h">Explore the single line</a></div>
            </div>
            <div className="phero__art" data-plant-slot=""><span className="stagechip">Grid to panel, built</span></div>
          </div>
        </section>

        <section className="sec panel" aria-labelledby="sld-h">
          <div className="wrap">
            <div className="sched__head">
              <div className="stack"><span className="kicker">Explainer</span><h2 className="disp disp--2" id="sld-h" data-split="">Which study protects which part?</h2></div>
              <p className="lede">This is a simplified single line diagram of a plant, the drawing every study starts from. Tap any equipment to see which of our studies decide its size, settings and safety.</p>
            </div>
            <div className="lab">
              <div className="lab__view"><svg id="sld-svg" viewBox="0 0 720 520" role="img" aria-label="Single line diagram: grid incomer, switchyard breaker, power transformer, LT main panel, motor control centre with drives, capacitor bank, solar PV inverter and DG set."></svg></div>
              <div className="lab__side"><div className="out" id="sld-out" aria-live="polite"></div></div>
            </div>
          </div>
        </section>

        <section className="sec" aria-labelledby="ps1-h">
          <div className="wrap stack stack--lg">
            <div><span className="kicker">Scope items 01 to 08</span><h2 className="disp disp--2" id="ps1-h" data-split="" style={{ "marginTop": "16px" }}>Studies &amp; simulation</h2></div>
            <ol className="sched">
              <li><span className="mono">01</span><h3>Power system analysis</h3><p>A full network model of your plant, the base every other study is run on.</p><div className="tags"><span className="tag">ETAP</span><span className="tag">SKM</span></div></li>
              <li><span className="mono">02</span><h3>Load flow &amp; short circuit analysis</h3><p>Voltage drop, loading and fault levels, used to rate cables, buses and breakers.</p><div className="tags"><span className="tag">IEC 60909</span><span className="tag">ANSI</span></div></li>
              <li><span className="mono">03</span><h3>Relay coordination &amp; protection studies</h3><p>Settings and time-current curves so the nearest breaker trips first and the rest of the plant stays on.</p><div className="tags"><span className="tag">TCC curves</span></div></li>
              <li><span className="mono">04</span><h3>Arc flash analysis</h3><p>Incident energy at every panel, the PPE category it needs and the label that goes on it.</p><div className="tags"><span className="tag">IEEE 1584</span><span className="tag">NFPA 70E</span></div></li>
              <li><span className="mono">05</span><h3>Transient stability studies</h3><p>How motors, generators and the grid ride through faults, switching and large motor starts.</p><div className="tags"><span className="tag">Dynamic</span></div></li>
              <li><span className="mono">06</span><h3>Power factor improvement &amp; kVAR optimisation</h3><p>Capacitor bank and APFC sizing to cut utility penalties and losses.</p><div className="tags"><span className="tag">kVAR</span></div></li>
              <li><span className="mono">07</span><h3>Harmonic analysis &amp; mitigation</h3><p>Model distortion from drives, UPS and rectifiers, then size filters to bring it inside limits.</p><div className="tags"><span className="tag">IEEE 519</span></div></li>
              <li><span className="mono">08</span><h3>Protection relaying scheme verification</h3><p>Confirm the protection scheme on paper matches what is wired and set in the field.</p><div className="tags"><span className="tag">Scheme check</span></div></li>
            </ol>
            <div><span className="kicker">Scope items 09 to 14</span><h2 className="disp disp--2" data-split="" style={{ "marginTop": "16px" }}>Design &amp; engineering</h2></div>
            <ol className="sched">
              <li><span className="mono">09</span><h3>Substation layout &amp; engineering</h3><p>HV and EHV switchyard layouts, clearances and equipment selection.</p><div className="tags"><span className="tag">Up to 400kV</span></div></li>
              <li><span className="mono">10</span><h3>Solar plant design engineering</h3><p>Array layout, string sizing, inverter selection and power evacuation for PV plants.</p><div className="tags"><span className="tag">Utility scale</span><span className="tag">Rooftop</span></div></li>
              <li><span className="mono">11</span><h3>Equipment sizing, specification &amp; datasheets</h3><p>Transformers, switchgear, cables and DG sets sized from the study results.</p><div className="tags"><span className="tag">Datasheets</span></div></li>
              <li><span className="mono">12</span><h3>Greenfield &amp; brownfield engineering</h3><p>New plants designed from scratch, or expansions tied safely into a running system.</p><div className="tags"><span className="tag">New</span><span className="tag">Expansion</span></div></li>
              <li><span className="mono">13</span><h3>Electrical equipment specifications</h3><p>Technical specifications ready for tender and like-for-like vendor comparison.</p><div className="tags"><span className="tag">Tender</span></div></li>
              <li><span className="mono">14</span><h3>Engineering &amp; vendor drawing review</h3><p>We check vendor GA drawings, schematics and datasheets against the design before fabrication.</p><div className="tags"><span className="tag">GA</span><span className="tag">Schematics</span></div></li>
            </ol>
          </div>
        </section>
        <section className="sec night"><div className="wrap"><div className="cta"><div className="stack"><h2 className="disp disp--2">Send us your single line diagram.</h2><p className="lede">Tell us which studies you need, or what problem you are seeing, and we will scope the work.</p></div><Link className="btn btn--amber" to="/contact" data-scope="scope-power" data-magnet="">Request a proposal</Link></div></div></section>
        <div className="wrap"><Link className="next" to="/audits-testing"><span className="stack stack--sm"><span className="mono">Next</span><b>Audits &amp; testing</b></span><svg viewBox="0 0 64 24" aria-hidden="true"><path d="M2 12h58M50 2l10 10-10 10" fill="none" stroke="currentColor" strokeWidth="2.5" /></svg></Link></div>
      </section>
    </>
  );
}
