import React from 'react';
import Flex from 'ustudio-ui/components/Flex';
import { FieldSet } from 'formfish';

import { RequirementGroup as RequirementGroupProps } from 'types/data';
import { sortByValue } from 'utils';
import { Requirement } from 'components';
import { useCategoryContext } from '../../../../store';

export const RequirementGroup: React.FC<RequirementGroupProps & { isDisabled?: boolean }> = ({
  id,
  requirements,
  isDisabled,
}) => {
  const { requestedNeed, currentCriterion } = useCategoryContext();

  return (
    <FieldSet name={id}>
      <Flex margin={{ top: 'regular' }} direction="column">
        {requirements.sort(sortByValue('id')).map((requirement) => (
          <Requirement
            {...requirement}
            isDisabled={isDisabled}
            key={requirement.id}
            requestedNeed={requestedNeed}
            currentCriterion={currentCriterion}
          />
        ))}
      </Flex>
    </FieldSet>
  );
};
