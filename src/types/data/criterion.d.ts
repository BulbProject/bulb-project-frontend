import { RequirementWithOptionDetails } from 'ts4ocds/extensions/options';
import { BaseCriterion, RequirementGroup as OCDSRequirementGroup } from 'ts4ocds/extensions/requirements';

interface RequirementGroup extends OCDSRequirementGroup {
  requirements: RequirementWithOptionDetails[];
}

export interface Criterion extends BaseCriterion {
  id: string;
  title: string;
  requirementGroups: RequirementGroup[];
}
