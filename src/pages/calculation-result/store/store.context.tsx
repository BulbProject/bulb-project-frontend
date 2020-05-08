import React, { createContext, useContext, useReducer } from 'react';
import calculationContextReducer from './reducer';

import type { CalculationContextDispatchValue, CalculationContextStateValue } from './store.types';

const CalculationContextState = createContext<CalculationContextStateValue | undefined>(undefined);
const CalculationContextDispatch = createContext<CalculationContextDispatchValue | undefined>(undefined);

export const CalculationContextProvider: React.FC<CalculationContextStateValue> = ({
  children,
  category,
  requestedNeed,
}) => {
  const [state, dispatch] = useReducer(calculationContextReducer, { category, requestedNeed });

  return (
    <CalculationContextState.Provider value={state}>
      <CalculationContextDispatch.Provider value={dispatch}>{children}</CalculationContextDispatch.Provider>
    </CalculationContextState.Provider>
  );
};

export const useCalculationContext = (): CalculationContextStateValue & {
  dispatch: CalculationContextDispatchValue;
} => {
  const state = useContext(CalculationContextState);
  const dispatch = useContext(CalculationContextDispatch);

  if (state === undefined || dispatch === undefined) {
    throw new ReferenceError('useCalculationContext must be invoked inside of a calculation page.');
  }

  return { ...state, dispatch };
};
