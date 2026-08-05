/**
 * Composes the copy for one "AI SEO for [trade]" landing page from a short
 * trade record in src/data/trades.
 *
 * Ported from the handoff bundle's scripts/generate.js, which rendered these
 * pages as standalone HTML through {{TOKEN}} substitution. The composition is
 * unchanged — the same fields produce the same sentences — but the output is
 * now consumed by AiSeoTradePage.astro instead of a string replace, so the
 * pages rebuild from data on every `astro build` rather than being regenerated
 * by hand and committed.
 *
 * The point of composing here rather than writing the sentences into the data
 * files: every phrasing that repeats across all 36 pages lives in one place. A
 * trade only supplies what is genuinely different about it, and can override
 * any composed line by setting the corresponding optional field.
 *
 * Image fields return bare filenames. The base path and directory are applied
 * by the component, which is also where a missing capture is resolved — see
 * `tradeCaptures`.
 */

/** Trades whose work is bought as a case or a course of treatment, not a job. */
const TICKET_NOUN = {
  dentists: 'course of treatment',
  'cosmetic-dentists': 'case',
  chiropractors: 'care plan',
  'personal-injury-lawyers': 'case',
};

/** What "$49/mo costs less than …" compares against, per trade. */
const CHEAPER_THAN = {
  dentists: 'one no-show',
  chiropractors: 'one no-show',
  'cosmetic-dentists': 'one consultation',
  'personal-injury-lawyers': 'one intake call',
};

/**
 * HVAC was the hand-built master page and its two captures were annotated
 * before the per-trade naming convention existed, so it keeps its own
 * filenames. Every other trade uses <slug>-chatgpt.png / <slug>-ai-overview.png.
 */
const HERO_IMG = { 'hvac-companies': 'get_seen_here_chatgpt_purple.png' };
const AIO_IMG = { 'hvac-companies': 'get_seen_ai_overviews_marked.png' };

const REQUIRED = [
  's', 'n', 'nl', 'sites', 'own', 'pro', 'pros', 'biz', 'bizpl', 'cust', 'custs',
  'cat', 'q', 'p2unit', 'svc', 'payh', 'payq', 'jobword', 'lfexpose', 'creds',
  'siloex', 'topics', 'lft', 'tkt', 'cheap', 'dec', 'p1h', 'lfu',
];

const cap = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase());
const article = (w) => (/^[aeiou]/i.test(w) ? 'an' : 'a');

/** '/roofers/' — the URL each page ships at. */
export const tradePath = (slug) => `/${slug}/`;

/** Footer link text: "Garage Door Repair Companies" -> "Garage Door Repair". */
export const tradeLabel = (name) => name.replace(/ Companies$/, '');

/**
 * The two screenshot filenames a trade expects, and whether each one exists.
 *
 * A trade with no capture yet renders a server-side placeholder naming the file
 * it needs (see AiSeoTradePage.astro). The handoff bundle did this in the
 * browser, by listening for the img error event — that had to go with the
 * build-notes block, and doing it at build time is better anyway: no layout
 * shift, and nothing ships that depends on an image 404 to look right.
 */
export function tradeCaptures(trade, available) {
  const chat = HERO_IMG[trade.s] || `${trade.s}-chatgpt.png`;
  const aio = AIO_IMG[trade.s] || `${trade.s}-ai-overview.png`;
  return {
    chat: { file: chat, exists: available.has(chat) },
    aio: { file: aio, exists: available.has(aio) },
  };
}

export function tradeFields(t) {
  const missing = REQUIRED.filter((k) => t[k] === undefined || t[k] === '');
  if (missing.length) {
    throw new Error(
      `trade "${t.s || '(no slug)'}" is missing required field(s): ${missing.join(', ')}`,
    );
  }

  const L = t.local;
  const named = t.named || 'four';

  // Verbatim queries are only safe in captions and alt text. Prose slots (meta
  // description, the "go check it yourself" FAQ) need a grammatical "who …"
  // clause, so a trade whose real query isn't one supplies `qphrase`.
  const QP = t.qphrase || t.q;

  // The two captures don't always share a query — a trade whose Google capture
  // used a different search supplies `q2`, which owns the AI Overview section.
  const Q2 = t.q2 || t.q;

  const H1 = t.h1 || `Be the ${t.h1noun} AI Tells ${cap(t.custs)} to Call`;

  return {
    SLUG: t.s,
    NAME: t.n,
    NAMELOWER: t.nl,
    SITES: t.sites,
    OWN: t.own,
    PRO: t.pro,
    PROS: t.pros,
    BIZ: t.biz,
    BIZPL: t.bizpl,
    CUSTS: t.custs,
    CATEGORY: t.cat,
    QUERY: t.q,
    QUERY2: Q2,
    H1,
    AIOH: t.q2
      ? 'Ask Google Instead. Still Not You.'
      : "Same Question. Google's Own Answer. Still Not You.",
    STATCHEAP: CHEAPER_THAN[t.s] || 'one service call',
    TITLE: `AI SEO For ${t.n} 2026 | ${H1} | Be Found Everywhere`,
    META:
      `When ${article(t.cust)} ${t.cust} asks ChatGPT or Google ${QP}, ` +
      `${named === 'five' ? 'four or five' : named === 'three' ? 'three' : named === 'two' ? 'two or three' : 'three or four'} ` +
      `${t.pros} get named. Make sure one of them is you. AI visibility, local content and authority from $49/mo.`,
    HERO:
      t.hero ||
      `Ask ChatGPT ${t.qshort} in your town and it names ${named} ${t.pros}, with phone numbers. Make sure one of them is you.`,
    TICK1: t.t1 || `Win ${t.t1obj} AI is handing a competitor today`,
    TICK2:
      t.t2 ||
      (L
        ? `Show up in every suburb your ${t.p2unit} reach, not just your home city`
        : `Show up in every town your ${t.custs} come from, not just the one you sit in`),
    IMG_CHAT: HERO_IMG[t.s] || `${t.s}-chatgpt.png`,
    IMG_AIO: AIO_IMG[t.s] || `${t.s}-ai-overview.png`,
    ALT_CHAT: `ChatGPT answering “${t.q}” by naming ${named} local ${t.pros} with addresses and phone numbers.`,
    ALT_AIO: `Google results for “${Q2}”. Marker 1 outlines the AI Overview naming three local ${t.pros}; marker 2 outlines the Businesses map pack directly beneath it.`,
    PLEDE:
      t.plede ||
      `${t.scen}. By the time ${t.pron}'s finished asking ChatGPT who to call, ${t.pron} has three names — and you're not one of them.`,
    P1H: t.p1h,
    P1B:
      t.p1b ||
      `AI tells the ${t.cust} ${t.p1verdict}, then names the ${t.pros} who ${t.p1do}. Every answer without you in it is a ${t.tkt} ticket on someone else's board — and unlike a lost bid, you never learn it existed.`,
    P2H: t.p2h || (L ? 'You lose the suburbs you can service' : 'You lose the towns you could draw from'),
    P2B:
      t.p2b ||
      (L
        ? `Your ${t.p2unit} cover thirty miles. Your website covers one city. The neighboring towns call the ${t.pro} whose pages actually mention them by name — and those same pages are what an AI answer reads before it decides who to name.`
        : `${cap(t.custs)} will travel twenty minutes for the right ${t.biz}. Your website only talks about one city. The surrounding towns pick the ${t.pro} whose pages actually mention them by name — and those same pages are what an AI answer reads before it decides who to name.`),
    SERVICES: t.svc,
    PAYH: t.payh,
    OUT1: `When a ${t.cust} asks ChatGPT or Google ${t.dec} — and who to call — your ${t.biz} is in the answer.`,
    PAYBODY: `A ${t.cust} asking "${t.payq}" is deciding a ${t.tkt} ${TICKET_NOUN[t.s] || t.jobword} in a single response. Being the ${t.biz} named in it is worth more than any ranking report — and it costs less than ${t.cheap}.`,
    PEAK:
      t.peak ||
      `And pages take a season to earn their place. Whatever you want ringing ${t.peakwhen} gets published ${t.peakpub}.`,
    F1Q: `Do ${t.custs} really use AI to find ${t.pros}?`,
    QUERYCITY: QP.replace('anaheim', 'your city'),
    FRADQ: 'Will this help outside my main city?',
    FRADA:
      t.frada ||
      (L
        ? `That's usually where the fastest wins are. Every service gets paired with every city you cover, so you compete in the suburbs your ${t.p2unit} already reach — where the competition is thinner than it is downtown.`
        : `That's usually where the fastest wins are. Every service gets paired with every town you draw from, so you compete where ${t.custs} are actually searching — and where the competition is thinner than it is downtown.`),
    FIN: t.lft.replace(/^an? /, ''),
    LFTITLE: t.lft,
    LFH1:
      t.lfh1 ||
      (L
        ? `${t.lfh1cat} is a trade AI search hits hard`
        : `${t.lfh1cat} is a field AI search is already changing`),
    LFU: t.lfu,
    LFD:
      t.lfd ||
      `Those are exactly the questions people now hand to an assistant instead of opening ten ${t.pro} websites. The assistant answers. Then it recommends. In one response the ${t.cust} learns ${t.lfdverdict} and gets three ${t.bizpl} to phone about it.`,
    JOBWORD: t.jobword,
    LFEXPOSE: t.lfexpose,
    CREDS: t.creds,
    LFSH: L
      ? 'Why one "service area" page keeps costing you the suburbs'
      : 'Why one location page keeps costing you the surrounding towns',
    PLACE: L ? 'suburb' : 'town',
    SILOEX: t.siloex,
    TOPICS: t.topics,
    LFCLOSE:
      t.lfclose ||
      (L
        ? `It becomes the reason the phone rings ${t.peakwhen}, in every town your ${t.p2unit} can reach.`
        : `It becomes the reason the phone rings ${t.peakwhen}, in every town your ${t.custs} come from.`),
  };
}
