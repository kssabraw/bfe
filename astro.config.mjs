import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL / BASE_PATH are set by the deploy environment:
//  - GitHub Pages preview: SITE_URL=https://kssabraw.github.io BASE_PATH=/bfe
//  - Cloudflare (production): SITE_URL=https://<domain>, no BASE_PATH
export default defineConfig({
  site: process.env.SITE_URL || 'https://kssabraw.github.io',
  base: process.env.BASE_PATH || '/',
  integrations: [sitemap()],
  redirects: {
    // old WordPress URLs
    '/elementor-318': '/contact',
    '/sample-page': '/',
    '/privacy-policy-2': '/privacy-policy',
    '/blog/category/uncategorized': '/blog',
  },
});
