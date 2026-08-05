# AI SEO Trade Landing Pages

**Applies to:** every page at `/<trade>/` — 36 of them
**Owner:** Kyle / Amazing Rankings
**Last updated:** July 2026

Read this before changing anything on the page. Most of what looks like arbitrary
layout is a conversion decision with a reason behind it. The reasons are written
down here so you can override them deliberately instead of accidentally.

---

## 0. Where the code lives

These arrived as 36 standalone HTML files generated from a tokenized template by
a Node script. That generator is gone; Astro does the same job on every build.
Nothing about the page's structure or copy changed in the move.

| Then | Now |
|---|---|
| `data/trades-1..4.json` | `src/data/trades/*.json`, re-exported by `index.js` |
| `scripts/generate.js` → `fields()` | `src/lib/trade-fields.js` → `tradeFields()` |
| `templates/trade-template.html` | `src/components/AiSeoTradePage.astro` |
| `ai-seo-for-<slug>.html` × 36 | `src/pages/[trade].astro` |
| `img/` | `public/images/ai-seo-trades/` |

**The URL shortened after import.** Pages shipped at `/ai-seo-for-<trade>/`
first, then moved to the bare `/<trade>/` once it was confirmed that's what
`src/lib/ai-tracking-verticals.ts` calls the "vertical" page type — reserved
at that root since before this page existed, never built until now. See that
file's header comment for how `/<trade>/` and `/<trade>/ai-tracking-<trade>/`
coexist without either shadowing the other.

**Adding or changing a trade is still one object in a JSON file.** The sentences
are composed in `trade-fields.js`, so a trade only supplies what is genuinely
different about it and can override any composed line with the matching optional
field. There is no regenerate step and no rendered HTML to commit — `astro build`
produces the pages, and both sitemaps pick them up automatically.

Three things changed on import, all of them deliberate:

1. **The build-notes block is gone.** It was handoff scaffolding, never part of
   the page. Its open items are preserved in §7 below.
2. **Missing screenshots resolve at build time**, not in the browser. The old
   page shipped a script that swapped in a placeholder when an image 404'd;
   `src/pages/[trade].astro` now reads the capture folder during the build and
   renders the placeholder directly. Drop a capture in and it appears — same
   property, no client-side JS, no layout shift.
3. **The pricing and sign-in links point at the real destinations.** The handoff
   used `/signup/?plan=lite` and `/signin/`, neither of which exists on this
   site. They now use the Stripe checkout URLs and accounts host from
   `src/lib/data.js`.

Nav and footer are both the site's own shared `<Header />` and `<Footer />`,
same as every other page — neither was true originally; see §3.1 (Nav) and
§3.1 (Footer) for why that changed and how the two stylesheets avoid
colliding. `TradeLanding.astro` also carries what `Base.astro` would
otherwise supply invisibly: the Meta Pixel, canonical URL, OG tags, favicon.

---

## 1. What this page is

| | |
|---|---|
| **Product** | BFE (bfeai.com) — AI visibility SaaS |
| **Audience** | Owner or GM of a home-services contractor, 1–20 trucks. Not a marketer. Skeptical of agencies. Skims. |
| **Traffic** | Organic + paid, cold. Target query family: "AI SEO for [trade]", "get my business in ChatGPT", "AI search for contractors" |
| **Primary conversion** | Free AI visibility scan (`/scan/`) — no card |
| **Secondary conversion** | $1 / 7-day trial → $49/mo |
| **Page count** | 1 template × 36 trades (see §6) |

**Why two conversion actions and not one.** Cold contractor traffic converts to a
paid trial at low single digits. The free scan captures the other 90%+, and it
demonstrates the product while doing it — the scan result *is* the sales argument.
If `/scan/` isn't live, swap the CTA order and this page still functions; it just
converts worse.

---

## 2. Load-bearing rules

Change these only with a specific reason, and expect conversion impact.

1. **Five in-flow CTA positions minimum.** Hero, after the AI Overview proof,
   after the four-step process, after the comparison table, and the final band —
   plus pricing and the sticky mobile bar. The v1 page had CTAs only in the hero
   and at pricing, leaving ~2,000 words of scroll with no way to act. Anyone
   persuaded in the middle of the page had nowhere to go.
2. **The offer string is fixed.** `7 days for $1, then $49/mo. Cancel anytime.`
   Appears under every CTA, with the tier price substituted on the Plus and Max
   cards. v1 described the same offer four different ways and never disclosed
   what happens on day 8, which reads as a trap at the exact moment of decision.
3. **The keyword line lives inside the `<h1>`.** `<span class="h1-kw">` is the
   first text node of the H1. Do not promote it to its own `<div>`, `<p>`, or
   eyebrow element — that removes the exact-match phrase from the H1 entirely.
   Restyle it freely; don't move it out.
4. **No fabricated proof.** No placeholder testimonials, no invented client
   names, no stats you can't defend. A visitor who catches one fake element
   discounts everything above it. The testimonial section is deliberately absent
   rather than mocked up (see §7).
5. **Screenshots stay dated and captioned.** `ChatGPT · July 2026` and the exact
   query. Undated screenshots invite "that's staged" and "that's old" — dating
   them pre-empts both and makes refreshing them a scheduled task, not a debate.
6. **No outbound links between the hero and pricing.** Everything above pricing
   either converts or continues down the page. v1 had 23 exits and one entrance.
   **The shared `<Header />` is a deliberate exception**, not an oversight — it
   sits above the hero, not between hero and pricing, and it replaced a custom
   nav that carried nearly the same link list anyway. See §3.1 (Nav).
7. **Long-form content sits below the final CTA.** Buyers see the offer first;
   the SEO body serves crawlers and the minority who read to the end. Do not
   move it above pricing "so people read it" — they don't.
8. **Section order is the argument.** See §3.0. Sections can be rewritten
   freely; reordering them changes what the reader knows at each step. Proof
   before problem, mechanism before comparison, relief after discomfort.

---

## 3. Section-by-section

### 3.0 The argument the page makes

The page is one continuous argument, and the section order is the order of that
argument. Before moving any section, check what it's doing in this sequence.

| # | Section | Move in the argument | Reader's state on exit |
|---|---|---|---|
| 1 | Hero | *Here is a claim, and here is proof of it in the same viewport* | "Huh. That's real." |
| 2 | Engine strip | *This isn't one chatbot, it's the whole category* | Scope understood |
| 3 | AI Overview | *And it's on Google, which you already believe in* | Last "not my customers" objection gone |
| 4 | Problem | *This is costing you specific money right now* | Motivated, uncomfortable |
| 5 | How it works | *Here is what would actually happen* | Relief — it's concrete and small |
| 6 | What you get | *Here's that mechanism as outcomes* | Can picture the result |
| 7 | Capabilities | *Here's the substance behind it* | Evaluator's specifics satisfied |
| 8 | Comparison | *The rules changed; here's the new game* | Reframed — old SEO is incomplete, not wrong |
| 8b | Why now | *And the window is open right now* | Urgency — reason not to defer |
| 9 | Pricing | *The commitment is a dollar* | Risk assessed as near-zero |
| 10 | FAQ | *Your remaining objections, answered* | Blockers cleared |
| 11 | Final CTA | *Act* | — |
| 12 | Long-form | Crawlers + the 5% who read everything | — |

Three properties of this sequence matter more than the individual slots:

**Proof precedes problem.** Sections 1–3 establish that AI answers name
contractors *before* section 4 claims it's costing money. Reversed, the problem
section reads as vendor fear-mongering. This is the single most important
ordering decision on the page, and it's why both screenshots sit up top rather
than being spread through for visual variety.

**Mechanism precedes evaluation.** Section 5 answers "what would I actually do"
before section 8 asks "is this better than my agency." Nobody can judge a
comparison table for a product they can't picture. In v1 this was inverted and
the comparison table was doing its work on a reader who had no model of the
product yet.

**Discomfort is followed immediately by relief.** Section 4 is the only
fear-framed block, and section 5 lands right behind it with something small and
concrete to do. v1 ran three fear beats in a row and then made the reader scroll
through four more sections before offering any action — motivation generated
there had nowhere to go and dissipated.

**Practical rule:** you can rewrite any section freely. If you want to *reorder*
one, find its row above and name what happens to the reader's state when it
arrives somewhere else. If you can't, don't move it.

---

### 3.1 Reference: per section

Each entry: what the section is for, what you can freely change, what you can't.

### Nav
**Job:** stay out of the way; provide one persistent conversion path.
**It's the site's own shared `<Header />` now** — it wasn't originally. The
handoff's custom nav existed to enforce "the nav CTA is the only navigation
element pointing at conversion," and that CTA read "Start for $1" linking to
`#pricing`. The real `<Header />` carries almost the identical link list
(Keyword Agent, LABs, Off-Page Agent, Pricing, Contact — plus Blog, which the
custom nav dropped) but its button reads "Sign In," not a trial CTA. That's
the one thing this swap actually costs: the $1-trial CTA disappears from the
single highest-traffic position on the page. It's still on the page seven
more times — hero, pricing cards, sticky mobile bar — so this isn't losing the
CTA, just its nav placement. Decided this was worth it for site-wide chrome
consistency; revisit if nav-position CTA data ever says otherwise.
**Genuine improvement, not just parity:** the custom nav's mobile behavior was
`display:none` on its link list below 980px with no menu button at all — those
links were simply unreachable on mobile. `<Header />`'s hamburger menu means
mobile visitors can now actually reach them.
**Careful:** `<Header />` depends on `global.css` the same way `<Footer />`
does — see the Footer entry below for the utility-class collision it shares.

### Footer
**Job:** carry the site's normal footer content — it isn't part of this
page's conversion argument, and it's below every in-flow CTA already.
**Not the same rule as Nav** — or rather, it wasn't, before Nav became the
shared `<Header />` too. The single-navigation-element rule was originally
scoped to the hero-through-pricing span; the footer was never in that span
even before either component changed. The page originally shipped a
hand-built footer distinct from the rest of the site's `<Footer />` because it
arrived as standalone HTML with no shared component to reuse; that was fixed
once these became routed Astro pages, and now every page — this one included —
renders the identical `<Footer />` component. Verify that with a diff, not a
screenshot compare, if you ever need to check it hasn't drifted.
**The one thing that doesn't come from `<Footer />`:** the "AI SEO by trade"
cross-links between all 36 pages, kept as `AiSeoTradePage.astro`'s own small
section immediately above the shared footer.
**Careful:** both `<Header />` and `<Footer />` depend on `global.css` for
their CSS custom properties and `.container`/`.btn`/`.card`/`.eyebrow`
utility classes. This component defines its own `.btn`/`.card`/`.eyebrow`
with different values (pill buttons vs. 10px-radius buttons, 14px card radius
vs. shadowed cards) — those are scoped under the `.ai-seo-page` wrapper
around this component's own markup precisely so they win by specificity
inside the page without touching how the same class names render inside
`<Header />` / `<Footer />`, which sit outside that wrapper.
**The specificity trap this already caused once:** `.ai-seo-page a{color:...}`
is a class-plus-element selector, specificity `(0,1,1)`. A single-class rule
like `.btn-p{color:#fff}` is only `(0,1,0)` — lower — so without also scoping
`.btn-p` under `.ai-seo-page`, the base link-color rule silently wins on every
CTA rendered as an `<a>`, regardless of source order. That exact bug shipped
once (barely-visible purple-on-purple button text) and was only caught by
checking computed style, not by looking at a screenshot. If you add a new bare
element or utility-class rule to this component's `<style is:global>` block:
scope it under `.ai-seo-page`, check whether anything else in this file
targets the same element with a single class, and bump that too if so.

### Hero
**Job:** State the promise, prove it's real, and offer two ways in — all above
the fold.
**Why the screenshot replaced the dashboard mockup:** the headline claims AI
names contractors. A product screenshot asks the visitor to take that on faith;
the ChatGPT screenshot shows four competitors with phone numbers. On cold
traffic, proving the problem beats showing the interface.
**Free to change:** the three tick bullets, subhead wording.
**Careful:** H1 structure (§2.3), CTA order, the "no card, 60 seconds" line —
that line is doing friction-reduction work, not decoration.

### Engine strip
**Job:** Name the six engines. Replaces v1's "6 engines" stat, which was
unverifiable and forgettable, and the ABC/CBS/FOX/NBC badge, which is a
widely-recognized paid-syndication mark and was carrying the page's entire
social-proof load by itself.
**Free to change:** add the media badge back if you want it — but below the fold.

### AI Overview proof
**Job:** Close the "nobody uses ChatGPT to find a contractor" objection.
**Why it's a separate section and why it's second:** the two screenshots do
different jobs. ChatGPT makes the claim. Google makes it undeniable to someone
who has never opened ChatGPT. Order matters — lead with the claim, land the
proof. This section replaced v1's "video walkthrough — coming soon" placeholder,
which occupied the same prime position and actively cost trust.
**Free to change:** headline, body copy.
**Careful:** don't crop the screenshot into a tidy card. The AI Overview *and*
the map pack beneath it both need to be visible — the map pack supports the
"you're losing the suburbs" argument two sections later.
**The numbered markers are the point.** Marker 1 (`#6a2f9e`) on the AI answer,
marker 2 (`#1c78b8`) on the map pack, joined by a connector spine in the left
gutter so they read as one system rather than two callouts. The capture is
cropped to the AI Overview plus the first two business listings so both zones
stay legible at 375px in a single frame — don't restore the full-height
portrait, and don't drop the map pack to save space.

### Problem (dark)
**Job:** Make the cost of inaction concrete.
**Why two cards, not three:** v1 ran three consecutive loss-framing beats.
Past the second, fear stops persuading and starts fatiguing. The peak-season
point folded into the intro line.
**Free to change:** card copy, seasonal framing per trade.
**Careful:** don't add a third card back without cutting something else.

### How it works (four steps)
**Job:** Show the mechanism before asking for a comparison judgment.
**Why it moved up four positions:** v1 had this at position 10, after the
comparison table and two prose explainers. Contractors won't evaluate
"agency vs. BFE" until they understand what BFE actually does. Numbered markers
are appropriate here because this is a genuine sequence.
**Free to change:** all step copy.
**Careful:** keep it to four. Five steps reads like work.

### What you get
**Job:** Translate mechanism into outcomes. Headline is `Get Named. Get Found.
Get Called.` — v1's `Three Outcomes, One Subscription` was structural, not
persuasive.
**Free to change:** everything, within the three-outcome frame.

### Capabilities (four cards)
**Job:** Product substance for the evaluator who wants specifics.
**Why the links changed:** v1 put four outbound links to `/labs/`,
`/keyword-agent/` and `/off-page-agent/` at the exact point interest peaks.
They're now one quiet line beneath the cards.
**Careful:** don't re-link the individual cards.

### Comparison table
**Job:** Reframe the category, not the vendor. Compares *eras* — blue-link SEO
vs. AI search — rather than BFE vs. an agency.
**Why the left column is "Blue-link SEO" and not "Traditional SEO":** the right
column credits reviews, licensing and Google Business Profile, which are local
SEO signals. Calling the left column "Traditional SEO" implied local SEO is
obsolete and contradicted the page's own argument that local signals feed AI
answers. "Blue-link SEO" names the thing that actually is obsolete: optimizing
to win a click on a page of ten results. Change the header and all seven
`.cmp-lbl` mobile labels together.
**Why it changed from agency-vs-BFE:** three problems. Most visitors to this
page aren't paying an agency, so half the table compared two things they weren't
choosing between. Comparing a $49 product to a $2,500 retainer invites "you get
what you pay for." And it implied *switch agencies*, a far bigger ask than the
page's actual primary CTA. The era framing works on both segments at once, makes
existing SEO spend *incomplete* rather than *wasted* (nobody has to admit they
were wrong), and sidesteps price anchoring entirely.
**The last row is load-bearing.** "Who's competing for it: almost nobody in your
trade — yet" is the page's only opportunity-window argument. True now, won't be
in eighteen months.
**Free to change:** row wording, row order, the tie-off line beneath.
**Careful:** the tie-off line ("BFE is built entirely for the right-hand
column") is what connects the table to the product. Without it the table is a
neutral explainer that sells nothing.
**Mobile:** stacks into cards via `.cmp-lbl`. Test any row changes at 375px.

### Why-now band
**Job:** Supply urgency. Sits directly beneath the comparison table because a
comparison table structurally *cannot* create urgency — it puts the reader in
calm-deliberation mode, which is the opposite of acting now. This was diagnosed
only after four table rewrites failed to fix a problem the table was never
capable of fixing.
**Three beats, all factually defensible:** an answer names three or four
contractors and there is no page two; the slots are open now and won't be;
citations take a season, so July calls are won in spring.
**Careful:** no countdown timers, no "only 5 spots left in your city." This
audience detects manufactured scarcity instantly and it would undo the
credibility the screenshots buy. Every urgency claim here is a real property of
the channel.
**Removable:** delimited by `<!-- ── why now ── -->` comments. Delete the block
cleanly if testing without it.

### Pricing
**Job:** Make tier choice obvious and the commitment feel small.
**Why credits are translated:** `500 / 1,700 / 5,500 credits` means nothing to
an HVAC owner. Every tier now maps credits to coverage ("about one city fully
built out"). **These numbers are illustrative — replace with real math.**
**Why price-lock is on all three tiers:** v1 offered it on Plus and Max only,
which quietly penalized the entry point most people test first.
**Careful:** the per-tier fineprint. Each card discloses its own renewal price.

### FAQ
**Job:** Clear the objections that block a trial start.
**Why it opens with "Do homeowners really use AI to find contractors?"** — that's
the load-bearing skepticism for this audience and v1 never addressed it. The
answer deliberately tells the reader to go run the query themselves. Inviting
verification is stronger than asserting.
**Three others were added:** what happens after 7 days, whether to fire the
current agency, and how much time this takes monthly.
**Free to change:** add questions freely; sales calls are the best source.
**Careful:** keep the first one first, and keep it `open` by default.

### Final CTA / long-form / trade links
**Job:** Last conversion chance; then SEO body; then internal linking.
**Long-form is capped at 70ch single column** — v1 ran it in a two-column grid
where reading order was ambiguous.
**Trade links moved out of a mid-page card row** into their own section
directly above the footer — originally the footer itself, moved out of it
once the footer became the site's shared `<Footer />` (§3.1 Footer).

---

## 4. Copy rules

- **Reading level: 7th–8th grade.** Short sentences. Periods over em-dashes.
- **US spelling.** v1 shipped "neighbouring" and "realise."
- **Banned words**, with the translation to use instead:

  | Don't write | Write |
  |---|---|
  | silo | pages for every service in every town you cover |
  | schema / structured data | the code Google needs to place you on the map |
  | off-page / link equity | authority, credibility |
  | authority signals | the things that make Google trust you |
  | leverage, utilize, solutions | use, do the specific thing |

- **Say the number.** "Five-figure ticket" beats "high-value job."
- **Never promise done-for-you.** The product is self-serve. The line is
  *"You approve; the agents write and publish."* Overpromising here drives
  refunds and churn, not signups.
- **De-emphasize link-building mechanics.** "Tiered links on Google's own
  properties" is the one claim a semi-informed buyer flags as spam. Lead with
  the safety framing. v1's "siphoning power straight from Google" was deleted;
  don't reintroduce that register.
- **Claims policy:** if you can't defend it to a customer on the phone, it
  doesn't ship. Applies especially to competitor pricing and timelines.

---

## 5. Editing without breaking things

Pre-publish checklist:

- [ ] Five in-flow CTAs still present
- [ ] Offer fineprint under every CTA, correct price per tier
- [ ] Keyword still the first text node inside `<h1>`; exactly one `<h1>`
- [ ] No placeholder text anywhere; build-notes block removed
- [ ] Screenshots current, dated, with correct alt text
- [ ] Comparison table stacks at 375px
- [ ] Every claim defensible
- [ ] Analytics events on all CTAs, distinguishable by position

**If you're using Claude Design or Claude Code to regenerate:** visual tools
tidy away the plain parts. The repeated fineprint, the missing testimonial, and
the full-width uncropped screenshot all look like oversights and are not. Check
the CTA count and the day-8 disclosure after every major regeneration.

---

## 6. Trade variants

All 36 trades ship from this template. Per trade, swap:

| Variable | HVAC value |
|---|---|
| Trade name | HVAC companies |
| High-ticket job | System replacement |
| Ticket size language | Five-figure |
| Trigger question | "should I repair or replace my AC, and who should I call?" |
| Screenshot query | "who replaces air conditioners in [city]" |
| Services | AC, furnace, heat pump, emergency |
| Seasonality | Dead compressor in July |
| Trade-specific proof | License type (C-20 in CA), manufacturer certs |
| Long-form topics | SEER, refrigerant, rebates, sizing |

**Both screenshots must be re-shot per trade.** An HVAC screenshot on the
plumbing page defeats the entire purpose of using real proof.

Everything else — structure, CTA cadence, offer language, FAQ order — stays
identical across all 36.

---

## 7. Open items

1. **Credit-to-coverage math** in pricing is illustrative. Needs real numbers.
2. **`/scan/` must exist** or CTAs need swapping. Currently the primary path.
3. **Testimonial section omitted.** Slot is between the comparison table and
   pricing. Needs: name, company, city, and a photo or logo. A quote containing
   a specific number ("three replacement jobs in August we'd never have seen")
   outperforms a general one. Do not ship unattributed.
4. **Schema not yet added:** FAQPage on the accordion, Service, LocalBusiness.
5. **OG/Twitter image** — use the ChatGPT screenshot. `TradeLanding.astro` sets
   `og:title`, `og:description` and `og:type` but no image.
6. **Analytics events on CTAs**, distinguishable by position, so the five
   in-flow slots can be told apart. Not wired.
7. ~~**Eight trades still need screenshots.**~~ Done Aug 2026 — all 36 trades
   now have both captures.
8. ~~**Screenshot annotations** still in red marker. Redraw in `#6a2f9e`.~~ Done Jul 2026 — annotations recolored to `#6a2f9e` in `img/*_purple.png`; original red JPGs retained as source.

Items 1–6 were carried over from the handoff's build-notes block, which was
removed from the page itself on import. Nothing on the page depends on them, and
none of them block publishing — but 1 in particular ships illustrative numbers.

---

## 9. Screenshots

Two captures per trade, both required, both trade-specific. An HVAC screenshot on
the plumbing page defeats the entire purpose of using real proof.

Files go in `public/images/ai-seo-trades/` named `<slug>-chatgpt.png` and
`<slug>-ai-overview.png`. HVAC is the exception — it was the hand-built master
and keeps `get_seen_here_chatgpt_purple.png` / `get_seen_ai_overviews_marked.png`,
mapped in `src/lib/trade-fields.js`.

**All 36 trades have both captures.** Nothing needs updating when you replace
or re-shoot one — the build reads the folder, so a trade with a placeholder
would render the placeholder automatically if its files were ever removed.

**How to shoot each one**

1. Clean browser profile, logged out, location set to the city named in the
   query. Keep one real city per trade.
2. **Capture A — ChatGPT.** Ask the query with a question mark. Screenshot the
   full answer including the named businesses, addresses and phone numbers.
3. **Capture B — Google.** Search the same query without the question mark.
   Screenshot the AI Overview **and** the map pack with at least two listings.
4. Annotate as a numbered pair: purple box + marker 1 (`#6a2f9e`) on the AI
   answer, blue box + marker 2 (`#1c78b8`) on the map pack, connector spine in
   the left gutter, cropped so both zones stay legible at 375px.
5. If the answer you capture uses a different query than the one in the trade's
   data, update the page's query, hero line and captions to match the capture —
   not the other way round (§2.5). A trade whose Google capture used a different
   search sets `q2`, which owns the AI Overview section only.
6. Update the `· July 2026` caption if you shoot in a later month.

---

## 8. What to test first

The structure is reasoned, not proven. In rough order of expected information
gain:

1. **Free scan vs. $1 trial as the hero primary.** The single biggest assumption
   on the page.
2. **H1 split treatment vs. single-line colon version.** Keyword placement is
   held constant; only the type treatment varies.
3. **Screenshot in hero vs. product dashboard.** Tests whether proving the
   problem really beats showing the product for this audience.
4. **Why-now band present vs. absent.** Isolates whether urgency framing
   converts, now that it exists to test.
5. **Testimonial present vs. absent**, once a real one exists.
6. **Pricing above vs. below the FAQ.**

Run these one at a time. Log results here.

---

## Dosage rule — the AI-and-maps connection

The "same signals feed both" argument appears in exactly three places: the
bridge line under the AI Overview screenshot, the lede under **Get Named. Get
Found. Get Called.**, and the tie-off line under the comparison table. Three
lands as a thesis. More reads as defensive.

---

## Change log

| Date | Change | Why |
|---|---|---|
| Jul 2026 | v2 rebuild from v1 | CRO restructure: CTA cadence, real proof, placeholder removal, mobile, copy pass |
| Jul 2026 | Keyword moved into `<h1>` as overline span | Keyword-first for SEO without burying the promise |
| Jul 2026 | Comparison table → era framing (traditional SEO vs AI search) | Agency framing mismatched most visitors, invited price objection, and implied too big an ask |
| Jul 2026 | Added why-now band under comparison | Page had zero urgency; comparison tables can't supply it |
| Jul 2026 | Screenshot annotations recolored red → `#6a2f9e` | Brand consistency; §7.6. Page content inside both screenshots left byte-identical |
| Jul 2026 | AI Overview screenshot re-annotated as numbered pair (1 = AI answer, 2 = map pack) and cropped to ~1280×976 | The two zones are one system, not two callouts; portrait crop left both zones illegible at 375px |
| Jul 2026 | Comparison left column "Traditional SEO" → "Blue-link SEO" | Old label implied local SEO is obsolete, contradicting the page's argument that local signals feed AI answers |
| Jul 2026 | Added lede under "Get Named. Get Found. Get Called." | The three outcomes read as three products instead of one input with three outputs |
| Jul 2026 | Problem card 2 tied back to card 1 with one clause | The two cards made separate points with nothing connecting them |
