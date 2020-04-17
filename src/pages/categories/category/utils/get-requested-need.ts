import { RequirementResponse } from 'ts4ocds/extensions/requirements';
import { RequestedNeed } from 'types/data';
import { uid } from '../../../../utils';

export const getRequestedNeed = (requestedNeed: Record<string, Record<string, unknown>>): RequestedNeed => {
  return {
    id: uid(),
    requirementResponses: Object.values(requestedNeed).flatMap(criterion => {
      return Object.keys(criterion).reduce((requirementResponses: RequirementResponse[], requirementId) => {
        return [
          ...requirementResponses,
          {
            id: uid(),
            value: criterion[requirementId] as undefined,
            requirement: { id: requirementId },
          },
        ];
      }, []);
    }),
  };
};
