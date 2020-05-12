import type { Dispatch } from 'react';

import type { AvailableVariant, Category } from 'types/data';
import type { StoreRequestedNeed } from 'types/globals';

import type { CalculationContextAction } from './actions';

export interface CalculationContextStateValue {
  category: Category;
  requestedNeed: StoreRequestedNeed;
}

export type CalculationContextDispatchValue = Dispatch<CalculationContextAction>;
