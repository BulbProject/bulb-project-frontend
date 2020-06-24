import React, { FC } from 'react';
import { useStepperState } from '../../../stepper-state';
import { FormButton } from '../form-button';

export const BackButton: FC<{
  appearance: 'outlined' | 'text';
}> = ({ appearance }) => {
  const { goToStep, isFirstStep } = useStepperState();

  return (
    <FormButton appearance={appearance} isActive={!isFirstStep} onClick={goToStep((id) => id - 1)}>
      Назад
    </FormButton>
  );
};
