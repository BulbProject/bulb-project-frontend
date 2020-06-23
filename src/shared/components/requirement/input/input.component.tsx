import React, { FC, ReactElement, useMemo } from 'react';
import { css } from 'styled-components';

import { Option, RequirementWithOptionDetails } from 'ts4ocds/extensions/options';

import Checkbox from 'ustudio-ui/components/Checkbox';
import NumberInput from 'ustudio-ui/components/Input/NumberInput';
import TextInput from 'ustudio-ui/components/Input/TextInput';
import Select from 'ustudio-ui/components/Select/Select';
import { Group, Item } from 'ustudio-ui/components/Select/select.types';
import { Mixin } from 'ustudio-ui/theme';

import { sortByValue } from 'shared/utils';

import { Field } from './field';

export const Input: FC<{
  placeholder?: string;
  suffix?: ReactElement;
  hasError: boolean;
  isDisabled?: boolean;
  defaultValue?: unknown;
  requirement: RequirementWithOptionDetails;
}> = ({ hasError, requirement, isDisabled, defaultValue, placeholder, suffix }): ReactElement => {
  const { dataType } = useMemo(() => requirement, []);

  const optionGroups = useMemo(
    () =>
      requirement.optionDetails !== undefined && 'optionGroups' in requirement.optionDetails
        ? requirement.optionDetails.optionGroups
        : undefined,
    []
  );

  if (optionGroups) {
    const ValuesListTitle = css`
      color: var(--c-darkest);
    `;

    const ValuesListItem = css`
      &:before {
        background: var(--c-primary-light);
      }
    `;

    const MultiValuesListItem = css`
      padding-left: 1.5rem;

      ${Mixin.Font.bodySmall()};

      &:before {
        background: var(--c-primary-light);
      }

      &:after {
        content: '';

        position: absolute;
        top: 50%;
        left: var(--i-medium);

        transform: translateY(-50%);

        width: 0.3rem;
        height: 0.3rem;
        border-radius: 0.3rem;

        background-color: var(--c-secondary-light);
      }
    `;

    const mapOptionsToItems = (options: Option[]): Record<string, Item> => {
      return options.sort(sortByValue('id')).reduce(
        (map, option) =>
          Object.assign(map, {
            [option.value as string]: { value: option.value, label: option.description },
          }),
        {}
      );
    };

    if (optionGroups.length === 1) {
      const optionsMap = mapOptionsToItems(optionGroups[0].options);

      return (
        <Field requirement={requirement} isDisabled={isDisabled}>
          <Select
            autocomplete={Object.values(optionsMap).length >= 10}
            isDisabled={isDisabled}
            items={optionsMap}
            defaultValue={defaultValue as string}
            styled={{
              ValuesListItem,
            }}
          />
        </Field>
      );
    }

    const groupsMap: Group[] = optionGroups.sort(sortByValue('id')).map((optionGroup) => {
      return {
        title: optionGroup.description as string,
        items: mapOptionsToItems(optionGroup.options),
      };
    }, {});

    return (
      <Field requirement={requirement} isDisabled={isDisabled}>
        <Select
          autocomplete={groupsMap.flatMap((group) => Object.values(group.items)).length >= 10}
          isDisabled={isDisabled}
          groups={groupsMap}
          defaultValue={defaultValue as string}
          styled={{
            ValuesListItem: MultiValuesListItem,
            ValuesListTitle,
            Dropdown: ({ isOpen }) => css`
              div {
                height: ${isOpen ? `200px` : 0};
              }
            `,
          }}
        />
      </Field>
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
                    &:after {
                      background-color: var(--c-negative);
                    }
                  `
                : css``,
            }}
          />
        </Field>
      );
  }
};
