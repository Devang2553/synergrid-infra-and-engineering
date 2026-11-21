import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mountPlant } from "./plantHost.js";
import { revealHeads, magnets } from "./motion.js";
import { RM, SMALLQ, $ } from "./dom.js";
import { headerTone } from "./headerTone.js";

gsap.registerPlugin(ScrollTrigger);

/* Attach a page's behaviour to its root element.
   - init:  the page module's init(root, api), returning a cleanup
   - stage: for inner pages, the 3D plant stage (0..1) shown in [data-plant-slot]
   Everything created here is reverted when the route changes, so it is
   safe under React StrictMode's double mount. */
export function usePage({ init, stage } = {}) {
  const ref = useRef(null);
  const location = useLocation();
  const scope = location.state && location.state.scope;

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    if (!location.hash) window.scrollTo(0, 0);
    const offs = [];
    const api = { mountPlant, headerTone, scope };
    const ctx = gsap.context(() => {
      if (init) offs.push(init(root, api));
      if (stage != null) {
        const slot = $("[data-plant-slot]", root);
        const p = mountPlant(slot, { offsetX: 0, offsetY: 0.02, span: SMALLQ.matches ? 44 : 48 });
        if (!p && slot) slot.style.display = "none";
        if (p) {
          p.setProgress(stage);
          p.setIdle(true);
          if (RM) p.renderOnce();
          offs.push(() => p.stop());
        }
      }
      revealHeads(root);
    }, root);
    offs.push(magnets(root));
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (location.hash) { const t = document.getElementById(location.hash.slice(1)); if (t) t.scrollIntoView(); }
      headerTone();
    });
    return () => {
      cancelAnimationFrame(raf);
      offs.forEach((f) => { try { if (f) f(); } catch (e) { /* already gone */ } });
      ctx.revert();
    };
    // re-run only when the page itself changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return ref;
}
