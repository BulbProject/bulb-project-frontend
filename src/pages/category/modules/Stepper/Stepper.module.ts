import { FormFieldSet } from 'formfish';
import { RequirementResponse } from 'ts4ocds/extensions/requirements';
import { RequestedNeed } from 'types/data';
import { v4 as uuidv4 } from 'uuid';
import { CategoryContextStateValue } from '../../store';

export const stepCircleDimension = 0.75;
export const stepProgressHeight = 0.125;
export const stepHeight = 4;

export const getRequestedNeed = (requestedNeed: Record<string, Record<string, unknown>>): RequestedNeed => {
  return {
    id: uuidv4(),
    requirementResponses: Object.values(requestedNeed).flatMap((criterion) => {
      return Object.keys(criterion).reduce((requirementResponses: RequirementResponse[], requirementId) => {
        return [
          ...requirementResponses,
          {
            id: uuidv4(),
            value: criterion[requirementId] as undefined,
            requirement: { id: requirementId },
          },
        ];
      }, []);
    }),
  };
};

export const isRequirementGroupFilled = ({
  state,
  currentCriterion,
}: {
  state: FormFieldSet;
  currentCriterion: CategoryContextStateValue['currentCriterion'];
}): boolean => {
  const criterion = state[currentCriterion.id] as FormFieldSet;
  const requirementGroup = criterion?.[currentCriterion.activeRequirementGroup];

  if (requirementGroup) {
    return (
      Object.values(requirementGroup).filter(
        (requirementValue) => requirementValue === undefined || requirementValue === ''
      ).length === 0
    );
  }

  return requirementGroup;
};
