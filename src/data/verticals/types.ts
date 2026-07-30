export interface Stat { value: string; label: string }
export interface Pain { mark: string; title: string; body: string }
export interface UseCase { icon: string; title: string; body: string; link: string; href: string }
export interface CompareRow { label: string; manual: string; bfe: string }
export interface BodySection { h: string; paras: string[] }
export interface Step { n: string; title: string; body: string }
export interface Faq { q: string; a: string }

export interface Vertical {
  slug: string;
  name: string;
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
