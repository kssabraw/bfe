// The 36 "AI SEO for [trade]" landing pages are generated from these records,
// the same way the AI tracking verticals are generated from src/data/verticals.
//
// Each entry carries only short fields — trade name, query, scenario, ticket
// size, services, seasonality, long-form topics. The sentences are composed in
// src/lib/trade-fields.js, so wording that repeats across all 36 pages is
// written once there rather than 36 times here.
//
// Adding a trade is one object in any of these files. Splitting them four ways
// is inherited from the handoff bundle and kept so the diffs stay reviewable.
import trades1 from './trades-1.json';
import trades2 from './trades-2.json';
import trades3 from './trades-3.json';
import trades4 from './trades-4.json';

export const trades = [...trades1, ...trades2, ...trades3, ...trades4];
