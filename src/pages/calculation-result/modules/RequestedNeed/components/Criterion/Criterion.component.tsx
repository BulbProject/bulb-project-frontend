import { FieldSet } from 'formfish';
import React from 'react';
import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

import type { Criterion as CriterionProps } from 'types/data';
import { useCalculationContext } from '../../../../store';
import { RequirementGroup } from '../RequirementGroup';
import { filterRequirementGroups } from './Criterion.module';

import Styled from './Criterion.styles';

export const Criterion: React.FC<CriterionProps> = ({ id, title, requirementGroups }) => {
  const { requestedNeed } = useCalculationContext();

  return (
    <Flex direction="column">
      <Text
        // @ts-ignore
        appearance="bold"
        color="var(--c-secondary)"
      >
        {title}
      </Text>

      <FieldSet name={id}>
        {requirementGroups
          .filter(filterRequirementGroups({ criterionId: id, requestedNeed }))
          .map((requirementGroup) => (
            <RequirementGroup {...requirementGroup} key={requirementGroup.id} />
          ))}
      </FieldSet>

      <Styled.Divider />
    </Flex>
  );
};
