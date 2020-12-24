import { useMemo } from 'react';

import type { Criterion, RequirementGroup, RequestedNeed } from 'shared/entity/data';
import { useCalculation } from 'shared/context/calculation';
import { modifyId } from 'shared/utils';

const filterRequirementGroups = ({ calculationPayload } = {} as { calculationPayload?: RequestedNeed }) => ({
  id,
}: {
  id: string;
}) => {
  if (calculationPayload) {
    const predicateIds = calculationPayload.requirementResponses.map(({ requirement }) =>
      modifyId(requirement.id, 3, () => 0)
    );

    return predicateIds.includes(id);
  }

  return true;
};

export const useRequirementGroups = (criterion: Criterion): RequirementGroup[] => {
  const { relatedRequirementIds, calculationPayload } = useCalculation();

  return useMemo(() => {
    const filteredRequirementGroups = criterion.requirementGroups.filter((requirementGroup) => {
      const relatedRequirementId = relatedRequirementIds?.[criterion.id];

      return relatedRequirementId && `${relatedRequirementId.slice(0, 4)}000000` === requirementGroup.id;
    }) as RequirementGroup[];

    return filteredRequirementGroups.length === 1
      ? filteredRequirementGroups
      : criterion.requirementGroups.filter(
          filterRequirementGroups({ calculationPayload: calculationPayload as RequestedNeed })
        );
  }, [criterion.id, relatedRequirementIds]);
};
