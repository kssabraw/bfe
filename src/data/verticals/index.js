import { vertical as v_appliance_repair_companies } from './appliance-repair-companies.js';
import { vertical as v_carpet_cleaning_companies } from './carpet-cleaning-companies.js';
import { vertical as v_chimney_sweep_companies } from './chimney-sweep-companies.js';
import { vertical as v_chiropractors } from './chiropractors.js';
import { vertical as v_concrete_contractors } from './concrete-contractors.js';
import { vertical as v_cosmetic_dentists } from './cosmetic-dentists.js';
import { vertical as v_deck_and_patio_builders } from './deck-and-patio-builders.js';
import { vertical as v_dentists } from './dentists.js';
import { vertical as v_drywall_contractors } from './drywall-contractors.js';
import { vertical as v_electrical_contractors } from './electrical-contractors.js';
import { vertical as v_fence_installation_companies } from './fence-installation-companies.js';
import { vertical as v_flooring_installation_companies } from './flooring-installation-companies.js';
import { vertical as v_foundation_repair_companies } from './foundation-repair-companies.js';
import { vertical as v_garage_door_repair_companies } from './garage-door-repair-companies.js';
import { vertical as v_general_contractors } from './general-contractors.js';
import { vertical as v_gutter_service_companies } from './gutter-service-companies.js';
import { vertical as v_handyman_companies } from './handyman-companies.js';
import { vertical as v_home_automation_companies } from './home-automation-companies.js';
import { vertical as v_home_security_installation_companies } from './home-security-installation-companies.js';
import { vertical as v_hvac_companies } from './hvac-companies.js';
import { vertical as v_insulation_contractors } from './insulation-contractors.js';
import { vertical as v_junk_removal_companies } from './junk-removal-companies.js';
import { vertical as v_landscaping_companies } from './landscaping-companies.js';
import { vertical as v_mold_remediation_companies } from './mold-remediation-companies.js';
import { vertical as v_painting_contractors } from './painting-contractors.js';
import { vertical as v_personal_injury_lawyers } from './personal-injury-lawyers.js';
import { vertical as v_pest_control_companies } from './pest-control-companies.js';
import { vertical as v_plumbers } from './plumbers.js';
import { vertical as v_pool_service_companies } from './pool-service-companies.js';
import { vertical as v_pressure_washing_companies } from './pressure-washing-companies.js';
import { vertical as v_roofers } from './roofers.js';
import { vertical as v_septic_service_companies } from './septic-service-companies.js';
import { vertical as v_solar_installation_companies } from './solar-installation-companies.js';
import { vertical as v_tree_service_companies } from './tree-service-companies.js';
import { vertical as v_water_damage_restoration_companies } from './water-damage-restoration-companies.js';
import { vertical as v_window_replacement_companies } from './window-replacement-companies.js';

export const verticals = [
  v_appliance_repair_companies,
  v_carpet_cleaning_companies,
  v_chimney_sweep_companies,
  v_chiropractors,
  v_concrete_contractors,
  v_cosmetic_dentists,
  v_deck_and_patio_builders,
  v_dentists,
  v_drywall_contractors,
  v_electrical_contractors,
  v_fence_installation_companies,
  v_flooring_installation_companies,
  v_foundation_repair_companies,
  v_garage_door_repair_companies,
  v_general_contractors,
  v_gutter_service_companies,
  v_handyman_companies,
  v_home_automation_companies,
  v_home_security_installation_companies,
  v_hvac_companies,
  v_insulation_contractors,
  v_junk_removal_companies,
  v_landscaping_companies,
  v_mold_remediation_companies,
  v_painting_contractors,
  v_personal_injury_lawyers,
  v_pest_control_companies,
  v_plumbers,
  v_pool_service_companies,
  v_pressure_washing_companies,
  v_roofers,
  v_septic_service_companies,
  v_solar_installation_companies,
  v_tree_service_companies,
  v_water_damage_restoration_companies,
  v_window_replacement_companies
];

export const bySlug = Object.fromEntries(verticals.map((v) => [v.slug, v]));
