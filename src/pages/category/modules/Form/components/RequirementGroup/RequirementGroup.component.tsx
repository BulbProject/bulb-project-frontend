import React, { useMemo } from 'react';
import { css } from 'styled-components';
import Dropdown from 'ustudio-ui/components/Dropdown';
import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import Checkbox from 'ustudio-ui/components/Checkbox';
import { FieldSet } from 'formfish';

import { RequirementGroup as RequirementGroupProps } from 'types/data';
import { sortById } from 'utils';

import { HiddenRequirement } from '../HiddenRequirement';
import { Requirement } from '../Requirement';

export const RequirementGroup: React.FC<
  RequirementGroupProps & {
    isActive: boolean;
    setActive: (value?: boolean) => void;
    booleanState?: {
      hasBooleanSelection: boolean;
      isBooleanGroupActive: boolean;
      booleanGroupId: string;
    };
  }
> = ({ isActive, setActive, booleanState, id, description, requirements }) => {
  const hasSingleRequirement = useMemo(() => requirements.length === 1, []);
  const { hasBooleanSelection, isBooleanGroupActive, booleanGroupId } = booleanState || {};

  const Title = () => {
    if (id === booleanGroupId) {
      return (
        <Flex alignment={{ vertical: 'center' }}>
          <Text color={isActive ? 'var(--c-primary)' : 'var(--c-darkest)'} appearance="bold">
            {description || requirements[0].title}
          </Text>

          <HiddenRequirement {...requirements[0]} />

          <Checkbox
            value={isBooleanGroupActive}
            onChange={setActive}
            styled={{
              CheckboxContainer: css`
                margin-left: var(--i-regular);
              `,
            }}
          />
        </Flex>
      );
    }

    return (
      <Flex alignment={{ vertical: 'center' }}>
        <Text color={isActive ? 'var(--c-primary)' : 'var(--c-darkest)'} appearance="bold">
          {description || requirements[0].title}
        </Text>

        {hasSingleRequirement && isActive && (
          <Flex margin={{ top: 'regular' }}>
            <FieldSet name={id}>
              <Requirement
                {...{
                  ...requirements[0],
                  title: '',
                  expectedValue: requirements[0].dataType === 'boolean' ? true : undefined,
                }}
                isDisabled={false}
              />
            </FieldSet>
          </Flex>
        )}
      </Flex>
    );
  };

  if (hasBooleanSelection) {
    if (id === booleanGroupId) {
      return (
        <Flex margin={{ top: 'regular' }}>
          <FieldSet name={id}>
            <Title />
          </FieldSet>
        </Flex>
      );
    }

    return (
      <Flex margin={{ top: 'regular' }}>
        <FieldSet name={id}>
          <Flex direction="column">
            <HiddenRequirement {...requirements[0]} />

            {requirements
              .slice(1)
              .sort(sortById)
              .map((requirement) => (
                <Requirement {...requirement} key={requirement.id} isDisabled={!isActive} />
              ))}
          </Flex>
        </FieldSet>
      </Flex>
    );
  }

  return (
    <Flex margin={{ top: 'regular' }}>
      <Dropdown isDefaultOpen={isActive} onChange={() => setActive()} title={<Title />}>
        <FieldSet name={id}>
          <Flex direction="column">
            <HiddenRequirement {...requirements[0]} />

            {requirements
              .slice(1)
              .sort(sortById)
              .map((requirement) => (
                <Requirement {...requirement} key={requirement.id} isDisabled={!isActive} />
              ))}
          </Flex>
        </FieldSet>
      </Dropdown>
    </Flex>
  );
};
