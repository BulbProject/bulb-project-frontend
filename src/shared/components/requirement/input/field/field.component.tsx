import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import FormField from 'formfish/components/Field';

import { useFormValidator } from 'shared/context/form-validator';
import type { RequirementWithOptionDetails } from 'ts4ocds/extensions/options';

import { isBoolean, isNumeric } from '../../utils';

const getValueGuard = ({
  predicate,
  dispatch,
  setErrorResolved,
}: {
  predicate(value: number): boolean;
  dispatch(): void;
  setErrorResolved(value: boolean): void;
}) => {
  return (value: number) => {
    const shouldDispatchError = predicate(value);

    if (shouldDispatchError) {
      dispatch();
    }

    setErrorResolved(!shouldDispatchError);

    return value;
  };
};

export const Field: FC<{
  requirement: RequirementWithOptionDetails;
  isDisabled?: boolean;
  watch?(value: string): void;
}> = ({ children, requirement, isDisabled, watch }) => {
  const { id, optionDetails, dataType, maxValue, minValue } = useMemo(() => requirement, []);
  const { state: validationState, dispatch } = useFormValidator();

  const [isErrorResolved, setErrorResolved] = useState(true);

  useEffect(() => {
    if (validationState[id] && isErrorResolved) {
      dispatch.clearError(id);
    }
  }, [validationState[id], isErrorResolved]);

  const setValue = useMemo(() => {
    if (optionDetails !== undefined) {
      return (value: string) => value;
    }

    if (isBoolean(dataType) && isDisabled) {
      return () => true;
    }

    return undefined;
  }, [JSON.stringify(optionDetails), dataType, isDisabled]);

  const getValue = useMemo(() => {
    if (isNumeric(dataType)) {
      if (minValue !== undefined && maxValue !== undefined) {
        return getValueGuard({
          predicate: (value) => value < minValue || value > maxValue,
          dispatch: () => dispatch.setMinMaxValueError(id, [minValue, maxValue]),
          setErrorResolved,
        });
      }

      if (minValue !== undefined) {
        return getValueGuard({
          predicate: (value) => value < minValue,
          dispatch: () => dispatch.setMinValueError(id, minValue),
          setErrorResolved,
        });
      }

      if (maxValue !== undefined) {
        return getValueGuard({
          predicate: (value) => value > maxValue,
          dispatch: () => dispatch.setMaxValueError(id, maxValue),
          setErrorResolved,
        });
      }

      return undefined;
    }

    return (value: string) => {
      if (watch) {
        watch(value);
      }

      if (setValue) {
        setValue(value);
      }

      return value;
    };
  }, [Boolean(optionDetails), dataType, isDisabled, watch, setValue]);

  return (
    <FormField name={id} getValue={getValue} setValue={setValue}>
      {children as ReactElement}
    </FormField>
  );
};
