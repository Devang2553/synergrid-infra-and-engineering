/* One WebGL context for the whole site. The same 3D plant canvas is moved
   into whichever page is showing: the home hero drives it with scroll,
   inner pages show it at their own stage, slowly turning. */
import { createPlant } from "./plant.js";
import { RM, SMALLQ } from "./dom.js";

let plant = null;
let canvas = null;
let ok = true;
let io = null;

function getPlant() {
  if (plant || !ok) return plant;
  try {
    canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    plant = createPlant(canvas, { small: SMALLQ.matches });
  } catch (e) {
    ok = false;
    plant = null;
  }
  return plant;
}

/* Put the plant into `slot` with the given framing. Returns the plant, or
   null when WebGL is unavailable (callers then show their text fallback). */
export function mountPlant(slot, frame) {
  const p = getPlant();
  if (!p || !slot) return null;
  slot.insertBefore(canvas, slot.firstChild);
  p.setFrame(frame);
  p.resize();
  if (io) io.disconnect();
  io = new IntersectionObserver((entries) => {
    if (RM) { p.renderOnce(); return; }
    if (entries[0].isIntersecting) p.start(); else p.stop();
  });
  io.observe(slot);
  return p;
}

export function stopPlant() {
  if (plant) plant.stop();
}

if (typeof window !== "undefined") {
  window.addEventListener("resize", () => {
    if (plant && canvas.isConnected) { plant.resize(); if (RM) plant.renderOnce(); }
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (plant && canvas.isConnected) plant.resize(); });
}
