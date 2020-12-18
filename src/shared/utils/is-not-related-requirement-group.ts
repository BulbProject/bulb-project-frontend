import type { OptionType, RequirementGroup } from '../entity/data';

export const isNotRelatedRequirementGroup = (requirementGroup: RequirementGroup): boolean => {
  return !requirementGroup.requirements.every((requirement) => {
    return (
      requirement.optionDetails &&
      'optionGroups' in requirement.optionDetails &&
      requirement.optionDetails.optionGroups.every((optionGroup) => {
        return optionGroup.options.every((option) => (option as OptionType).relatedRequirementID);
      })
    );
  });
};
