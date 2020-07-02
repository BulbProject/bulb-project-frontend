import { AvailableVariant } from '../../../entity/data';

export interface CalculationResponse {
  requestedVariant?: string;
  recommendedVariant?: string;
  availableVariants: AvailableVariant[];
}
