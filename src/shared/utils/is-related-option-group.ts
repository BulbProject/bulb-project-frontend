import type { OptionGroupType } from '../entity/data';

export const isRelatedOptionGroup = (optionGroup: OptionGroupType): boolean => {
  return optionGroup.options.every((option) => option.relatedRequirementID);
};
