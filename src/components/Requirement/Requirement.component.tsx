import React from 'react';

import { Unit } from 'ts4ocds';
import { RequirementWithOptionDetails as RequirementProps } from 'ts4ocds/extensions/options';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

import { Field } from 'formfish';

import { useCategoryContext } from 'pages/category/store';

import { isBoolean, renderInput } from './Requirement.module';
import Styled from './Requirement.styles';

export const Requirement = ({
  id,
  title,
  description,
  isDisabled,
  unit,
  dataType,
  optionDetails,
}: RequirementProps & {
  isDisabled?: boolean;
  unit?: Unit;
}) => {
  const { requestedNeed, currentCriterion } = useCategoryContext();

  const getValue = () => {
    if (optionDetails) {
      return (value: string) => value;
    }

    return undefined;
  };

  const setValue = () => {
    if (optionDetails) {
      return (value: string) => value;
    }

    return undefined;
  };

  return (
    <Flex
      direction={isBoolean(dataType) ? 'row' : 'column'}
      isReversed={isBoolean(dataType)}
      alignment={{ horizontal: isBoolean(dataType) ? 'end' : 'start', vertical: 'center' }}
      margin={{ top: 'medium' }}
    >
      <Styled.Requirement htmlFor={id}>
        {title && (
          <Styled.Title variant="caption" isBoolean={isBoolean(dataType)} color="var(--c-darkest)">
            {optionDetails && 'optionGroups' in optionDetails ? optionDetails.optionGroups[0].description : title}
          </Styled.Title>
        )}

        <Field name={id} getValue={getValue()} setValue={setValue()}>
          {renderInput({
            dataType,
            isDisabled,
            defaultValue: requestedNeed[currentCriterion.id]?.[id],
            props: {
              suffix: <Text variant="caption">{unit?.name || (dataType as string)}</Text>,
              placeholder: description,
            },
            // eslint-disable-next-line no-nested-ternary
            options: optionDetails
              ? 'optionGroups' in optionDetails
                ? optionDetails.optionGroups?.[0].options
                : []
              : undefined,
          })}
        </Field>
      </Styled.Requirement>
    </Flex>
  );
};
