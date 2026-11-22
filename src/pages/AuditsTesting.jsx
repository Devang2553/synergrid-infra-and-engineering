import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { usePage } from "../lib/usePage.js";
import { init } from "../lib/pages/audits.js";

export default function AuditsTesting() {
  const ref = usePage({ init, stage: .86 });
  return (
    <>
      <Seo />
      <section ref={ref} className="view page" data-view="audits">
        <section className="phero">
          <div className="wrap phero__grid">
            <div className="stack">
              <nav className="crumbs" aria-label="Breadcrumb"><Link to="/">SYNERGRID</Link><span>/</span><span>Audits &amp; testing</span></nav>
              <h1 className="disp disp--3" data-split="">Statutory Safety Audits, Field Diagnostic Testing &amp; <em>Commissioning</em></h1>
              <p className="lede">Sixteen services that prove an installation is safe to switch on and keep running: statutory audits, risk assessments and field tests with calibrated equipment.</p>
              <div className="glance"><div><b>16 services</b><span>Audits &amp; field tests</span></div><div><b>CEA 2023</b><span>Statutory basis</span></div><div><b>Pan-India</b><span>AMC contracts</span></div></div>
              <div className="row"><Link className="btn btn--amber" to="/contact" data-scope="scope-audits" data-magnet="">Request a proposal</Link><a className="tlink" href="#bench-h">Open the test bench</a></div>
            </div>
            <div className="phero__art" data-plant-slot=""><span className="stagechip">Every part ticked off</span></div>
          </div>
        </section>

        <section className="sec panel" aria-labelledby="bench-h">
          <div className="wrap">
            <div className="sched__head">
              <div className="stack"><span className="kicker">Explainer</span><h2 className="disp disp--2" id="bench-h" data-split="">The test bench.</h2></div>
              <p className="lede">Choose a part of your installation to see how we prove it is healthy: which tests we run, what we measure with, and the standard the result is judged against.</p>
            </div>
            <div className="lab">
              <div className="lab__view"><svg id="gauge-svg" viewBox="0 0 520 330" role="img" aria-label="Test instrument dial. The needle moves into the pass zone when a test is selected."></svg></div>
              <div className="lab__side">
                <div className="chipsel" role="group" aria-label="Part of the installation">
                  <button type="button" data-asset="tx" aria-pressed="true">Transformer</button><button type="button" data-asset="panel" aria-pressed="false">HT / LT panels</button><button type="button" data-asset="relay" aria-pressed="false">Relays &amp; breakers</button><button type="button" data-asset="cable" aria-pressed="false">Cables</button><button type="button" data-asset="earth" aria-pressed="false">Earthing</button><button type="button" data-asset="lps" aria-pressed="false">Lightning</button><button type="button" data-asset="site" aria-pressed="false">Whole site</button>
                </div>
                <div className="out" id="bench-out" aria-live="polite"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="sec" aria-labelledby="au1-h">
          <div className="wrap stack stack--lg">
            <div><span className="kicker">Scope items 01 to 07</span><h2 className="disp disp--2" id="au1-h" data-split="" style={{ "marginTop": "16px" }}>Audits &amp; risk assessments</h2></div>
            <ol className="sched">
              <li><span className="mono">01</span><h3>Electrical safety audit</h3><p>A full statutory inspection of the installation, with a prioritised list of what to fix.</p><div className="tags"><span className="tag">CEA 2023</span><span className="tag">NBC 2016</span></div></li>
              <li><span className="mono">02</span><h3>Lightning risk assessment</h3><p>Risk calculated per structure, and the protection level each one needs.</p><div className="tags"><span className="tag">IS 2309 / IEC 62305</span></div></li>
              <li><span className="mono">03</span><h3>Earthing risk assessment</h3><p>Soil resistivity survey and a check that the earthing can clear faults safely.</p><div className="tags"><span className="tag">IEEE 80 &amp; 81</span><span className="tag">IS 3043</span></div></li>
              <li><span className="mono">04</span><h3>Arc flash risk assessment</h3><p>Site-verified arc flash hazards with labels and PPE requirements for each panel.</p><div className="tags"><span className="tag">NFPA 70E</span><span className="tag">IEEE 1584</span></div></li>
              <li><span className="mono">05</span><h3>Forensic incident &amp; root cause analysis</h3><p>After a fire, flashover or failure: what happened, why, and how to stop it happening again.</p><div className="tags"><span className="tag">RCA</span></div></li>
              <li><span className="mono">06</span><h3>Electrical protection scheme audit</h3><p>Relay settings, CT and PT ratios and trip logic checked on site against the design.</p><div className="tags"><span className="tag">Protection</span></div></li>
              <li><span className="mono">07</span><h3>Power quality audit &amp; harmonics assessment</h3><p>Logged measurements of harmonics, voltage events and power factor.</p><div className="tags"><span className="tag">IEEE 519</span></div></li>
            </ol>
            <div><span className="kicker">Scope items 08 to 16</span><h2 className="disp disp--2" data-split="" style={{ "marginTop": "16px" }}>Field testing &amp; commissioning</h2></div>
            <ol className="sched">
              <li><span className="mono">08</span><h3>Testing &amp; commissioning of HT/LT panels</h3><p>Pre-commissioning checks before first energisation.</p><div className="tags"><span className="tag">PCC</span><span className="tag">MCC</span></div></li>
              <li><span className="mono">09</span><h3>Numerical relay testing, calibration &amp; programming</h3><p>Secondary injection testing and upload of approved settings.</p><div className="tags"><span className="tag">Secondary injection</span></div></li>
              <li><span className="mono">10</span><h3>HT/LT circuit breaker testing &amp; servicing</h3><p>Timing, contact resistance and mechanism servicing.</p><div className="tags"><span className="tag">VCB</span><span className="tag">SF6</span><span className="tag">ACB</span></div></li>
              <li><span className="mono">11</span><h3>Earth resistance, earth pit &amp; earth grid testing</h3><p>Measured values for every pit and grid, compared against design.</p><div className="tags"><span className="tag">Earthing</span></div></li>
              <li><span className="mono">12</span><h3>Power &amp; control cable testing</h3><p>Insulation and withstand tests before cables are energised.</p><div className="tags"><span className="tag">Hi-Pot</span><span className="tag">VLF</span></div></li>
              <li><span className="mono">13</span><h3>Earthing system testing &amp; low-resistance bonding</h3><p>Continuity and bonding checks across equipment and steelwork.</p><div className="tags"><span className="tag">Bonding</span></div></li>
              <li><span className="mono">14</span><h3>Substation maintenance &amp; pan-India AMC</h3><p>Scheduled preventive maintenance contracts for substations anywhere in India.</p><div className="tags"><span className="tag">AMC</span></div></li>
              <li><span className="mono">15</span><h3>Transformer testing &amp; oil filtration</h3><p>Oil testing and on-site high-vacuum filtration to restore insulation strength.</p><div className="tags"><span className="tag">HVOF</span><span className="tag">DGA</span><span className="tag">BDV</span></div></li>
              <li><span className="mono">16</span><h3>Arc flash safety solution implementation</h3><p>Labels, PPE kits, procedures and training put in place after the study.</p><div className="tags"><span className="tag">Implementation</span></div></li>
            </ol>
          </div>
        </section>
        <section className="sec night"><div className="wrap"><div className="cta"><div className="stack"><h2 className="disp disp--2">Audit due, or a new installation to energise?</h2><p className="lede">Tell us the site, the connected load and what you need tested.</p></div><Link className="btn btn--amber" to="/contact" data-scope="scope-audits" data-magnet="">Request a proposal</Link></div></div></section>
        <div className="wrap"><Link className="next" to="/compliance"><span className="stack stack--sm"><span className="mono">Next</span><b>Compliance &amp; sectors</b></span><svg viewBox="0 0 64 24" aria-hidden="true"><path d="M2 12h58M50 2l10 10-10 10" fill="none" stroke="currentColor" strokeWidth="2.5" /></svg></Link></div>
      </section>
    </>
  );
}
