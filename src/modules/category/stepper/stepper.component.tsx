import React, { FC, useCallback } from 'react';
import Flex from 'ustudio-ui/components/Flex';
import { useMedia } from 'shared/hooks';

import { sortByValue } from 'shared/utils';

import { useStepperState } from '../stepper-state';

import { Step } from './step';

import Styled from './stepper.styles';

export const Stepper: FC = () => {
  const isMd = useMedia('screen and (min-width: 768px)');

  const { steps, currentStep, stepsTitles } = useStepperState();

  const isStepActive = useCallback(
    (stepTitle: string) => stepsTitles.indexOf(stepTitle) <= stepsTitles.indexOf(currentStep.title),
    [currentStep.title]
  );

  return (
    <Flex direction="column">
      <Styled.Stepper alignment={{ horizontal: 'center' }} length={Object.keys(steps).length}>
        {isMd() ? (
          Object.values(steps)
            .sort(sortByValue('id'))
            .map((step, index) => (
              <Step title={step.title} key={step.id} isActive={isStepActive(step.title)} index={index} />
            ))
        ) : (
          <div>
            <Styled.MobileStep align="center" color="var(--c-primary)" variant="h3">
              {currentStep.title}
            </Styled.MobileStep>
          </div>
        )}
      </Styled.Stepper>

      {currentStep.description && (
        <Styled.Description align="center" variant={isMd() ? 'h3' : 'body'}>
          {currentStep.description}
        </Styled.Description>
      )}
    </Flex>
  );
};
