import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { usePage } from "../lib/usePage.js";
import { init } from "../lib/pages/home.js";
import SiteValue from "../components/SiteValue.jsx";

export default function Home() {
  const ref = usePage({ init });
  return (
    <>
      <Seo />
      <section ref={ref} className="view" data-view="home">

        {/* 1. the plant assembles as you scroll */}
        <section className="asm" id="asm" aria-label="How a plant is built, from bare land to a running installation">
          <div className="asm__stage">
            <div className="asm__canvas" id="asm-canvas" aria-hidden="true"></div>
            <div className="asm__copy">
              <div className="wrap">
                <div className="asm__col">
                  <div className="cap" data-cap="0">
                    <span className="kicker">Turnkey industrial EPC contractor · Vadodara, Gujarat</span>
                    <h1 className="disp disp--4" data-split="">Powering Trust, <em>Engineering Excellence</em></h1>
                    <p className="lede">Turnkey EPC for industrial plants across India. One team takes your site from bare land to a tested, running plant. Scroll, and watch it get built.</p>
                    <div className="row"><Link className="btn btn--amber" to="/contact" data-magnet="">Request a proposal <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" /></svg></Link><Link className="tlink" to="/about">Why one contract</Link></div>
                  </div>
                  <div className="cap" data-cap="1" aria-hidden="true">
                    <span className="cap__stage">Stage · Site &amp; foundations</span>
                    <h2 className="disp disp--3">Bare land becomes a founded site.</h2>
                    <p className="lede">The plot is graded and levelled, the RCC footings go in where every column and heavy machine will stand, and service trenches are cut before anything rises.</p>
                    <ul className="chips"><li>Site grading</li><li>RCC footings</li><li>Service trenches</li><li>Industrial paving</li></ul>
                  </div>
                  <div className="cap" data-cap="2" aria-hidden="true">
                    <span className="cap__stage">Stage · PEB steel structure</span>
                    <h2 className="disp disp--3">Portal frames rise. The shell closes.</h2>
                    <p className="lede">Pre-engineered steel frames, designed in STAAD.Pro for wind and crane loads, are erected bay by bay. Purlins, girts and the crane gantry follow, then cladding and roofing.</p>
                    <ul className="chips"><li>Portal frames</li><li>Purlins &amp; girts</li><li>Crane gantry</li><li>Cladding &amp; roofing</li></ul>
                  </div>
                  <div className="cap" data-cap="3" aria-hidden="true">
                    <span className="cap__stage">Stage · MEP services</span>
                    <h2 className="disp disp--3">Services go in together, not one after another.</h2>
                    <p className="lede">HVAC duct, chilled water, the fire sprinkler main and cable trays are routed on one coordinated model, so they meet on site the way they met on the drawing.</p>
                    <ul className="chips"><li>HVAC duct &amp; AHU</li><li>Chilled water</li><li>Sprinkler main</li><li>Cable trays</li></ul>
                  </div>
                  <div className="cap" data-cap="4" aria-hidden="true">
                    <span className="cap__stage">Stage · Power, from the grid in</span>
                    <h2 className="disp disp--3">Power, from the tower to the last panel.</h2>
                    <p className="lede">Studies in ETAP size every element first. Then the switchyard, the power transformer, HT and LT cabling and the LT panels are built, with lightning protection on the roof.</p>
                    <ul className="chips"><li>Switchyard</li><li>Power transformer</li><li>HT / LT cabling</li><li>LT panels</li><li>Lightning protection</li></ul>
                  </div>
                  <div className="cap" data-cap="5" aria-hidden="true">
                    <span className="cap__stage">Stage · Audits &amp; testing</span>
                    <h2 className="disp disp--3">Every part is proven before it is switched on.</h2>
                    <p className="lede">Relays are injection tested, transformer oil is checked, cables are Hi-Pot tested, earth pits are measured and panels are scanned with thermal cameras, all referenced to CEA 2023.</p>
                    <ul className="chips"><li>Relay testing</li><li>Oil BDV &amp; DGA</li><li>Cable Hi-Pot / VLF</li><li>Earth pit tests</li><li>Thermography</li></ul>
                  </div>
                  <div className="cap" data-cap="6" aria-hidden="true">
                    <span className="cap__stage">Stage · Commissioned</span>
                    <h2 className="disp disp--3">Then it <em>runs.</em></h2>
                    <p className="lede">Concept to commissioning under one contract. One team answers for every stage you just watched.</p>
                    <div className="row"><Link className="btn btn--amber" to="/contact" data-magnet="">Request a proposal <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" /></svg></Link></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rail" aria-hidden="true">
              <div className="wrap">
                <ol>
                  <li><i></i><span>Foundations</span></li><li><i></i><span>Steel</span></li><li><i></i><span>MEP</span></li>
                  <li><i></i><span>Power</span></li><li><i></i><span>Testing</span></li><li><i></i><span>Live</span></li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* 2. the schedule: five contractors vs one */}
        <section className="sec night" aria-labelledby="sched-h">
          <div className="wrap">
            <div className="sched__head">
              <div className="stack">
                <span className="kicker">Why turnkey EPC</span>
                <h2 className="disp disp--3" id="sched-h" data-split="">Five contractors means four handovers.</h2>
              </div>
              <div className="stack">
                <p className="lede">On a typical industrial project, civil, steel, MEP, electrical and testing are let to separate firms. Each one waits for the last to finish and hand over. Switch the view to see what one contract changes.</p>
                <div className="seg" role="group" aria-label="Compare schedules">
                  <button type="button" data-mode="five" aria-pressed="true">Five contractors</button>
                  <button type="button" data-mode="one" aria-pressed="false">One SYNERGRID contract</button>
                </div>
              </div>
            </div>
            <div className="gantt" id="gantt" role="img" aria-label="Schedule comparison. With five contractors the stages run one after another with waiting time at each handover. With one contract, design overlaps site work and there are no handover waits, so production starts earlier.">
              <div className="gantt__row"><span>Design &amp; approvals</span><div className="gantt__track"><b className="gantt__bar"></b></div></div>
              <div className="gantt__row"><span>Civil &amp; foundations</span><div className="gantt__track"><i className="gantt__wait"></i><b className="gantt__bar"></b></div></div>
              <div className="gantt__row"><span>PEB steel</span><div className="gantt__track"><i className="gantt__wait"></i><b className="gantt__bar"></b></div></div>
              <div className="gantt__row"><span>MEP services</span><div className="gantt__track"><i className="gantt__wait"></i><b className="gantt__bar"></b></div></div>
              <div className="gantt__row"><span>Power &amp; electrical</span><div className="gantt__track"><i className="gantt__wait"></i><b className="gantt__bar"></b></div></div>
              <div className="gantt__row"><span>Testing &amp; commissioning</span><div className="gantt__track"><i className="gantt__wait"></i><b className="gantt__bar"></b></div></div>
              <div className="gantt__axis"><span></span><div><em style={{ "left": "0" }}>Start</em><em style={{ "right": "0" }}>Time</em><span className="flag" id="flag" data-label="Production starts"></span></div></div>
            </div>
            <div className="legend"><span><i style={{ "background": "var(--cobalt)" }}></i>Work on site</span><span><i style={{ "background": "repeating-linear-gradient(-45deg,rgba(184,64,44,.85) 0 3px,transparent 3px 8px)" }}></i>Waiting for a handover</span><span>Illustrative. Your real programme depends on scope and site.</span></div>
            <div className="why3">
              <div><h3>Design overlaps site work</h3><p className="body">Foundations start while the steel is still being detailed, because both sit in the same office.</p></div>
              <div><h3>No handover waits</h3><p className="body">There is no next firm to mobilise and no sign-off between companies. The next crew is already on our programme.</p></div>
              <div><h3>One answer when it goes wrong</h3><p className="body">A clash, a failed test or a late approval is our problem to fix, not a dispute between vendors.</p></div>
            </div>
          </div>
        </section>

        {/* 3. four disciplines */}
        <section className="sec" aria-labelledby="disc-h">
          <div className="wrap">
            <div className="sched__head">
              <div className="stack"><span className="kicker">What we do</span><h2 className="disp disp--3" id="disc-h" data-split="">Four disciplines. One team.</h2></div>
              <p className="lede">Take one discipline on its own, or all four as a turnkey EPC contract. Open a panel to see what is inside it.</p>
            </div>
            <div className="disc" id="disc">
              <div className="dp is-open" role="group" aria-label="Civil and PEB">
                <button type="button" className="sr" aria-expanded="true">Civil &amp; PEB</button>
                <div className="dp__art" data-art="civil"></div><span className="dp__name" aria-hidden="true">Civil &amp; PEB</span>
                <div className="dp__body"><span className="dp__tag">Structure</span><h3 className="dp__title">Civil &amp; PEB structures</h3>
                  <p className="body">Greenfield site works, RCC foundations and pre-engineered steel buildings, designed and erected by one team.</p>
                  <ul><li>Site grading &amp; earthworks</li><li>Heavy machinery foundations</li><li>PEB frames &amp; crane gantries</li><li>Epoxy &amp; ESD flooring</li><li>STAAD.Pro structural design</li><li>Statutory approvals</li></ul>
                  <div><Link className="btn btn--amber btn--sm" to="/civil-peb">Explore Civil &amp; PEB</Link></div></div>
              </div>
              <div className="dp" role="group" aria-label="MEP">
                <button type="button" className="sr" aria-expanded="false">MEP</button>
                <div className="dp__art" data-art="mep"></div><span className="dp__name" aria-hidden="true">MEP</span>
                <div className="dp__body"><span className="dp__tag">Services</span><h3 className="dp__title">MEP infrastructure</h3>
                  <p className="body">Five service packages on one coordinated model, installed by one contractor.</p>
                  <ul><li>Chilled water &amp; cleanroom HVAC</li><li>HT / LT electrical contracting</li><li>Plumbing &amp; effluent drainage</li><li>Sprinklers, hydrants, clean agent</li><li>CCTV, access control, BMS</li><li>Optical fibre cabling</li></ul>
                  <div><Link className="btn btn--amber btn--sm" to="/mep">Explore MEP</Link></div></div>
              </div>
              <div className="dp" role="group" aria-label="Power system design">
                <button type="button" className="sr" aria-expanded="false">Power design</button>
                <div className="dp__art" data-art="power"></div><span className="dp__name" aria-hidden="true">Power design</span>
                <div className="dp__body"><span className="dp__tag">Studies</span><h3 className="dp__title">Power system design</h3>
                  <p className="body">Fourteen studies and design services that decide how your power system behaves before a breaker is bought.</p>
                  <ul><li>Load flow &amp; short circuit</li><li>Relay coordination</li><li>Arc flash (IEEE 1584)</li><li>Harmonics (IEEE 519)</li><li>Substations up to 400kV</li><li>Solar plant engineering</li></ul>
                  <div><Link className="btn btn--amber btn--sm" to="/power-system-design">Explore power design</Link></div></div>
              </div>
              <div className="dp" role="group" aria-label="Audits and testing">
                <button type="button" className="sr" aria-expanded="false">Audits &amp; testing</button>
                <div className="dp__art" data-art="audit"></div><span className="dp__name" aria-hidden="true">Audits &amp; testing</span>
                <div className="dp__body"><span className="dp__tag">Proof</span><h3 className="dp__title">Audits, testing &amp; commissioning</h3>
                  <p className="body">Sixteen services that prove an installation is safe to switch on and keep running.</p>
                  <ul><li>CEA 2023 safety audits</li><li>Lightning &amp; earthing risk</li><li>Relay &amp; breaker testing</li><li>Cable Hi-Pot / VLF</li><li>Transformer oil HVOF, DGA, BDV</li><li>Pan-India AMC</li></ul>
                  <div><Link className="btn btn--amber btn--sm" to="/audits-testing">Explore audits &amp; testing</Link></div></div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. how a project runs */}
        <section className="sec panel" aria-labelledby="proc-h">
          <div className="wrap">
            <div className="sched__head">
              <div className="stack"><span className="kicker">How a turnkey project runs</span><h2 className="disp disp--3" id="proc-h" data-split="">Six steps. One programme.</h2></div>
              <p className="lede">Every SYNERGRID project follows the same path from first site visit to handover, with one project manager the whole way.</p>
            </div>
            <div className="proc" id="proc">
              <div className="proc__line"><i></i></div>
              <ol>
                <li><span className="mono">Step 1</span><h3>Concept &amp; feasibility</h3><p>Site survey, load estimate, budget and programme.</p></li>
                <li><span className="mono">Step 2</span><h3>Design &amp; approvals</h3><p>Civil, structural, MEP and electrical design with statutory approvals.</p></li>
                <li><span className="mono">Step 3</span><h3>Procurement</h3><p>Specifications, vendor drawing review and purchase.</p></li>
                <li><span className="mono">Step 4</span><h3>Construction</h3><p>Civil works, PEB erection and MEP installation.</p></li>
                <li><span className="mono">Step 5</span><h3>Testing</h3><p>Panels, relays, cables, earthing and transformers tested.</p></li>
                <li><span className="mono">Step 6</span><h3>Commissioning</h3><p>Energisation, performance checks and handover.</p></li>
              </ol>
            </div>
          </div>
        </section>

        {/* 5. codes ribbon */}
        <section className="night ribbon" aria-labelledby="codes-h">
          <h2 className="sr" id="codes-h">Codes we work to</h2>
          <div className="ribbon__row" data-dir="-1"><span>CEA 2023 <b>·</b> NBC 2016 <b>·</b> IEEE 1584 <b>·</b> IEEE 80 <b>·</b> IEEE 519 <b>·</b>&nbsp;</span><span aria-hidden="true">CEA 2023 <b>·</b> NBC 2016 <b>·</b> IEEE 1584 <b>·</b> IEEE 80 <b>·</b> IEEE 519 <b>·</b>&nbsp;</span></div>
          <div className="ribbon__row" data-dir="1"><span>NFPA 70E <b>·</b> IEC 62305 <b>·</b> IS 3043 <b>·</b> IS 732 <b>·</b> ETAP 2024 <b>·</b>&nbsp;</span><span aria-hidden="true">NFPA 70E <b>·</b> IEC 62305 <b>·</b> IS 3043 <b>·</b> IS 732 <b>·</b> ETAP 2024 <b>·</b>&nbsp;</span></div>
          <div className="wrap" style={{ "marginTop": "clamp(36px,5vw,64px)" }}>
            <div className="cta">
              <p className="lede">Every design, audit and test report we sign is referenced to a published Indian or international code, so it holds up in front of the Electrical Inspector, your insurer and your board.</p>
              <Link className="tlink" to="/compliance">What each code governs</Link>
            </div>
          </div>
        </section>

        {/* 6. sectors */}
        <section className="sec" aria-labelledby="sec-h">
          <div className="wrap">
            <div className="sched__head">
              <div className="stack"><span className="kicker">Sectors</span><h2 className="disp disp--3" id="sec-h" data-split="">Where downtime is expensive.</h2></div>
              <p className="lede">We work where an electrical fault is a safety event and a stopped line costs money by the hour.</p>
            </div>
            <ul className="sectors" id="sectors">
              <li><button type="button"><b>Heavy manufacturing</b><p>Large motor loads, crane bays and PEB sheds.</p><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" /></svg></button></li>
              <li><button type="button"><b>Chemical &amp; process plants</b><p>Hazardous areas, effluent systems and strict earthing.</p><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" /></svg></button></li>
              <li><button type="button"><b>Data centers</b><p>Redundant power paths, UPS harmonics and precision cooling.</p><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" /></svg></button></li>
              <li><button type="button"><b>Solar PV plants</b><p>Utility-scale and rooftop design, evacuation and testing.</p><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" /></svg></button></li>
              <li><button type="button"><b>Commercial high-rises</b><p>Fire systems, ELV and building services to NBC 2016.</p><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" /></svg></button></li>
              <li><button type="button"><b>Multi-specialty hospitals</b><p>Critical power, medical gas areas and cleanroom HVAC.</p><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" /></svg></button></li>
              <li><button type="button"><b>EHV switchyards</b><p>Substation engineering, protection and maintenance.</p><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" /></svg></button></li>
            </ul>
          </div>
        </section>

        {/* 7. close */}
        <section className="night close" aria-labelledby="close-h">
          <div className="wrap">
            <h2 className="close__big" id="close-h"><span>Bring us a site.</span><span>Get back a running plant.</span></h2>
            <div className="close__grid">
              <p className="lede">Send your scope, location and timeline. Attach a BOQ or drawings if you have them. An engineer reviews every request and comes back with a turnkey proposal.</p>
              <div className="stack">
                <dl className="contactlist">
                  <div><dt>Corporate office</dt><SiteValue k="address" /></div>
                  <div><dt>Phone</dt><SiteValue k="phone" /></div>
                  <div><dt>Email</dt><SiteValue k="email" /></div>
                </dl>
                <div className="row"><Link className="btn btn--amber" to="/contact" data-magnet="">Request a proposal <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" /></svg></Link></div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
