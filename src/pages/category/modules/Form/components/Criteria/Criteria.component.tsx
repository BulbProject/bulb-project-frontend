import React from 'react';

import { useCategoryContext } from 'pages/category/store';
import { RequirementGroup } from '../RequirementGroup';

import Styled from './Criteria.styles';

const Criteria = () => {
  const { currentCriterion, dispatch } = useCategoryContext();

  return (
    <Styled.Criteria direction="column">
      {currentCriterion.requirementGroups.map(requirementGroup => (
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
    </Styled.Criteria>
  );
};

export default Criteria;
