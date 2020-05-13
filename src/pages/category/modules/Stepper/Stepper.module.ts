import { FormFieldSet } from 'formfish';
import { CategoryContextStateValue } from '../../store';

export const stepCircleDimension = 0.75;
export const stepProgressHeight = 0.125;
export const stepHeight = 4;

export const isRequirementGroupFilled = ({
  state,
  currentCriterion,
}: {
  state: FormFieldSet;
  currentCriterion: CategoryContextStateValue['currentCriterion'];
}): boolean => {
  const criterion = state[currentCriterion.id] as FormFieldSet;
  const requirementGroup = criterion?.[currentCriterion.activeRequirementGroup?.id || ''];

  if (requirementGroup) {
    return Object.values(requirementGroup).every(
      (requirementValue) => !(requirementValue === undefined || requirementValue === '')
    );
  }

  return requirementGroup;
};
