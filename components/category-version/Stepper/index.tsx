import React from 'react';

import { StepperProps } from './props';
import Step from './Step';
import Styled from './styles';

const Stepper = ({ steps, activeStep }: StepperProps) => {
  const isStepActive = (title: string) => steps.indexOf(title) <= steps.indexOf(activeStep);

  return (
    <Styled.Stepper length={steps.length}>
      {steps.map((step, index) => (
        <Step title={step} key={step} isActive={isStepActive(step)} index={index} />
      ))}
    </Styled.Stepper>
  );
};

export default Stepper;
