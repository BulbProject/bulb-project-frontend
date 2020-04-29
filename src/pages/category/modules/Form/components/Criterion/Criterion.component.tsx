import { Field, FieldSet } from 'formfish';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { css } from 'styled-components';
import Checkbox from 'ustudio-ui/components/Checkbox';
import Flex from 'ustudio-ui/components/Flex';
import Dropdown from 'ustudio-ui/components/Dropdown';
import Text from 'ustudio-ui/components/Text';

import { useCategoryContext } from 'pages/category/store';
import { RequirementGroup } from '../RequirementGroup';
import { getNonBooleanGroup, getBooleanGroup, hasBooleanSelection } from './Criterion.module';

export const Criterion = () => {
  const { currentCriterion, dispatch, requestedNeed } = useCategoryContext();
  const { requirementGroups, activeRequirementGroup } = currentCriterion;

  const setActiveRequirementGroup = useCallback(
    (requirementGroupId: string) => {
      dispatch({
        type: 'set_active_requirement_group',
        payload: { requirementGroupId, criterionId: currentCriterion.id },
      });
    },
    [currentCriterion.id]
  );

  const isRequirementGroupActive = useCallback(
    (requirementGroupId: string) => activeRequirementGroup === requirementGroupId,
    [activeRequirementGroup]
  );

  const hasBooleanSelectionState = useMemo(() => hasBooleanSelection(requirementGroups), [currentCriterion.id]);
  const booleanGroup = useMemo(() => getBooleanGroup(requirementGroups), [currentCriterion.id]);
  const nonBooleanGroup = useMemo(() => getNonBooleanGroup(requirementGroups), [currentCriterion.id]);
  const booleanRequirementValue = useMemo(
    () => Boolean(requestedNeed?.[currentCriterion.id]?.[booleanGroup?.requirements[0].id]),
    [currentCriterion.id]
  );

  const [isBooleanGroupActive, setBooleanGroupActive] = useState(booleanRequirementValue);

  useEffect(() => {
    if (hasBooleanSelectionState) {
      setActiveRequirementGroup(isBooleanGroupActive ? booleanGroup.id : nonBooleanGroup.id);
    }
  }, [hasBooleanSelectionState, isBooleanGroupActive, currentCriterion.id]);

  useEffect(() => {
    if (hasBooleanSelectionState) {
      setBooleanGroupActive(booleanRequirementValue);
    }
  }, [hasBooleanSelectionState, booleanRequirementValue, currentCriterion.id]);

  return (
    <Flex direction="column" margin={{ top: 'regular', bottom: 'large' }}>
      {hasBooleanSelectionState ? (
        <Flex direction="column">
          <RequirementGroup
            {...nonBooleanGroup}
            isActive={!isBooleanGroupActive}
            renderRequirementGroup={(_, children) => {
              return (
                <Flex direction="column" margin={{ bottom: 'large' }}>
                  {children}
                </Flex>
              );
            }}
          />

          <FieldSet name={booleanGroup.id}>
            <Flex direction="row" alignment={{ vertical: 'center' }}>
              <Text appearance="bold">{booleanGroup.requirements[0].title}</Text>

              <Field
                name={booleanGroup.requirements[0].id}
                watch={(state) => {
                  setBooleanGroupActive(state as boolean);
                }}
              >
                <Checkbox
                  defaultValue={booleanRequirementValue}
                  styled={{
                    CheckboxContainer: css`
                      margin-left: var(--i-regular);
                    `,
                  }}
                />
              </Field>
            </Flex>
          </FieldSet>
        </Flex>
      ) : (
        requirementGroups.map((requirementGroup) => (
          <RequirementGroup
            {...requirementGroup}
            isActive={isRequirementGroupActive(requirementGroup.id)}
            key={requirementGroup.id}
            renderRequirementGroup={(Title, children) => {
              return (
                <Dropdown
                  isDefaultOpen={isRequirementGroupActive(requirementGroup.id)}
                  onChange={() => {
                    setActiveRequirementGroup(requirementGroup.id);
                  }}
                  title={<Title />}
                >
                  {children}
                </Dropdown>
              );
            }}
          />
        ))
      )}
    </Flex>
  );
};
