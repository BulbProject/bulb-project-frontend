import React, { FC, useEffect, useMemo } from 'react';
import { css } from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';
import Select from 'ustudio-ui/components/Select/Select';
import { Mixin } from 'ustudio-ui/theme';
import { useTranslation } from 'react-i18next';

import { Criterion as CriterionProps, RequirementGroup as RequirementGroupType } from 'shared/entity/data';
import { useCalculation } from 'shared/context/calculation';

import { BinaryGroup } from '../../binary-group';
import { RequirementGroup } from '../../requirement-group';

const isGroupBoolean = (requirementGroup: RequirementGroupType): boolean => {
  return (
    requirementGroup.requirements.length === 1 &&
    requirementGroup.requirements[0].dataType === 'boolean' &&
    'expectedValue' in requirementGroup.requirements[0]
  );
};

const filterBooleanGroups = (requirementGroups: RequirementGroupType[]): RequirementGroupType[] => {
  return requirementGroups.filter(isGroupBoolean);
};

const getBooleanGroup = (requirementGroups: RequirementGroupType[]): RequirementGroupType => {
  return filterBooleanGroups(requirementGroups)[0];
};

const getNonBooleanGroup = (requirementGroups: RequirementGroupType[]): RequirementGroupType => {
  return requirementGroups.filter((requirementGroup) => !isGroupBoolean(requirementGroup))[0];
};

const hasBinarySelection = (requirementGroups: RequirementGroupType[]): boolean => {
  const hasTwoGroups = requirementGroups.length === 2;

  const hasBooleanGroup = filterBooleanGroups(requirementGroups).length === 1;

  return hasTwoGroups && hasBooleanGroup;
};

export const Criterion: FC<CriterionProps> = ({ requirementGroups, id }) => {
  const { t } = useTranslation(['common', 'criterion']);
  const { selectedRequirementGroups, dispatch } = useCalculation();

  const selectedRequirementGroup = useMemo(() => selectedRequirementGroups?.[id], [selectedRequirementGroups]);

  useEffect(() => {
    if (requirementGroups.length === 1) {
      dispatch.selectRequirementGroup({
        criterionId: id,
        requirementGroup: requirementGroups[0],
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
          placeholder={t('common:choose-option')}
          // Select props declaration miss this prop
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          emptyListMessage={t('criterion:nothing-found')}
          items={requirementGroups.reduce((items, requirementGroup) => {
            return Object.assign(items, {
              [requirementGroup.id]: {
                value: requirementGroup.id,
                label: `${requirementGroup.description}`,
              },
            });
          }, {})}
          value={selectedRequirementGroup?.id}
          onChange={(requirementGroupId) =>
            dispatch.selectRequirementGroup({
              criterionId: id,
              requirementGroup: requirementGroups.find(
                (requirementGroup) => requirementGroup.id === requirementGroupId
              ),
            })
          }
          styled={{
            Select: css`
              ${selectedRequirementGroup ? Mixin.Font.bodyBold() : ''};
            `,
            ValuesListItem: css`
              &:before {
                background: var(--c-primary-light);
              }
            `,
          }}
        />
      )}

      {selectedRequirementGroup && <RequirementGroup {...selectedRequirementGroup} />}
    </Flex>
  );
};
