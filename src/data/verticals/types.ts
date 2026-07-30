export interface Stat { value: string; label: string }
export interface Pain { mark: string; title: string; body: string }
export interface UseCase { icon: string; title: string; body: string; link: string; href: string }
export interface CompareRow { label: string; manual: string; bfe: string }
export interface BodySection { h: string; paras: string[] }
export interface Step { n: string; title: string; body: string }
export interface Faq { q: string; a: string }

/**
 * Copy unique to the vertical page — the top of the silo at /<slug>/.
 *
 * Everything else on this interface belongs to the AI tracking page beneath
 * it, so these fields are deliberately separate: the two pages sit in the same
 * silo targeting different terms, and reusing the tracking copy up top would
 * make them compete with each other. Keep this block about the trade's search
 * problem in general; leave the tracking product story to the child page.
 */
export interface Hub {
  /** Hero sub-line, one sentence. */
  subhead: string;
  /** The opening section: what AI SEO means for this trade. */
  intro: BodySection;
  /** One sentence pitching the AI tracking page as a topic within the silo. */
  trackingBlurb: string;
}

export interface Vertical {
  slug: string;
  name: string;
  hub: Hub;
  eyebrow: string;
  h1: string;
  subhead: string;
  heroPoints: string[];
  ctaLabel: string;
  stats: Stat[];
  painHeadline: string;
  painIntro: string;
  pains: Pain[];
  useCaseHeadline: string;
  useCases: UseCase[];
  compareHeadline: string;
  compareColA: string;
  compareRows: CompareRow[];
  proof: { metric: string; headline: string; body: string };
  answer: string;
  definition: { term: string; def: string };
  body: BodySection[];
  roadmap: { headline: string; intro: string; steps: Step[] };
  faqs: Faq[];
}
