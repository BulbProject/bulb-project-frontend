import type { StoreRequestedNeed } from 'types/globals';
import type { RequirementGroup } from 'types/data';
import { modifyId } from 'utils';

export const filterRequirementGroups = ({
  criterionId,
  requestedNeed,
}: {
  criterionId: string;
  requestedNeed: StoreRequestedNeed;
}) => (requirementGroup: RequirementGroup) => {
  const predicateId = modifyId(Object.keys(requestedNeed[criterionId])[0], 3, () => 0);

  return requirementGroup.id === predicateId;
};
