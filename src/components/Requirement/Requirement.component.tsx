import React, { useEffect, useMemo, useState } from 'react';

import type { Unit } from 'ts4ocds';
import type { RequirementWithOptionDetails as RequirementProps } from 'ts4ocds/extensions/options';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

import { Field } from 'formfish';

import { getLocaleDataType } from 'utils';

import type { Criterion } from 'types/data';
import type { StoreRequestedNeed } from 'types/globals';
import {
  clearError,
  setMaxValueError,
  setMinMaxValueError,
  setMinValueError,
  useFormValidationContext,
} from 'context/FormValidation';

import { isBoolean, isNumeric, renderInput } from './Requirement.module';
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
  minValue,
  maxValue,
}: RequirementProps & {
  isDisabled?: boolean;
  unit?: Unit;
  requestedNeed: StoreRequestedNeed;
  currentCriterion: Criterion;
}) => {
  const { state: validationState, dispatch } = useFormValidationContext();

  const [isErrorResolved, setErrorResolved] = useState(true);

  useEffect(() => {
    if (validationState[id] && isErrorResolved) {
      dispatch(clearError(id));
    }
  }, [validationState[id], isErrorResolved]);

  const getValue = useMemo(() => {
    if (isNumeric(dataType)) {
      if (minValue !== undefined && maxValue !== undefined) {
        return (value: number) => {
          if (value < minValue || value > maxValue) {
            dispatch(setMinMaxValueError(id, [minValue, maxValue]));
            setErrorResolved(false);

            return value;
          }

          setErrorResolved(true);

          return value;
        };
      }

      if (minValue !== undefined) {
        return (value: number) => {
          if (value < minValue) {
            dispatch(setMinValueError(id, minValue));
            setErrorResolved(false);

            return value;
          }

          setErrorResolved(true);

          return value;
        };
      }

      if (maxValue !== undefined) {
        return (value: number) => {
          if (value > maxValue) {
            dispatch(setMaxValueError(id, maxValue));
            setErrorResolved(false);

            return value;
          }

          setErrorResolved(true);

          return value;
        };
      }

      return undefined;
    }

    if (optionDetails) {
      return (value: string) => value;
    }

    if (isBoolean(dataType) && isDisabled) {
      return () => true;
    }

    return undefined;
  }, [Boolean(optionDetails), dataType, isDisabled]);

  const setValue = useMemo(() => {
    if (optionDetails) {
      return (value: string) => value;
    }

    if (isBoolean(dataType) && isDisabled) {
      return () => true;
    }

    return undefined;
  }, [JSON.stringify(optionDetails), dataType, isDisabled]);

  const hasSingleOptionGroup = useMemo(() => {
    if (optionDetails && 'optionGroups' in optionDetails) {
      return optionDetails.optionGroups.length === 1;
    }

    return false;
  }, [JSON.stringify(optionDetails)]);

  return (
    <Styled.Requirement htmlFor={id}>
      <Flex
        direction={isBoolean(dataType) ? 'row' : 'column'}
        alignment={{ vertical: 'center' }}
        margin={{ top: 'medium' }}
      >
        {title && (
          <Styled.Title
            variant="caption"
            isBoolean={isBoolean(dataType)}
            color={isDisabled ? 'var(--c-neutral)' : 'var(--c-darkest)'}
          >
            {optionDetails && 'optionGroups' in optionDetails && hasSingleOptionGroup
              ? optionDetails.optionGroups[0].description
              : title}
          </Styled.Title>
        )}

        <Field name={id} getValue={getValue} setValue={setValue}>
          {renderInput({
            hasError: Boolean(validationState[id]),
            dataType,
            isDisabled,
            defaultValue: requestedNeed[currentCriterion.id]?.[id],
            props: {
              suffix: (
                <Text variant="caption" align="right" color={isDisabled ? 'var(--c-neutral)' : 'var(--c-darkest)'}>
                  {unit?.name || getLocaleDataType(dataType)}
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

        {validationState[id] && (
          <Styled.Error variant="small" color="var(--c-negative)">
            {validationState[id]}
          </Styled.Error>
        )}
      </Flex>
    </Styled.Requirement>
  );
};
