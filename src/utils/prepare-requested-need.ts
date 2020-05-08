import { RequirementResponse } from 'ts4ocds/extensions/requirements';
import { v4 as uuidv4 } from 'uuid';
import { RequestedNeed } from 'types/data';
import { StoreRequestedNeed } from 'types/globals';

export const prepareRequestedNeed = (requestedNeed: StoreRequestedNeed): RequestedNeed => {
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
