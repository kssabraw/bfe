/**
 * The XML sitemap for crawlers, served at the canonical /sitemap.xml.
 *
 * It is built from the same sources the routes are — the page registry in
 * src/lib/site-pages, the verticals data, and the blog collection — so it
 * updates itself on every build: publish a post and it appears here, add a
 * vertical and its whole silo appears here. Nothing to remember.
 *
 * Drift on the static pages is caught upstream: /sitemap (the human-readable
 * version) calls `assertSitemapCoverage` with the real contents of src/pages
 * and public, so a page that is neither registered in `staticPages` nor
 * explicitly excluded fails the build. This file reads that same registry,
 * which is what lets it list URLs without walking the routes itself — and why
 * the pages excluded there (the sitemap page, the form thank-you) are absent
 * here too, as intended.
 *
 * `lastmod` is only emitted where a real date exists — blog posts and the
 * indexes over them. Stamping the build time on a page that did not change
 * teaches crawlers to distrust the field, so pages with no date carry none.
 * `changefreq` and `priority` are omitted for the same reason: Google ignores
 * both, so they would be noise a reader has to keep in sync.
 */
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { verticals } from '../data/verticals/index.js';
import { aiTrackingPath, verticalPath } from '../lib/verticals';
import { PAGE_SIZE, sortPosts } from '../lib/blog';
import { staticPages } from '../lib/site-pages';

interface SitemapUrl {
  /**
   * Site-relative path in the form the page is actually served at: a trailing
   * slash for routed pages, the filename for hand-written HTML in public.
   * Both come through `staticPages` already in that shape.
   */
  path: string;
  lastmod?: Date;
}

const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, (c) => `&${{ '<': 'lt', '>': 'gt', '&': 'amp', "'": 'apos', '"': 'quot' }[c]!};`);

const entry = (loc: string, lastmod?: Date) =>
  `  <url>\n    <loc>${escapeXml(loc)}</loc>\n` +
  (lastmod ? `    <lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>\n` : '') +
  '  </url>';

export async function GET(context: APIContext): Promise<Response> {
  const posts = sortPosts(await getCollection('blog'));
  const newest = (entries: typeof posts) => entries[0]?.data.pubDate;

  const urls: SitemapUrl[] = [
    // The one-off pages. /blog/ is in this list too, so it is given the date of
    // the newest post rather than none — the index changes when they do.
    ...staticPages.map(({ route }) => ({
      path: route,
      lastmod: route === '/blog/' ? newest(posts) : undefined,
    })),

    // Blog pagination: page 1 is /blog/ above, so this starts at 2. Each page
    // is dated by the newest post it shows.
    ...Array.from({ length: Math.max(0, Math.ceil(posts.length / PAGE_SIZE) - 1) }, (_, i) => {
      const page = i + 2;
      return {
        path: `/blog/page/${page}/`,
        lastmod: newest(posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)),
      };
    }),

    ...posts.map((post) => ({ path: `/blog/${post.id}/`, lastmod: post.data.pubDate })),

    // Both levels of every vertical silo: the vertical page and the topic
    // pages under it. A topic added to a vertical needs a line here too — the
    // route table is not what this file reads.
    ...verticals.flatMap((v) => [
      { path: `${verticalPath(v.slug)}/` },
      { path: `${aiTrackingPath(v.slug)}/` },
    ]),
  ];

  // Absolute URLs are required, and they have to carry the base path: the
  // GitHub Pages preview serves the whole site under /bfe.
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const absolute = ({ path, lastmod }: SitemapUrl) =>
    entry(new URL(base + path, context.site).href, lastmod);

  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map(absolute).join('\n') +
    '\n</urlset>\n';

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
