/**
 * The registry behind the human-readable sitemap (/sitemap).
 *
 * The generated sections of that page — blog posts, AI tracking pages — come
 * from the same sources their routes do, so they can never drift. The one-off
 * pages under src/pages have no such source, so they are listed here, and
 * `assertSitemapCoverage` fails the build when a file in src/pages is missing
 * from this file. Adding a page therefore forces a decision: list it, or say
 * why it stays off the sitemap.
 */

/** Sitemap card headings, in the order they render. */
export const SITEMAP_GROUPS = ['Main pages', 'Apps', 'Legal'] as const;

export type SitemapGroup = (typeof SITEMAP_GROUPS)[number];

export interface StaticPage {
  /** Route with leading and trailing slashes, e.g. '/pricing/'. */
  route: string;
  /** Link text on the sitemap. */
  label: string;
  group: SitemapGroup;
}

/** Every static page that appears on the sitemap. */
export const staticPages: StaticPage[] = [
  { route: '/', label: 'Home', group: 'Main pages' },
  { route: '/pricing/', label: 'Pricing', group: 'Main pages' },
  { route: '/blog/', label: 'Blog', group: 'Main pages' },
  { route: '/contact/', label: 'Contact Us', group: 'Main pages' },
  { route: '/keyword-agent/', label: 'Keyword Agent', group: 'Apps' },
  { route: '/labs/', label: 'LABs', group: 'Apps' },
  { route: '/off-page-agent/', label: 'Off-Page Agent', group: 'Apps' },
  { route: '/privacy-policy/', label: 'Privacy Policy', group: 'Legal' },
  { route: '/terms-of-use/', label: 'Terms of Use', group: 'Legal' },
];

/** Static pages deliberately kept off the sitemap, and why. */
export const excludedPages: Record<string, string> = {
  '/sitemap/': 'the sitemap itself',
  '/thank-you/': 'form confirmation, only reachable after a submit',
};

/**
 * Dynamic route files, keyed by path, mapped to the sitemap section that
 * already covers every page they generate.
 */
export const dynamicRoutes: Record<string, string> = {
  '/src/pages/blog/[slug].astro': 'the "Blog posts" section',
  '/src/pages/blog/page/[page].astro': 'pagination over the "Blog posts" section',
  '/src/pages/[vertical]/[page].astro': 'the "AI tracking by industry" section',
};

/** File extensions Astro turns into HTML pages. */
const PAGE_EXTENSIONS = ['.astro', '.md', '.mdx', '.html'];

const isPageFile = (file: string) => PAGE_EXTENSIONS.some((ext) => file.endsWith(ext));

/** '/src/pages/pricing.astro' -> '/pricing/', '/src/pages/index.astro' -> '/'. */
export function routeFromPageFile(file: string): string {
  const path = file
    .replace(/^.*\/src\/pages\//, '')
    .replace(/\.[^.]+$/, '')
    .replace(/(^|\/)index$/, '');
  return path ? `/${path}/` : '/';
}

/**
 * Throws unless every page file under src/pages is either listed on the
 * sitemap, explicitly excluded, or a dynamic route covered by a generated
 * section — and unless every route listed here still exists.
 *
 * Called from src/pages/sitemap.astro with the real contents of src/pages, so
 * a mismatch fails `astro build` rather than shipping a stale sitemap.
 */
export function assertSitemapCoverage(pageFiles: string[]): void {
  const problems: string[] = [];

  const listed = new Set(staticPages.map((page) => page.route));
  const excluded = new Set(Object.keys(excludedPages));
  const found = new Set<string>();

  for (const file of pageFiles) {
    if (!isPageFile(file)) continue;

    if (file.includes('[')) {
      if (!(file in dynamicRoutes)) {
        problems.push(
          `${file} is a dynamic route with no entry in dynamicRoutes — add one naming the sitemap section that lists its pages, and make sure that section really covers them.`,
        );
      }
      continue;
    }

    const route = routeFromPageFile(file);
    found.add(route);
    if (!listed.has(route) && !excluded.has(route)) {
      problems.push(
        `${route} (${file}) is missing from the sitemap — add it to staticPages in src/lib/site-pages.ts, or to excludedPages with a reason.`,
      );
    }
  }

  for (const route of [...listed, ...excluded]) {
    if (!found.has(route)) {
      problems.push(
        `${route} is listed in src/lib/site-pages.ts but no longer exists under src/pages — remove the entry.`,
      );
    }
  }

  for (const file of Object.keys(dynamicRoutes)) {
    if (!pageFiles.includes(file)) {
      problems.push(
        `${file} is listed in dynamicRoutes but no longer exists — remove the entry.`,
      );
    }
  }

  if (problems.length) {
    throw new Error(`Sitemap coverage check failed:\n  - ${problems.join('\n  - ')}`);
  }
}
