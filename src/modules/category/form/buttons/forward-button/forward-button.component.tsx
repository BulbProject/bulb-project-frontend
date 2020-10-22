import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useCalculation } from 'shared/context/calculation';

import { useStepperState } from '../../../stepper-state';
import { FormButton } from '../form-button';

export const ForwardButton: FC<{
  appearance: 'contained' | 'text';
  onFinish(): void;
}> = ({ onFinish, appearance }) => {
  const { isLastStep, goToStep, isNextStepAvailable, currentStep } = useStepperState();
  const { selectedRequirementGroups } = useCalculation();
  const { t } = useTranslation('form');

  return isLastStep ? (
    <FormButton
      intent="positive"
      appearance={appearance}
      isActive
      onClick={onFinish}
      isDisabled={!selectedRequirementGroups[currentStep.id] || !isNextStepAvailable}
    >
      {t('finish')}
    </FormButton>
  ) : (
    <FormButton
      appearance={appearance}
      isActive
      onClick={goToStep((id) => id + 1)}
      isDisabled={!selectedRequirementGroups[currentStep.id] || !isNextStepAvailable}
    >
      {t('next')}
    </FormButton>
  );
};
