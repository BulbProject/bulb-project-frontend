import React from 'react';
import Flex from 'ustudio-ui/components/Flex';
import Dropdown from 'ustudio-ui/components/Dropdown';

import { useCategoryContext } from 'pages/category/store';
import { RequirementGroup } from '../RequirementGroup';

export const Criterion = () => {
  const { currentCriterion, dispatch } = useCategoryContext();
  const isRequirementGroupActive = (requirementGroupId: string) =>
    currentCriterion.activeRequirementGroup === requirementGroupId;

  return (
    <Flex direction="column" margin={{ top: 'regular', bottom: 'large' }}>
      {currentCriterion.requirementGroups.map((requirementGroup) => (
        <RequirementGroup
          {...requirementGroup}
          isActive={isRequirementGroupActive(requirementGroup.id)}
          key={requirementGroup.id}
          renderRequirementGroup={(Title, children) => {
            return (
              <Dropdown
                isDefaultOpen={isRequirementGroupActive(requirementGroup.id)}
                onChange={() => {
                  dispatch({
                    type: 'set_active_requirement_group',
                    payload: { requirementGroupId: requirementGroup.id, criterionId: currentCriterion.id },
                  });
                }}
                title={<Title />}
              >
                {children}
              </Dropdown>
            );
          }}
        />
      ))}
    </Flex>
  );
};
