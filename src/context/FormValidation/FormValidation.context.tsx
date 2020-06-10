import React, { FC, createContext, useContext, useReducer } from 'react';

import type { FormValidationContextValue } from './FormValidation.types';
import { formValidationReducer } from './reducer';

const FormValidationContext = createContext<FormValidationContextValue | undefined>(undefined);

export const FormValidationContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(formValidationReducer, {});

  return (
    <FormValidationContext.Provider
      value={{ hasValidationFailed: Boolean(Object.keys(state).length), state, dispatch }}
    >
      {children}
    </FormValidationContext.Provider>
  );
};

export const useFormValidationContext = () => {
  const context = useContext(FormValidationContext);

  if (context === undefined) {
    throw new ReferenceError('Use FormValidationContext inside its provider.');
  }

  return context;
};
