import { containerCellProps } from 'pages/categories/[categoryId]/[version]/config';
import React, { useState } from 'react';
import { Grid, Cell, Flex } from 'ustudio-ui';

import { Step, StepperButton } from './components';
import { StepProps } from './components/Step';

import Styled from './styles';

export interface StepperProps {
  steps: StepProps['title'][];
}

const Stepper: React.FC<StepperProps> = ({ steps, children }) => {
  const [currentStep, setCurrentStep] = useState(steps[0]);

  const isStepActive = (title: string): boolean => steps.indexOf(title) <= steps.indexOf(currentStep);
  const isLastStep = (): boolean => steps.indexOf(currentStep) === steps.length - 1;
  const isFirstStep = (): boolean => steps.indexOf(currentStep) === 0;

  return (
    <Flex direction="column">
      <Styled.Stepper length={steps.length}>
        {steps.map((step, index) => (
          <Step title={step} key={step} isActive={isStepActive(step)} index={index} />
        ))}
      </Styled.Stepper>

      <Grid isContainer>
        <Cell xs={containerCellProps}>
          <Flex direction="column">
            {children}

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
