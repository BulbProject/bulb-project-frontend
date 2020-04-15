import { Dispatch } from 'react';

import { Criterion } from 'types/data';

import { CategoryContextAction } from './actions';

interface ContextCriterion extends Criterion {
  activeRequirementGroup: string;
}

export interface CategoryContextStateValue {
  currentCriterion: ContextCriterion;
  criteria: Record<string, ContextCriterion>;
  requestedNeed: Record<string, Record<string, unknown>>;
}

export type CategoryContextDispatchValue = Dispatch<CategoryContextAction>;
