import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { usePage } from "../lib/usePage.js";
import { init } from "../lib/pages/contact.js";
import SiteValue from "../components/SiteValue.jsx";
import WaIcon from "../components/WaIcon.jsx";
import { hasWhatsApp, waLink, formDraft } from "../lib/whatsapp.js";

export default function Contact() {
  const ref = usePage({ init, stage: .175 });
  return (
    <>
      <Seo />
      <section ref={ref} className="view page" data-view="contact">
        <section className="phero">
          <div className="wrap phero__grid">
            <div className="stack">
              <nav className="crumbs" aria-label="Breadcrumb"><Link to="/">SYNERGRID</Link><span>/</span><span>Contact &amp; RFQ</span></nav>
              <h1 className="disp disp--3" data-split="">Request a Turnkey <em>EPC Proposal</em></h1>
              <p className="lede">Tell us what you are building, where, and by when. Attach a BOQ or drawings if you have them. An engineer reviews every request. Your request sheet fills in as you type.</p>
              <div className="glance"><div><b>3 steps</b><span>Scope, project, contact</span></div><div><b>PDF / ZIP</b><span>Up to 10 MB</span></div><div><b>Vadodara</b><span>Projects across India</span></div></div>
            </div>
            <div className="phero__art" data-plant-slot=""><span className="stagechip">Your site, ready to build on</span></div>
          </div>
        </section>
        <section className="sec panel" style={{ "paddingTop": "clamp(48px,6vw,88px)" }}>
          <div className="wrap wiz">
            <form id="rfq" noValidate>
              <div className="hp" aria-hidden="true"><label htmlFor="rfq-website">Leave this field empty</label><input id="rfq-website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
              <ol className="steps" aria-label="Request steps"><li className="is-now" data-step="1"><i></i>Scope</li><li data-step="2"><i></i>Project</li><li data-step="3"><i></i>Contact</li></ol>
              <div className="pane" data-pane="1">
                <h2 className="disp disp--1">What do you need?</h2>
                <p className="body" id="scope-hint" style={{ "marginBottom": "16px" }}>Choose everything that applies. All four together is a turnkey EPC contract.</p>
                <div className="scopes" id="rfq-scope" tabIndex="-1" aria-describedby="scope-hint rfq-scope-err">
                  <label className="scope"><input type="checkbox" name="scope" id="scope-civil" value="Civil & PEB" /><span><b>Civil &amp; PEB</b><small>Earthworks, foundations, steel buildings</small></span></label>
                  <label className="scope"><input type="checkbox" name="scope" id="scope-mep" value="MEP" /><span><b>MEP</b><small>HVAC, electrical, plumbing, fire, ELV</small></span></label>
                  <label className="scope"><input type="checkbox" name="scope" id="scope-power" value="Power system design" /><span><b>Power design</b><small>Studies, substations, solar</small></span></label>
                  <label className="scope"><input type="checkbox" name="scope" id="scope-audits" value="Audits & testing" /><span><b>Audits &amp; testing</b><small>Safety audits, testing, commissioning</small></span></label>
                </div>
                <p className="err" id="rfq-scope-err" hidden></p>
              </div>
              <div className="pane" data-pane="2" hidden>
                <h2 className="disp disp--1">Tell us about the project.</h2>
                <div className="fields">
                  <div className="field"><label htmlFor="rfq-location">Facility location</label><input id="rfq-location" name="location" type="text" autoComplete="address-level2" placeholder="e.g. Savli GIDC, Vadodara" aria-describedby="rfq-location-err" /><p className="err" id="rfq-location-err" hidden></p></div>
                  <div className="field"><label htmlFor="rfq-timeline">Expected timeline</label><select id="rfq-timeline" name="timeline" aria-describedby="rfq-timeline-err"><option value="">Choose one</option><option>Urgent, start within 1 month</option><option>1 to 3 months</option><option>3 to 6 months</option><option>6 to 12 months</option><option>Planning stage, over 12 months</option></select><p className="err" id="rfq-timeline-err" hidden></p></div>
                  <div className="field field--full"><label htmlFor="rfq-notes">Project notes <span className="opt">Optional</span></label><textarea id="rfq-notes" name="notes" placeholder="Plot size, building footprint, connected load, what problem you are solving"></textarea></div>
                  <div className="field field--full"><span className="flabel" id="rfq-file-l">File / BOQ attachment <span className="opt">PDF or ZIP, up to 10 MB</span></span>
                    <label className="drop"><input id="rfq-file" name="file" type="file" accept=".pdf,.zip,application/pdf,application/zip" aria-labelledby="rfq-file-l" aria-describedby="rfq-file-name rfq-file-err" /><span className="drop__btn">Choose file</span><span className="drop__name" id="rfq-file-name">No file chosen</span></label>
                    <p className="err" id="rfq-file-err" hidden></p></div>
                </div>
              </div>
              <div className="pane" data-pane="3" hidden>
                <h2 className="disp disp--1">Who should we reply to?</h2>
                <div className="fields">
                  <div className="field"><label htmlFor="rfq-name">Your name</label><input id="rfq-name" name="name" type="text" autoComplete="name" aria-describedby="rfq-name-err" /><p className="err" id="rfq-name-err" hidden></p></div>
                  <div className="field"><label htmlFor="rfq-company">Company</label><input id="rfq-company" name="company" type="text" autoComplete="organization" aria-describedby="rfq-company-err" /><p className="err" id="rfq-company-err" hidden></p></div>
                  <div className="field"><label htmlFor="rfq-email">Work email</label><input id="rfq-email" name="email" type="email" autoComplete="email" aria-describedby="rfq-email-err" /><p className="err" id="rfq-email-err" hidden></p></div>
                  <div className="field"><label htmlFor="rfq-phone">Phone <span className="opt">Optional</span></label><input id="rfq-phone" name="phone" type="tel" autoComplete="tel" placeholder="+91" /></div>
                </div>
                <p className="body" style={{ "marginTop": "16px", "fontSize": ".9rem" }}>We use these details only to reply to this request.</p>
              </div>
              <div className="wiz__nav">
                <button className="btn btn--line" type="button" id="wiz-back" hidden>Back</button>
                <button className="btn btn--ink" type="button" id="wiz-next" style={{ "marginLeft": "auto" }}>Next step <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" /></svg></button>
                <button className="btn btn--amber" type="submit" id="wiz-send" hidden style={{ "marginLeft": "auto" }}>Issue request <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" /></svg></button>
              </div>
              {hasWhatsApp() && (
                <p style={{ margin: "18px 0 0" }}><a className="btn btn--wa btn--sm" id="rfq-wa" href={waLink(formDraft({}))} target="_blank" rel="noopener noreferrer"><WaIcon /> Prefer WhatsApp? Message us</a></p>
              )}
              <div className="done" id="rfq-done" tabIndex="-1" hidden>
                <h2 className="disp disp--1">Your request sheet is ready.</h2>
                <p>This design preview is not connected to an inbox yet, so nothing has been sent. On the live site this goes straight to the SYNERGRID engineering team by email and into their enquiry sheet. For now, copy the summary.</p>
                <p id="rfq-ref" hidden>Your reference: <b className="ref"></b></p>
                <pre id="rfq-summary"></pre>
                <div className="row"><button className="btn btn--amber btn--sm" type="button" id="rfq-copy">Copy summary</button>{hasWhatsApp() && <a className="btn btn--wa btn--sm" id="rfq-wa-done" href={waLink(formDraft({}))} target="_blank" rel="noopener noreferrer"><WaIcon /> Send on WhatsApp</a>}<button className="btn btn--line btn--sm" type="button" id="rfq-edit">Edit request</button></div>
              </div>
            </form>
            <aside className="stack stack--lg">
              <div className="sheet" id="sheet" aria-label="Live request sheet">
                <div className="sheet__top"><span>Request for proposal</span><b>SYNERGRID · G-900</b></div>
                <dl>
                  <div><dt>Scope</dt><dd data-k="scope"></dd></div>
                  <div><dt>Location</dt><dd data-k="location"></dd></div>
                  <div><dt>Timeline</dt><dd data-k="timeline"></dd></div>
                  <div><dt>Attachment</dt><dd data-k="file"></dd></div>
                  <div><dt>Client</dt><dd data-k="client"></dd></div>
                  <div><dt>Reply to</dt><dd data-k="email"></dd></div>
                </dl>
                <span className="sheet__stamp">Issued for proposal</span>
              </div>
              <div className="stack stack--sm">
                <span className="kicker">What happens next</span>
                <ol className="sched" style={{ "marginTop": "8px" }}>
                  <li style={{ "gridTemplateColumns": "44px minmax(0,1fr)" }}><span className="mono">1</span><p style={{ "color": "var(--ink)" }}>An engineer reviews your scope and attachments.</p></li>
                  <li style={{ "gridTemplateColumns": "44px minmax(0,1fr)" }}><span className="mono">2</span><p style={{ "color": "var(--ink)" }}>We call to confirm details and, if needed, arrange a site visit.</p></li>
                  <li style={{ "gridTemplateColumns": "44px minmax(0,1fr)" }}><span className="mono">3</span><p style={{ "color": "var(--ink)" }}>You receive a turnkey proposal with scope, programme and price.</p></li>
                </ol>
              </div>
              <dl className="contactlist" style={{ "color": "var(--ink)" }}>
                <div style={{ "borderColor": "var(--rule)" }}><dt style={{ "color": "var(--soft)" }}>Corporate HQ</dt><SiteValue k="address" /></div>
                <div style={{ "borderColor": "var(--rule)" }}><dt style={{ "color": "var(--soft)" }}>Phone</dt><SiteValue k="phone" /></div>
                <div style={{ "borderColor": "var(--rule)" }}><dt style={{ "color": "var(--soft)" }}>Email</dt><SiteValue k="email" /></div>
              </dl>
            </aside>
          </div>
        </section>
      </section>
    </>
  );
}
