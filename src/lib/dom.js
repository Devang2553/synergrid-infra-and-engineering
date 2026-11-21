/* Small DOM helpers shared by the page modules. */
export const $ = (s, r) => (r || document).querySelector(s);
export const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const NS = "http://www.w3.org/2000/svg";
export function svgEl(tag, attrs, parent) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}
export function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}
export const RM = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const FINE = typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
export const SMALLQ = typeof window !== "undefined" ? window.matchMedia("(max-width: 860px)") : { matches: false };
