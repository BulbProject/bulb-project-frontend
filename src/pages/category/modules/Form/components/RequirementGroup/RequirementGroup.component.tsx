import React, { ReactElement } from 'react';
import Dropdown from 'ustudio-ui/components/Dropdown';
import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import { FieldSet } from 'formfish';

import { RequirementGroup as RequirementGroupProps } from 'types/data';
import { sortById } from 'utils';

import { HiddenRequirement } from '../HiddenRequirement';
import { Requirement } from '../Requirement';

export const RequirementGroup: React.FC<
  RequirementGroupProps & {
    isActive: boolean;
    renderRequirementGroup: (Title: React.FC, children: ReactElement) => ReactElement;
  }
> = ({ isActive, id, description, requirements, renderRequirementGroup }) => {
  const hasSingleRequirement = () => requirements.length === 1;

  const Title = () => (
    <Flex alignment={{ vertical: 'center' }}>
      <Text color={isActive ? 'var(--c-primary)' : 'var(--c-darkest)'} appearance="bold">
        {description || requirements[0].title}
      </Text>

      {hasSingleRequirement() && isActive && (
        <FieldSet name={id}>
          <Requirement
            {...{
              ...requirements[0],
              title: '',
              expectedValue: requirements[0].dataType === 'boolean' ? true : undefined,
            }}
          />
        </FieldSet>
      )}
    </Flex>
  );

  return (
    <Flex margin={{ top: 'regular' }}>
      {renderRequirementGroup(
        Title,
        <FieldSet name={id}>
          <>
            <HiddenRequirement {...requirements[0]} />

            {requirements
              .slice(1)
              .sort(sortById)
              .map((requirement) => (
                <Requirement {...requirement} key={requirement.id} />
              ))}
          </>
        </FieldSet>
      )}
    </Flex>
  );
};
