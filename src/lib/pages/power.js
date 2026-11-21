import { gsap } from "gsap";
import { ScrollTrigger as ST } from "gsap/ScrollTrigger";
import { $, $$, svgEl, esc, clamp, RM, FINE, SMALLQ } from "../dom.js";

/* cleanups for the current mount; init() returns a function that runs them */
let cleanups = [];

/* ================================================================
   POWER: single line diagram explorer
   ================================================================ */
var SLD = {
  grid: { n: "Grid incomer", d: "Where utility power enters. Its fault level sets the stresses everything downstream has to survive.", s: [["01", "Power system analysis"], ["02", "Load flow & short circuit"], ["05", "Transient stability"]] },
  hv: { n: "Switchyard & HV breaker", d: "The outdoor yard that receives and switches incoming power. It has to clear faults fast and be safe to work in.", s: [["09", "Substation layout & engineering"], ["03", "Relay coordination"], ["08", "Protection scheme verification"]] },
  tx: { n: "Power transformer", d: "Steps voltage down for the plant. Its rating and impedance come straight from the load flow and short circuit results.", s: [["11", "Equipment sizing & datasheets"], ["02", "Load flow & short circuit"], ["13", "Equipment specifications"], ["14", "Vendor drawing review"]] },
  bus: { n: "LT main panel (PCC)", d: "The main low voltage switchboard. This is where fault energy is highest for people working on it.", s: [["04", "Arc flash analysis"], ["03", "Relay coordination"], ["02", "Short circuit"]] },
  mcc: { n: "MCC & drives", d: "Motor control centres and VFDs. Large motors pull heavy current to start, and drives inject harmonics back into the system.", s: [["07", "Harmonic analysis & mitigation"], ["05", "Transient stability (motor starting)"], ["11", "Equipment sizing"]] },
  apfc: { n: "Capacitor bank / APFC", d: "Automatic power factor correction. Sized right, it cuts utility penalties; sized wrong, it can resonate with harmonics.", s: [["06", "Power factor & kVAR optimisation"], ["07", "Harmonic analysis"]] },
  pv: { n: "Solar PV & inverter", d: "On-site generation feeding into the plant bus, which changes how power and fault current flow.", s: [["10", "Solar plant design engineering"], ["02", "Load flow (evacuation)"], ["12", "Greenfield & brownfield tie-in"]] },
  dg: { n: "DG set & changeover", d: "Standby generation. It is weaker than the grid, so protection settings and motor starting both behave differently on it.", s: [["11", "Equipment sizing (DG sets)"], ["03", "Relay coordination"], ["05", "Transient stability"]] }
};
export function init(view, api = {}) {
  cleanups = [];
  var svg = $("#sld-svg", view), out = $("#sld-out", view);
  svg.innerHTML = "";
  var ink = "#0B1A33", soft = "#556274";
  function p(d, w, c) { return svgEl("path", { d: d, fill: "none", stroke: c || ink, "stroke-width": w || 2.5, "stroke-linecap": "round" }, svg); }
  function label(x, y, t, anchor) { var e = svgEl("text", { x: x, y: y, "text-anchor": anchor || "start", "font-family": "IBM Plex Mono, monospace", "font-size": 12, fill: ink, "letter-spacing": ".6" }, svg); e.textContent = t; return e; }
  // trunk
  p("M360 30V86"); p("M360 120V150"); p("M360 230V280");
  svgEl("rect", { x: 344, y: 86, width: 32, height: 34, fill: "#fff", stroke: ink, "stroke-width": 2.5 }, svg); p("M344 86L376 120M376 86L344 120", 1.5);
  svgEl("circle", { cx: 360, cy: 172, r: 24, fill: "none", stroke: ink, "stroke-width": 2.5 }, svg);
  svgEl("circle", { cx: 360, cy: 206, r: 24, fill: "none", stroke: ink, "stroke-width": 2.5 }, svg);
  p("M100 280H620", 6);
  // feeders
  var F = { mcc: 160, apfc: 300, pv: 440, dg: 580 };
  Object.keys(F).forEach(function (k) { var x = F[k]; p("M" + x + " 280V316"); svgEl("rect", { x: x - 12, y: 316, width: 24, height: 24, fill: "#fff", stroke: ink, "stroke-width": 2 }, svg); p("M" + x + " 340V380"); });
  // loads
  svgEl("circle", { cx: 160, cy: 404, r: 24, fill: "none", stroke: ink, "stroke-width": 2.5 }, svg); label(160, 409, "M", "middle");
  p("M282 380h36M286 392h28", 3);
  svgEl("rect", { x: 412, y: 384, width: 56, height: 40, fill: "none", stroke: ink, "stroke-width": 2.5 }, svg); p("M412 424L440 384L468 424", 1.5);
  svgEl("circle", { cx: 580, cy: 404, r: 24, fill: "none", stroke: ink, "stroke-width": 2.5 }, svg); label(580, 409, "G", "middle");
  // labels
  label(384, 44, "GRID INCOMER"); label(388, 108, "HV BREAKER"); label(396, 194, "TRANSFORMER"); label(104, 270, "LT MAIN PANEL (PCC)");
  label(160, 452, "MCC & DRIVES", "middle"); label(300, 452, "APFC", "middle"); label(440, 452, "SOLAR PV", "middle"); label(580, 452, "DG SET", "middle");
  // current
  var paths = {
    grid: [[360, 30], [360, 30]], hv: [[360, 30], [360, 103]], tx: [[360, 30], [360, 190]], bus: [[360, 30], [360, 280], [130, 280]],
    mcc: [[360, 30], [360, 280], [160, 280], [160, 404]], apfc: [[360, 30], [360, 280], [300, 280], [300, 386]],
    pv: [[440, 404], [440, 280], [360, 280]], dg: [[580, 404], [580, 280], [360, 280]]
  };
  var hot = svgEl("path", { d: "", fill: "none", stroke: "#F2A51A", "stroke-width": 6, "stroke-linecap": "round", opacity: .9 }, svg);
  var dots = []; for (var i = 0; i < 6; i++) dots.push(svgEl("circle", { r: 4.5, fill: "#FFC24D" }, svg));
  var pos = { grid: [360, 30], hv: [360, 103], tx: [360, 189], bus: [130, 280], mcc: [160, 404], apfc: [300, 384], pv: [440, 404], dg: [580, 404] };
  var hots = {};
  Object.keys(pos).forEach(function (k) {
    var h = svgEl("g", { "class": "hot", tabindex: 0, role: "button", "aria-label": SLD[k].n, transform: "translate(" + (pos[k][0] - 44) + "," + pos[k][1] + ")" }, svg);
    svgEl("circle", { r: 13, "class": "ring" }, h);
    svgEl("text", { y: 4.5, "text-anchor": "middle" }, h).textContent = "+";
    h.addEventListener("click", function () { pick(k); });
    h.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(k); } });
    hots[k] = h;
  });
  var route = [], total = 0, tick = null;
  function pick(k) {
    Object.keys(hots).forEach(function (n) { hots[n].classList.toggle("is-on", n === k); });
    route = paths[k]; total = 0;
    for (var i = 1; i < route.length; i++) total += Math.hypot(route[i][0] - route[i - 1][0], route[i][1] - route[i - 1][1]);
    hot.setAttribute("d", "M" + route.map(function (q) { return q.join(" "); }).join("L"));
    var s = SLD[k];
    out.innerHTML = '<h3>' + esc(s.n) + '</h3><p>' + esc(s.d) + '</p><span class="mono" style="color:var(--amber-ink)">Studies that decide it</span><ul>' +
      s.s.map(function (x) { return '<li><b>' + esc(x[1]) + '</b><span class="tag">Item ' + x[0] + '</span></li>'; }).join("") + '</ul>';
    if (RM || !gsap) return;
    gsap.fromTo(hot, { strokeDasharray: total + 4, strokeDashoffset: total + 4 }, { strokeDashoffset: 0, duration: 0.7, ease: "power2.out" });
  }
  function at(u) {
    var d = u * total;
    for (var i = 1; i < route.length; i++) {
      var a = route[i - 1], b = route[i], l = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (d <= l || i === route.length - 1) { var t = l ? Math.min(d / l, 1) : 0; return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; }
      d -= l;
    }
    return route[0];
  }
  if (!RM && gsap) {
    tick = function (t) { dots.forEach(function (dt, i) { var q = total > 1 ? at(((t / 1.6) + i / dots.length) % 1) : [-20, -20]; dt.setAttribute("cx", q[0].toFixed(1)); dt.setAttribute("cy", q[1].toFixed(1)); }); };
    gsap.ticker.add(tick);
    cleanups.push(function () { gsap.ticker.remove(tick); });
  } else dots.forEach(function (d) { d.setAttribute("cx", -20); });
  pick("tx");
  return () => { const list = cleanups; cleanups = []; list.forEach((f) => { try { f(); } catch (e) {} }); };
}

