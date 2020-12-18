import { useMemo } from 'react';

import type { Criterion, RequirementGroup } from 'shared/entity/data';
import { useCalculation } from 'shared/context/calculation';

export const useRequirementGroups = (criterion: Criterion): RequirementGroup[] => {
  const { relatedRequirementIds } = useCalculation();

  return useMemo(() => {
    const filteredRequirementGroups = criterion.requirementGroups.filter((requirementGroup) => {
      const relatedRequirementId = relatedRequirementIds?.[criterion.id];

      return relatedRequirementId && `${relatedRequirementId.slice(0, 4)}000000` === requirementGroup.id;
    }) as RequirementGroup[];

    return filteredRequirementGroups.length === 1 ? filteredRequirementGroups : criterion.requirementGroups;
  }, [criterion.id, relatedRequirementIds]);
};
