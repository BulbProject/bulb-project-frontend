import React, { Dispatch, SetStateAction } from 'react';
import { Criterion } from 'types/data';
import { Grid, Cell, Flex, Text } from 'ustudio-ui';
import { containerCellProps } from '../../config';

import { Step, StepperButton } from './components';

import Styled from './styles';

export interface StepperProps {
  steps: Criterion[];
  currentStep: Criterion;
  setCurrentStep: Dispatch<SetStateAction<Criterion>>;
}

const Stepper = ({ steps, currentStep, setCurrentStep }: StepperProps) => {
  const { title } = currentStep;

  const titles = steps.map(step => step.title);

  const isStepActive = (stepTitle: string): boolean => titles.indexOf(stepTitle) <= titles.indexOf(currentStep.title);
  const isLastStep = (): boolean => titles.indexOf(title) === steps.length - 1;
  const isFirstStep = (): boolean => titles.indexOf(title) === 0;

  return (
    <Flex direction="column">
      <Styled.Stepper length={steps.length}>
        {steps.map((step, index) => (
          <Step title={step.title} key={step.id} isActive={isStepActive(step.title)} index={index} />
        ))}
      </Styled.Stepper>

      <Grid isContainer>
        <Cell xs={containerCellProps}>
          <Flex direction="column">
            <Text align="center" variant="h3">
              {title}
            </Text>

            <Flex alignment={{ horizontal: 'space-between' }}>
              <StepperButton
                isActive={!isFirstStep()}
                onClick={() => setCurrentStep(steps[steps.indexOf(currentStep) - 1])}
              >
                Previous
              </StepperButton>

              <StepperButton
                isActive={!isLastStep()}
                onClick={() => setCurrentStep(steps[steps.indexOf(currentStep) + 1])}
              >
                Next
              </StepperButton>
            </Flex>
          </Flex>
        </Cell>
      </Grid>
    </Flex>
  );
};

export default Stepper;
