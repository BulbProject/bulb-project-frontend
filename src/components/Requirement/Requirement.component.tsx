import React, { useMemo } from 'react';

import type { Unit } from 'ts4ocds';
import type { RequirementWithOptionDetails as RequirementProps } from 'ts4ocds/extensions/options';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

import { Field } from 'formfish';

import type { Criterion } from 'types/data';
import type { StoreRequestedNeed } from 'types/globals';

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
  requestedNeed,
  currentCriterion,
}: RequirementProps & {
  isDisabled?: boolean;
  unit?: Unit;
  requestedNeed: StoreRequestedNeed;
  currentCriterion: Criterion;
}) => {
  const getValue = () => {
    if (optionDetails) {
      return (value: string) => value;
    }

    if (isBoolean(dataType) && isDisabled) {
      return () => true;
    }

    return undefined;
  };

  const setValue = () => {
    if (optionDetails) {
      return (value: string) => value;
    }

    if (isBoolean(dataType) && isDisabled) {
      return () => true;
    }

    return undefined;
  };

  const hasSingleOptionGroup = useMemo(() => {
    if (optionDetails && 'optionGroups' in optionDetails) {
      return optionDetails.optionGroups.length === 1;
    }

    return false;
  }, []);

  return (
    <Styled.Requirement htmlFor={id}>
      <Flex
        direction={isBoolean(dataType) ? 'row' : 'column'}
        alignment={{ vertical: 'center' }}
        margin={{ top: 'medium' }}
      >
        {title && (
          <Styled.Title variant="caption" isBoolean={isBoolean(dataType)} color="var(--c-darkest)">
            {optionDetails && 'optionGroups' in optionDetails && hasSingleOptionGroup
              ? optionDetails.optionGroups[0].description
              : title}
          </Styled.Title>
        )}

        <Field name={id} getValue={getValue()} setValue={setValue()}>
          {renderInput({
            dataType,
            isDisabled,
            defaultValue: requestedNeed[currentCriterion.id]?.[id],
            props: {
              suffix: (
                <Text variant="caption" align="right">
                  {unit?.name || (dataType as string)}
                </Text>
              ),
              placeholder: description,
            },
            // eslint-disable-next-line no-nested-ternary
            optionGroups: optionDetails
              ? 'optionGroups' in optionDetails
                ? optionDetails.optionGroups
                : []
              : undefined,
          })}
        </Field>
      </Flex>
    </Styled.Requirement>
  );
};
