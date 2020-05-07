import React, { useMemo } from 'react';
import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

import { RequirementGroup as RequirementGroupProps } from 'types/data';
import { Requirement } from 'components';
import { modifyId } from 'utils';

import { useCalculationContext } from '../../../../store';

import Styled from './RequirementGroup.styles';

export const RequirementGroup: React.FC<RequirementGroupProps> = ({ id, description, requirements }) => {
  const { category, requestedNeed } = useCalculationContext();

  const hasSingleRequirement = useMemo(() => requirements.length === 1, []);
  const hasSingleBooleanRequirement = useMemo(
    () => hasSingleRequirement && requirements[0].dataType === 'boolean' && 'expectedValue' in requirements[0],
    []
  );
  const currentCriterion = useMemo(
    () => category.criteria.filter((criterion) => criterion.id === modifyId(id, 2, () => 0))[0],
    []
  );

  return (
    <Flex direction="column">
      {!hasSingleBooleanRequirement && description && <Styled.Title color="var(--c-dark)">{description}</Styled.Title>}

      <Flex direction="column" margin={{ top: 'regular' }}>
        {hasSingleBooleanRequirement ? (
          <Requirement
            {...requirements[0]}
            isDisabled
            requestedNeed={requestedNeed}
            currentCriterion={currentCriterion}
          />
        ) : (
          requirements.map((requirement) => (
            <Requirement
              {...requirement}
              key={requirement.id}
              requestedNeed={requestedNeed}
              currentCriterion={currentCriterion}
            />
          ))
        )}
      </Flex>
    </Flex>
  );
};
