import React, { useEffect, useMemo } from 'react';
import { css } from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';
import Select from 'ustudio-ui/components/Select/Select';
import { Mixin } from 'ustudio-ui/theme';

import { useCategoryContext } from 'pages/category/store';
import { Criterion as CriterionProps } from 'types/data';

import { BinaryGroup } from '../BinaryGroup';
import { RequirementGroup } from '../RequirementGroup';

import { getBooleanGroup, getNonBooleanGroup, hasBinarySelection } from './Criterion.module';

export const Criterion: React.FC<CriterionProps> = ({ requirementGroups }) => {
  const { currentCriterion, dispatch } = useCategoryContext();
  const { activeRequirementGroup } = currentCriterion;

  useEffect(() => {
    if (requirementGroups.length === 1) {
      dispatch({
        type: 'set_active_requirement_group',
        payload: {
          requirementGroup: currentCriterion.requirementGroups[0],
          criterionId: currentCriterion.id,
        },
      });
    }
  }, []);

  const { hasBinaryGroups, booleanGroup, nonBooleanGroup } = useMemo(
    () => ({
      hasBinaryGroups: hasBinarySelection(requirementGroups),
      booleanGroup: getBooleanGroup(requirementGroups),
      nonBooleanGroup: getNonBooleanGroup(requirementGroups),
    }),
    []
  );

  if (hasBinaryGroups && booleanGroup && nonBooleanGroup) {
    return <BinaryGroup booleanGroup={booleanGroup} nonBooleanGroup={nonBooleanGroup} />;
  }

  return (
    <Flex direction="column">
      {requirementGroups.length > 1 && (
        <Select
          autocomplete={requirementGroups.length >= 10}
          placeholder="Виберіть один із доступних варіантів"
          items={requirementGroups.reduce((items, requirementGroup) => {
            return Object.assign(items, {
              [requirementGroup.id]: {
                value: requirementGroup.id,
                label: `${requirementGroup.description}`,
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
                background: var(--c-primary-light);
              }
            `,
          }}
        />
      )}

      {activeRequirementGroup && <RequirementGroup {...activeRequirementGroup} />}
    </Flex>
  );
};
