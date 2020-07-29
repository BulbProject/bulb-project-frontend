import React, { FC, useMemo } from 'react';
import Flex from 'ustudio-ui/components/Flex';

import { useCategory } from 'core/context/category-provider';
import type { RequirementGroup as RequirementGroupProps } from 'shared/entity/data';
import { Requirement } from 'shared/components';
import { modifyId } from 'shared/utils';

export const RequirementGroup: FC<RequirementGroupProps> = ({ id, requirements }) => {
  const { category } = useCategory();

  const hasSingleRequirement = useMemo(() => requirements.length === 1, []);
  const hasSingleBooleanRequirement = useMemo(
    () => hasSingleRequirement && requirements[0].dataType === 'boolean' && 'expectedValue' in requirements[0],
    []
  );

  const criterion = useMemo(
    () => category.criteria.filter(({ id: criterionId }) => criterionId === modifyId(id, 2, () => 0))[0],
    []
  );

  return (
    <Flex direction="column">
      <Flex direction="column" margin={{ top: 'regular' }}>
        {hasSingleBooleanRequirement ? (
          <Requirement {...requirements[0]} isDisabled criterion={criterion} />
        ) : (
          requirements.map((requirement) => {
            const { title: _, ...partialRequirement } = requirement;

            return <Requirement {...partialRequirement} key={requirement.id} criterion={criterion} />;
          })
        )}
      </Flex>
    </Flex>
  );
};
