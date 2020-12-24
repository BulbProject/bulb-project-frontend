import { useCallback } from 'react';

import type { OptionType } from 'shared/entity/data';
import { useCalculation } from 'shared/context/calculation';

// eslint-disable-next-line func-style
export function useRelatedRequirement(options = [] as OptionType[]) {
  const { dispatch } = useCalculation();

  return useCallback((value: string) => {
    const option = options.find(
      ({ value: optionValue, relatedRequirementID }) => value === optionValue && relatedRequirementID
    );

    if (option) {
      const criterionId = `${option.relatedRequirementID?.slice(0, 2)}00000000`;

      dispatch.addRelatedRequirementId({
        criterionId,
        relatedRequirementId: option.relatedRequirementID as string,
      });
    }
  }, []);
}
