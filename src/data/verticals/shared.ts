// Pieces that are identical across every vertical page.
const CHECKOUT = 'https://dashboard.bfeai.com/.netlify/functions/stripe-checkout-public';

export const trialHref = `${CHECKOUT}?plan=bundle-trial`;

export const tiers = [
  { name: 'Lite', price: '$49', highlight: 'Lock in your price for life', features: ['500 credits', 'Access to all apps', '3-month credit rollover'], cta: 'Try it for 7 days for $1', href: `${CHECKOUT}?plan=lite-trial`, featured: false,
    cardBg: '#fff', cardBorder: '#ece6f7', cardShadow: '0 8px 30px rgba(60,34,102,0.06)', nameColor: '#070523', muted: '#8c8ea3', featureColor: '#545356', btnBg: 'transparent', btnColor: '#9554ff', btnBorder: '#9554ff' },
  { name: 'Plus', price: '$144', highlight: '240% more credits than Lite', features: ['1,700 credits', 'Lock in your price for life', 'Access to all apps'], cta: 'Try it for 7 days for $1', href: `${CHECKOUT}?plan=plus-trial`, featured: true,
    cardBg: 'linear-gradient(165deg, #070523, #3c2266)', cardBorder: 'transparent', cardShadow: '0 20px 50px rgba(60,34,102,0.28)', nameColor: '#fff', muted: '#d3b7ff', featureColor: '#e9dcff', btnBg: '#9554ff', btnColor: '#fff', btnBorder: '#9554ff' },
  { name: 'Max', price: '$444', highlight: '220% more credits than Plus', features: ['5,500 credits', 'Lock in your price for life', 'Access to all apps'], cta: 'Try it for 7 days for $1', href: `${CHECKOUT}?plan=max-trial`, featured: false,
    cardBg: '#fff', cardBorder: '#ece6f7', cardShadow: '0 8px 30px rgba(60,34,102,0.06)', nameColor: '#070523', muted: '#8c8ea3', featureColor: '#545356', btnBg: 'transparent', btnColor: '#9554ff', btnBorder: '#9554ff' },
];

export const testimonial = {
  name: 'Jennifer Kimmons',
  role: 'COO, NexaReach',
  photo: '/images/beautiful-face-of-young-caucasian-woman-with-perfect-healthy-skin-isolated-e1747921277182.jpg',
  quote: 'I finally know whether AI recommends my business — and Diagnose told me exactly what to fix.',
};

export const related = [
  { title: 'LABS', blurb: 'Track AI-answer visibility across all six engines with scheduled scans and white-label reports.', href: '/labs/' },
  { title: 'Keyword Agent', blurb: 'Find the search terms worth ranking for, then feed them into your visibility strategy. Next generation keyword research.', href: '/keyword-agent/' },
  { title: 'OffPage Agent', blurb: 'Get spam free links created on autopilot. One click to get multiple layers of links, siphoning power straight from Google.', href: '/off-page-agent/' },
];

export const pricingIntro = 'Every plan includes LABS, Keyword Agent, and every agent we launch — with a shared credit pool and 3-month rollover.';
