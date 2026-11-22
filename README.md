# SYNERGRID website · Assembly (concept two)

Website for **Synergrid Infra LLP**, Vadodara.
Turnkey EPC Solutions, Concept-to-Commissioning. *Powering Trust, Engineering Excellence.*

Concept two is an exploded engineering model: a 3D plant builds itself as you
scroll, pages change behind a rolling factory shutter, and every page has a
hands-on explainer.

Built with React 18, React Router 6, three.js, GSAP 3 + ScrollTrigger and Vite 5.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production files in dist/
npm run preview    # serve the built dist/ locally
```

Node 18 or newer.

## Site settings: one file

Everything that changes per client lives at the top of **`src/config.js`**:

```js
export const MOBILE_NUMBER = "";        // calls + WhatsApp, e.g. "98250 12345"
export const RFQ_ENDPOINT = "";         // Google Apps Script web app URL (ends in /exec)
export const ENQUIRY_EMAIL = "synergrid.eng@gmail.com";
```

- **`MOBILE_NUMBER`** feeds the call link *and* WhatsApp. Any format works
  (`98250 12345`, `+91 98250 12345`, `919825012345`). While it is empty, the
  WhatsApp button stays hidden and the contact page shows "To be added before
  launch". Fill it in, rebuild, and it appears everywhere at once: the floating
  WhatsApp button on every page, the contact page, the footer, the "Prefer
  WhatsApp?" button on the form, and the business details Google reads.
- The office address (F-111, Ratnam Heights, Opp. Motibhai Park, Khodiyar Nagar,
  New Karelibaug, Vadodara, Gujarat 390022) is also in `src/config.js`, with a
  "Get directions" Google Maps link.
- You can also set `VITE_MOBILE_NUMBER` and `VITE_RFQ_ENDPOINT` as environment
  variables on Vercel or Netlify instead of editing the file.

## WhatsApp with a drafted message

Every WhatsApp button opens the chat with the message already typed. The visitor
can edit it before sending.

| Where | Drafted message |
|---|---|
| Floating button, any page | Greeting + the service of the page they are on (for example "your MEP services") + blank lines for name, company, location, timeline |
| Contact page, before sending | Built live from what they have typed: name, company, scope, location, timeline, notes |
| Contact page, after sending | The same, plus their enquiry reference, so the team can match the chat to the sheet row |

Drafts are written in `src/lib/whatsapp.js` if you want to change the wording.

## Connect enquiries (email + Google Sheet with status)

Every request from the contact page:

1. is emailed to **synergrid.eng@gmail.com** as a point-wise summary, with the
   client's PDF/ZIP attached and one-tap buttons: *Reply by email*, *WhatsApp
   client*, *Call client*, *Open enquiry sheet*;
2. becomes a new row in the **Enquiries** sheet with status **New**;
3. has its attachment saved to a Drive folder, linked from the row.

Each enquiry gets a reference like `SG-261028-4821`. The visitor sees it on screen,
and it is the Enquiry ID in the sheet and the email subject.

### The Enquiries sheet

| Enquiry ID | Received | **Status** | Follow-up date | Name | Company | Email | Phone | Scope | Facility location | Expected timeline | Project notes | Attachment | Source page | Status updated | Internal remarks |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

- **Status** is a coloured dropdown: New, Contacted, Site visit planned,
  Proposal sent, Won, Lost, Not relevant.
- Changing a status stamps **Status updated** with the date and time automatically.
- **Follow-up date** has a date picker; it turns red when the date has passed and
  the enquiry is still open.
- **Internal remarks** is free text for the team.
- Header and ID column are frozen, so the sheet stays readable on a phone.

### One-time setup (about 10 minutes)

Do this signed in to the Google account that should own the enquiries, ideally
**synergrid.eng@gmail.com** itself.

1. Open the SYNERGRID enquiry sheet (its ID is already set as `SPREADSHEET_ID` in
   `apps-script/Code.gs`, so the script always writes to that sheet).
2. In the sheet: **Extensions → Apps Script**. Delete the sample code and paste in
   all of `apps-script/Code.gs`. Click **Save**.
3. Choose **setup** in the function dropdown and click **Run**. Google asks for
   permission: click *Review permissions*, choose the account, then
   *Advanced → Go to project (unsafe) → Allow*. (This warning appears for every
   private script; the script only touches this sheet, Drive and Gmail sending.)
   The **Enquiries** tab is now built with all columns and the Status dropdown.
4. Choose **testEnquiry** and click **Run**. Check that a test email arrives at
   synergrid.eng@gmail.com and a row appears in the sheet. Delete that row.
5. **Deploy → New deployment**. Click the gear and choose **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**

   Click **Deploy** and copy the **Web app URL** (it ends in `/exec`).
6. Paste that URL into `RFQ_ENDPOINT` in `src/config.js` (or set
   `VITE_RFQ_ENDPOINT` on your host), rebuild and deploy the site.
7. Send one real enquiry from the live site and check the inbox and the sheet.

Good to know:

- Until `RFQ_ENDPOINT` is set, the form still works as a demo: it validates and
  shows the summary, and says nothing has been sent.
- If you change `Code.gs` later, use **Deploy → Manage deployments → Edit →
  Version: New version → Deploy** so the same `/exec` URL keeps working.
- **Check the link is public:** open the `/exec` URL in a private/incognito
  window. It must show `{"ok":true,"service":"SYNERGRID enquiries"}`. If it shows
  *"You need access"* or a Google sign-in page, the deployment's **Who has access**
  is not **Anyone**: fix it under **Deploy → Manage deployments → Edit**. While it
  is not public, the form now tells the visitor it could not send (and logs
  `[RFQ] enquiry not delivered` in the browser console) instead of pretending.
- To copy enquiries to more people, set `CC_EMAILS` in `Code.gs`.
- To also send the client a short "we have received your enquiry" email, set
  `SEND_CLIENT_ACK: true` in `Code.gs`.
- A hidden spam trap on the form drops most bot submissions, and a double
  click never creates two rows.
- A free Gmail account can send about 100 emails a day from scripts, far more
  than an enquiry form needs.

## SEO and link previews

Everything search engines and link previews read is set in **`src/seo/meta.js`**:
the live address (`SITE_URL`), each page's title and description, and the
business details (schema.org JSON-LD). `npm run build` then writes:

- a ready-made HTML file per page (`dist/about.html`, `dist/mep.html`, ...) with
  that page's title, description, canonical URL, Open Graph / Twitter share tags
  and JSON-LD, so Google, WhatsApp, LinkedIn and Facebook see the right text
  and the share image without running JavaScript;
- `dist/sitemap.xml` listing every page.

Static files in `public/`: `robots.txt`, `site.webmanifest`, the share image
`og-image.jpg` (1200 x 630), `logo.png`, and the favicon / app icon set.

After going live:

1. Add `https://www.synergridinfra.com` to **Google Search Console**, verify it
   (DNS record on the domain), and submit `sitemap.xml`.
2. Create or claim the **Google Business Profile** for the Vadodara office with
   the exact same name, address and phone as the site, and link the website.
3. Test link previews with the LinkedIn Post Inspector and Facebook Sharing
   Debugger; both also refresh cached previews.

If the domain changes, update `SITE_URL` in `src/seo/meta.js` and the
`Sitemap:` line in `public/robots.txt`.

## Deploy

Static site; every path must serve `index.html`:

- **Vercel**: `vercel.json` serves each page's own HTML (`cleanUrls`) and rewrites everything else.
- **Netlify**: build `npm run build`, publish `dist`; `public/_redirects` handles routes.
- **cPanel / shared hosting**: upload `dist/` and add an `.htaccess`:
  ```apache
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteRule ^ index.html [L]
  ```

## How it is put together

```
src/
  config.js                  mobile number, enquiry endpoint, email, address
  App.jsx                    routes
  components/
    Layout.jsx               header, shutter transition, footer, WhatsApp
    Header.jsx               top bar + full-screen Index menu
    Footer.jsx, Mark.jsx, Seo.jsx, SiteValue.jsx, WhatsAppButton.jsx
    routes.js                every page with its menu name and note
  pages/                     one component per page (markup only)
  lib/
    plant.js                 the 3D plant (three.js), placed from progress 0..1
    plantHost.js             one WebGL canvas, moved into whichever page is open
    usePage.js               hook: attaches a page's behaviour, cleans it up on leave
    motion.js                stamped headline reveal, magnetic buttons
    headerTone.js            header solid on scroll, inverted over night sections
    dom.js                   small DOM helpers
    whatsapp.js              WhatsApp links and drafted messages
    enquiry.js               sends an enquiry to the Apps Script (reference, attachment)
    pages/                   one behaviour module per page: init(root, api) -> cleanup
  styles/app.css             the full design system
apps-script/Code.gs          enquiry receiver: email + Google Sheet with status
```

Pages are plain JSX. Their interactive parts (the 3D plant, the explainers, the
contact wizard) live in `src/lib/pages/*.js` and attach after mount through
`usePage()`. Everything runs inside a `gsap.context`, so ScrollTriggers, tweens,
tickers and listeners are reverted when the route changes, and React StrictMode's
double mount is safe.

| Route | Page | Explainer | Plant stage |
|---|---|---|---|
| `/` | Home | 3D assembly, schedule morph, discipline panels, process line, code ribbons, sectors | scroll driven |
| `/about` | About us | "Something goes wrong. Who answers?" | energised |
| `/civil-peb` | Civil & PEB | PEB anatomy, exploded floor build-up | steel + shell |
| `/mep` | MEP | five systems in one ceiling void | services |
| `/power-system-design` | Power design | single line diagram explorer | grid to panel |
| `/audits-testing` | Audits & testing | test bench with dial | test ticks |
| `/compliance` | Compliance | flip cards for the nine codes | energised |
| `/contact` | Contact / RFQ | 3-step request, live request sheet | founded site |

Links like `<Link to="/contact" data-scope="scope-civil">` open the contact page
with that scope already ticked.

### The 3D plant

`lib/plant.js` builds the plant from boxes, cylinders and line work in six
stages: foundations, PEB steel, MEP, power, testing and energise. Positions are
computed from one progress value, so scrolling back takes it apart again. The
opening shows a faint blueprint ghost of the finished plant; the energise stage
turns the page from day to night and runs current from the tower into the
building. three.js is pinned to 0.128.0, the version the model was written for.

## Accessibility and motion

- With *reduce motion* turned on, the plant shows as a still of the finished
  plant with every stage written out, the shutter is skipped, and nothing pins.
- If WebGL is unavailable, the hero falls back to the written stages.
- All explainers work with keyboard (Tab, Enter / Space) and announce changes.

## Notes

- Content rules from the brief: no "lock and key", no invented stats, clients or
  testimonials, no em dashes in the UI.
- Dial positions on the test bench and the schedule comparison are illustrative,
  and say so on the page.
- This is a single-page app; each page sets its own title and description.
