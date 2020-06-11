import type { Reducer } from 'react';

import type { FormValidationAction } from './actions';
import type { FormValidationContextState } from './FormValidation.types';

export const formValidationReducer: Reducer<FormValidationContextState, FormValidationAction> = (state, action) => {
  switch (action.type) {
    case 'set_error': {
      const { id, message } = action.payload;

      return {
        ...state,
        [id]: message,
      };
    }
    case 'clear_error': {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [action.payload.id]: _, ...newState } = state;

      return newState;
    }
    default: {
      return state;
    }
  }
};
