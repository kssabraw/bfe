/**
 * robots.txt exists to point crawlers at /sitemap.xml — the site was
 * previously served without one, so the sitemap could only be found by being
 * submitted by hand. Everything stays crawlable; the allow-all rule is the
 * default behaviour written down, not a change to it.
 */
import type { APIContext } from 'astro';

export function GET(context: APIContext): Response {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const sitemap = new URL(`${base}/sitemap.xml`, context.site).href;

  const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemap}`, ''].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
