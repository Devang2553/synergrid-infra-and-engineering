import { useCallback, useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import WhatsAppButton from "./WhatsAppButton.jsx";
import StructuredData from "./StructuredData.jsx";
import { pageName } from "./routes.js";
import { RM } from "../lib/dom.js";
import { stopPlant } from "../lib/plantHost.js";
import { headerTone } from "../lib/headerTone.js";

/* Layout + the rolling-shutter page transition.
   Internal links are caught on the way down (capture phase), so React
   Router's own click handling sees defaultPrevented and steps aside. The
   shutter closes, the route changes under cover, then it rolls back up. */
export default function Layout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const slats = useRef(null), label = useRef(null), labelName = useRef(null), busy = useRef(false), here = useRef(pathname);
  here.current = pathname;

  const go = useCallback((path, hash, scope) => {
    const to = path + (hash ? "#" + hash : "");
    const state = scope ? { scope } : null;
    if (path === here.current) {
      if (hash) { const t = document.getElementById(hash); if (t) t.scrollIntoView({ behavior: RM ? "auto" : "smooth" }); }
      else window.scrollTo({ top: 0, behavior: RM ? "auto" : "smooth" });
      setMenuOpen(false);
      return;
    }
    if (busy.current) return;
    if (RM) { setMenuOpen(false); navigate(to, { state }); return; }
    busy.current = true;
    stopPlant();
    const s = slats.current.children;
    labelName.current.textContent = pageName(path);
    gsap.timeline({ onComplete: () => { busy.current = false; } })
      .set(s, { transformOrigin: "50% 0%" })
      .to(s, { scaleY: 1, duration: 0.42, ease: "power3.in", stagger: 0.035 })
      .to(label.current, { opacity: 1, duration: 0.2 }, "-=0.15")
      .add(() => { setMenuOpen(false); navigate(to, { state }); })
      .to(label.current, { opacity: 0, duration: 0.2 }, "+=0.22")
      .set(s, { transformOrigin: "50% 100%" })
      .to(s, { scaleY: 0, duration: 0.5, ease: "power3.out", stagger: { each: 0.035, from: "end" } }, "-=0.05")
      .add(() => {
        const h = document.querySelector("main h1, main h2");
        if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
      });
  }, [navigate]);

  useEffect(() => {
    function onClick(e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const href = a.getAttribute("href");
      if (href.startsWith("#")) {
        const t = document.getElementById(href.slice(1));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: RM ? "auto" : "smooth", block: "start" }); }
        return;
      }
      if (!href.startsWith("/")) return;
      e.preventDefault();
      const [path, hash] = href.split("#");
      go(path || "/", hash, a.getAttribute("data-scope"));
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [go]);

  useEffect(() => { headerTone(); }, [pathname]);

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="shutter" aria-hidden="true" ref={slats}>
        {Array.from({ length: 10 }, (_, i) => <i key={i}></i>)}
      </div>
      <div className="shutter__label" aria-hidden="true" ref={label}><div><small>Opening</small><span ref={labelName}>Home</span></div></div>
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <StructuredData />
    </>
  );
}
