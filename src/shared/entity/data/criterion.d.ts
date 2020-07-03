import { Criterion as OCDSCriterion, RequirementGroup } from 'ts4ocds/extensions/requirements';
import { RequirementWithOptionDetails } from 'ts4ocds/extensions/options';

export interface Criterion extends OCDSCriterion<RequirementGroup<RequirementWithOptionDetails>> {
  id: string;
  title: string;
}
