// Helpers for the per-vertical silo. The verticals themselves live in
// src/data/verticals — one copy file each, re-exported by that folder's
// index.js — so this module stays the single place the public title and URL
// formats are defined.
//
// Each vertical is a silo two levels deep:
//
//   /roofers/                       the vertical page — top of the silo
//   /roofers/ai-tracking-roofers/   a topic page beneath it
//
// The vertical page is the one that targets the head term ("AI SEO for
// Roofers") and links down; the AI tracking page is one topic within that
// silo, not its entry point. Keep that distinction when adding topics — a new
// page for a vertical belongs *under* /<slug>/, never in place of it.

/** The title format applied to every vertical page. */
export const verticalTitle = (name: string) =>
  `AI SEO For ${name} 2026 | Get Found In ChatGPT, AI Overviews, And Google | Be Found Everywhere`;

/** The H1 format for the top of the silo. */
export const verticalH1 = (name: string) => `AI SEO for ${name}`;

/** bfeai.com/<slug> — the top of the silo. */
export const verticalPath = (slug: string) => `/${slug}`;

/** The title format applied to every AI tracking page. */
export const aiTrackingTitle = (name: string) =>
  `AI Tracking For ${name} 2026 | See Your Ranking In ChatGPT, AI Overviews, And More | Be Found Everywhere`;

/**
 * The H1 format: the target phrase leads, then the vertical's own headline.
 * Kept here rather than baked into the 36 copy files so the phrase stays
 * identical on every page and can be reworded in one place.
 */
export const aiTrackingH1 = (name: string, headline: string) =>
  `AI Tracking For ${name}: ${headline}`;

/** The page segment under /<slug>/ — the vertical repeats by design. */
export const aiTrackingSlug = (slug: string) => `ai-tracking-${slug}`;

/** bfeai.com/<slug>/ai-tracking-<slug> */
export const aiTrackingPath = (slug: string) => `/${slug}/${aiTrackingSlug(slug)}`;
