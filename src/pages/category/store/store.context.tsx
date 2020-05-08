import React, { createContext, useContext, useReducer } from 'react';
import type { CategoriesListEntity, Criterion } from 'types/data';

import type { CategoryContextDispatchValue, CategoryContextStateValue } from './store.types';
import categoryContextReducer from './reducer';

const CategoryContextState = createContext<CategoryContextStateValue | undefined>(undefined);
const CategoryContextDispatch = createContext<CategoryContextDispatchValue | undefined>(undefined);

export const CategoryContextProvider: React.FC<{
  category: Omit<CategoriesListEntity, 'date'>;
  criteria: Criterion[];
}> = ({ children, category, criteria }) => {
  const [state, dispatch] = useReducer(categoryContextReducer, {
    category,
    requestedNeed: {},
    criteria: criteria.reduce((map, criterion) => Object.assign(map, { [criterion.id]: criterion }), {}),
    currentCriterion: {
      ...criteria[0],
    },
  });

  return (
    <CategoryContextState.Provider value={state}>
      <CategoryContextDispatch.Provider value={dispatch}>{children}</CategoryContextDispatch.Provider>
    </CategoryContextState.Provider>
  );
};

export const useCategoryContext = (): CategoryContextStateValue & { dispatch: CategoryContextDispatchValue } => {
  const state = useContext(CategoryContextState);
  const dispatch = useContext(CategoryContextDispatch);

  if (state === undefined || dispatch === undefined) {
    throw new ReferenceError('useCategoryContext must be invoked inside of a category.');
  }

  return { ...state, dispatch };
};
