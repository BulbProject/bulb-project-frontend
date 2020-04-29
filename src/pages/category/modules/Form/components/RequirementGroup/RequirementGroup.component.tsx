import React, { ReactElement } from 'react';
import { css } from 'styled-components';
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
    isTitleActive?: boolean;
    toggleGroup?(state: boolean): void;
  }
> = ({ isActive, isTitleActive = true, toggleGroup, id, description, requirements, renderRequirementGroup }) => {
  const hasSingleRequirement = () => requirements.length === 1;

  const Title = () => (
    <Flex alignment={{ vertical: 'center' }}>
      <Text
        appearance="bold"
        styled={{
          Text: css`
            color: ${isActive && isTitleActive ? 'var(--c-primary)' : 'var(--c-darkest)'};
            margin-right: var(--i-regular);
          `,
        }}
      >
        {description || requirements[0].title}
      </Text>

      {hasSingleRequirement() && isActive && (
        <FieldSet name={id}>
          <Requirement
            {...{
              ...requirements[0],
              title: '',
              expectedValue: requirements[0].dataType === 'boolean' ? false : undefined,
            }}
            isActive={isActive}
            toggleGroup={toggleGroup}
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
                <Requirement {...requirement} key={requirement.id} isActive={isActive} />
              ))}
          </>
        </FieldSet>
      )}
    </Flex>
  );
};
