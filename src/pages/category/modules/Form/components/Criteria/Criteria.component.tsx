import React from 'react';
import Flex from 'ustudio-ui/components/Flex';

import { useCategoryContext } from 'pages/category/store';
import { RequirementGroup } from '../RequirementGroup';

export const Criteria = () => {
  const { currentCriterion, dispatch } = useCategoryContext();

  return (
    <Flex direction="column" margin={{ top: 'regular', bottom: 'large' }}>
      {currentCriterion.requirementGroups.map((requirementGroup) => (
        <RequirementGroup
          {...requirementGroup}
          isActive={currentCriterion.activeRequirementGroup === requirementGroup.id}
          setActive={(requirementGroupId: string) =>
            dispatch({
              type: 'set_active_requirement_group',
              payload: { requirementGroupId, criterionId: currentCriterion.id },
            })
          }
          key={requirementGroup.id}
        />
      ))}
    </Flex>
  );
};
