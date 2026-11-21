import { useEffect } from "react";

function setMeta(selector, attr, key, value) {
  let el = document.head.querySelector(selector);
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute("content", value);
}

/* Per-page title and description, following the brief's template:
   [Page Name] | SYNERGRID INFRA & ENGINEERING SERVICES - Turnkey EPC Solutions */
export default function Seo({ title, description }) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
  }, [title, description]);
  return null;
}
