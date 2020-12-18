import { useMemo } from 'react';

import type { Criterion, RequirementGroup } from 'shared/entity/data';
import { useCalculation } from 'shared/context/calculation';

export const useRequirementGroups = (criterion: Criterion): RequirementGroup[] => {
  const { relatedRequirementIds } = useCalculation();

  return useMemo(() => {
    const filteredRequirementGroups = criterion.requirementGroups.filter(
      (group) => relatedRequirementIds?.[group.id]
    ) as RequirementGroup[];

    return filteredRequirementGroups.length === 1 ? filteredRequirementGroups : criterion.requirementGroups;
  }, [criterion, relatedRequirementIds]);
};
