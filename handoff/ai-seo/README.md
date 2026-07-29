# BFE AI — "AI SEO for [trade]" landing pages

36 trade landing pages for bfeai.com, all generated from one template.
Static HTML + Google Fonts. No build step, no dependencies, no JS framework.

> **How this ships in this repo.** `npm run build:ai-seo` reads `pages/` and
> writes `public/ai-seo-for-<slug>/index.html`, applying the "Before publishing"
> steps below automatically. Do not hand-edit anything under `public/ai-seo-for-*`
> — it is generated and will be overwritten. See the "In this repo" section at
> the bottom for what the script changes and what is still outstanding.

## Contents

```
index.html                     build index — links all 36 pages (do NOT deploy)
pages/ai-seo-for-<slug>.html   the 36 trade pages
ai-seo-hvac-v2.html            hand-edited HVAC master (source of the template)
templates/trade-template.html  tokenized template ({{TOKEN}} placeholders)
data/trades-1..4.json          per-trade copy data (36 entries total)
img/                           screenshots
CLAUDE.md                      why the page is built this way — READ FIRST
```

## Deploy

Each page ships at its own URL off the root domain:

```
ai-seo-for-hvac-companies.html  →  /ai-seo-for-hvac-companies/
ai-seo-for-plumbers.html        →  /ai-seo-for-plumbers/
…
```

Footer trade links already use those production URLs. `index.html` is a build aid —
do not publish it.

## Before publishing — per page

1. **Remove the build-notes block.** Last `<section class="notes">` before
   `</body>`. Every page has one. It also lists what still needs confirming.
2. **Remove the screenshot-pending script.** The `<script>` before `</body>`
   only exists to show a placeholder while captures are missing.
3. **Drop in the two screenshots.** Only HVAC has real ones. Every other page
   expects:
   - `img/<slug>-chatgpt.png` — ChatGPT answering the page's query
   - `img/<slug>-ai-overview.png` — the Google AI Overview + map pack, annotated
     as a numbered pair (marker 1 `#6a2f9e` on the AI answer, marker 2 `#1c78b8`
     on the map pack), cropped so both zones read at 375px
   The page's own placeholder panel names the exact filename and query.
4. **Fix the credit-to-coverage math** in pricing — currently illustrative.
5. **Add schema**: FAQPage on the accordion, Service, LocalBusiness. Not done.
6. **Add analytics events** on every CTA, distinguishable by position.

## Regenerating / adding a trade

Pages are generated, not hand-maintained. To add or change one, edit
`data/trades-*.json` and re-run the generator (see `CLAUDE.md` §6 for the
per-trade variable list). Each JSON entry supplies short fields — trade name,
query, scenario, ticket size, services, seasonality, long-form topics — and the
generator composes the sentences. `local: 0` switches a trade to
practice/patient language (dentists, cosmetic dentists, chiropractors, PI
lawyers) instead of company/homeowner/trucks.

If you edit a page by hand instead, mirror the change back into the template or
the next regeneration will overwrite it.

## Load-bearing rules (full detail in CLAUDE.md)

- Every in-flow CTA is **"Start for $1"** → `#pricing`. Five positions minimum:
  hero, after the AI Overview proof, after the four steps, after the comparison
  table, the final band — plus pricing cards and the sticky mobile bar.
- The offer string is fixed: `7 days for $1, then $49/mo. Cancel anytime.`
  Under every CTA, with the tier price substituted on Plus and Max.
- The keyword phrase lives **inside the `<h1>`** as `<span class="h1-kw">`, first
  text node. Don't promote it to its own element.
- No fabricated proof. The testimonial section is deliberately absent, not
  forgotten.
- Screenshots stay dated and captioned with the exact query.
- Section order is the argument — see CLAUDE.md §3.0 before reordering anything.
- Long-form content stays below the final CTA.
- The "AI answers and the map pack share signals" argument appears in exactly
  three places. Don't add a fourth.

## Mobile

Single stylesheet, breakpoints at 980px and 680px. The comparison table stacks
into cards via `.cmp-lbl` labels — test any row change at 375px. Sticky CTA bar
appears below 680px.

---

## In this repo

The pages are static HTML with their own stylesheet, so they do not use the
Astro layout. They ship through `public/`, written by
`scripts/build-ai-seo-pages.mjs` (`npm run build:ai-seo`). Re-run it after
regenerating a page or adding a screenshot, and commit the result.

What the script does on top of the raw handoff files:

| Step | Why |
|---|---|
| Strips the build-notes block | Internal; §"Before publishing" step 1 |
| `img/…` → `/ai-seo/img/…` | One shared image folder instead of 36 copies |
| `/signin/` → `accounts.bfeai.com`, `/signup/?plan=<tier>` → Stripe checkout | Neither route exists on this site; the CTAs would 404 |
| Adds `noindex, follow` to pages missing screenshots | Keeps unfinished pages out of search |
| Swaps the screenshot-pending script for a fixed one | The original only listened for `error`, which never fires when the image failed before the script ran, so the panel never appeared |
| Drops that script on complete pages | §"Before publishing" step 2 |

A page counts as complete when both of its captures exist in
`public/ai-seo/img/`. Complete pages lose the noindex tag and enter the XML
sitemap; the list lives in the generated `src/data/ai-seo-pages.js`, which also
feeds the HTML sitemap at `/sitemap/`.

### Publishing a trade

1. Save the two captures as `public/ai-seo/img/<slug>-chatgpt.png` and
   `public/ai-seo/img/<slug>-ai-overview.png`. Each page's placeholder panel
   names its own filenames and the exact query to run.
2. `npm run build:ai-seo && npm run build`
3. Commit the regenerated page and `src/data/ai-seo-pages.js`.

### Still outstanding

Carried over from §"Before publishing" and CLAUDE.md §7 — none of these are
done: screenshots for 35 of the 36 trades, the credit-to-coverage math in
pricing, FAQPage/Service/LocalBusiness schema, OG/Twitter images, analytics
events on the CTAs, and canonical tags.
