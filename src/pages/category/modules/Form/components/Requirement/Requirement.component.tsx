import React from 'react';
import { RequirementWithOptionDetails as RequirementProps } from 'ts4ocds/extensions/options';
import { Field } from 'formfish';

import { useCategoryContext } from 'pages/category/store';
import Flex from 'ustudio-ui/components/Flex';
import { formatProps, isBoolean, renderInput } from './Requirement.module';

import Styled from './Requirement.styles';

export const Requirement = ({ id, title, expectedValue, dataType, optionDetails }: RequirementProps) => {
  const { requestedNeed, currentCriterion } = useCategoryContext();

  const getValue = () => {
    if (optionDetails) {
      return (value: { value: string }) => value.value;
    }

    if (expectedValue !== undefined) {
      return () => expectedValue;
    }

    return undefined;
  };

  const setValue = optionDetails
    ? (value: { value: string } | string) => {
        if (typeof value === 'object') {
          return value;
        }

        return { value };
      }
    : undefined;

  return (
    <Styled.Requirement htmlFor={id}>
      <Flex
        direction={isBoolean(dataType) ? 'row' : 'column'}
        isReversed={isBoolean(dataType)}
        alignment={{ horizontal: isBoolean(dataType) ? 'end' : 'start', vertical: 'center' }}
      >
        {title && (
          <Styled.Title variant="caption" isBoolean={isBoolean(dataType)}>
            {optionDetails && 'optionGroups' in optionDetails ? optionDetails.optionGroups[0].description : title}
          </Styled.Title>
        )}

        <Field name={id} getValue={getValue()} setValue={setValue}>
          {renderInput({
            dataType,
            expectedValue,
            defaultValue: requestedNeed[currentCriterion.id]?.[id],
            props: formatProps({ title, dataType }),
            // eslint-disable-next-line no-nested-ternary
            options: optionDetails
              ? 'optionGroups' in optionDetails
                ? optionDetails.optionGroups?.[0].options
                : []
              : undefined,
          })}
        </Field>
      </Flex>
    </Styled.Requirement>
  );
};
