import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { usePage } from "../lib/usePage.js";
import { init } from "../lib/pages/compliance.js";

export default function Compliance() {
  const ref = usePage({ init, stage: 1 });
  return (
    <>
      <Seo
        title={"Quality Compliance Standards | SYNERGRID INFRA & ENGINEERING SERVICES - Turnkey EPC Solutions"}
        description={"The codes behind every SYNERGRID design and test report, the industrial sectors we serve and the diagnostic equipment we measure with."}
      />
      <section ref={ref} className="view page" data-view="compliance">
        <section className="phero">
          <div className="wrap phero__grid">
            <div className="stack">
              <nav className="crumbs" aria-label="Breadcrumb"><Link to="/">SYNERGRID</Link><span>/</span><span>Compliance</span></nav>
              <h1 className="disp disp--3" data-split="">Quality Compliance Standards &amp; Target <em>Industrial Sectors</em></h1>
              <p className="lede">The published codes behind every design, audit and test report we issue, the sectors we work in, and the equipment we measure with.</p>
              <div className="glance"><div><b>9 codes</b><span>Indian &amp; international</span></div><div><b>7 sectors</b><span>Where we work</span></div><div><b>6 instruments</b><span>Calibrated fleet</span></div></div>
              <div className="row"><Link className="btn btn--amber" to="/contact" data-magnet="">Request a proposal</Link></div>
            </div>
            <div className="phero__art" data-plant-slot=""><span className="stagechip">Compliant, commissioned, running</span></div>
          </div>
        </section>
        <section className="sec panel" aria-labelledby="cd-h">
          <div className="wrap">
            <div className="sched__head">
              <div className="stack"><span className="kicker">Governing codes</span><h2 className="disp disp--2" id="cd-h" data-split="">Every report is referenced to a code.</h2></div>
              <p className="lede">Tap a code to turn it over and see what it governs and where we apply it on your project.</p>
            </div>
            <div className="codes" id="codes">
              <button type="button" className="flip" aria-pressed="false"><span className="flip__in"><span className="flip__f"><i>Statutory · India</i><b>CEA 2023</b><span>Safety &amp; electric supply</span></span><span className="flip__b"><b>CEA (Measures relating to Safety and Electric Supply) Regulations, 2023</b><p>Statutory electrical safety audits and installation compliance.</p><small>Applied in: safety audits, commissioning</small></span></span></button>
              <button type="button" className="flip" aria-pressed="false"><span className="flip__in"><span className="flip__f"><i>Building · India</i><b>NBC 2016</b><span>National Building Code</span></span><span className="flip__b"><b>National Building Code of India</b><p>Fire, life safety and building services design.</p><small>Applied in: fire systems, MEP, ELV</small></span></span></button>
              <button type="button" className="flip" aria-pressed="false"><span className="flip__in"><span className="flip__f"><i>Arc flash</i><b>IEEE 1584</b><span>Arc flash calculations</span></span><span className="flip__b"><b>Guide for performing arc flash hazard calculations</b><p>Incident energy, arc flash boundaries and labels.</p><small>Applied in: arc flash study and assessment</small></span></span></button>
              <button type="button" className="flip" aria-pressed="false"><span className="flip__in"><span className="flip__f"><i>Grounding</i><b>IEEE 80</b><span>Substation grounding</span></span><span className="flip__b"><b>Guide for safety in AC substation grounding</b><p>Earth grid design, step and touch potential.</p><small>Applied in: earthing design and risk</small></span></span></button>
              <button type="button" className="flip" aria-pressed="false"><span className="flip__in"><span className="flip__f"><i>Power quality</i><b>IEEE 519</b><span>Harmonic control</span></span><span className="flip__b"><b>Harmonic control in electric power systems</b><p>Power quality audits and filter design.</p><small>Applied in: harmonics study, PQ audit</small></span></span></button>
              <button type="button" className="flip" aria-pressed="false"><span className="flip__in"><span className="flip__f"><i>Workplace safety</i><b>NFPA 70E</b><span>Electrical safety at work</span></span><span className="flip__b"><b>Standard for electrical safety in the workplace</b><p>PPE selection and safe work practice.</p><small>Applied in: arc flash labels, PPE, training</small></span></span></button>
              <button type="button" className="flip" aria-pressed="false"><span className="flip__in"><span className="flip__f"><i>Lightning</i><b>IEC 62305</b><span>Protection against lightning</span></span><span className="flip__b"><b>Protection against lightning</b><p>Lightning risk assessment and protection design.</p><small>Applied in: LPS design and audit</small></span></span></button>
              <button type="button" className="flip" aria-pressed="false"><span className="flip__in"><span className="flip__f"><i>Earthing · India</i><b>IS 3043</b><span>Code of practice for earthing</span></span><span className="flip__b"><b>Code of practice for earthing</b><p>Earthing design, earth pits and resistance testing.</p><small>Applied in: earth pits and grid testing</small></span></span></button>
              <button type="button" className="flip" aria-pressed="false"><span className="flip__in"><span className="flip__f"><i>Wiring · India</i><b>IS 732</b><span>Electrical wiring installations</span></span><span className="flip__b"><b>Code of practice for electrical wiring installations</b><p>LV distribution and wiring practice.</p><small>Applied in: LT distribution, final circuits</small></span></span></button>
            </div>
          </div>
        </section>
        <section className="sec" aria-labelledby="ws-h">
          <div className="wrap">
            <div className="sched__head"><div className="stack"><span className="kicker">Target sectors</span><h2 className="disp disp--2" id="ws-h" data-split="">Where we work.</h2></div><p className="lede">Plants where downtime is expensive and an electrical fault is a safety event. <Link className="tlink" to="/contact">Another sector? Tell us about your site</Link></p></div>
            <ul className="sectors" data-sectors="">
              <li className="is-on"><button type="button"><b>Heavy industrial manufacturing</b><p>Large motor loads, crane bays and PEB sheds.</p><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" /></svg></button></li>
              <li className="is-on"><button type="button"><b>Chemical &amp; process plants</b><p>Hazardous areas, effluent systems and strict earthing.</p><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" /></svg></button></li>
              <li className="is-on"><button type="button"><b>Data centers</b><p>Redundant power paths, UPS harmonics and precision cooling.</p><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" /></svg></button></li>
              <li className="is-on"><button type="button"><b>Solar PV plants</b><p>Utility-scale and rooftop design, evacuation and testing.</p><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" /></svg></button></li>
              <li className="is-on"><button type="button"><b>Commercial high-rises</b><p>Fire systems, ELV and building services to NBC 2016.</p><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" /></svg></button></li>
              <li className="is-on"><button type="button"><b>Multi-specialty hospitals</b><p>Critical power, medical gas areas and cleanroom HVAC.</p><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" /></svg></button></li>
              <li className="is-on"><button type="button"><b>EHV switchyards</b><p>Substation engineering, protection and maintenance.</p><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" /></svg></button></li>
            </ul>
          </div>
        </section>
        <section className="sec night" aria-labelledby="fl-h">
          <div className="wrap">
            <span className="kicker">Diagnostic fleet</span>
            <h2 className="disp disp--2" id="fl-h" data-split="" style={{ "margin": "16px 0 32px" }}>What we measure with.</h2>
            <ol className="sched" style={{ "borderTopColor": "var(--night-ink)" }}>
              <li style={{ "borderColor": "var(--night-rule)" }}><span className="mono" style={{ "color": "var(--amber)" }}>01</span><h3>ETAP 2024</h3><p style={{ "color": "var(--night-soft)" }}>Power system simulation: load flow, short circuit, stability, harmonics.</p><div className="tags"><span className="tag" style={{ "borderColor": "var(--night-rule)" }}>Software</span></div></li>
              <li style={{ "borderColor": "var(--night-rule)" }}><span className="mono" style={{ "color": "var(--amber)" }}>02</span><h3>SKM</h3><p style={{ "color": "var(--night-soft)" }}>Protection coordination and arc flash studies.</p><div className="tags"><span className="tag" style={{ "borderColor": "var(--night-rule)" }}>Software</span></div></li>
              <li style={{ "borderColor": "var(--night-rule)" }}><span className="mono" style={{ "color": "var(--amber)" }}>03</span><h3>Secondary injection kits</h3><p style={{ "color": "var(--night-soft)" }}>Numerical relay testing and calibration.</p><div className="tags"><span className="tag" style={{ "borderColor": "var(--night-rule)" }}>Field</span></div></li>
              <li style={{ "borderColor": "var(--night-rule)" }}><span className="mono" style={{ "color": "var(--amber)" }}>04</span><h3>FLIR thermal cameras</h3><p style={{ "color": "var(--night-soft)" }}>Thermography of panels, busbars and joints.</p><div className="tags"><span className="tag" style={{ "borderColor": "var(--night-rule)" }}>Field</span></div></li>
              <li style={{ "borderColor": "var(--night-rule)" }}><span className="mono" style={{ "color": "var(--amber)" }}>05</span><h3>Fluke power quality analyzers</h3><p style={{ "color": "var(--night-soft)" }}>Harmonics, power factor and voltage events, logged over time.</p><div className="tags"><span className="tag" style={{ "borderColor": "var(--night-rule)" }}>Field</span></div></li>
              <li style={{ "borderColor": "var(--night-rule)" }}><span className="mono" style={{ "color": "var(--amber)" }}>06</span><h3>High-vacuum oil filtration units</h3><p style={{ "color": "var(--night-soft)" }}>On-site transformer oil filtration (HVOF).</p><div className="tags"><span className="tag" style={{ "borderColor": "var(--night-rule)" }}>Field</span></div></li>
            </ol>
          </div>
        </section>
        <section className="sec"><div className="wrap"><div className="cta"><div className="stack"><h2 className="disp disp--2">A compliant installation, start to finish?</h2><p className="lede">Send your scope and we will reference every deliverable to the codes above.</p></div><Link className="btn btn--amber" to="/contact" data-magnet="">Request a proposal</Link></div>
          <Link className="next" to="/contact" style={{ "marginTop": "56px" }}><span className="stack stack--sm"><span className="mono">Next</span><b>Request a proposal</b></span><svg viewBox="0 0 64 24" aria-hidden="true"><path d="M2 12h58M50 2l10 10-10 10" fill="none" stroke="currentColor" strokeWidth="2.5" /></svg></Link></div></section>
      </section>
    </>
  );
}
