import React, { FC, createContext, useContext, useReducer } from 'react';

import { useStepperState } from 'modules/category/stepper-state';

import { FormValidatorValue, formValidatorReducer, FormValidatorDispatcher } from './entity';

const FormValidatorContext = createContext<FormValidatorValue | undefined>(undefined);

export const FormValidator: FC = ({ children }) => {
  const [state, dispatch] = useReducer(formValidatorReducer, {});
  const { currentStep } = useStepperState();

  return (
    <FormValidatorContext.Provider
      value={{
        hasValidationFailed: Boolean(Object.keys(state).length) && Object.keys(state).includes(currentStep.id),
        state,
        dispatch: new FormValidatorDispatcher(dispatch),
      }}
    >
      {children}
    </FormValidatorContext.Provider>
  );
};

export const useFormValidator = (): FormValidatorValue => {
  const context = useContext(FormValidatorContext);

  if (context === undefined) {
    throw new ReferenceError('Use FormValidator inside its provider.');
  }

  return context;
};
