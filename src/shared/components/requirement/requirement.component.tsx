import React, { FC, useMemo } from 'react';

import type { Unit } from 'ts4ocds';
import type { RequirementWithOptionDetails as RequirementProps } from 'ts4ocds/extensions/options';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

import { useCalculation } from 'shared/context/calculation';
import { getLocaleDataType } from 'shared/utils';
import { useFormValidator } from 'shared/context/form-validator';
import type { Criterion } from 'shared/entity/data';

import { Title } from '../title';

import { Input } from './input';
import { isBoolean } from './utils';

import Styled from './requirement.styles';

export const Requirement: FC<
  RequirementProps & {
    isDisabled?: boolean;
    unit?: Unit;
    criterion: Criterion;
    showCarousel?: boolean;
  }
> = ({
  id,
  title,
  description,
  isDisabled,
  unit,
  dataType,
  optionDetails,
  criterion,
  minValue,
  maxValue,
  showCarousel = false,
}) => {
  const { state: validationState } = useFormValidator();
  const { formData } = useCalculation();

  const hasSingleOptionGroup = useMemo(() => {
    return optionDetails !== undefined && 'optionGroups' in optionDetails && optionDetails.optionGroups.length === 1;
  }, [JSON.stringify(optionDetails)]);

  return (
    <Styled.Requirement htmlFor={id}>
      <Flex
        direction={isBoolean(dataType) ? 'row' : 'column'}
        alignment={{ vertical: 'center' }}
        margin={criterion.requirementGroups.length > 1 ? { top: 'medium' } : undefined}
      >
        {(title ?? hasSingleOptionGroup) && (
          <Title
            dataType={dataType}
            hasSingleOptionGroup={hasSingleOptionGroup}
            isDisabled={isDisabled}
            optionDetails={optionDetails}
            unit={unit}
            title={title as string}
          />
        )}

        <Input
          hasError={Boolean(validationState[id])}
          // Once again unknown type
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          defaultValue={formData[criterion.id]?.[id]}
          suffix={
            <Text variant="caption" align="right" color={isDisabled ? 'var(--c-neutral)' : 'var(--c-darkest)'}>
              {unit?.name ?? getLocaleDataType(dataType)}
            </Text>
          }
          placeholder={description}
          isDisabled={isDisabled}
          requirement={{
            id,
            dataType,
            optionDetails,
            minValue,
            maxValue,
          }}
          showOptionGroupsCarousel={showCarousel}
          criterionId={criterion.id}
        />

        {validationState[id] && (
          <Styled.Error variant="small" color="var(--c-negative)">
            {validationState[id]}
          </Styled.Error>
        )}
      </Flex>
    </Styled.Requirement>
  );
};
