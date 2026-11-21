import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NOT_FOUND, OG_IMAGE, SITE_URL, absUrl, routeMeta } from "../seo/meta.js";

function setTag(tag, keyAttr, key, valueAttr, value) {
  let el = document.head.querySelector(`${tag}[${keyAttr}="${key}"]`);
  if (!el) { el = document.createElement(tag); el.setAttribute(keyAttr, key); document.head.appendChild(el); }
  el.setAttribute(valueAttr, value);
}
const setName = (k, v) => setTag("meta", "name", k, "content", v);
const setProp = (k, v) => setTag("meta", "property", k, "content", v);

/* Keeps the <head> in step with the current page as visitors move around.
   Titles and descriptions live in src/seo/meta.js; the build step writes the
   same tags into each page's HTML for crawlers and link previews.
   Pass `notFound` on the 404 page so it is kept out of search results. */
export default function Seo({ notFound = false }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const route = !notFound && routeMeta(pathname);
    const meta = route || NOT_FOUND;
    const url = route ? absUrl(route.path) : SITE_URL + pathname;

    document.title = meta.title;
    setName("description", meta.description);
    setName("robots", route ? "index, follow, max-image-preview:large" : "noindex, follow");
    if (route) setTag("link", "rel", "canonical", "href", url);
    else document.head.querySelector('link[rel="canonical"]')?.remove();
    setProp("og:url", url);
    setProp("og:title", meta.title);
    setProp("og:description", meta.description);
    setProp("og:image", SITE_URL + OG_IMAGE.path);
    setName("twitter:title", meta.title);
    setName("twitter:description", meta.description);
  }, [pathname, notFound]);

  return null;
}
