import { useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { Brand } from "./Mark.jsx";
import { PAGES } from "./routes.js";
import { RM } from "../lib/dom.js";
import { magnets } from "../lib/motion.js";

/* Fixed header plus the full-screen "Index" menu. */
export default function Header({ menuOpen, setMenuOpen }) {
  const menuRef = useRef(null), btnRef = useRef(null), closeRef = useRef(null), barRef = useRef(null), first = useRef(true);
  const { pathname } = useLocation();

  useEffect(() => magnets(barRef.current), []);
  useEffect(() => { setMenuOpen(false); }, [pathname, setMenuOpen]);

  useEffect(() => {
    const m = menuRef.current;
    if (first.current) { first.current = false; return; }
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (menuOpen) {
      m.classList.add("is-open");
      if (RM) m.style.clipPath = "none";
      else {
        gsap.fromTo(m, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.6, ease: "power4.inOut" });
        gsap.fromTo(m.querySelectorAll(".menu__list li"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.04, delay: 0.25 });
      }
      setTimeout(() => closeRef.current && closeRef.current.focus(), 60);
    } else {
      const done = () => m.classList.remove("is-open");
      if (RM) { m.style.clipPath = "inset(0 0 100% 0)"; done(); }
      else gsap.to(m, { clipPath: "inset(100% 0 0% 0)", duration: 0.5, ease: "power4.inOut", onComplete: done });
    }
  }, [menuOpen]);

  function onKey(e) {
    if (e.key === "Escape") { setMenuOpen(false); btnRef.current && btnRef.current.focus(); }
    if (e.key === "Tab") {
      const f = menuRef.current.querySelectorAll("a, button");
      const a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    }
  }

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="bar" id="bar" ref={barRef}>
        <div className="wrap bar__in">
          <Link className="mark" to="/" aria-label="SYNERGRID home"><Brand /></Link>
          <nav className="nav" aria-label="Main">
            {PAGES.filter((p) => p.nav).map((p) => <NavLink key={p.path} to={p.path}>{p.nav}</NavLink>)}
          </nav>
          <button ref={btnRef} className="bar__menu" type="button" aria-expanded={menuOpen} aria-controls="menu" onClick={() => setMenuOpen(true)}><i></i>Index</button>
          <div className="bar__cta"><Link className="btn btn--amber btn--sm" to="/contact" data-magnet="">Request a proposal</Link></div>
        </div>
      </header>

      <div className="menu" id="menu" ref={menuRef} role="dialog" aria-modal="true" aria-label="Site index" aria-hidden={!menuOpen} onKeyDown={onKey}>
        <div className="wrap menu__top">
          <Link className="mark" to="/" aria-label="SYNERGRID home"><Brand sub={false} /></Link>
          <button ref={closeRef} className="bar__menu" type="button" style={{ display: "inline-flex" }} onClick={() => { setMenuOpen(false); btnRef.current && btnRef.current.focus(); }}>Close</button>
        </div>
        <div className="wrap" style={{ flex: 1, display: "flex", minHeight: 0 }}>
          <ol className="menu__list">
            {PAGES.map((p) => (
              <li key={p.path}><NavLink to={p.path} end><b>{p.menu}</b><span>{p.note}</span></NavLink></li>
            ))}
          </ol>
        </div>
        <div className="wrap menu__foot mono"><span>Corporate office, Vadodara, Gujarat</span><span>Powering Trust, Engineering Excellence</span></div>
      </div>
    </>
  );
}
