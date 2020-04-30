import React, { useMemo } from 'react';
import { css } from 'styled-components';
import Dropdown from 'ustudio-ui/components/Dropdown';
import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import { FieldSet } from 'formfish';

import { RequirementGroup as RequirementGroupProps } from 'types/data';
import { sortById } from 'utils';
import { useCategoryContext } from '../../../../store';

import { HiddenRequirement } from '../HiddenRequirement';
import { Requirement } from '../Requirement';

export const RequirementGroup: React.FC<
  RequirementGroupProps & {
    isActive: boolean;
    hasBooleanSelection: boolean;
    hasDropdown: boolean;
    isTitleActive?: boolean;
    toggleGroup?(state: boolean): void;
  }
> = ({
  isActive,
  isTitleActive = true,
  hasDropdown,
  hasBooleanSelection,
  toggleGroup,
  id,
  description,
  requirements,
}) => {
  const { dispatch, currentCriterion } = useCategoryContext();

  const hasSingleRequirement = useMemo(() => requirements.length === 1, [id]);

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

      {hasSingleRequirement && isActive && (
        <FieldSet name={id}>
          <Requirement
            {...{
              ...requirements[0],
              title: '',
              expectedValue: requirements[0].dataType === 'boolean' ? false : undefined,
            }}
            isActive={isActive}
            hasBooleanSelection={hasBooleanSelection}
            toggleGroup={hasBooleanSelection ? toggleGroup : undefined}
          />
        </FieldSet>
      )}
    </Flex>
  );

  const Body = () => {
    return (
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
    );
  };

  const renderRequirementGroup = () => {
    if (hasBooleanSelection) {
      return <Title />;
    }

    if (hasDropdown) {
      return (
        <Dropdown
          isDefaultOpen={isActive}
          onChange={() => {
            dispatch({
              type: 'set_active_requirement_group',
              payload: { requirementGroupId: id, criterionId: currentCriterion.id },
            });
          }}
          title={<Title />}
        >
          <Body />
        </Dropdown>
      );
    }

    return <Body />;
  };

  return (
    <Flex direction="column" margin={{ top: 'regular' }}>
      {renderRequirementGroup()}
    </Flex>
  );
};
