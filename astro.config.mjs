import { defineConfig } from 'astro/config';
import rehypePostEnhance from './src/lib/rehype-post-enhance.mjs';

// SITE_URL / BASE_PATH are set by the deploy environment:
//  - GitHub Pages preview: SITE_URL=https://kssabraw.github.io BASE_PATH=bfe
//  - Cloudflare (production): SITE_URL=https://<domain>, no BASE_PATH
// BASE_PATH takes no leading slash — a leading slash gets rewritten into a
// Windows path (C:/Program Files/Git/...) by Git Bash's MSYS conversion in
// local builds. It is normalized to a /-prefixed base here.
const base = process.env.BASE_PATH ? `/${process.env.BASE_PATH.replace(/^\/+/, '')}` : '/';
const withBase = (path) => (base === '/' ? path : `${base}${path}`);

export default defineConfig({
  site: process.env.SITE_URL || 'https://kssabraw.github.io',
  base,
  // The XML sitemap is src/pages/sitemap.xml.ts, not @astrojs/sitemap: the
  // integration can only write `sitemap-index.xml` + `sitemap-0.xml`, and it
  // indexes every built route, including the two the site deliberately keeps
  // out (see excludedPages in src/lib/site-pages.ts).
  markdown: {
    rehypePlugins: [rehypePostEnhance],
  },
  redirects: {
    // old WordPress URLs — destinations need the base prefixed manually;
    // Astro only applies base to the redirect *sources*.
    '/elementor-318': withBase('/contact'),
    '/sample-page': withBase('/'),
    '/privacy-policy-2': withBase('/privacy-policy'),
    '/blog/category/uncategorized': withBase('/blog'),
  },
});
