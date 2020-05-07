import type { Dispatch } from 'react';

import type { CategoriesListEntity, Criterion, RequestedNeed, RequirementGroup } from 'types/data';

import type { CategoryContextAction } from './actions';

interface ContextCriterion extends Criterion {
  activeRequirementGroup?: RequirementGroup;
}

export interface CategoryContextStateValue {
  category: Omit<CategoriesListEntity, 'date'>;
  currentCriterion: ContextCriterion;
  criteria: Record<string, ContextCriterion>;
  requestedNeed: Record<string, Record<string, unknown>>;
  requestedNeedData?: RequestedNeed;
}

export type CategoryContextDispatchValue = Dispatch<CategoryContextAction>;
