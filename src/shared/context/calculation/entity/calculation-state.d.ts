import { AvailableVariant, RequestedNeed, RequirementGroup } from 'shared/entity/data';

export interface CalculationState {
  selectedRequirementGroups: Record<string, RequirementGroup | undefined>;
  formData: Record<string, unknown>;
  calculationPayload?: RequestedNeed;
  calculationData?: AvailableVariant[];
}
