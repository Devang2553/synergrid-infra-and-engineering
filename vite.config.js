import { writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ROUTES, SITE_URL, headTags, routeMeta, sitemapXml } from "./src/seo/meta.js";
import { SITE } from "./src/config.js";

const noscript = (r) =>
  `<h1>${r.title.replace(/&/g, "&amp;")}</h1><p>${r.description.replace(/&/g, "&amp;")}</p>` +
  `<p>${SITE.address.replace(/&/g, "&amp;")}. Email: <a href="mailto:${SITE.email}">${SITE.email}</a>. Please enable JavaScript to view the full site.</p>` +
  `<ul>${ROUTES.map((x) => `<li><a href="${x.path}">${x.crumb.replace(/&/g, "&amp;")}</a></li>`).join("")}</ul>`;

const fill = (html, r) => html.replace("<!--seo:page-->", headTags(r, SITE)).replace("<!--seo:noscript-->", noscript(r));

/* SEO at build time:
   - fills index.html with the home page's title, description, canonical,
     share-card and JSON-LD tags (src/seo/meta.js);
   - writes dist/<page>.html for every other page with that page's
     own tags, so crawlers and link previews (which often skip JavaScript)
     read the right ones. The app itself is the same on every page;
   - writes dist/sitemap.xml. */
function seo() {
  let outDir = "dist";
  let shell = "";
  return {
    name: "synergrid-seo",
    configResolved(c) { outDir = resolve(c.root, c.build.outDir); },
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        // dev server: tags for whichever page was opened
        const path = (ctx.originalUrl || ctx.path || "/").split(/[?#]/)[0].replace(/\/index\.html$/, "/");
        const r = (ctx.server && routeMeta(path.replace(/\/$/, "") || "/")) || ROUTES[0];
        if (!ctx.server) shell = html;
        return fill(html, r);
      },
    },
    closeBundle() {
      if (!shell) return;
      for (const r of ROUTES.slice(1)) {
        const file = join(outDir, r.path.slice(1) + ".html");
        writeFileSync(file, fill(shell, r));
      }
      writeFileSync(join(outDir, "sitemap.xml"), sitemapXml(new Date().toISOString().slice(0, 10)));
      this.info?.(`seo: ${ROUTES.length} pages + sitemap.xml for ${SITE_URL}`);
    },
  };
}

export default defineConfig({
  plugins: [react(), seo()],
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        // big libraries in their own files so browsers cache them across deploys
        manualChunks: { three: ["three"], gsap: ["gsap"], react: ["react", "react-dom", "react-router-dom"] },
      },
    },
  },
});
