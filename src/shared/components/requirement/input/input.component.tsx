import React, { FC, ReactElement, useMemo } from 'react';
import { css } from 'styled-components';

import type { RequirementWithOptionDetails } from 'ts4ocds/extensions/options';

import Checkbox from 'ustudio-ui/components/Checkbox';
import NumberInput from 'ustudio-ui/components/Input/NumberInput';
import TextInput from 'ustudio-ui/components/Input/TextInput';

import { Field } from './field';
import { OptionGroups } from './option-groups';
import { OptionGroup } from './option-group';

export const Input: FC<{
  placeholder?: string;
  suffix?: ReactElement;
  hasError: boolean;
  isDisabled?: boolean;
  defaultValue?: unknown;
  requirement: RequirementWithOptionDetails;
  showOptionGroupsCarousel?: boolean;
  criterionId?: string;
}> = ({
  hasError,
  requirement,
  isDisabled,
  defaultValue,
  placeholder,
  suffix,
  showOptionGroupsCarousel,
  criterionId,
}): ReactElement => {
  const { dataType } = useMemo(() => requirement, []);

  const optionGroups = useMemo(
    () =>
      requirement.optionDetails !== undefined && 'optionGroups' in requirement.optionDetails
        ? requirement.optionDetails.optionGroups
        : undefined,
    []
  );

  if (optionGroups) {
    if (optionGroups.length === 1) {
      return (
        <OptionGroup
          optionGroup={optionGroups[0]}
          requirement={requirement}
          defaultValue={defaultValue as string}
          isDisabled={isDisabled}
        />
      );
    }

    return (
      <OptionGroups
        optionGroups={optionGroups}
        requirement={requirement}
        defaultValue={defaultValue as string}
        isDisabled={isDisabled}
        showCarousel={showOptionGroupsCarousel}
        criterionId={criterionId}
      />
    );
  }

  switch (dataType) {
    case 'string':
      return (
        <Field requirement={requirement} isDisabled={isDisabled}>
          <TextInput
            isDisabled={isDisabled}
            defaultValue={defaultValue as string}
            placeholder={placeholder}
            suffix={suffix}
          />
        </Field>
      );
    case 'boolean':
      return (
        <Field requirement={requirement} isDisabled={isDisabled}>
          <Checkbox isDisabled={isDisabled} defaultValue={defaultValue as boolean} />
        </Field>
      );
    case 'integer':
    case 'number':
    default:
      return (
        <Field requirement={requirement} isDisabled={isDisabled}>
          <NumberInput
            isDisabled={isDisabled}
            defaultValue={defaultValue as number}
            placeholder={placeholder}
            suffix={suffix}
            styled={{
              Suffix: css`
                white-space: nowrap;
              `,
              InputContainer: hasError
                ? css`
                    border-bottom-color: transparent;

                    &:after {
                      background-color: var(--c-negative);

                      transform: scaleX(1);
                    }
                  `
                : css``,
            }}
          />
        </Field>
      );
  }
};
