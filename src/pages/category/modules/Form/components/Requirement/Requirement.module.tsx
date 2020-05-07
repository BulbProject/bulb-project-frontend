import React, { ReactElement } from 'react';
import { css } from 'styled-components';
import { Option } from 'ts4ocds/extensions/options';
import { DataType } from 'ts4ocds/extensions/requirements';

import Checkbox from 'ustudio-ui/components/Checkbox';
import NumberInput from 'ustudio-ui/components/Input/NumberInput';
import TextInput from 'ustudio-ui/components/Input/TextInput';
import Select from 'ustudio-ui/components/Select/Select';
import { Item } from 'ustudio-ui/components/Select/select.types';
import Switch from 'ustudio-ui/components/Switch';

import { InputProps } from './Requirement.types';

export const renderInput = ({
  dataType,
  options,
  expectedValue,
  defaultValue,
  props,
}: {
  dataType?: DataType;
  options?: Option[];
  expectedValue?: unknown;
  defaultValue?: unknown;
  props: InputProps;
}): ReactElement => {
  if (options) {
    const optionsMap: Record<string, Option> = options.reduce(
      (map, option) =>
        Object.assign(map, {
          [option.value as string]: { value: option.value, label: option.description },
        }),
      {}
    );

    return (
      <Select
        items={(optionsMap as unknown) as Record<string, Item>}
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

  switch (dataType) {
    case 'string':
      return <TextInput defaultValue={defaultValue as string} {...props} />;
    case 'boolean':
      if (expectedValue !== undefined) {
        return (
          <Checkbox
            defaultValue={expectedValue as boolean}
            styled={{
              CheckboxContainer: css`
                margin-left: var(--i-regular);
              `,
            }}
          />
        );
      }

      return <Switch defaultValue={defaultValue as boolean} />;
    case 'integer':
    case 'number':
    default:
      return <NumberInput defaultValue={defaultValue as number} {...props} />;
  }
};

export const isBoolean = (dataType?: DataType): dataType is 'boolean' => dataType === 'boolean';
