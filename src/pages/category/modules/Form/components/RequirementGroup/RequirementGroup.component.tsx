import React, { useMemo } from 'react';
import Flex from 'ustudio-ui/components/Flex';
import { FieldSet } from 'formfish';

import { RequirementGroup as RequirementGroupProps } from 'types/data';
import { sortById } from 'utils';
import { Requirement } from 'components';
import { useCategoryContext } from '../../../../store';

import { HiddenRequirement } from '../HiddenRequirement';

export const RequirementGroup: React.FC<RequirementGroupProps> = ({ id, requirements }) => {
  const { requestedNeed, currentCriterion } = useCategoryContext();

  const hasSingleRequirement = useMemo(() => requirements.length === 1, [id]);
  const hasSingleBooleanRequirement = useMemo(
    () => hasSingleRequirement && requirements[0].dataType === 'boolean' && 'expectedValue' in requirements[0],
    [id]
  );

  return (
    <FieldSet name={id}>
      <Flex margin={{ top: hasSingleBooleanRequirement ? undefined : 'regular' }}>
        {hasSingleBooleanRequirement ? (
          <HiddenRequirement {...requirements[0]} />
        ) : (
          <Flex direction="column">
            {requirements.sort(sortById).map((requirement) => (
              <Requirement
                {...requirement}
                key={requirement.id}
                requestedNeed={requestedNeed}
                currentCriterion={currentCriterion}
              />
            ))}
          </Flex>
        )}
      </Flex>
    </FieldSet>
  );
};
