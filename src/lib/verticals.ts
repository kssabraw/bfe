// Verticals targeted by the per-vertical AI tracking landing pages.
// `slug` matches the existing aeo-tips-for-<slug> blog filenames so the two
// can be cross-linked without a second mapping.
export interface Vertical {
  /** Display name, used in page titles and headings. */
  name: string;
  slug: string;
}

export const verticals: Vertical[] = [
  { name: 'HVAC Companies', slug: 'hvac-companies' },
  { name: 'Plumber', slug: 'plumber' },
  { name: 'Roofers', slug: 'roofers' },
  { name: 'Electrical Contractors', slug: 'electrical-contractors' },
  { name: 'Pest Control Companies', slug: 'pest-control-companies' },
  { name: 'Landscaping Companies', slug: 'landscaping-companies' },
  { name: 'Garage Door Repair Companies', slug: 'garage-door-repair-companies' },
  { name: 'Painting Contractors', slug: 'painting-contractors' },
  { name: 'Pool Service Companies', slug: 'pool-service-companies' },
  { name: 'Junk Removal Companies', slug: 'junk-removal-companies' },
  { name: 'Window Replacement Companies', slug: 'window-replacement-companies' },
  { name: 'Gutter Service Companies', slug: 'gutter-service-companies' },
  { name: 'Foundation Repair Companies', slug: 'foundation-repair-companies' },
  { name: 'Tree Service Companies', slug: 'tree-service-companies' },
  { name: 'Flooring Installation Companies', slug: 'flooring-installation-companies' },
  { name: 'Carpet Cleaning Companies', slug: 'carpet-cleaning-companies' },
  { name: 'Pressure Washing Companies', slug: 'pressure-washing-companies' },
  { name: 'Fence Installation Companies', slug: 'fence-installation-companies' },
  { name: 'Deck And Patio Builders', slug: 'deck-and-patio-builders' },
  { name: 'Drywall Contractors', slug: 'drywall-contractors' },
  { name: 'Insulation Contractors', slug: 'insulation-contractors' },
  { name: 'Water Damage Restoration Companies', slug: 'water-damage-restoration-companies' },
  { name: 'Mold Remediation Companies', slug: 'mold-remediation-companies' },
  { name: 'Chimney Sweep Companies', slug: 'chimney-sweep-companies' },
  { name: 'Handyman Companies', slug: 'handyman-companies' },
  { name: 'Appliance Repair Companies', slug: 'appliance-repair-companies' },
  { name: 'Home Security Installation Companies', slug: 'home-security-installation-companies' },
  { name: 'Solar Installation Companies', slug: 'solar-installation-companies' },
  { name: 'Septic Service Companies', slug: 'septic-service-companies' },
  { name: 'Home Automation Companies', slug: 'home-automation-companies' },
  { name: 'Personal Injury Lawyers', slug: 'personal-injury-lawyers' },
  { name: 'Dentists', slug: 'dentists' },
  { name: 'Cosmetic Dentists', slug: 'cosmetic-dentists' },
  { name: 'Concrete Contractors', slug: 'concrete-contractors' },
  { name: 'General Contractors', slug: 'general-contractors' },
  { name: 'Chiropractors', slug: 'chiropractors' },
];

/** The title format applied to every AI tracking page. */
export const aiTrackingTitle = (name: string) =>
  `AI Tracking For ${name} 2026 | See Your Ranking In ChatGPT, AI Overviews, And More | Be Found Everywhere`;

/** bfeai.com/<slug>/ai-tracking-<slug> */
export const aiTrackingPath = (slug: string) => `/${slug}/ai-tracking-${slug}`;
