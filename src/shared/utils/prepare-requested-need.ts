import { v4 as uuidv4 } from 'uuid';

import type { RequirementResponse } from 'ts4ocds/extensions/requirements';
import type { RequestedNeed } from 'shared/entity/data';
import type { FormData } from 'shared/entity';

export const prepareRequestedNeed = (formData: FormData): RequestedNeed => {
  return {
    id: uuidv4(),
    requirementResponses: Object.values(formData).flatMap((criterion) => {
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
