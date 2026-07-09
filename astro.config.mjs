import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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
  integrations: [sitemap()],
  redirects: {
    // old WordPress URLs — destinations need the base prefixed manually;
    // Astro only applies base to the redirect *sources*.
    '/elementor-318': withBase('/contact'),
    '/sample-page': withBase('/'),
    '/privacy-policy-2': withBase('/privacy-policy'),
    '/blog/category/uncategorized': withBase('/blog'),
  },
});
