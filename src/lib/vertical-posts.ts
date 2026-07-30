/**
 * Ties blog posts to the vertical silo they belong to.
 *
 * The posts stay at /blog/<slug>/ — they are not moved under /<vertical>/ —
 * so the silo is joined by internal links rather than by path. This module is
 * what makes that join: the vertical page lists its own posts, and each post
 * can point back up to the vertical page.
 *
 * Posts carry no vertical field in their frontmatter (the publisher writes
 * title/description/pubDate and nothing else), so the link is inferred from
 * the post's slug. That is why the matching below is deliberate about which
 * term wins: "aeo-tips-for-cosmetic-dentists" contains both "cosmetic-dentists"
 * and "dentists", and it belongs to the more specific of the two.
 */

interface VerticalLike {
  slug: string;
  name: string;
}

/**
 * Trade nouns a post slug uses that no rule derives from the vertical's own
 * slug. Kept explicit and small: a post that belongs to a vertical but names
 * the trade some third way should get an entry here rather than a looser rule,
 * which would start pulling in posts that only mention the trade in passing.
 */
const ALIASES: Record<string, string[]> = {
  // Six posts predate the vertical and say "landscaper", not "landscaping".
  'landscaping-companies': ['landscaper'],
};

/**
 * The terms that identify a vertical in a post slug: the slug itself, the bare
 * trade for slugs carrying a "-companies"/"-contractors" suffix a post title
 * would not repeat ("aeo-tips-for-chiropractors" vs the
 * "carpet-cleaning-companies" slug), the singular of both ("plumber" for
 * "plumbers"), and any alias above.
 *
 * "general-contractors" keeps only its full slug — "general" on its own would
 * swallow unrelated posts.
 */
function matchTerms(slug: string): string[] {
  const terms = new Set([slug]);

  const stem = slug.replace(/-(companies|contractors)$/, '');
  if (stem !== slug && stem !== 'general') terms.add(stem);

  // Singulars, skipping the "-ies" plurals where dropping the s yields a
  // non-word ("companies" -> "companie") that could never match anything.
  for (const term of [...terms]) {
    if (term.endsWith('s') && !term.endsWith('ies')) terms.add(term.slice(0, -1));
  }

  for (const alias of ALIASES[slug] ?? []) terms.add(alias);

  return [...terms];
}

/** A term matches only on slug-segment boundaries, so "dentists" misses "cosmetic-dentists-guide". */
const matches = (postId: string, term: string) =>
  new RegExp(`(^|-)${term}(-|$)`).test(postId);

/**
 * The vertical a post belongs to, or null. When several verticals match, the
 * longest term wins — the specific vertical beats the general one.
 */
export function verticalForPost<T extends VerticalLike>(postId: string, verticals: T[]): T | null {
  let best: T | null = null;
  let bestLength = 0;

  for (const vertical of verticals) {
    for (const term of matchTerms(vertical.slug)) {
      if (matches(postId, term) && term.length > bestLength) {
        best = vertical;
        bestLength = term.length;
      }
    }
  }

  return best;
}

/**
 * Every post belonging to a vertical, newest first. Takes the already-sorted
 * collection so ordering stays defined in one place (src/lib/blog).
 */
export function postsForVertical<P extends { id: string }, T extends VerticalLike>(
  vertical: T,
  sortedPosts: P[],
  verticals: T[],
): P[] {
  return sortedPosts.filter((post) => verticalForPost(post.id, verticals)?.slug === vertical.slug);
}
