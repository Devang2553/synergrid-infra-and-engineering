import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { usePage } from "../lib/usePage.js";
import { init } from "../lib/pages/about.js";

export default function About() {
  const ref = usePage({ init, stage: 1 });
  return (
    <>
      <Seo />
      <section ref={ref} className="view page" data-view="about">
        <section className="phero">
          <div className="wrap phero__grid">
            <div className="stack">
              <nav className="crumbs" aria-label="Breadcrumb"><Link to="/">SYNERGRID</Link><span>/</span><span>About us</span></nav>
              <h1 className="disp disp--3" data-split="">Single-Point Accountable Industrial <em>EPC Partner</em></h1>
              <p className="lede">SYNERGRID INFRA &amp; ENGINEERING SERVICES was set up to end project fragmentation. We take industrial projects from bare land to a fully operational plant under one concept-to-commissioning EPC contract.</p>
              <div className="glance"><div><b>One contract</b><span>Design to handover</span></div><div><b>Three disciplines</b><span>Civil, MEP, electrical</span></div><div><b>Pan-India</b><span>Head office Vadodara</span></div></div>
              <div className="row"><Link className="btn btn--amber" to="/contact" data-magnet="">Request a proposal</Link></div>
            </div>
            <div className="phero__art" data-plant-slot=""><span className="stagechip">The finished plant, energised</span></div>
          </div>
        </section>

        <section className="sec panel" aria-labelledby="who-h">
          <div className="wrap">
            <div className="sched__head">
              <div className="stack"><span className="kicker">See the difference</span><h2 className="disp disp--2" id="who-h" data-split="">Something goes wrong. Who answers?</h2></div>
              <p className="lede">Every project hits problems. What matters is how many companies have to agree before it gets fixed. Pick a situation.</p>
            </div>
            <div className="lab" id="who">
              <div className="lab__view"><svg className="chain" id="chain" viewBox="0 0 640 300" role="img" aria-label="Diagram comparing five separate contractors passing a problem between them with one SYNERGRID team fixing it."></svg></div>
              <div className="lab__side">
                <div className="chipsel" role="group" aria-label="Situations">
                  <button type="button" data-who="0" aria-pressed="true">A clash on site</button>
                  <button type="button" data-who="1" aria-pressed="false">A trip at energisation</button>
                  <button type="button" data-who="2" aria-pressed="false">Approval changes</button>
                </div>
                <div className="out" id="who-out" aria-live="polite"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="sec" aria-labelledby="adv-h">
          <div className="wrap">
            <span className="kicker">Why turnkey EPC</span>
            <h2 className="disp disp--2" id="adv-h" data-split="" style={{ "margin": "16px 0 32px" }}>Five reasons owners choose one contract.</h2>
            <div className="specs">
              <article className="spec"><div className="spec__head"><span className="mono">Advantage</span><h3 className="disp disp--1">Single-point accountability</h3></div><div className="spec__body"><p className="body">One team answers for design, procurement, construction and commissioning. There is nobody else to point at, so problems get fixed instead of argued about.</p></div></article>
              <article className="spec"><div className="spec__head"><span className="mono">Advantage</span><h3 className="disp disp--1">Zero inter-vendor delays</h3></div><div className="spec__body"><p className="body">Civil, PEB, MEP and electrical crews work from one schedule, so no package waits on another company's handover or mobilisation.</p></div></article>
              <article className="spec"><div className="spec__head"><span className="mono">Advantage</span><h3 className="disp disp--1">Optimised project budget</h3></div><div className="spec__body"><p className="body">One coordinated BOQ, no duplicated margins between firms, and fewer variation claims caused by gaps between separately written scopes.</p></div></article>
              <article className="spec"><div className="spec__head"><span className="mono">Advantage</span><h3 className="disp disp--1">Strict statutory compliance</h3></div><div className="spec__body"><p className="body">Designs and installations are referenced to CEA, NBC, IEEE and NFPA from the first drawing, not checked against them at the end.</p></div></article>
              <article className="spec"><div className="spec__head"><span className="mono">Advantage</span><h3 className="disp disp--1">Faster time to market</h3></div><div className="spec__body"><p className="body">Design, approvals and site work overlap under one project manager, so your plant starts production sooner.</p></div></article>
            </div>
          </div>
        </section>

        <section className="sec night" aria-labelledby="team-h">
          <div className="wrap">
            <span className="kicker">The people on your project</span>
            <h2 className="disp disp--2" id="team-h" data-split="" style={{ "margin": "16px 0 32px" }}>Three kinds of engineer. One team.</h2>
            <div className="why3" style={{ "marginTop": "0" }}>
              <div><h3>Civil structural designers</h3><p className="body">Site grading, RCC foundations and PEB structures, modelled and checked in STAAD.Pro, with municipal and statutory approvals handled in-house.</p></div>
              <div><h3>Electrical safety engineers</h3><p className="body">Power system studies, protection design and the statutory safety audits that let your installation be energised and stay compliant.</p></div>
              <div><h3>MEP project managers</h3><p className="body">HVAC, plumbing, fire fighting and ELV packages coordinated on one model and one programme, so services fit the first time.</p></div>
            </div>
            <p className="lab__note" style={{ "marginTop": "36px", "color": "var(--night-soft)" }}>Leadership profiles to be added before launch.</p>
          </div>
        </section>

        <section className="sec"><div className="wrap"><div className="cta"><div className="stack"><h2 className="disp disp--2">Have a site and a start date?</h2><p className="lede">Tell us the scope and we will come back with a turnkey proposal.</p></div><Link className="btn btn--amber" to="/contact" data-magnet="">Request a proposal</Link></div>
          <Link className="next" to="/civil-peb" style={{ "marginTop": "56px" }}><span className="stack stack--sm"><span className="mono">Next</span><b>Civil &amp; PEB</b></span><svg viewBox="0 0 64 24" aria-hidden="true"><path d="M2 12h58M50 2l10 10-10 10" fill="none" stroke="currentColor" strokeWidth="2.5" /></svg></Link></div></section>
      </section>
    </>
  );
}
