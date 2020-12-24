import type { RequirementGroup } from '../entity/data';

import { isRelatedOptionGroup } from './is-related-option-group';

export const isRelatedRequirementGroup = (requirementGroup: RequirementGroup): boolean => {
  return requirementGroup.requirements.every((requirement) => {
    return (
      requirement.optionDetails &&
      'optionGroups' in requirement.optionDetails &&
      requirement.optionDetails.optionGroups.every(isRelatedOptionGroup)
    );
  });
};
