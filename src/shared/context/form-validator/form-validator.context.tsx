import React, { FC, createContext, useContext, useReducer, useCallback } from 'react';

import { useCalculation } from '../calculation';

import { FormValidatorValue, formValidatorReducer, FormValidatorDispatcher } from './entity';

const FormValidatorContext = createContext<FormValidatorValue | undefined>(undefined);

export const FormValidator: FC = ({ children }) => {
  const [state, dispatch] = useReducer(formValidatorReducer, {});
  const { selectedRequirementGroups } = useCalculation();

  const getCurrentRequirementGroup = useCallback((criterionId = '') => selectedRequirementGroups?.[criterionId], [
    selectedRequirementGroups,
  ]);

  return (
    <FormValidatorContext.Provider
      value={{
        hasValidationFailed(criterionId?: string) {
          const currentRequirementGroup = getCurrentRequirementGroup(criterionId);

          return (
            Object.keys(state).length > 0 &&
            Object.keys(state).some((id) => {
              return currentRequirementGroup ? id.startsWith(currentRequirementGroup.id.slice(0, 4)) : true;
            })
          );
        },
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
