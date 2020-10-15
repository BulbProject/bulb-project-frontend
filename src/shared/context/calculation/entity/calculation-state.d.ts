import { RequestedNeed, RequirementGroup } from 'shared/entity/data';
import { CalculationResponse } from './calculation-response';

export interface CalculationState {
  selectedRequirementGroups: Record<string, RequirementGroup | undefined>;
  formData: Record<string>;
  calculationPayload?: RequestedNeed;
  calculationData?: CalculationResponse;
}
