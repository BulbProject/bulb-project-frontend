import React, { useEffect, useMemo } from 'react';
import Flex from 'ustudio-ui/components/Flex';

import { useCategoryContext } from 'pages/category/store';
import { RequirementGroup } from '../RequirementGroup';
import { getBooleanGroup, getNonBooleanGroup, hasBooleanSelection } from './Criteria.module';

export const Criteria = ({
  isBooleanGroupActive,
  setBooleanGroupActive,
}: {
  isBooleanGroupActive: boolean;
  setBooleanGroupActive: (isActive: boolean) => void;
}) => {
  const { currentCriterion, dispatch, requestedNeed } = useCategoryContext();
  const { id, requirementGroups, activeRequirementGroup } = useMemo(() => currentCriterion, [currentCriterion]);

  const hasBooleanSelectionState = useMemo(() => hasBooleanSelection(requirementGroups), [id]);
  const booleanGroup = useMemo(() => getBooleanGroup(requirementGroups), [id]);
  const nonBooleanGroup = useMemo(() => getNonBooleanGroup(requirementGroups), [id]);

  useEffect(() => {
    setBooleanGroupActive(false);
  }, [currentCriterion.id]);

  useEffect(() => {
    if (hasBooleanSelectionState) {
      dispatch({
        type: 'set_active_requirement_group',
        payload: { requirementGroupId: (isBooleanGroupActive ? booleanGroup : nonBooleanGroup).id, criterionId: id },
      });
    }
  }, [isBooleanGroupActive]);

  useEffect(() => {
    if (hasBooleanSelectionState) {
      dispatch({
        type: 'set_active_requirement_group',
        payload: { requirementGroupId: nonBooleanGroup.id, criterionId: id },
      });
    }
  }, [currentCriterion.id, hasBooleanSelectionState]);

  useEffect(() => {
    if (hasBooleanSelectionState) {
      setBooleanGroupActive(requestedNeed[currentCriterion.id]?.[booleanGroup.requirements[0].id] as boolean);
    }
  }, [currentCriterion.id, hasBooleanSelectionState]);

  return (
    <Flex direction="column" margin={{ top: 'regular', bottom: 'large' }}>
      {requirementGroups.map((requirementGroup) => (
        <RequirementGroup
          {...requirementGroup}
          isActive={activeRequirementGroup === requirementGroup.id}
          booleanState={
            hasBooleanSelectionState
              ? {
                  hasBooleanSelection: true,
                  isBooleanGroupActive,
                  booleanGroupId: booleanGroup.id,
                }
              : undefined
          }
          setActive={(value?: boolean) => {
            if (value !== undefined) {
              setBooleanGroupActive(value);

              return;
            }

            dispatch({
              type: 'set_active_requirement_group',
              payload: { requirementGroupId: requirementGroup.id, criterionId: id },
            });
          }}
          key={requirementGroup.id}
        />
      ))}
    </Flex>
  );
};
