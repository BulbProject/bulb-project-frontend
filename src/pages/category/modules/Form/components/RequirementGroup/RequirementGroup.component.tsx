import React, { useMemo } from 'react';
import Flex from 'ustudio-ui/components/Flex';
import { FieldSet } from 'formfish';

import { RequirementGroup as RequirementGroupProps } from 'types/data';
import { sortById } from 'utils';

import { HiddenRequirement } from '../HiddenRequirement';
import { Requirement } from '../Requirement';

export const RequirementGroup: React.FC<RequirementGroupProps> = ({ id, requirements }) => {
  const hasSingleRequirement = useMemo(() => requirements.length === 1, [id]);
  const hasSingleBooleanRequirement = useMemo(
    () => hasSingleRequirement && requirements[0].dataType === 'boolean' && 'expectedValue' in requirements[0],
    [id]
  );

  return (
    <FieldSet name={id}>
      <Flex margin={{ top: hasSingleBooleanRequirement ? undefined : 'large' }}>
        {hasSingleBooleanRequirement && <HiddenRequirement {...requirements[0]} />}

        {!hasSingleBooleanRequirement && hasSingleRequirement && <Requirement {...requirements[0]} />}

        {!hasSingleBooleanRequirement && !hasSingleRequirement && (
          <Flex direction="column">
            <HiddenRequirement {...requirements[0]} />

            {requirements
              .slice(1)
              .sort(sortById)
              .map((requirement) => (
                <Requirement {...requirement} key={requirement.id} />
              ))}
          </Flex>
        )}
      </Flex>
    </FieldSet>
  );
};
