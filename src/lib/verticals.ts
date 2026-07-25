// Helpers for the per-vertical AI tracking landing pages. The verticals
// themselves live in src/data/verticals — one copy file each, re-exported by
// that folder's index.js — so this module stays the single place the public
// title and URL formats are defined.

/** The title format applied to every AI tracking page. */
export const aiTrackingTitle = (name: string) =>
  `AI Tracking For ${name} 2026 | See Your Ranking In ChatGPT, AI Overviews, And More | Be Found Everywhere`;

/** The page segment under /<slug>/ — the vertical repeats by design. */
export const aiTrackingSlug = (slug: string) => `ai-tracking-${slug}`;

/** bfeai.com/<slug>/ai-tracking-<slug> */
export const aiTrackingPath = (slug: string) => `/${slug}/${aiTrackingSlug(slug)}`;
