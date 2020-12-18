import React, { FC } from 'react';
import Flex from 'ustudio-ui/components/Flex';
import FieldSet from 'formfish/components/FieldSet';

import { Requirement } from 'shared/components';
import { RequirementGroup as RequirementGroupProps } from 'shared/entity/data';
import { sortByValue } from 'shared/utils';

import { useStepperState } from '../../stepper-state';
import { useRequirementGroups } from '../hooks';

export const RequirementGroup: FC<RequirementGroupProps & { isDisabled?: boolean }> = ({
  id,
  requirements,
  isDisabled,
}) => {
  const { currentStep } = useStepperState();
  const requirementGroups = useRequirementGroups(currentStep);

  return (
    <FieldSet name={id}>
      <Flex margin={requirementGroups.length > 1 ? { top: 'regular' } : undefined} direction="column">
        {requirements.sort(sortByValue('id')).map((requirement) => (
          <Requirement
            {...requirement}
            isDisabled={isDisabled}
            key={requirement.id}
            criterion={currentStep}
            showCarousel
          />
        ))}
      </Flex>
    </FieldSet>
  );
};
