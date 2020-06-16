import React, { ReactElement } from 'react';

import { css } from 'styled-components';

import type { Option, OptionGroup, OptionDetails } from 'ts4ocds/extensions/options';
import type { DataType } from 'ts4ocds/extensions/requirements';

import { Unit } from 'ts4ocds';

import { Mixin } from 'ustudio-ui/theme';
import Checkbox from 'ustudio-ui/components/Checkbox';
import NumberInput from 'ustudio-ui/components/Input/NumberInput';
import TextInput from 'ustudio-ui/components/Input/TextInput';
import Select from 'ustudio-ui/components/Select/Select';
import type { Group, Item } from 'ustudio-ui/components/Select/select.types';

import { sortByValue } from 'utils';

import { InputProps } from './Requirement.types';

export const parseOptionGroupsDescription = ({
  optionDetails,
  unit,
}: {
  optionDetails: OptionDetails;
  unit?: Unit;
}) => {
  return (
    'optionGroups' in optionDetails && `${optionDetails.optionGroups[0].description}${unit ? `, ${unit.name}` : ''}`
  );
};

export const renderInput = ({
  hasError,
  dataType,
  optionGroups,
  isDisabled,
  defaultValue,
  props,
}: {
  hasError: boolean;
  dataType?: DataType;
  optionGroups?: OptionGroup[];
  isDisabled?: boolean;
  defaultValue?: unknown;
  props: InputProps;
}): ReactElement => {
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
        <Select
          autocomplete={Object.values(optionsMap).length >= 10}
          isDisabled={isDisabled}
          items={optionsMap}
          defaultValue={defaultValue as string}
          styled={{
            ValuesListItem,
          }}
        />
      );
    }

    const groupsMap: Group[] = optionGroups.sort(sortByValue('id')).map((optionGroup) => {
      return {
        title: optionGroup.description as string,
        items: mapOptionsToItems(optionGroup.options),
      };
    }, {});

    return (
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
    );
  }

  switch (dataType) {
    case 'string':
      return <TextInput isDisabled={isDisabled} defaultValue={defaultValue as string} {...props} />;
    case 'boolean':
      return <Checkbox isDisabled={isDisabled} defaultValue={defaultValue as boolean} />;
    case 'integer':
    case 'number':
    default:
      return (
        <NumberInput
          isDisabled={isDisabled}
          defaultValue={defaultValue as number}
          {...props}
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
      );
  }
};

export const isBoolean = (dataType?: DataType): dataType is 'boolean' => dataType === 'boolean';

export const isNumeric = (dataType?: DataType): dataType is 'number' | 'integer' => {
  return dataType === 'integer' || dataType === 'number';
};
