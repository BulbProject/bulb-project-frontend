import React, { useCallback, useMemo } from 'react';
import Flex from 'ustudio-ui/components/Flex';

import { useCategoryContext } from 'pages/category/store';
import { RequirementGroup } from '../RequirementGroup';
import { getNonBooleanGroup, getBooleanGroup, hasBooleanSelection } from './Criterion.module';

export const Criterion = () => {
  const { currentCriterion, dispatch } = useCategoryContext();
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

  const hasBooleanSelectionState = useMemo(() => hasBooleanSelection(requirementGroups), [currentCriterion.id]);
  const booleanGroup = useMemo(() => getBooleanGroup(requirementGroups), [currentCriterion.id]);
  const nonBooleanGroup = useMemo(() => getNonBooleanGroup(requirementGroups), [currentCriterion.id]);

  const isRequirementGroupActive = useCallback(
    (requirementGroupId: string) => activeRequirementGroup === requirementGroupId,
    [activeRequirementGroup]
  );
  const isGroupBoolean = useCallback((requirementGroupId: string) => requirementGroupId === booleanGroup?.id, [
    booleanGroup,
  ]);
  const isGroupNonBoolean = useCallback((requirementGroupId: string) => requirementGroupId === nonBooleanGroup?.id, [
    nonBooleanGroup,
  ]);

  /*useEffect(() => {
    if (hasBooleanSelectionState) {
      setActiveRequirementGroup(isBooleanGroupActive ? booleanGroup.id : nonBooleanGroup.id);
    }
  }, [hasBooleanSelectionState, isBooleanGroupActive, currentCriterion.id]);*/

  return (
    <Flex direction="column" margin={{ top: 'regular', bottom: 'large' }}>
      {requirementGroups.map((requirementGroup) => (
        <RequirementGroup
          {...requirementGroup}
          isActive={isRequirementGroupActive(requirementGroup.id) || isGroupBoolean(requirementGroup.id)}
          key={requirementGroup.id}
          hasBooleanSelection={hasBooleanSelectionState && isGroupBoolean(requirementGroup.id)}
          hasDropdown={!(hasBooleanSelectionState && isGroupNonBoolean(requirementGroup.id))}
          isTitleActive={!isGroupBoolean(requirementGroup.id)}
          toggleGroup={hasBooleanSelectionState && isGroupBoolean(requirementGroup.id) ? console.log : undefined}
        />
      ))}
    </Flex>
  );
};
