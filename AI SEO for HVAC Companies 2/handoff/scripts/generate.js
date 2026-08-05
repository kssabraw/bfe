#!/usr/bin/env node
/**
 * Generates every ai-seo-for-<slug>.html page from the tokenized template and
 * the per-trade data files. Run from the project root:
 *
 *   node scripts/generate.js
 *
 * Inputs:  templates/trade-template.html   {{TOKEN}} placeholders
 *          data/trades-1..4.json           one object per trade
 * Outputs: ai-seo-for-<slug>.html          one per trade
 *          index.html                      build index (do not deploy)
 *
 * Adding a trade = one object in any data file, then re-run. Short fields only;
 * the sentences are composed below. Set local:0 for practices (patients,
 * "towns you draw from", practice/firm) instead of home services.
 */
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const TKT = { dentists: 'course of treatment', 'cosmetic-dentists': 'case', chiropractors: 'care plan', 'personal-injury-lawyers': 'case' };
const STAT = { dentists: 'one no-show', chiropractors: 'one no-show', 'cosmetic-dentists': 'one consultation', 'personal-injury-lawyers': 'one intake call' };
const HERO_IMG = { 'hvac-companies': 'img/get_seen_here_chatgpt_purple.png' };
const AIO_IMG = { 'hvac-companies': 'img/get_seen_ai_overviews_marked.png' };

/*<fields>*/
const REQUIRED = ['s','n','nl','sites','own','pro','pros','biz','bizpl','cust','custs','cat','q','p2unit','svc','payh','payq','jobword','lfexpose','creds','siloex','topics','lft','tkt','cheap','dec','p1h','lfu'];

function fields(t) {
  const missing = REQUIRED.filter(k => t[k] === undefined || t[k] === '');
  if (missing.length) throw new Error(`trade "${t.s || '(no slug)'}" is missing required field(s): ${missing.join(', ')}`);
  const L = t.local;
  const cap = s => s.replace(/\b\w/g, c => c.toUpperCase());
  const artic = w => /^[aeiou]/i.test(w) ? 'an' : 'a';
  const named = t.named || 'four';
  /* Verbatim queries are only safe in captions and alt text. Prose slots (meta
     description, the "go check it yourself" FAQ) need a grammatical "who …"
     clause, so a trade whose real query isn't one supplies `qphrase`. */
  const QP = t.qphrase || t.q;
  /* The two captures don't always share a query — a trade whose Google capture
     used a different search supplies `q2`, which owns the AI Overview section. */
  const Q2 = t.q2 || t.q;
  const H1 = t.h1 || `Be the ${t.h1noun} AI Tells ${cap(t.custs)} to Call`;
  const TKT = { dentists: 'course of treatment', 'cosmetic-dentists': 'case', chiropractors: 'care plan', 'personal-injury-lawyers': 'case' };
  const STAT = { dentists: 'one no-show', chiropractors: 'one no-show', 'cosmetic-dentists': 'one consultation', 'personal-injury-lawyers': 'one intake call' };
  const HERO_IMG = { 'hvac-companies': 'img/get_seen_here_chatgpt_purple.png' };
  const AIO_IMG = { 'hvac-companies': 'img/get_seen_ai_overviews_marked.png' };
  return {
    SLUG: t.s, NAME: t.n, NAMELOWER: t.nl, SITES: t.sites, OWN: t.own, PRO: t.pro, PROS: t.pros,
    BIZ: t.biz, BIZPL: t.bizpl, CUSTS: t.custs, CATEGORY: t.cat, QUERY: t.q, QUERY2: Q2, H1,
    AIOH: t.q2 ? "Ask Google Instead. Still Not You." : "Same Question. Google's Own Answer. Still Not You.",
    STATCHEAP: STAT[t.s] || 'one service call',
    TITLE: `AI SEO For ${t.n} 2026 | ${H1} | Be Found Everywhere`,
    META: `When ${artic(t.cust)} ${t.cust} asks ChatGPT or Google ${QP}, ${named === 'five' ? 'four or five' : named === 'three' ? 'three' : named === 'two' ? 'two or three' : 'three or four'} ${t.pros} get named. Make sure one of them is you. AI visibility, local content and authority from $49/mo.`,
    HERO: t.hero || `Ask ChatGPT ${t.qshort} in your town and it names ${named} ${t.pros}, with phone numbers. Make sure one of them is you.`,
    TICK1: t.t1 || `Win ${t.t1obj} AI is handing a competitor today`,
    TICK2: t.t2 || (L ? `Show up in every suburb your ${t.p2unit} reach, not just your home city`
                      : `Show up in every town your ${t.custs} come from, not just the one you sit in`),
    IMG_CHAT: HERO_IMG[t.s] || `img/${t.s}-chatgpt.png`,
    IMG_AIO: AIO_IMG[t.s] || `img/${t.s}-ai-overview.png`,
    ALT_CHAT: `ChatGPT answering “${t.q}” by naming ${named} local ${t.pros} with addresses and phone numbers.`,
    ALT_AIO: `Google results for “${Q2}”. Marker 1 outlines the AI Overview naming three local ${t.pros}; marker 2 outlines the Businesses map pack directly beneath it.`,
    PLEDE: t.plede || `${t.scen}. By the time ${t.pron}'s finished asking ChatGPT who to call, ${t.pron} has three names — and you're not one of them.`,
    P1H: t.p1h,
    P1B: t.p1b || `AI tells the ${t.cust} ${t.p1verdict}, then names the ${t.pros} who ${t.p1do}. Every answer without you in it is a ${t.tkt} ticket on someone else's board — and unlike a lost bid, you never learn it existed.`,
    P2H: t.p2h || (L ? 'You lose the suburbs you can service' : 'You lose the towns you could draw from'),
    P2B: t.p2b || (L ? `Your ${t.p2unit} cover thirty miles. Your website covers one city. The neighboring towns call the ${t.pro} whose pages actually mention them by name — and those same pages are what an AI answer reads before it decides who to name.`
                     : `${cap(t.custs)} will travel twenty minutes for the right ${t.biz}. Your website only talks about one city. The surrounding towns pick the ${t.pro} whose pages actually mention them by name — and those same pages are what an AI answer reads before it decides who to name.`),
    SERVICES: t.svc, PAYH: t.payh,
    OUT1: `When a ${t.cust} asks ChatGPT or Google ${t.dec} — and who to call — your ${t.biz} is in the answer.`,
    PAYBODY: `A ${t.cust} asking "${t.payq}" is deciding a ${t.tkt} ${TKT[t.s] || t.jobword} in a single response. Being the ${t.biz} named in it is worth more than any ranking report — and it costs less than ${t.cheap}.`,
    PEAK: t.peak || `And pages take a season to earn their place. Whatever you want ringing ${t.peakwhen} gets published ${t.peakpub}.`,
    F1Q: `Do ${t.custs} really use AI to find ${t.pros}?`,
    QUERYCITY: QP.replace('anaheim', 'your city'),
    FRADQ: 'Will this help outside my main city?',
    FRADA: t.frada || (L ? `That's usually where the fastest wins are. Every service gets paired with every city you cover, so you compete in the suburbs your ${t.p2unit} already reach — where the competition is thinner than it is downtown.`
                         : `That's usually where the fastest wins are. Every service gets paired with every town you draw from, so you compete where ${t.custs} are actually searching — and where the competition is thinner than it is downtown.`),
    FIN: t.lft.replace(/^an? /, ''), LFTITLE: t.lft,
    LFH1: t.lfh1 || (L ? `${t.lfh1cat} is a trade AI search hits hard` : `${t.lfh1cat} is a field AI search is already changing`),
    LFU: t.lfu,
    LFD: t.lfd || `Those are exactly the questions people now hand to an assistant instead of opening ten ${t.pro} websites. The assistant answers. Then it recommends. In one response the ${t.cust} learns ${t.lfdverdict} and gets three ${t.bizpl} to phone about it.`,
    JOBWORD: t.jobword, LFEXPOSE: t.lfexpose, CREDS: t.creds,
    LFSH: L ? 'Why one "service area" page keeps costing you the suburbs' : 'Why one location page keeps costing you the surrounding towns',
    PLACE: L ? 'suburb' : 'town', SILOEX: t.siloex, TOPICS: t.topics,
    LFCLOSE: t.lfclose || (L ? `It becomes the reason the phone rings ${t.peakwhen}, in every town your ${t.p2unit} can reach.`
                             : `It becomes the reason the phone rings ${t.peakwhen}, in every town your ${t.custs} come from.`),
  };
}
/*</fields>*/

const label = n => n.replace(/ Companies$/, '');

/**
 * Screenshot status is DERIVED from which files exist in img/ — never
 * hand-maintained. Regenerating after dropping captures in updates
 * SCREENSHOTS.md, index.html and the README count automatically.
 */
function docs(all) {
  const has = p => fs.existsSync(path.join(root, p));
  const rows = all.map(t => {
    const f = fields(t);
    return { n: t.n, s: t.s, q: t.q, chat: f.IMG_CHAT, aio: f.IMG_AIO, done: has(f.IMG_CHAT) && has(f.IMG_AIO) };
  });
  const pending = rows.filter(r => !r.done);
  const doneNames = rows.filter(r => r.done).map(r => r.n);

  let md = `# Screenshot capture list

Two captures per trade, ${rows.length * 2} total. ${doneNames.length ? doneNames.join(', ') + ' done' : 'None done yet'} — ${pending.length * 2} to go across ${pending.length} trades.

This file is generated by \`node scripts/generate.js\` from what is actually in
img/. Drop captures in, re-run, and the status below updates itself.

**How to shoot each one**

1. Clean browser profile, logged out, location set to the city named in the
   query. Keep one real city per trade.
2. **Capture A — ChatGPT.** Ask the query with a question mark. Screenshot the
   full answer including the named businesses, addresses and phone numbers.
   Save as the ChatGPT filename below.
3. **Capture B — Google.** Search the same query without the question mark.
   Screenshot the AI Overview **and** the map pack with at least two listings.
   Save as the Google filename below.
4. Send them over and they get annotated to match: purple box + marker 1 on the
   AI answer, blue box + marker 2 on the map pack, connector spine, cropped so
   both zones stay legible at 375px.
5. If the answer you capture uses a different query than the one listed, the
   page's query, hero line and captions must be updated to match the capture —
   not the other way round (CLAUDE.md §2.5).
6. Update the \`· July 2026\` caption if you shoot in a later month.

Pages with captures outstanding show a placeholder panel naming their own
filename and query, so nothing looks broken while you work through the list.

| Trade | ChatGPT capture | Google capture | Query |
|---|---|---|---|
`;
  for (const r of rows) {
    md += r.done
      ? `| ${r.n} | ✅ | ✅ | — |\n`
      : `| ${r.n} | ${r.chat} | ${r.aio} | "${r.q}" |\n`;
  }
  md += `\n## Queries only (for batch shooting)\n\n`;
  for (const r of pending) md += `${r.q}\n`;
  fs.writeFileSync(path.join(root, 'SCREENSHOTS.md'), md);

  const chip = ok => ok
    ? `<span style="flex:none;font:600 12px/1 Inter;letter-spacing:.02em;color:#0f7b53;background:#e7f7ef;border:1px solid #c6ecd9;border-radius:999px;padding:6px 10px">\u2713 screenshots in</span>`
    : `<span style="flex:none;font:500 12px/1 Inter;letter-spacing:.02em;color:#94a3b8;background:#f4f6fa;border:1px solid #e6e9ef;border-radius:999px;padding:6px 10px">shots pending</span>`;
  const links = rows.map(r => `      <a href="ai-seo-for-${r.s}.html" style="display:flex;align-items:center;gap:16px;padding:14px 18px;border:1px solid #e6e9ef;border-radius:10px;background:#fff;color:#0f172a;font:500 15px/1.4 Inter"><span style="flex:1 1 auto">${r.n}</span><span style="flex:none;color:#94a3b8;font:400 13px/1.4 Inter">/ai-seo-for-${r.s}/</span>${chip(r.done)}</a>`).join('\n');
  const nDone = rows.length - pending.length;
  const pct = Math.round(nDone / rows.length * 100);
  fs.writeFileSync(path.join(root, 'index.html'), `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AI SEO trade pages — ${rows.length} verticals</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lexend:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin:0;background:#f8fafc;font-family:Inter,Helvetica,sans-serif">
  <style>a{text-decoration:none}a:hover{border-color:#6a2f9e!important;color:#6a2f9e!important}</style>
  <div style="max-width:940px;margin:0 auto;padding:64px 24px">
    <div style="font:600 13px/1 Inter;letter-spacing:.1em;text-transform:uppercase;color:#6a2f9e;margin-bottom:16px">Be Found Everywhere · build index</div>
    <h1 style="font:700 40px/1.1 Lexend;letter-spacing:-.025em;color:#0f172a;margin:0 0 12px">AI SEO trade pages</h1>
    <p style="font:400 18px/1.6 Inter;color:#475569;margin:0 0 28px;max-width:70ch">${rows.length} verticals from one template. Pages marked <b style="color:#0f7b53;font-weight:600">\u2713 screenshots in</b> carry real annotated proof; the rest show a placeholder panel naming the exact capture they need.</p>
    <div style="background:#fff;border:1px solid #e6e9ef;border-radius:12px;padding:20px 22px;margin:0 0 14px">
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:12px">
        <span style="font:600 15px/1.2 Inter;color:#0f172a">Screenshot progress</span>
        <span style="font:400 14px/1.2 Inter;color:#64748b"><b style="color:#0f172a;font-weight:600">${nDone} of ${rows.length}</b> trades · ${pending.length * 2} captures to go</span>
      </div>
      <div style="height:8px;border-radius:999px;background:#eef1f6;overflow:hidden">
        <div style="width:${pct}%;height:100%;border-radius:999px;background:#6a2f9e"></div>
      </div>
    </div>
    <p style="font:400 15px/1.6 Inter;color:#64748b;margin:0 0 36px;max-width:70ch">Footer trade links use production URLs (/ai-seo-for-slug/), so they won't resolve in preview — use this list instead.</p>
    <div style="display:grid;gap:10px">
${links}
    </div>
  </div>
</body>
</html>`);

  // README status lives between markers — never regex prose, it wraps.
  const rm = path.join(root, 'README.md');
  if (fs.existsSync(rm)) {
    const r = fs.readFileSync(rm, 'utf8');
    const A = '<!--status-->', B = '<!--/status-->';
    const i = r.indexOf(A), j = r.indexOf(B);
    if (i >= 0 && j > i) {
      const block = `${A}
3. **Drop in the two screenshots.** ${rows.length - pending.length} of ${rows.length} trades have them; the rest expect
   \`img/<slug>-chatgpt.png\` (ChatGPT answering the page's query) and
   \`img/<slug>-ai-overview.png\` (the Google AI Overview + map pack, annotated as
   a numbered pair — marker 1 \`#6a2f9e\` on the AI answer, marker 2 \`#1c78b8\` on
   the map pack, cropped so both zones read at 375px). Each page's placeholder
   panel names the exact filename and query it needs. See SCREENSHOTS.md.
${B}`;
      fs.writeFileSync(rm, r.slice(0, i) + block + r.slice(j + B.length));
    }
  }
  console.log(`docs updated — ${rows.length - pending.length}/${rows.length} trades have screenshots`);
}

function main() {
  const tpl = fs.readFileSync(path.join(root, 'templates/trade-template.html'), 'utf8');
  const all = [];
  for (const f of fs.readdirSync(path.join(root, 'data')).sort()) {
    if (/^trades-\d+\.json$/.test(f)) all.push(...JSON.parse(fs.readFileSync(path.join(root, 'data', f), 'utf8')));
  }
  for (const t of all) {
    const f = fields(t);
    f.TRADELINKS = all.filter(x => x.s !== t.s)
      .map(x => `        <a href="/ai-seo-for-${x.s}/" style="color:var(--mute-2)">${label(x.n)}</a>`).join('\n');
    let out = tpl;
    for (const [k, v] of Object.entries(f)) out = out.split('{{' + k + '}}').join(v);
    const left = out.match(/\{\{[A-Z0-9_]+\}\}/g);
    if (left) throw new Error(`unresolved tokens in ${t.s}: ${[...new Set(left)].join(', ')}`);
    const body = out.slice(out.indexOf('<body>')).replace(/<script[\s\S]*?<\/script>/g, '');
    if (/undefined/.test(body)) throw new Error(`"undefined" leaked into rendered copy on ${t.s} — check the data entry`);
    fs.writeFileSync(path.join(root, `ai-seo-for-${t.s}.html`), out);
  }
  docs(all);
  console.log(`generated ${all.length} pages`);
}

if (require.main === module) main();
module.exports = { fields, label, docs, main };
