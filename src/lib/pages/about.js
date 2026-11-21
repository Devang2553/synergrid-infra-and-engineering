import { gsap } from "gsap";
import { ScrollTrigger as ST } from "gsap/ScrollTrigger";
import { $, $$, svgEl, esc, clamp, RM, FINE, SMALLQ } from "../dom.js";

/* cleanups for the current mount; init() returns a function that runs them */
let cleanups = [];

/* ================================================================
   ABOUT: who answers?
   ================================================================ */
var WHO = [
  { t: "A clash on site", five: "The MEP contractor says the cable tray went in late. The electrical contractor says the drawings were never coordinated. Work stops while you arbitrate.", one: "Ducts and trays are on one coordinated model. The clash is fixed on the drawing, before anything is fabricated.", pair: [2, 3] },
  { t: "A trip at energisation", five: "The panel vendor blames the cabling. The cabling firm blames the relay settings. The testing firm was hired last and has never seen the design.", one: "The engineers who designed the protection also test and commission it. One call, one fix.", pair: [3, 4] },
  { t: "Approval changes", five: "The consultant revises the drawings, then every contractor re-prices their own scope. Variation claims pile up.", one: "Design, approvals and the BOQ sit in one office. The change goes into one programme and one price.", pair: [0, 1] }
];
export function init(view, api = {}) {
  cleanups = [];
  var svg = $("#chain", view), out = $("#who-out", view), btns = $$("[data-who]", view);
  var names = ["Civil", "Steel", "MEP", "Electrical", "Testing"];
  svg.innerHTML = "";
  svgEl("text", { x: 20, y: 28, "font-family": "IBM Plex Mono, monospace", "font-size": 12, fill: "#556274", "letter-spacing": "1.5" }, svg).textContent = "FIVE CONTRACTORS";
  svgEl("text", { x: 20, y: 214, "font-family": "IBM Plex Mono, monospace", "font-size": 12, fill: "#556274", "letter-spacing": "1.5" }, svg).textContent = "ONE SYNERGRID CONTRACT";
  var nodes = names.map(function (n, i) {
    var g = svgEl("g", { "class": "node", transform: "translate(" + (20 + i * 124) + ",48)" }, svg);
    svgEl("rect", { width: 104, height: 44 }, g);
    svgEl("text", { x: 52, y: 27, "text-anchor": "middle" }, g).textContent = n.toUpperCase();
    return g;
  });
  var bounce = svgEl("path", { "class": "lnk", d: "" }, svg);
  var dot = svgEl("circle", { r: 6, fill: "#B8402C" }, svg);
  svgEl("text", { x: 320, y: 146, "text-anchor": "middle", "font-family": "IBM Plex Mono, monospace", "font-size": 12, fill: "#B8402C", "letter-spacing": "1" }, svg).textContent = "THE PROBLEM BOUNCES";
  var one = svgEl("g", { "class": "node one", transform: "translate(20,234)" }, svg);
  svgEl("rect", { width: 600, height: 48 }, one);
  svgEl("text", { x: 300, y: 30, "text-anchor": "middle" }, one).textContent = "SYNERGRID · CIVIL · STEEL · MEP · ELECTRICAL · TESTING";
  var tw = null;
  function pick(i) {
    var s = WHO[i];
    btns.forEach(function (b) { b.setAttribute("aria-pressed", String(+b.getAttribute("data-who") === i)); });
    out.innerHTML = '<h3>' + esc(s.t) + '</h3><ul><li><b>With five contractors</b><small>' + esc(s.five) + '</small></li><li><b>With one SYNERGRID contract</b><small>' + esc(s.one) + '</small></li></ul>';
    nodes.forEach(function (n, k) { $("rect", n).style.fill = s.pair.indexOf(k) >= 0 ? "#F5D9D2" : ""; });
    var a = 20 + s.pair[0] * 124 + 52, b = 20 + s.pair[1] * 124 + 52;
    bounce.setAttribute("d", "M" + a + " 96 Q" + (a + b) / 2 + " 150 " + b + " 96");
    if (tw) tw.kill();
    if (RM || !gsap) { dot.setAttribute("cx", (a + b) / 2); dot.setAttribute("cy", 123); return; }
    var o = { t: 0 };
    tw = gsap.to(o, { t: 1, duration: 0.9, repeat: -1, yoyo: true, ease: "sine.inOut", onUpdate: function () {
      var t = o.t, x = (1 - t) * (1 - t) * a + 2 * (1 - t) * t * ((a + b) / 2) + t * t * b, y = (1 - t) * (1 - t) * 96 + 2 * (1 - t) * t * 150 + t * t * 96;
      dot.setAttribute("cx", x.toFixed(1)); dot.setAttribute("cy", y.toFixed(1));
    } });
    gsap.fromTo(one, { scale: 0.96, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.5, ease: "back.out(2)" });
  }
  btns.forEach(function (b) { b.addEventListener("click", function () { pick(+b.getAttribute("data-who")); }); });
  pick(0);
  cleanups.push(function () { if (tw) tw.kill(); });
  return () => { const list = cleanups; cleanups = []; list.forEach((f) => { try { f(); } catch (e) {} }); };
}

