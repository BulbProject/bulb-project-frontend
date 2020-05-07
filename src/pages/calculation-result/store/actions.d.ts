import type { StoreRequestedNeed } from 'types/globals';

interface Recalculate {
  type: 'recalculate';
  payload: StoreRequestedNeed;
}

export type CalculationContextAction = Recalculate;
