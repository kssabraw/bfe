/**
 * The registry behind both sitemaps — the human-readable /sitemap and the
 * XML /sitemap.xml crawlers read.
 *
 * The generated sections of that page — blog posts, AI tracking verticals — come
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
  '/src/pages/[trade].astro': 'the "AI SEO by trade" section',
};

/** File extensions Astro turns into HTML pages. */
const PAGE_EXTENSIONS = ['.astro', '.md', '.mdx', '.html', '.htm'];

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
 * '/public/offer.html' -> '/offer.html'. Files in public are copied through
 * untouched, so unlike a route their URL keeps the extension — except an
 * index file, which is served as its directory: '/public/a/index.html' -> '/a/'.
 */
export function routeFromPublicFile(file: string): string {
  return `/${file.replace(/^.*\/public\//, '').replace(/(^|\/)index\.html?$/, '$1')}`;
}

/**
 * Throws unless every page under src/pages — and every hand-written HTML file
 * in public, which Astro copies through without registering a route — is
 * either listed on the sitemap, explicitly excluded, or a dynamic route
 * covered by a generated section. Also throws when a route listed here no
 * longer exists.
 *
 * Called from src/pages/sitemap.astro with the real contents of both
 * directories, so a mismatch fails `astro build` rather than shipping a stale
 * sitemap.
 */
export function assertSitemapCoverage(pageFiles: string[]): void {
  const problems: string[] = [];

  const listed = new Set(staticPages.map((page) => page.route));
  const excluded = new Set(Object.keys(excludedPages));
  const found = new Set<string>();

  // A registered page still has to survive rendering. The sitemap matches
  // groups by name, so an entry whose group isn't one of SITEMAP_GROUPS is
  // dropped on the floor — covered as far as the loop below is concerned, yet
  // absent from the page. There is no tsconfig.json in this project, so the
  // SitemapGroup union is not enforced anywhere; this check is what catches it.
  const groupNames = new Set<string>(SITEMAP_GROUPS);
  const seen = new Set<string>();
  for (const page of staticPages) {
    if (!groupNames.has(page.group)) {
      problems.push(
        `${page.route} has group "${page.group}", which is not one of ${SITEMAP_GROUPS.join(', ')} — the link would silently never render.`,
      );
    }
    if (seen.has(page.route)) {
      problems.push(`${page.route} is listed twice in staticPages — it would render twice.`);
    }
    seen.add(page.route);
    if (page.route in excludedPages) {
      problems.push(
        `${page.route} is in both staticPages and excludedPages — it does render, so drop the excludedPages entry.`,
      );
    }
  }

  for (const file of pageFiles) {
    if (!isPageFile(file)) continue;

    // Raw HTML in public bypasses routing entirely, so nothing derived from
    // the route table would ever see it — being listed here is the only way it
    // reaches either sitemap.
    if (file.startsWith('/public/')) {
      const route = routeFromPublicFile(file);
      found.add(route);
      if (!listed.has(route) && !excluded.has(route)) {
        problems.push(
          `${route} (${file}) is a hand-written page in public/ that no sitemap lists — add it to staticPages in src/lib/site-pages.ts, or to excludedPages with a reason.`,
        );
      }
      continue;
    }

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
        `${route} is listed in src/lib/site-pages.ts but no file under src/pages or public produces it — remove the entry.`,
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
