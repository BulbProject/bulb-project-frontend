import React, { useMemo } from 'react';
import { css } from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';
import Select from 'ustudio-ui/components/Select/Select';

import { useCategoryContext } from 'pages/category/store';
import { Mixin } from 'ustudio-ui/theme';
import { RequirementGroup } from '../RequirementGroup';

export const Criteria = () => {
  const { currentCriterion, dispatch } = useCategoryContext();
  const { requirementGroups, activeRequirementGroup } = useMemo(() => currentCriterion, [currentCriterion]);

  return (
    <Flex direction="column">
      <Select
        placeholder="Виберіть один із доступних варіантів"
        items={requirementGroups.reduce((items, requirementGroup) => {
          return Object.assign(items, {
            [requirementGroup.id]: {
              value: requirementGroup.id,
              label: requirementGroup.description,
            },
          });
        }, {})}
        value={activeRequirementGroup?.id}
        onChange={(requirementGroupId) =>
          dispatch({
            type: 'set_active_requirement_group',
            payload: {
              requirementGroup: currentCriterion.requirementGroups.filter(
                (requirementGroup) => requirementGroup.id === requirementGroupId
              )[0],
              criterionId: currentCriterion.id,
            },
          })
        }
        styled={{
          Select: css`
            ${activeRequirementGroup ? Mixin.Font.bodyBold() : ''};
          `,
          ValuesListItem: css`
            &:before {
              background: var(--c-primary);
            }
          `,
        }}
      />

      {activeRequirementGroup && <RequirementGroup {...activeRequirementGroup} />}
    </Flex>
  );
};
