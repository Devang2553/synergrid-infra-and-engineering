import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { usePage } from "../lib/usePage.js";
import { init } from "../lib/pages/civil.js";

export default function CivilPeb() {
  const ref = usePage({ init, stage: .385 });
  return (
    <>
      <Seo
        title={"Civil and PEB Structure Construction | SYNERGRID INFRA & ENGINEERING SERVICES - Turnkey EPC Solutions"}
        description={"Greenfield civil works, RCC foundations, pre-engineered steel buildings, epoxy and ESD flooring, and STAAD.Pro structural design for industrial plants."}
      />
      <section ref={ref} className="view page" data-view="civil">
        <section className="phero">
          <div className="wrap phero__grid">
            <div className="stack">
              <nav className="crumbs" aria-label="Breadcrumb"><Link to="/">SYNERGRID</Link><span>/</span><span>Civil &amp; PEB</span></nav>
              <h1 className="disp disp--3" data-split="">End-to-End Industrial Civil Construction &amp; <em>PEB Steel Structures</em></h1>
              <p className="lede">From the first survey peg to a closed, floored factory shed. Earthworks, foundations, heavy steel and finishes delivered by one team.</p>
              <div className="glance"><div><b>Greenfield</b><span>Bare land to closed shed</span></div><div><b>STAAD.Pro</b><span>Structural analysis</span></div><div><b>In-house</b><span>Statutory approvals</span></div></div>
              <div className="row"><Link className="btn btn--amber" to="/contact" data-scope="scope-civil" data-magnet="">Request a proposal</Link><a className="tlink" href="#peb-h">Anatomy of a PEB shed</a></div>
            </div>
            <div className="phero__art" data-plant-slot=""><span className="stagechip">Steel frame and shell complete</span></div>
          </div>
        </section>

        <section className="sec panel" aria-labelledby="peb-h" id="peb">
          <div className="wrap">
            <div className="sched__head">
              <div className="stack"><span className="kicker">Explainer</span><h2 className="disp disp--2" id="peb-h" data-split="">Anatomy of a PEB shed.</h2></div>
              <p className="lede">A pre-engineered building is a kit of steel members, each designed for its exact load and made in a factory before it reaches site. Tap a part to see what it does.</p>
            </div>
            <div className="lab">
              <div className="lab__view"><svg id="peb-svg" viewBox="0 0 720 460" role="img" aria-label="Cross section of a pre-engineered steel building with numbered parts."></svg></div>
              <div className="lab__side"><div className="out" id="peb-out" aria-live="polite"></div><p className="lab__note">Every member is checked in STAAD.Pro for dead, live, wind, seismic and crane loads.</p></div>
            </div>
          </div>
        </section>

        <section className="sec" aria-labelledby="civ-h">
          <div className="wrap">
            <span className="kicker">Scope</span>
            <h2 className="disp disp--2" id="civ-h" data-split="" style={{ "margin": "16px 0 32px" }}>Four service groups, explained.</h2>
            <div className="specs">
              <article className="spec"><div className="spec__head"><span className="mono">Group 1</span><h3 className="disp disp--1">Greenfield civil engineering &amp; earthworks</h3></div>
                <div className="spec__body"><dl><dt>What it is</dt><dd>Preparing bare land for heavy industry: levelled, drained and founded for the loads your machines and structures will put on it.</dd><dt>Why it matters</dt><dd>Foundations are the one thing you cannot fix after the plant is running. Machine bases sized wrong mean vibration, cracks and misalignment for the life of the plant.</dd></dl>
                <ul className="ticks"><li>Site grading and levelling</li><li>Heavy machinery RCC foundations</li><li>Trenching for services and cables</li><li>Retaining walls</li><li>Industrial concrete paving</li><li>Internal roads and hardstands</li></ul></div></article>
              <article className="spec"><div className="spec__head"><span className="mono">Group 2</span><h3 className="disp disp--1">Pre-engineered building (PEB) structures</h3></div>
                <div className="spec__body"><dl><dt>What it is</dt><dd>Design, fabrication and erection of heavy PEB steel buildings, sized for crane loads, wind and future expansion.</dd><dt>Why it matters</dt><dd>PEB members carry steel only where the load needs it, so the building is lighter and erects faster than conventional steel, and bays can be added later.</dd></dl>
                <ul className="ticks"><li>Portal frames and roof trusses</li><li>Crane gantries and runway beams</li><li>Roof and wall cladding</li><li>Mezzanines and platforms</li></ul></div></article>
              <article className="spec" id="floor"><div className="spec__head"><span className="mono">Group 3</span><h3 className="disp disp--1">Cleanroom &amp; special flooring</h3></div>
                <div className="spec__body"><dl><dt>What it is</dt><dd>Floors and interiors for production areas where dust, static and hygiene matter.</dd><dt>Why it matters</dt><dd>The floor is a system, not a coating. Below, see how an industrial floor is built up layer by layer.</dd></dl>
                <div className="lab" style={{ "marginTop": "0", "gridTemplateColumns": "1fr" }}><div className="lab__view" style={{ "borderRight": "0", "borderBottom": "1.5px solid var(--ink)" }}><svg id="floor-svg" viewBox="0 0 640 330" role="img" aria-label="Exploded section of an industrial floor: sub-grade, PCC levelling course, reinforced concrete slab and topping."></svg></div>
                  <div className="lab__side"><div className="chipsel" role="group" aria-label="Floor type"><button type="button" data-floor="epoxy" aria-pressed="true">Epoxy floor</button><button type="button" data-floor="esd" aria-pressed="false">Anti-static ESD floor</button></div><div className="out" id="floor-out" aria-live="polite"></div></div></div>
                <ul className="ticks"><li>Epoxy flooring</li><li>Anti-static ESD flooring</li><li>Cleanroom wall paneling</li><li>ISO-compliant industrial interiors</li></ul></div></article>
              <article className="spec"><div className="spec__head"><span className="mono">Group 4</span><h3 className="disp disp--1">Architectural &amp; structural design</h3></div>
                <div className="spec__body"><dl><dt>What it is</dt><dd>Drawings that get approved and get built: analysed, coordinated with MEP, and submitted to the authorities on your behalf.</dd><dt>Why it matters</dt><dd>When the structure and the services are drawn by the same team, openings, sleeves and support points are in the right place before concrete is poured.</dd></dl>
                <ul className="ticks"><li>3D structural modelling</li><li>STAAD.Pro analysis and design</li><li>Civil layout drawings</li><li>Municipal and statutory approvals</li></ul></div></article>
            </div>
          </div>
        </section>
        <section className="sec night"><div className="wrap"><div className="cta"><div className="stack"><h2 className="disp disp--2">Planning a new shed or extension?</h2><p className="lede">Send the plot size, building footprint and crane loads. We will price the civil and PEB package or the full turnkey job.</p></div><Link className="btn btn--amber" to="/contact" data-scope="scope-civil" data-magnet="">Request a proposal</Link></div></div></section>
        <div className="wrap"><Link className="next" to="/mep"><span className="stack stack--sm"><span className="mono">Next</span><b>MEP infrastructure</b></span><svg viewBox="0 0 64 24" aria-hidden="true"><path d="M2 12h58M50 2l10 10-10 10" fill="none" stroke="currentColor" strokeWidth="2.5" /></svg></Link></div>
      </section>
    </>
  );
}
