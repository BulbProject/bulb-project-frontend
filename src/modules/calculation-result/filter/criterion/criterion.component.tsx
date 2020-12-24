import React, { FC, useEffect } from 'react';
import { FieldSet } from 'formfish';
import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

import useMount from 'honks/use-mount';

import type { Criterion as CriterionProps, RequestedNeed } from 'shared/entity/data';
import { useCalculation } from 'shared/context/calculation';
import { useRequirementGroups } from 'shared/hooks';

import { RequirementGroup } from './requirement-group';

import Styled from './criterion.styles';

export const Criterion: FC<CriterionProps> = (criterion) => {
  const { id, title } = criterion;

  const { calculationPayload, dispatch } = useCalculation();

  const hasMounted = useMount();

  useEffect(() => {
    if (hasMounted()) {
      dispatch.addFormData({
        criterionId: id,
        requirements: (calculationPayload as RequestedNeed).requirementResponses
          .filter(({ requirement }) => {
            return new RegExp(`^${id.slice(0, 2)}`, 'u').test(requirement.id);
          })
          .reduce((requirements, { requirement, value }) => {
            return Object.assign(requirements, { [requirement.id]: value });
          }, {}),
      });
    }
  }, [hasMounted()]);

  const requirementGroups = useRequirementGroups(criterion);

  return (
    <Flex direction="column">
      <Text appearance="bold" color="var(--c-secondary)">
        {title}
      </Text>

      {hasMounted() && (
        <FieldSet name={id}>
          {requirementGroups.map((requirementGroup) => (
            <RequirementGroup {...requirementGroup} key={requirementGroup.id} />
          ))}
        </FieldSet>
      )}

      <Styled.Divider />
    </Flex>
  );
};
