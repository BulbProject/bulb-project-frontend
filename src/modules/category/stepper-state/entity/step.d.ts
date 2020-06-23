import { Criterion, RequirementGroup } from 'shared/entity/data';

interface Step extends Criterion {
  title: string;
  activeRequirementGroup?: RequirementGroup;
}
