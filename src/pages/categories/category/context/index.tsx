import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { Criterion } from 'types/data';

import { CategoryContextDispatchValue, CategoryContextStateValue } from './CategoryContext';
import categoryContextReducer from './reducer';

const CategoryContextState = createContext<CategoryContextStateValue | undefined>(undefined);
const CategoryContextDispatch = createContext<CategoryContextDispatchValue | undefined>(undefined);

const CategoryContextProvider: React.FC<{ criteria: Criterion[] }> = ({ children, criteria }) => {
  const [categoryState, dispatch] = useReducer(categoryContextReducer, {
    requestedNeed: {},
    criteria: criteria.reduce((map, criterion) => Object.assign(map, { [criterion.id]: criterion }), {}),
    currentCriterion: {
      ...criteria[0],
      activeRequirementGroup: '',
    },
  });

  const state = useMemo(() => categoryState, [categoryState]);

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

export default CategoryContextProvider;
