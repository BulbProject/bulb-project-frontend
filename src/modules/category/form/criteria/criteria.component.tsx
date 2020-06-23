import React, { FC } from 'react';
import Flex from 'ustudio-ui/components/Flex';

import { useStepperState } from '../../stepper-state';

import { Criterion } from './criterion';

export const Criteria: FC = () => {
  const { steps, currentStep } = useStepperState();

  return (
    <Flex direction="column">
      {Object.values(steps).map((criterion) => {
        if (currentStep.id === criterion.id) {
          return <Criterion key={criterion.id} {...criterion} />;
        }

        return null;
      })}
    </Flex>
  );
};
