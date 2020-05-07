import type { Reducer } from 'react';

import type { CalculationContextAction } from './actions';
import type { CalculationContextStateValue } from './store.types';

const calculationContextReducer: Reducer<CalculationContextStateValue, CalculationContextAction> = (state, action) => {
  switch (action.type) {
    case 'recalculate': {
      return {
        ...state,
        requestedNeed: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default calculationContextReducer;
