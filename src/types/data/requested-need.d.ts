import { RequirementResponse } from 'ts4ocds/extensions/requirements';

export interface RequestedNeed {
  id: string;
  requirementResponses: RequirementResponse[];
}
