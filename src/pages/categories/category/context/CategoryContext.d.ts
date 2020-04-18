import { Dispatch } from 'react';

import { CategoriesListEntity, Criterion, RequestedNeed } from 'types/data';

import { CategoryContextAction } from './actions';

interface ContextCriterion extends Criterion {
  activeRequirementGroup: string;
}

export interface CategoryContextStateValue {
  category: Omit<CategoriesListEntity, 'date'>;
  currentCriterion: ContextCriterion;
  criteria: Record<string, ContextCriterion>;
  requestedNeed: Record<string, Record<string, unknown>>;
  requestedNeedData?: RequestedNeed;
}

export type CategoryContextDispatchValue = Dispatch<CategoryContextAction>;
