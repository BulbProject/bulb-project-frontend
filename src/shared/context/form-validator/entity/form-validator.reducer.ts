import type { Reducer } from 'react';

import type { FormValidatorAction } from './form-validator.actions';
import type { FormValidatorState } from './context';

export const formValidatorReducer: Reducer<FormValidatorState, FormValidatorAction> = (state, action) => {
  switch (action.type) {
    case 'set_error': {
      const { id, message } = action.payload;

      return {
        ...state,
        [id]: message,
      };
    }
    case 'clear_error': {
      const { [action.payload.id]: _, ...newState } = state;

      return newState;
    }
    default: {
      return state;
    }
  }
};
