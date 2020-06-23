import { Criterion as OCDSCriterion } from 'ts4ocds/extensions/requirements';
import { RequirementGroup } from './requirement-group';

export interface Criterion extends OCDSCriterion<RequirementGroup> {
  id: string;
  title: string;
}
