import { Reducer } from 'react';
import { FormValidationAction } from './actions';
import { FormValidationContextState } from './FormValidation.types';

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
      const { id } = action.payload;

      const newState = { ...state };
      delete newState[id];

      return newState;
    }
    default: {
      return state;
    }
  }
};
