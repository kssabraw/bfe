import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypePostEnhance from './src/lib/rehype-post-enhance.mjs';
import { aiSeoPages, aiSeoPath } from './src/data/ai-seo-pages.js';

// SITE_URL / BASE_PATH are set by the deploy environment:
//  - GitHub Pages preview: SITE_URL=https://kssabraw.github.io BASE_PATH=bfe
//  - Cloudflare (production): SITE_URL=https://<domain>, no BASE_PATH
// BASE_PATH takes no leading slash — a leading slash gets rewritten into a
// Windows path (C:/Program Files/Git/...) by Git Bash's MSYS conversion in
// local builds. It is normalized to a /-prefixed base here.
const base = process.env.BASE_PATH ? `/${process.env.BASE_PATH.replace(/^\/+/, '')}` : '/';
const withBase = (path) => (base === '/' ? path : `${base}${path}`);
const site = process.env.SITE_URL || 'https://kssabraw.github.io';

// The AI SEO trade pages are static HTML in public/, so the sitemap integration
// can't discover them from the route table — they're added by hand. Pages still
// waiting on screenshots ship noindex and are held back until they're complete.
const aiSeoSitemapUrls = aiSeoPages
  .filter((p) => p.indexed)
  .map((p) => new URL(withBase(aiSeoPath(p.slug)), site).href);

export default defineConfig({
  site,
  base,
  integrations: [sitemap({ customPages: aiSeoSitemapUrls })],
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
