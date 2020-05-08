import React, { ReactElement } from 'react';
import { css } from 'styled-components';
import type { Option, OptionGroup } from 'ts4ocds/extensions/options';
import type { DataType } from 'ts4ocds/extensions/requirements';

import Checkbox from 'ustudio-ui/components/Checkbox';
import NumberInput from 'ustudio-ui/components/Input/NumberInput';
import TextInput from 'ustudio-ui/components/Input/TextInput';
import Select from 'ustudio-ui/components/Select/Select';
import type { Group, Item } from 'ustudio-ui/components/Select/select.types';

import { InputProps } from './Requirement.types';

export const renderInput = ({
  dataType,
  optionGroups,
  isDisabled,
  defaultValue,
  props,
}: {
  dataType?: DataType;
  optionGroups?: OptionGroup[];
  isDisabled?: boolean;
  defaultValue?: unknown;
  props: InputProps;
}): ReactElement => {
  if (optionGroups) {
    const mapOptionsToItems = (options: Option[]): Record<string, Item> => {
      return options.reduce(
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
          items={optionsMap}
          defaultValue={(defaultValue || Object.values(optionsMap)[0].value) as string}
          styled={{
            ValuesListItem: css`
              &:before {
                background: var(--c-primary);
              }
            `,
          }}
        />
      );
    }

    const groupsMap: Group[] = optionGroups.map((optionGroup) => {
      return {
        title: optionGroup.description as string,
        items: mapOptionsToItems(optionGroup.options),
      };
    }, {});

    return (
      <Select
        groups={groupsMap}
        defaultValue={(defaultValue || Object.values(groupsMap[0].items)[0].value) as string}
        styled={{
          ValuesListItem: css`
            &:before {
              background: var(--c-primary);
            }
          `,
          ValuesListTitle: css`
            color: var(--c-secondary);
          `,
        }}
      />
    );
  }

  switch (dataType) {
    case 'string':
      return <TextInput defaultValue={defaultValue as string} {...props} />;
    case 'boolean':
      return <Checkbox isDisabled={isDisabled} defaultValue={defaultValue as boolean} />;
    case 'integer':
    case 'number':
    default:
      return <NumberInput defaultValue={defaultValue as number} {...props} />;
  }
};

export const isBoolean = (dataType?: DataType): dataType is 'boolean' => dataType === 'boolean';
