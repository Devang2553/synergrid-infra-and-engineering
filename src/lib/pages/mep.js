import { gsap } from "gsap";
import { ScrollTrigger as ST } from "gsap/ScrollTrigger";
import { $, $$, svgEl, esc, clamp, RM, FINE, SMALLQ } from "../dom.js";

/* cleanups for the current mount; init() returns a function that runs them */
let cleanups = [];

/* ================================================================
   MEP: the ceiling void
   ================================================================ */
var SYS = {
  hvac: { n: "Mechanical & HVAC", c: "#4F7BD9", d: "Cooling and air handling, sized to the process heat load. The duct is the biggest thing in the void, so it is routed first.", li: ["Central chilled water plants", "VRF / VRV networks", "Cleanroom HVAC (ISO classes)", "Industrial ventilation", "Ductwork fabrication and installation"] },
  elec: { n: "Electrical", c: "#1E3A8A", d: "Power distribution from the incoming transformer to the last light fitting, on trays kept clear of heat and water.", li: ["Power transformers", "HT switchgear", "LT panels (PCC, MCC, PDB)", "Busducts", "Cable trays and cabling", "Industrial lighting"] },
  plumb: { n: "Plumbing & drainage", c: "#1F8A7A", d: "Water in, wastewater out. Pipes fall to drains, so their levels are fixed by gravity and everything else has to work around them.", li: ["Hydro-pneumatic water distribution", "Trade effluent drainage networks", "Rainwater harvesting", "STP / WTP integration"] },
  fire: { n: "Fire fighting", c: "#B8402C", d: "Sprinkler heads need a clear spray pattern below them, so the main runs highest, just under the roof, to NBC 2016.", li: ["Automatic fire sprinkler mains", "Hydrant networks", "Medium / high velocity water spray", "Clean agent suppression (FM200 / Novec 1230)"] },
  elv: { n: "ELV & automation", c: "#7A5AA6", d: "CCTV, access control, PA and BMS. Low-voltage signal cables are kept apart from power cables to avoid interference.", li: ["IP CCTV surveillance", "Access control", "Public address (PA / GA)", "Building management systems (BMS)", "Optical fibre cabling"] }
};
export function init(view, api = {}) {
  cleanups = [];
  var svg = $("#void-svg", view), out = $("#void-out", view), btns = $$("[data-sys]", view);
  svg.innerHTML = "";
  var ink = "#0B1A33";
  svgEl("path", { d: "M40 60L360 20L680 60", fill: "none", stroke: ink, "stroke-width": 3 }, svg);
  svgEl("path", { d: "M40 60V392M680 60V392M20 392H700", fill: "none", stroke: ink, "stroke-width": 3 }, svg);
  for (var hx = 30; hx < 700; hx += 18) svgEl("path", { d: "M" + hx + " 394l-10 12", stroke: "#5B6779", "stroke-width": 1 }, svg);
  svgEl("rect", { x: 40, y: 56, width: 640, height: 182, fill: "rgba(30,58,138,.05)", stroke: "#5B6779", "stroke-dasharray": "5 5" }, svg);
  svgEl("text", { x: 52, y: 252, "font-family": "IBM Plex Mono, monospace", "font-size": 11, fill: "#556274", "letter-spacing": "1" }, svg).textContent = "SERVICE ZONE";
  svgEl("text", { x: 52, y: 380, "font-family": "IBM Plex Mono, monospace", "font-size": 11, fill: "#556274", "letter-spacing": "1" }, svg).textContent = "PRODUCTION FLOOR";
  var layers = {};
  function L(k) { var g = svgEl("g", { "data-sys": k, opacity: 0 }, svg); layers[k] = g; return g; }
  var c;
  // fire: highest, sprinkler main with drops
  c = SYS.fire.c; var f = L("fire");
  svgEl("path", { d: "M60 74H660", stroke: c, "stroke-width": 7, "stroke-linecap": "round", "class": "rt" }, f);
  for (var s = 90; s < 660; s += 70) { svgEl("path", { d: "M" + s + " 74V92", stroke: c, "stroke-width": 3, "class": "rt" }, f); svgEl("path", { d: "M" + (s - 8) + " 92h16l-8 9z", fill: c }, f); }
  // hvac duct
  c = SYS.hvac.c; var h = L("hvac");
  svgEl("rect", { x: 70, y: 108, width: 470, height: 44, fill: c, opacity: .9, "class": "rt" }, h);
  [130, 250, 370, 490].forEach(function (x) { svgEl("path", { d: "M" + (x - 16) + " 152h32v22h-32z", fill: c }, h); svgEl("path", { d: "M" + (x - 24) + " 176h48", stroke: c, "stroke-width": 4 }, h); });
  svgEl("rect", { x: 560, y: 100, width: 90, height: 60, fill: "none", stroke: c, "stroke-width": 3 }, h);
  svgEl("text", { x: 605, y: 135, "text-anchor": "middle", "font-family": "IBM Plex Mono, monospace", "font-size": 11, fill: c }, h).textContent = "AHU";
  // electrical tray + lights
  c = SYS.elec.c; var e = L("elec");
  svgEl("path", { d: "M60 190H660M60 198H660", stroke: c, "stroke-width": 3, "class": "rt" }, e);
  for (var r = 70; r < 660; r += 22) svgEl("path", { d: "M" + r + " 190V198", stroke: c, "stroke-width": 2 }, e);
  [160, 360, 560].forEach(function (x) { svgEl("path", { d: "M" + x + " 198V250", stroke: c, "stroke-width": 1.5 }, e); svgEl("rect", { x: x - 40, y: 250, width: 80, height: 8, fill: c }, e); });
  // plumbing: falls to a drain
  c = SYS.plumb.c; var pl = L("plumb");
  svgEl("path", { d: "M70 216L620 228V392", fill: "none", stroke: c, "stroke-width": 6, "stroke-linecap": "round", "class": "rt" }, pl);
  svgEl("path", { d: "M600 392h40", stroke: c, "stroke-width": 8 }, pl);
  svgEl("path", { d: "M80 412H640", stroke: c, "stroke-width": 3, "stroke-dasharray": "8 6" }, pl);
  // elv: conduit, camera, reader
  c = SYS.elv.c; var v = L("elv");
  svgEl("path", { d: "M60 206H520", stroke: c, "stroke-width": 2.5, "stroke-dasharray": "2 5", "stroke-linecap": "round", "class": "rt" }, v);
  svgEl("path", { d: "M58 140h28l10 10h-38z", fill: c }, v);
  svgEl("rect", { x: 664, y: 300, width: 10, height: 18, fill: c }, v);
  svgEl("path", { d: "M520 206V300h144", fill: "none", stroke: c, "stroke-width": 2.5, "stroke-dasharray": "2 5" }, v);
  var allNote = svgEl("text", { x: 360, y: 290, "text-anchor": "middle", "font-family": "IBM Plex Mono, monospace", "font-size": 12, fill: "#0B1A33", "letter-spacing": "1.2", opacity: 0 }, svg);
  allNote.textContent = "COORDINATED: EVERY SYSTEM HAS ITS OWN LEVEL";

  function pick(k) {
    btns.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-sys") === k)); });
    Object.keys(layers).forEach(function (n) {
      var on = k === "all" || n === k, el = layers[n];
      if (RM || !gsap) el.setAttribute("opacity", on ? 1 : 0.08);
      else gsap.to(el, { opacity: on ? 1 : (k === "all" ? 1 : 0.08), duration: 0.45, ease: "power2.out" });
      if (on && !RM && gsap) gsap.fromTo($$(".rt", el), { strokeDasharray: "1400", strokeDashoffset: 1400 }, { strokeDashoffset: 0, duration: 1.1, ease: "power2.out", clearProps: "strokeDasharray,strokeDashoffset" });
    });
    allNote.setAttribute("opacity", k === "all" ? 1 : 0);
    if (k === "all") {
      out.innerHTML = '<h3>All five, together</h3><p>Each system gets its own level in the void: fire highest, then the duct, then cable trays, ELV and drainage. Because one team draws them all on one model, they never fight for the same space on site.</p><ul>' +
        Object.keys(SYS).map(function (n) { return '<li><b style="color:' + SYS[n].c + '">' + esc(SYS[n].n) + '</b></li>'; }).join("") + '</ul>';
    } else {
      var s = SYS[k];
      out.innerHTML = '<h3 style="color:' + s.c + '">' + esc(s.n) + '</h3><p>' + esc(s.d) + '</p><ul>' + s.li.map(function (x) { return '<li><b>' + esc(x) + '</b></li>'; }).join("") + '</ul>';
    }
  }
  btns.forEach(function (b) { b.addEventListener("click", function () { pick(b.getAttribute("data-sys")); }); });
  pick("hvac");
  return () => { const list = cleanups; cleanups = []; list.forEach((f) => { try { f(); } catch (e) {} }); };
}

