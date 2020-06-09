import React, { FC, createContext, useContext, useReducer } from 'react';
import { FormValidationContextValue } from './FormValidation.types';
import { formValidationReducer } from './reducer';

const FormValidationContext = createContext<FormValidationContextValue | undefined>(undefined);

export const FormValidationContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(formValidationReducer, {});

  return <FormValidationContext.Provider value={{ state, dispatch }}>{children}</FormValidationContext.Provider>;
};

export const useFormValidationContext = () => {
  const context = useContext(FormValidationContext);

  if (context === undefined) {
    throw new ReferenceError('Use FormValidationContext inside its provider.');
  }

  return context;
};
