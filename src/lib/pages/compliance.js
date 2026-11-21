import { gsap } from "gsap";
import { ScrollTrigger as ST } from "gsap/ScrollTrigger";
import { $, $$, svgEl, esc, clamp, RM, FINE, SMALLQ } from "../dom.js";
import { sectors } from "./home.js";

/* cleanups for the current mount; init() returns a function that runs them */
let cleanups = [];

/* ================================================================
   COMPLIANCE: flip cards
   ================================================================ */
export function init(view, api = {}) {
  cleanups = [];
  $$(".flip", view).forEach(function (f) {
    f.addEventListener("click", function () { var on = !f.classList.contains("is-on"); f.classList.toggle("is-on", on); f.setAttribute("aria-pressed", String(on)); });
  });
  sectors(view);
  if (!RM && gsap) gsap.from($$(".flip", view), { y: 40, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.06, scrollTrigger: { trigger: "#codes", start: "top 85%", once: true } });
  return () => { const list = cleanups; cleanups = []; list.forEach((f) => { try { f(); } catch (e) {} }); };
}

