import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useStepperState } from '../../../stepper-state';
import { FormButton } from '../form-button';

export const BackButton: FC<{
  appearance: 'outlined' | 'text';
}> = ({ appearance }) => {
  const { goToStep, isFirstStep } = useStepperState();
  const { t } = useTranslation('form');

  return (
    <FormButton appearance={appearance} isActive={!isFirstStep} onClick={goToStep((id) => id - 1)}>
      {t('previous')}
    </FormButton>
  );
};
