import { gsap } from "gsap";
import { ScrollTrigger as ST } from "gsap/ScrollTrigger";
import { $, $$, svgEl, esc, clamp, RM, FINE, SMALLQ } from "../dom.js";

/* cleanups for the current mount; init() returns a function that runs them */
let cleanups = [];

/* ================================================================
   CIVIL: PEB anatomy + floor build-up
   ================================================================ */
var PEB = [
  { n: "RCC footing", d: "Spread or pile foundation that carries the column load into the ground. Sized from the soil report and the column reactions from the STAAD.Pro model.", x: 140, y: 425 },
  { n: "Tapered column", d: "A built-up steel member, deeper at the top where bending is greatest. Tapering puts steel only where the load needs it, which keeps the building light.", x: 128, y: 300 },
  { n: "Rafter", d: "The sloping member from eave to ridge. Bolted rigidly to the columns it forms a portal frame, so the floor below is a clear span with no internal columns.", x: 250, y: 168 },
  { n: "Purlins", d: "Cold-formed Z or C sections that span between frames and carry the roof sheeting.", x: 470, y: 150 },
  { n: "Girts", d: "Like purlins, but on the walls. They carry the wall cladding and brace the columns against wind.", x: 604, y: 330 },
  { n: "Crane runway beam", d: "Sits on brackets on the columns and carries the EOT crane wheels. Designed for the crane's capacity plus impact and braking loads.", x: 520, y: 262 },
  { n: "Ridge ventilator", d: "Lets hot air escape at the highest point of the roof, keeping the production floor cooler without fans.", x: 360, y: 92 },
  { n: "Cladding", d: "Profiled metal roof and wall sheets, single skin or insulated, closing the building against the weather.", x: 664, y: 210 }
];
export function init(view, api = {}) {
  cleanups = [];
  var svg = $("#peb-svg", view), out = $("#peb-out", view);
  svg.innerHTML = "";
  var ink = "#0B1A33", soft = "#5B6779", st = "#1E3A8A";
  var g = svgEl("g", {}, svg);
  function line(d, c, w, cls) { return svgEl("path", { d: d, fill: "none", stroke: c, "stroke-width": w, "stroke-linejoin": "round", "stroke-linecap": "round", "class": cls || "dl" }, g); }
  line("M30 400H690", ink, 2);
  for (var hx = 40; hx < 690; hx += 18) line("M" + hx + " 402l-10 12", soft, 1);
  // footings
  [140, 580].forEach(function (x) { svgEl("path", { d: "M" + (x - 30) + " 440h60v-14h-16v-26h-28v26h-16z", fill: "#C6CCD4", stroke: ink, "stroke-width": 1.5, "class": "dl" }, g); });
  // tapered columns and rafters as filled polygons
  svgEl("path", { d: "M128 400L134 196L156 196L150 400Z", fill: st, "class": "dl" }, g);
  svgEl("path", { d: "M570 400L564 196L586 196L592 400Z", fill: st, "class": "dl" }, g);
  svgEl("path", { d: "M134 196L360 112L360 128L156 216Z", fill: st, "class": "dl" }, g);
  svgEl("path", { d: "M586 196L360 112L360 128L564 216Z", fill: st, "class": "dl" }, g);
  // purlins on the rafters
  for (var k = 1; k < 7; k++) { var t = k / 7; [[134, 196], [586, 196]].forEach(function (e) { var x = e[0] + (360 - e[0]) * t, y = e[1] + (112 - e[1]) * t; svgEl("rect", { x: x - 5, y: y - 13, width: 10, height: 9, fill: "#3557A8", "class": "dl" }, g); }); }
  // girts on the columns
  [240, 290, 340].forEach(function (y) { svgEl("rect", { x: 112, y: y, width: 12, height: 8, fill: "#3557A8", "class": "dl" }, g); svgEl("rect", { x: 596, y: y, width: 12, height: 8, fill: "#3557A8", "class": "dl" }, g); });
  // cladding
  line("M110 200V400M610 200V400M110 200L360 106L610 200", soft, 2, "dl dl--clad");
  // crane runway + bridge
  [160, 560].forEach(function (x) { svgEl("path", { d: "M" + (x > 300 ? x : x - 10) + " 268h" + (x > 300 ? -14 : 14) + "v10h" + (x > 300 ? 14 : -14) + "z", fill: ink, "class": "dl" }, g); });
  svgEl("rect", { x: 152, y: 258, width: 416, height: 10, fill: "none", stroke: ink, "stroke-width": 1.5, "stroke-dasharray": "6 4", "class": "dl" }, g);
  svgEl("rect", { x: 330, y: 268, width: 40, height: 12, fill: ink, "class": "dl" }, g);
  line("M350 280V330", soft, 1.5);
  svgEl("path", { d: "M342 330h16l-8 12z", fill: soft, "class": "dl" }, g);
  // ridge vent
  svgEl("path", { d: "M330 104h60l-8 -16h-44z", fill: "#D7DDE5", stroke: ink, "stroke-width": 1.5, "class": "dl" }, g);
  // hotspots
  var spots = PEB.map(function (p, i) {
    var h = svgEl("g", { "class": "hot", tabindex: 0, role: "button", "aria-label": p.n, transform: "translate(" + p.x + "," + p.y + ")" }, svg);
    svgEl("circle", { r: 15, "class": "ring" }, h);
    svgEl("text", { y: 5, "text-anchor": "middle" }, h).textContent = String(i + 1);
    return h;
  });
  function pick(i) {
    spots.forEach(function (s, k) { s.classList.toggle("is-on", k === i); });
    out.innerHTML = '<span class="mono" style="color:var(--amber-ink)">Part ' + (i + 1) + ' of ' + PEB.length + '</span><h3>' + esc(PEB[i].n) + '</h3><p>' + esc(PEB[i].d) + '</p>';
  }
  spots.forEach(function (s, i) {
    s.addEventListener("click", function () { pick(i); });
    s.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(i); } });
  });
  pick(1);
  if (!RM && gsap) gsap.from($$(".dl", svg), { opacity: 0, y: -18, duration: 0.6, ease: "power3.out", stagger: 0.018, scrollTrigger: { trigger: svg, start: "top 80%", once: true } });

  floor(view);
  return () => { const list = cleanups; cleanups = []; list.forEach((f) => { try { f(); } catch (e) {} }); };
}
var FLOOR = {
  epoxy: [
    { n: "Epoxy topping", d: "A seamless resin coat over the slab: chemical-resistant, dust-free and easy to clean, which is why it is used in pharma, food and electronics floors.", c: "#F2A51A" },
    { n: "RCC slab", d: "Reinforced concrete with steel mesh sized for forklift and racking loads, cut into panels with joints that control cracking.", c: "#C6CCD4" },
    { n: "PCC levelling course", d: "Plain cement concrete that gives a flat, clean base for the slab and stops it losing water into the soil while it cures.", c: "#DCE1E7" },
    { n: "Compacted sub-grade", d: "Native soil or fill compacted in layers and tested, so the floor does not settle under load.", c: "#B79A73" }
  ],
  esd: [
    { n: "Conductive ESD coating", d: "An anti-static resin floor that bleeds static charge away, so it cannot discharge into sensitive electronics or ignite vapours.", c: "#F2A51A" },
    { n: "Copper earthing grid", d: "Copper strips laid under the coating and bonded to the earthing system. This is the path static takes to ground.", c: "#C26A2E" },
    { n: "RCC slab", d: "Reinforced concrete with steel mesh sized for the loads, with joints that control cracking.", c: "#C6CCD4" },
    { n: "PCC levelling course", d: "Plain cement concrete giving a flat, clean base for the slab.", c: "#DCE1E7" },
    { n: "Compacted sub-grade", d: "Compacted, tested ground so the floor does not settle.", c: "#B79A73" }
  ]
};
function floor(view) {
  var svg = $("#floor-svg", view), out = $("#floor-out", view), btns = $$("[data-floor]", view);
  var mode = "epoxy", gap = { v: RM ? 1 : 0 };
  function draw() {
    svg.innerHTML = "";
    var L = FLOOR[mode], th = [14, 46, 22, 40, 40], y0 = 70;
    if (mode === "esd") th = [10, 8, 46, 22, 40];
    var groups = [];
    var y = y0;
    L.forEach(function (l, i) {
      var h = th[i];
      var g = svgEl("g", { "class": "hot", tabindex: 0, role: "button", "aria-label": l.n }, svg);
      var dx = 70, dy = -34, x0 = 60, w = 380;
      svgEl("path", { d: "M" + x0 + " " + y + "l" + dx + " " + dy + "h" + w + "l" + -dx + " " + -dy + "z", fill: l.c, stroke: "#0B1A33", "stroke-width": 1.4, opacity: .85 }, g);
      svgEl("path", { d: "M" + x0 + " " + y + "h" + w + "v" + h + "h" + -w + "z", fill: l.c, stroke: "#0B1A33", "stroke-width": 1.4 }, g);
      svgEl("path", { d: "M" + (x0 + w) + " " + y + "l" + dx + " " + dy + "v" + h + "l" + -dx + " " + -dy + "z", fill: l.c, stroke: "#0B1A33", "stroke-width": 1.4, opacity: .7 }, g);
      if (l.n.indexOf("RCC") === 0) for (var r = x0 + 24; r < x0 + w; r += 34) svgEl("circle", { cx: r, cy: y + h / 2, r: 3.2, fill: "#0B1A33" }, g);
      if (l.n.indexOf("Copper") === 0) for (var c = x0 + 30; c < x0 + w; c += 60) svgEl("path", { d: "M" + c + " " + y + "l" + dx + " " + dy, stroke: "#7A3E14", "stroke-width": 3 }, g);
      if (l.n.indexOf("Compacted") === 0) for (var s = x0 + 10; s < x0 + w; s += 16) svgEl("circle", { cx: s, cy: y + 12 + (s % 3) * 8, r: 2, fill: "#6E5634" }, g);
      svgEl("path", { d: "M" + (x0 + w + dx + 8) + " " + (y + dy + h / 2) + "H560", stroke: "#556274", "stroke-width": 1, "stroke-dasharray": "3 3" }, g);
      var tx = svgEl("text", { x: 566, y: y + dy + h / 2 + 4, "font-family": "IBM Plex Mono, monospace", "font-size": 11, fill: "#0B1A33", "letter-spacing": ".5" }, g);
      tx.textContent = l.n.toUpperCase().replace("COMPACTED ", "").replace(" COURSE", "");
      groups.push({ g: g, i: i });
      g.addEventListener("click", function () { pick(i); });
      g.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(i); } });
      y += h + 2;
    });
    function spread() { groups.forEach(function (o) { o.g.setAttribute("transform", "translate(0," + (o.i * 26 * gap.v).toFixed(1) + ")"); }); }
    spread();
    draw.spread = spread;
    draw.groups = groups;
    pick(0);
  }
  function pick(i) {
    var l = FLOOR[mode][i];
    (draw.groups || []).forEach(function (o) { o.g.style.opacity = o.i === i ? 1 : 0.72; });
    out.innerHTML = '<span class="mono" style="color:var(--amber-ink)">Layer ' + (i + 1) + ', top down</span><h3>' + esc(l.n) + '</h3><p>' + esc(l.d) + '</p><p class="lab__note">Tap any layer in the section.</p>';
  }
  btns.forEach(function (b) { b.addEventListener("click", function () {
    mode = b.getAttribute("data-floor");
    btns.forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
    draw();
  }); });
  draw();
  if (!RM && gsap) gsap.to(gap, { v: 1, ease: "none", onUpdate: function () { if (draw.spread) draw.spread(); }, scrollTrigger: { trigger: svg, start: "top 85%", end: "center 45%", scrub: 0.6 } });
}

