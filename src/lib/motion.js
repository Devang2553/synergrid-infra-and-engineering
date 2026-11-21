/* Site-wide motion: stamped headline reveals and magnetic buttons. */
import { gsap } from "gsap";
import { $$, RM, FINE } from "./dom.js";

/* Wrap every word of a [data-split] heading in a mask so it can rise into place. */
function split(el) {
  if (el.__split) return;
  el.__split = true;
  (function walk(node) {
    Array.prototype.slice.call(node.childNodes).forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((p) => {
          if (!p) return;
          if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(" ")); return; }
          const w = document.createElement("span"); w.className = "w";
          const i = document.createElement("span"); i.textContent = p;
          w.appendChild(i); frag.appendChild(w);
        });
        n.parentNode.replaceChild(frag, n);
      } else if (n.nodeType === 1) walk(n);
    });
  })(el);
}

/* Call inside a gsap.context so the tweens and triggers revert on unmount. */
export function revealHeads(root) {
  if (RM) return;
  $$("[data-split]", root).forEach((h) => {
    split(h);
    const words = $$(".w > span", h);
    const r = h.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.9) {
      gsap.fromTo(words, { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.05, delay: 0.15 });
    } else {
      gsap.fromTo(words, { yPercent: 110 }, {
        yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.05,
        scrollTrigger: { trigger: h, start: "top 88%", once: true },
      });
    }
  });
}

/* Buttons marked [data-magnet] lean toward the pointer. Returns a cleanup. */
export function magnets(root) {
  if (!FINE || RM) return () => {};
  const offs = [];
  $$("[data-magnet]", root).forEach((b) => {
    const move = (e) => {
      const r = b.getBoundingClientRect();
      b.style.setProperty("--bx", ((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1) + "px");
      b.style.setProperty("--by", ((e.clientY - r.top - r.height / 2) * 0.35).toFixed(1) + "px");
    };
    const leave = () => { b.style.setProperty("--bx", "0px"); b.style.setProperty("--by", "0px"); };
    b.addEventListener("pointermove", move);
    b.addEventListener("pointerleave", leave);
    offs.push(() => { b.removeEventListener("pointermove", move); b.removeEventListener("pointerleave", leave); });
  });
  return () => offs.forEach((f) => f());
}
