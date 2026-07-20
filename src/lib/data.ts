// Sitewide content data, extracted verbatim from the original WordPress site.
const CHECKOUT = 'https://dashboard.bfeai.com/.netlify/functions/stripe-checkout-public';

export const links = {
  signIn: 'https://accounts.bfeai.com/',
  dashboard: 'https://dashboard.bfeai.com',
  facebook: 'https://www.facebook.com/profile.php?id=61586783638423',
  youtube: 'https://www.youtube.com/channel/UCrHHy1tKDbkonDKLLdTltIg',
  instagram: 'https://www.instagram.com/be.found.everywhere.ai/',
  messenger: 'http://m.me/bfeai/',
  bundleTrial: `${CHECKOUT}?plan=bundle-trial`,
  liteTrial: `${CHECKOUT}?plan=lite-trial`,
  plusTrial: `${CHECKOUT}?plan=plus-trial`,
  maxTrial: `${CHECKOUT}?plan=max-trial`,
  keywordsTrial: `${CHECKOUT}?plan=keywords-trial`,
};

export const contact = {
  phone: '1 (302) 704-2664',
  email: 'info@bfeai.com',
};

export const counters = [
  { value: 6, label: 'LLMs to Track' },
  { value: 2, label: 'Powerful Apps' },
  { value: 2, prefix: '$', label: 'To Try Them Out' },
];

export const pricingTiers = [
  {
    name: 'Lite',
    price: '$49',
    description: 'Essential marketing & analytics tools for small teams and early-stage startups.',
    highlight: 'Lock in Your Price for Life',
    features: ['500 Credits', 'Access to All Apps', '3 Month Roll Over Credits'],
    cta: 'Try it for 7 Days for $1',
    href: links.liteTrial,
    featured: false,
  },
  {
    name: 'Plus',
    price: '$144',
    description: 'For active marketers and growing businesses building consistent visibility.',
    highlight: '240% More Credits than Lite',
    features: ['1700 Credits', 'Lock in Your Price for Life', 'Access to All Apps'],
    cta: 'Try it for 7 Days for $1',
    href: links.plusTrial,
    featured: true,
  },
  {
    name: 'Max',
    price: '$444',
    description: 'Advanced marketing & analytics software for growing teams that need more power.',
    highlight: '220% More Credits than Plus',
    features: ['5500 Credits', 'Lock in Your Price for Life', 'Access to All Apps'],
    cta: 'Try it for 7 Days for $1',
    href: links.maxTrial,
    featured: false,
  },
];

export const upcomingApps = [
  {
    title: 'Off-Page Agent',
    desc: 'Builds and manages your off-page Google presence automatically. Every signal AI engines look for when deciding who to trust — handled for you in the background',
  },
  {
    title: 'Content Writer Agent',
    desc: 'Turns your Keyword Agent campaign into ready-to-publish content engineered to rank on Google and get cited by ChatGPT, Gemini, Perplexity, and Claude. The agent that closes the loop between research and revenue.',
  },
  {
    title: 'Reddit Marketing Engine',
    desc: 'Scans relevant subreddits for high-intent threads and auto-engages as a natural third party. When a question maps to a client topic, it generates a blog post and drops a genuine, non-promotional answer linking back. Comments that never get flagged or deleted.',
  },
  {
    title: 'Geo Grid Analyzer',
    desc: 'A standalone breakout of the local ranking grid from the SEO Analyzer suite. Maps keyword visibility across geographic cells with a custom-built engine. No third-party Local Dominator dependency required. Pure local rank intelligence.',
  },
  { title: 'And More Coming Soon', desc: '' },
];

export const testimonials = [
  {
    quote:
      "We were looking for a flexible tool that could grow with us. This SaaS solution delivered more than we expected. It's now a core part of our tech stack.",
    name: 'Sapphire Wheeler',
    role: 'CEO of Insightify',
    photo: '/images/pretty-african-american-woman-with-a-lovely-smile-e1747921308536.jpg',
  },
  {
    quote:
      'We were drowning in unstructured data with no way to extract insights fast. BFE AI engine helped us clean, visualize, and act on our data in real time. What used to take a week of analysis now takes an hour.',
    name: 'Jenson Wheeler',
    role: 'Owner at DeployIQ',
    photo: '/images/studio-portrait-of-young-man-with-skin-pigmentation-disorder-looking-at-camera-e1747921183327.jpg',
  },
  {
    quote:
      "We used to struggle with fragmented data. Now, everything is unified in one dashboard. It's a game changer for reporting and strategy.",
    name: 'Elaine Hayward',
    role: 'Director at Schemio',
    photo: '/images/smooth-long-brunette-hair-woman-face-close-up.jpg',
  },
  {
    quote:
      'Our reporting used to take 4–5 hours a week — manual exports, formatting, and spreadsheet chaos. BFE AI completely automated the process. Now we get beautiful, real-time dashboards with zero effort. Investors love the clarity. So do we.',
    name: 'Jeff Coleman',
    role: 'Manager at DataNest',
    photo: '/images/portrait-of-handsome-bearded-hispanic-man-e1747921294354.jpg',
  },
  {
    quote:
      'Since adopting this platform, our sales and marketing efforts have become 10x more efficient. The automation and insights are truly next level.',
    name: 'Jennifer Kimmons',
    role: 'COO at NexaReach',
    photo: '/images/beautiful-face-of-young-caucasian-woman-with-perfect-healthy-skin-isolated-e1747921277182.jpg',
  },
  {
    quote:
      'This platform eliminated hours of manual work every week. We now focus more on strategy and less on spreadsheets.',
    name: 'Marshall Goodman',
    role: 'Founder ElevateHub',
    photo: '/images/portrait-black-man-and-floss-teeth-in-studio-healthy-dental-care-or-gum-gingivitis-face-of-male.jpg',
  },
  {
    quote:
      "We've always had tons of data but struggled to make it actionable. This SaaS solution changed everything. The dashboards are beautifully designed, but more importantly, they're meaningful.",
    name: 'Henrietta Row',
    role: 'Co-Founder at CloudShift',
    photo: '/images/closeup-face-of-a-beautiful-woman-with-long-straight-hair-.jpg',
  },
  {
    quote:
      'Other tools felt rigid. This platform was flexible enough to adapt to our workflow—without needing a developer.',
    name: 'Halbert Arnold',
    role: 'CEO InsightPro',
    photo: '/images/portrait-of-handsome-bearded-hispanic-man-e1747921294354.jpg',
  },
];

export const faqGeneral = [
  {
    q: 'What is BFEAI?',
    a: 'BFEAI ("Be Found Everywhere AI") is an SEO and AI visibility platform that helps businesses appear in both traditional search engines and AI-powered search responses. It includes two core tools: Keyword Agent for SEO keyword research and LABS for tracking your brand\'s presence across AI engines like ChatGPT, Gemini, Perplexity, Claude, and Google\'s AI Mode and AI Overview.',
  },
  {
    q: 'Who is BFEAI built for?',
    a: "BFEAI is built for anyone who needs to be found online — from local small businesses and multi-location brands to in-house SEO teams, marketing agencies, and enterprise organizations. Whether you're a plumber in a single city or a national brand competing across dozens of keywords, BFEAI gives you the data to make smarter visibility decisions.",
  },
  {
    q: 'What does "AI visibility" mean and why does it matter?',
    a: "AI visibility refers to whether your brand is mentioned, cited, or recommended when people search using AI-powered tools like ChatGPT, Gemini, Perplexity, or Google's AI Overviews. As more searchers rely on AI answers instead of traditional blue-link results, being invisible to AI engines means missing leads — even if you rank well on Google. BFEAI helps you measure and improve this new form of visibility.",
  },
  {
    q: 'How does the credit system work?',
    a: 'Credits are used across both BFEAI apps to run searches, scans, and reports. For example, running a Keyword Agent report in Wide mode costs 30 credits, and LABS scans consume credits per engine checked. You can view your current credit balance in the sidebar and purchase more via Manage Payments at any time.',
  },
  {
    q: 'Can I use both Keyword Agent and LABS together?',
    a: 'Yes — and we recommend it. Use Keyword Agent to discover high-value search terms your audience is using, then use LABS to track whether your brand actually shows up when those keywords are entered into AI engines. Together they cover both the traditional SEO strategy layer and the AI visibility monitoring layer.',
  },
  {
    q: "What if I don't use all my credits each month?",
    a: "All of your credits will roll over for 3 months so that you don't have to worry about any of them going to waste.",
  },
];

export const faqLabs = [
  {
    q: 'Which LLMs does LABs track?',
    a: 'All 6 of the major ones — ChatGPT, Gemini, Claude, Perplexity, Google AI Mode, and Google AI Overviews. You can scan all of them, or pick the ones that matter most for your audience.',
  },
  {
    q: 'How is this different from just searching ChatGPT myself?',
    a: 'When you search your own brand inside ChatGPT, your results are personalized — based on your history, your account, and your affiliations. You might be seeing yourself when nobody else does. LABs runs every scan from a clean, anonymous environment so you see the actual answer the rest of the world is getting.',
  },
  {
    q: 'What does the Diagnose feature do?',
    a: "For one credit, LABs tells you exactly why you're not being cited for a keyword — who's ranking instead, why they rank (reviews, directories, GBP strength, brand authority, content depth), and a step-by-step action plan to start showing up. It's the difference between knowing you have a problem and knowing how to fix it.",
  },
  {
    q: 'Can I track competitors?',
    a: 'Yes. Add competitors when you set up your business profile and LABs will show their visibility side-by-side with yours on every scan.',
  },
  {
    q: 'How many businesses can I track?',
    a: "As many as you want. LABs doesn't charge per business — you only burn credits when you run a scan. Perfect for agencies, multi-location brands, or anyone managing more than one site.",
  },
  {
    q: 'Can I schedule automatic scans?',
    a: 'Yes. Set LABs to scan on any cadence you want — daily, weekly, monthly — and watch your visibility climb over time on the Analytics dashboard.',
  },
  {
    q: 'Can I export reports?',
    a: 'Yes. Export full PDF reports anytime — including your global health score, engine performance, keyword performance, and revenue gap analysis. Useful for client reporting and internal stakeholder updates.',
  },
  {
    q: 'Do I get the other BFE apps with my subscription?',
    a: 'Yes. Every plan includes every app on the platform — LABs, Keyword Agent, and every new agent we launch. One price, one credit pool, every tool.',
  },
];

export const faqOffPage = [
  {
    q: 'What is Off-Page Agent?',
    a: "Off-Page Agent is BFEAI's AI-powered link building tool. It automatically builds you a tiered network of Google Sites that link back to your money site, using branded anchor text and keyword-targeted content. Think of it as having a full link building agency working in the background, except faster and a fraction of the cost.",
  },
  {
    q: 'What are tiers and how do I choose?',
    a: 'Tiers control how deep your backlink network goes. Tier 1 builds 4 sites linking directly to your money site (125 credits). Tier 2 adds another layer of 12 sites linking to your Tier 1 sites (250 credits total, 16 sites). Tier 3 and Tier 4 keep stacking, with Tier 4 building a full 160-site network for 500 credits. Heavier tiers send more ranking power but cost more credits, so start light and scale up.',
  },
  {
    q: 'Are these backlinks safe?',
    a: "Yes. Every site is built on Google Sites — Google's own platform — and Tier 1 links to your money site use your brand name as anchor text, which is the safest, most natural anchor profile possible. There is no keyword stuffing, no spam signals, and no risk of the penalties you get from cheap PBN networks.",
  },
  {
    q: 'How long does a campaign take to build?',
    a: 'A Tier 1 campaign typically takes a few minutes once it begins executing. Larger campaigns take longer and may sit in a queue if other campaigns are running on the same account. You can watch progress live from the campaign dashboard.',
  },
  {
    q: 'Do I need to provide a Gmail account?',
    a: 'Yes. Off-Page Agent uses a regular Gmail account (added under the Accounts tab) to build your sites. Do not use a Google Workspace account — its built-in privacy settings prevent the backlink pages from being indexed. A standard free Gmail works perfectly.',
  },
];
