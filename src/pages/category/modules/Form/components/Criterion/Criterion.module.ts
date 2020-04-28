import { RequirementGroup } from 'types/data';

const isGroupBoolean = (requirementGroup: RequirementGroup): boolean => {
  return (
    requirementGroup.requirements.length === 1 &&
    requirementGroup.requirements[0].dataType === 'boolean' &&
    'expectedValue' in requirementGroup.requirements[0]
  );
};

const filterBooleanGroups = (requirementGroups: RequirementGroup[]): RequirementGroup[] => {
  return requirementGroups.filter(isGroupBoolean);
};

export const getBooleanGroup = (requirementGroups: RequirementGroup[]): RequirementGroup => {
  return filterBooleanGroups(requirementGroups)[0];
};

export const geetNonBooleanGroup = (requirementGroups: RequirementGroup[]): RequirementGroup => {
  return requirementGroups.filter((requirementGroup) => !isGroupBoolean(requirementGroup))[0];
};

export const hasBooleanSelection = (requirementGroups: RequirementGroup[]): boolean => {
  const hasTwoGroups = requirementGroups.length === 2;

  const hasBooleanGroup = filterBooleanGroups(requirementGroups).length === 1;

  return hasTwoGroups && hasBooleanGroup;
};
