// Helpers for the AI tracking vertical pages.
//
// Two page types share the /<slug>/ namespace, and the internal names for them
// are:
//
//   vertical              the industry page directly off the root domain,
//                         /<slug>/. None are built today — /roofers/ 404s.
//   ai tracking vertical  /<slug>/ai-tracking-<slug>/, the pages this module
//                         serves. All 36 of them exist.
//
// "Vertical" on its own still refers to the industry itself elsewhere in the
// codebase — the [vertical] route param and the records in src/data/verticals.
// Those records live one copy file each, re-exported by that folder's index.js,
// so this module stays the single place the public title and URL formats for AI
// tracking verticals are defined.

/** The title format applied to every AI tracking vertical page. */
export const aiTrackingVerticalTitle = (name: string) =>
  `AI Tracking For ${name} 2026 | See Your Ranking In ChatGPT, AI Overviews, And More | Be Found Everywhere`;

/**
 * The H1 format: the target phrase leads, then the vertical's own headline.
 * Kept here rather than baked into the 36 copy files so the phrase stays
 * identical on every page and can be reworded in one place.
 */
export const aiTrackingVerticalH1 = (name: string, headline: string) =>
  `AI Tracking For ${name}: ${headline}`;

/** The page segment under /<slug>/ — the vertical repeats by design. */
export const aiTrackingVerticalSlug = (slug: string) => `ai-tracking-${slug}`;

/** bfeai.com/<slug>/ai-tracking-<slug> */
export const aiTrackingVerticalPath = (slug: string) =>
  `/${slug}/${aiTrackingVerticalSlug(slug)}`;
