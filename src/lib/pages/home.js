import { gsap } from "gsap";
import { ScrollTrigger as ST } from "gsap/ScrollTrigger";
import { $, $$, svgEl, esc, clamp, RM, FINE, SMALLQ } from "../dom.js";

/* cleanups for the current mount; init() returns a function that runs them */
let cleanups = [];

/* ================================================================
   HOME
   ================================================================ */
export function init(view, api = {}) {
  cleanups = [];
  var asm = $("#asm", view), caps = $$(".cap", asm), rail = $$(".rail li", asm);
  var slot = $("#asm-canvas", asm);
  var small = SMALLQ.matches;
  var p = api.mountPlant(slot, small ? { offsetX: 0, offsetY: 0.2, span: 48 } : { offsetX: 0.21, offsetY: -0.03, span: 72 });
  var bounds = [0, 0.02, 0.15, 0.38, 0.56, 0.73, 0.86, 1.01];
  var lastCap = -1;
  function stageOf(q) { if (q < 0.03) return 0; if (q < 0.16) return 1; if (q < 0.38) return 2; if (q < 0.56) return 3; if (q < 0.73) return 4; if (q < 0.86) return 5; return 6; }
  function paint(q) {
    if (p) p.setProgress(q);
    var s = stageOf(q);
    if (s !== lastCap) {
      caps.forEach(function (c, i) { c.setAttribute("aria-hidden", String(i !== s)); });
      lastCap = s;
    }
    rail.forEach(function (li, i) {
      var a = bounds[i + 1], b = bounds[i + 2];
      li.style.setProperty("--f", clamp((q - a) / (b - a), 0, 1).toFixed(3));
      li.classList.toggle("is-now", s === i + 1);
    });
    asm.classList.toggle("is-night", q > 0.9);
  }
  if (!p) asm.classList.add("no-gl", "is-static");
  if (RM || !p || !ST) {
    asm.classList.add("is-static");
    caps.forEach(function (c) { c.setAttribute("aria-hidden", "false"); });
    if (p) { p.setProgress(1); p.resize(); p.renderOnce(); }
    asm.classList.add("is-night");
  } else {
    var proxy = { q: 0 };
    paint(0);
    gsap.to(proxy, { q: 1, ease: "none", onUpdate: function () { paint(proxy.q); (api.headerTone && api.headerTone()); },
      scrollTrigger: { trigger: asm, start: "top top", end: "bottom bottom", scrub: 0.9 } });
    if (FINE) {
      var onMove = function (e) { p.pointer(e.clientX / window.innerWidth * 2 - 1, e.clientY / window.innerHeight * 2 - 1); };
      window.addEventListener("pointermove", onMove);
      cleanups.push(function () { window.removeEventListener("pointermove", onMove); });
    }
    cleanups.push(function () { p.stop(); });
  }
  gantt(view);
  discPanels(view);
  process(view);
  ribbons(view);
  sectors(view);
  return () => { const list = cleanups; cleanups = []; list.forEach((f) => { try { f(); } catch (e) {} }); };
}

/* schedule morph */
function gantt(view) {
  var g = $("#gantt", view); if (!g) return;
  var rows = $$(".gantt__row", g), flag = $("#flag", g), btns = $$(".seg button", view);
  var FIVE = [[0, 14], [18, 16], [38, 14], [56, 14], [74, 12], [89, 8]], FIVEW = [null, [14, 4], [34, 4], [52, 4], [70, 4], [86, 3]];
  var ONE = [[0, 16], [8, 18], [18, 20], [28, 22], [36, 22], [54, 12]];
  var touched = false;
  function set(mode) {
    var one = mode === "one";
    g.classList.toggle("is-one", one);
    rows.forEach(function (r, i) {
      var b = $(".gantt__bar", r), w = $(".gantt__wait", r), v = one ? ONE[i] : FIVE[i];
      b.style.setProperty("--l", v[0] + "%"); b.style.setProperty("--w", v[1] + "%");
      if (w) { var ww = FIVEW[i]; w.style.setProperty("--l", ww[0] + "%"); w.style.setProperty("--w", (one ? 0 : ww[1]) + "%"); w.style.setProperty("--o", one ? 0 : 1); }
    });
    flag.style.setProperty("--x", (one ? 67 : 97) + "%");
    flag.classList.toggle("is-left", !one || SMALLQ.matches);
    flag.setAttribute("data-label", one ? "Production starts earlier" : "Production starts");
    btns.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-mode") === mode)); });
  }
  set("five");
  btns.forEach(function (b) { b.addEventListener("click", function () { touched = true; set(b.getAttribute("data-mode")); }); });
  if (ST && !RM) ST.create({ trigger: g, start: "top 60%", once: true, onEnter: function () { setTimeout(function () { if (!touched) set("one"); }, 1400); } });
}

/* discipline panels with line art */
var ART = {
  civil: function (s) { var p = ""; for (var i = 0; i < 5; i++) { var x = 60 + i * 70; p += "M" + x + " 520V250"; } p += "M40 260L200 170L360 260M40 520H360"; for (var k = 0; k < 7; k++) p += "M" + (60 + k * 50) + " " + (250 - (k < 4 ? k : 6 - k) * 22) + "v14"; return p; },
  mep: function () { var p = ""; for (var i = 0; i < 6; i++) { var y = 120 + i * 60; p += "M20 " + (y + 120) + "L380 " + y; } p += "M120 520V240M260 520V180"; return p; },
  power: function () { var p = "M200 60L130 540M200 60L270 540M150 380H250M140 460H260M165 280H235M180 180H220M90 200H310M110 280H290"; for (var i = 0; i < 6; i++) { var y = 120 + i * 70; p += "M" + (190 - i * 12) + " " + y + "L" + (210 + i * 12) + " " + (y + 70) + "M" + (210 + i * 12) + " " + y + "L" + (190 - i * 12) + " " + (y + 70); } return p; },
  audit: function () { return "M60 380A140 140 0 0 1 340 380M90 380A110 110 0 0 1 310 380M200 380L290 290M180 380a20 20 0 1 0 40 0a20 20 0 1 0 -40 0M120 470l40 40l80 -90"; }
};
function discPanels(view) {
  var wrap = $("#disc", view); if (!wrap) return;
  var panels = $$(".dp", wrap);
  panels.forEach(function (dp) {
    var host = $(".dp__art", dp), kind = host.getAttribute("data-art");
    host.innerHTML = '<svg viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><path d="' + ART[kind]() + '" fill="none" stroke="#3557A8" stroke-width="2.2" stroke-linecap="round"/></svg>';
  });
  function open(dp) {
    panels.forEach(function (o) { var on = o === dp; o.classList.toggle("is-open", on); $("button.sr", o).setAttribute("aria-expanded", String(on)); });
  }
  panels.forEach(function (dp) {
    dp.addEventListener("click", function (e) { if (!e.target.closest("a")) open(dp); });
    $("button.sr", dp).addEventListener("click", function (e) { e.stopPropagation(); open(dp); });
    if (FINE) dp.addEventListener("mouseenter", function () { open(dp); });
  });
}

/* process weld line */
function process(view) {
  var pr = $("#proc", view); if (!pr) return;
  var steps = $$("li", pr);
  function set(d) { pr.style.setProperty("--d", d.toFixed(3)); steps.forEach(function (s, i) { s.classList.toggle("is-lit", d >= i / (steps.length - 1) - 0.02); }); }
  if (RM || !ST) { set(1); return; }
  set(0);
  ST.create({ trigger: pr, start: "top 75%", end: "bottom 45%", scrub: 0.6, onUpdate: function (self) { set(self.progress); } });
}

/* code ribbons: drift, and speed up with scroll */
function ribbons(view) {
  var rows = $$(".ribbon__row", view); if (!rows.length || RM || !gsap) return;
  var st = rows.map(function (r) { return { el: r, x: 0, dir: +r.getAttribute("data-dir") }; });
  var vel = 0;
  var tick = function (t, dt) {
    st.forEach(function (o) {
      var half = o.el.scrollWidth / 2;
      o.x += o.dir * (0.045 + vel) * dt;
      if (o.x <= -half) o.x += half; if (o.x > 0) o.x -= half;
      o.el.style.transform = "translate3d(" + o.x.toFixed(1) + "px,0,0)";
    });
    vel *= 0.92;
  };
  st.forEach(function (o) { if (o.dir > 0) o.x = -o.el.scrollWidth / 2; });
  gsap.ticker.add(tick);
  if (ST) ST.create({ trigger: rows[0].parentNode, start: "top bottom", end: "bottom top", onUpdate: function (self) { vel = Math.min(Math.abs(self.getVelocity()) / 4000, 1.4); } });
  cleanups.push(function () { gsap.ticker.remove(tick); });
}

export function sectors(view) {
  $$("#sectors li, [data-sectors] li", view).forEach(function (li) {
    $("button", li).addEventListener("click", function () { li.classList.toggle("is-on"); });
  });
}

