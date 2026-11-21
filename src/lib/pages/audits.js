import { gsap } from "gsap";
import { ScrollTrigger as ST } from "gsap/ScrollTrigger";
import { $, $$, svgEl, esc, clamp, RM, FINE, SMALLQ } from "../dom.js";

/* cleanups for the current mount; init() returns a function that runs them */
let cleanups = [];

/* ================================================================
   AUDITS: test bench
   ================================================================ */
var BENCH = {
  tx: { n: "Transformer", w: "High-vacuum oil filtration units", t: [["Oil BDV test", "Breakdown voltage of an oil sample: how much electrical stress the insulation can take.", "BDV"], ["Dissolved gas analysis", "Gases dissolved in the oil reveal overheating or arcing inside the tank long before a failure.", "DGA"], ["High-vacuum oil filtration", "On-site filtration removes moisture, gas and particles to restore insulation strength.", "HVOF"]] },
  panel: { n: "HT / LT panels", w: "FLIR thermal cameras", t: [["Pre-commissioning checks", "Wiring, interlocks, insulation and function checked before first energisation.", "PCC · MCC"], ["Thermography under load", "Thermal imaging finds loose joints and overloaded busbars before they burn.", "Thermal"], ["Arc flash labelling", "Incident energy and the PPE category marked on every panel.", "IEEE 1584"]] },
  relay: { n: "Relays & breakers", w: "Secondary injection kits", t: [["Secondary injection testing", "Test currents injected into each relay prove it trips at the right value and the right time.", "Injection"], ["Settings upload & check", "Approved settings from the coordination study are loaded and verified.", "TCC"], ["Breaker timing & contact resistance", "Proves the breaker opens fast enough and its contacts are healthy.", "VCB · SF6 · ACB"]] },
  cable: { n: "Power & control cables", w: "Calibrated field test sets", t: [["Insulation resistance", "Measures leakage through the insulation before the cable is energised.", "IR"], ["Hi-Pot / VLF withstand", "An elevated test voltage proves the insulation will hold in service.", "Hi-Pot · VLF"]] },
  earth: { n: "Earthing system", w: "Calibrated earth testers", t: [["Earth pit resistance", "Every pit measured and compared with the design value.", "IS 3043"], ["Earth grid & soil resistivity", "Soil survey and grid tests prove fault current can flow safely to earth.", "IEEE 80"], ["Bonding continuity", "Low-resistance bonding checked across equipment and steelwork.", "Bonding"]] },
  lps: { n: "Lightning protection", w: "Site inspection to IEC 62305", t: [["Lightning risk assessment", "Risk calculated per structure, and the protection level each one needs.", "IEC 62305"], ["LPS inspection", "Air terminals, down conductors and earth connections checked against the design.", "IEC 62305"]] },
  site: { n: "Whole installation", w: "Fluke power quality analyzers", t: [["Electrical safety audit", "A full statutory inspection with a prioritised list of what to fix.", "CEA 2023"], ["Power quality audit", "Harmonics, voltage events and power factor, logged over time.", "IEEE 519"], ["Protection scheme audit", "Relay settings, CT/PT ratios and trip logic checked against the design.", "Protection"], ["Substation maintenance AMC", "Scheduled preventive maintenance, anywhere in India.", "AMC"]] }
};
export function init(view, api = {}) {
  cleanups = [];
  var svg = $("#gauge-svg", view), out = $("#bench-out", view), btns = $$("[data-asset]", view);
  svg.innerHTML = "";
  svg.setAttribute("viewBox", "0 0 520 400");
  var cx = 260, cy = 262, R = 196;
  function arc(a0, a1, r) { var p0 = [cx + r * Math.cos(a0), cy + r * Math.sin(a0)], p1 = [cx + r * Math.cos(a1), cy + r * Math.sin(a1)]; return "M" + p0[0].toFixed(1) + " " + p0[1].toFixed(1) + "A" + r + " " + r + " 0 0 1 " + p1[0].toFixed(1) + " " + p1[1].toFixed(1); }
  var A0 = Math.PI, A1 = 2 * Math.PI;
  svgEl("path", { d: arc(A0, A0 + Math.PI * 0.3, R), stroke: "#B8402C", "stroke-width": 18, fill: "none" }, svg);
  svgEl("path", { d: arc(A0 + Math.PI * 0.3, A0 + Math.PI * 0.55, R), stroke: "#F2A51A", "stroke-width": 18, fill: "none" }, svg);
  svgEl("path", { d: arc(A0 + Math.PI * 0.55, A1, R), stroke: "#1F8A5B", "stroke-width": 18, fill: "none" }, svg);
  for (var i = 0; i <= 20; i++) { var a = A0 + Math.PI * i / 20, r1 = R - 22, r2 = R - (i % 5 ? 32 : 42); svgEl("path", { d: "M" + (cx + r1 * Math.cos(a)).toFixed(1) + " " + (cy + r1 * Math.sin(a)).toFixed(1) + "L" + (cx + r2 * Math.cos(a)).toFixed(1) + " " + (cy + r2 * Math.sin(a)).toFixed(1), stroke: "#0B1A33", "stroke-width": i % 5 ? 1.5 : 3 }, svg); }
  [["FAIL", 0.08, "end"], ["INVESTIGATE", 0.43, "middle"], ["HEALTHY", 0.86, "start"]].forEach(function (z) { var a = A0 + Math.PI * z[1]; var t = svgEl("text", { x: (cx + (R + 18) * Math.cos(a)).toFixed(1), y: (cy + (R + 18) * Math.sin(a) - 6).toFixed(1), "text-anchor": z[2], "font-family": "IBM Plex Mono, monospace", "font-size": 12, fill: "#0B1A33", "letter-spacing": "1" }, svg); t.textContent = z[0]; });
  var needle = svgEl("g", { transform: "translate(" + cx + "," + cy + ") rotate(-90)" }, svg);
  svgEl("path", { d: "M-5 0L0 -" + (R - 36) + "L5 0Z", fill: "#0B1A33" }, needle);
  svgEl("circle", { cx: cx, cy: cy, r: 14, fill: "#0B1A33" }, svg);
  var readout = svgEl("text", { x: cx, y: cy + 62, "text-anchor": "middle", "font-family": "Big Shoulders Display, sans-serif", "font-weight": 800, "font-size": 30, fill: "#0B1A33", "letter-spacing": "1" }, svg);
  var sub = svgEl("text", { x: cx, y: cy + 88, "text-anchor": "middle", "font-family": "IBM Plex Mono, monospace", "font-size": 11, fill: "#556274", "letter-spacing": "1" }, svg);
  var n = { a: -90 };
  function pick(k) {
    var b = BENCH[k];
    btns.forEach(function (x) { x.setAttribute("aria-pressed", String(x.getAttribute("data-asset") === k)); });
    readout.textContent = b.n.toUpperCase(); sub.textContent = "ILLUSTRATIVE · " + b.t.length + " CHECKS";
    out.innerHTML = '<h3>' + esc(b.n) + '</h3><ul>' + b.t.map(function (t) { return '<li><b>' + esc(t[0]) + '</b><span class="tag">' + esc(t[2]) + '</span><small>' + esc(t[1]) + '</small></li>'; }).join("") +
      '</ul><p class="lab__note">Measured with: ' + esc(b.w) + '</p>';
    var target = 30 + Math.random() * 40;
    if (RM || !gsap) { needle.setAttribute("transform", "translate(" + cx + "," + cy + ") rotate(" + target.toFixed(1) + ")"); return; }
    gsap.timeline()
      .to(n, { a: -78, duration: 0.25, ease: "power2.out", onUpdate: upd })
      .to(n, { a: -15, duration: 0.35, ease: "power1.inOut", onUpdate: upd })
      .to(n, { a: target, duration: 1.1, ease: "elastic.out(1, 0.35)", onUpdate: upd });
  }
  function upd() { needle.setAttribute("transform", "translate(" + cx + "," + cy + ") rotate(" + n.a.toFixed(1) + ")"); }
  btns.forEach(function (b) { b.addEventListener("click", function () { pick(b.getAttribute("data-asset")); }); });
  pick("tx");
  return () => { const list = cleanups; cleanups = []; list.forEach((f) => { try { f(); } catch (e) {} }); };
}

