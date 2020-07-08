import React, { FC, createContext, useContext, useReducer, useMemo } from 'react';

import { useStepperState } from 'modules/category/stepper-state';

import { useCalculation } from '../calculation';

import { FormValidatorValue, formValidatorReducer, FormValidatorDispatcher } from './entity';

const FormValidatorContext = createContext<FormValidatorValue | undefined>(undefined);

export const FormValidator: FC = ({ children }) => {
  const [state, dispatch] = useReducer(formValidatorReducer, {});
  const { selectedRequirementGroups } = useCalculation();
  const { currentStep } = useStepperState();

  const currentRequirementGroup = useMemo(() => selectedRequirementGroups[currentStep.id], [
    selectedRequirementGroups[currentStep.id],
  ]);

  return (
    <FormValidatorContext.Provider
      value={{
        hasValidationFailed:
          Object.keys(state).length > 0 &&
          Object.keys(state).some((id) => {
            return currentRequirementGroup && id.startsWith(currentRequirementGroup.id.slice(0, 4));
          }),
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
