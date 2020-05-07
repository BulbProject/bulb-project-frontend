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

import Styled from './RequirementGroup.styles';

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
        <>
          <Styled.RequirementGroup>
            <Flex alignment={{ vertical: 'center', horizontal: 'end' }} margin={{ top: 'large' }}>
              <Text
                color={isActive ? 'var(--c-primary)' : 'var(--c-darkest)'}
                appearance="bold"
                variant="caption"
                styled={{
                  Text: css`
                    &:hover {
                      cursor: pointer;
                    }
                  `,
                }}
              >
                {description || requirements[0].title}
              </Text>

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
          </Styled.RequirementGroup>

          <HiddenRequirement {...requirements[0]} />
        </>
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

  const Body = (
    <Flex direction="column">
      <HiddenRequirement {...requirements[0]} />

      {requirements
        .slice(1)
        .sort(sortById)
        .map((requirement) => (
          <Requirement {...requirement} key={requirement.id} isDisabled={!isActive} />
        ))}
    </Flex>
  );

  if (hasBooleanSelection) {
    if (id === booleanGroupId) {
      return (
        <Styled.RequirementGroup>
          <FieldSet name={id}>
            <Title />
          </FieldSet>
        </Styled.RequirementGroup>
      );
    }

    return (
      <Styled.RequirementGroup>
        <FieldSet name={id}>{Body}</FieldSet>
      </Styled.RequirementGroup>
    );
  }

  return (
    <Styled.RequirementGroup>
      <Dropdown isDefaultOpen={isActive} onChange={() => setActive()} title={<Title />}>
        <FieldSet name={id}>{Body}</FieldSet>
      </Dropdown>
    </Styled.RequirementGroup>
  );
};
