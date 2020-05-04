import React, { ReactElement } from 'react';
import { css } from 'styled-components';
import { Option } from 'ts4ocds/extensions/options';
import { DataType } from 'ts4ocds/extensions/requirements';

import Checkbox from 'ustudio-ui/components/Checkbox';
import NumberInput from 'ustudio-ui/components/Input/NumberInput';
import TextInput from 'ustudio-ui/components/Input/TextInput';
import Select from 'ustudio-ui/components/Select/Select';
import RadioGroup from 'ustudio-ui/components/RadioGroup';
import { Item } from 'ustudio-ui/components/Select/select.types';
import Switch from 'ustudio-ui/components/Switch';
import Text from 'ustudio-ui/components/Text';

import { InputProps } from './Requirement.types';

export const renderInput = ({
  dataType,
  options,
  expectedValue,
  defaultValue,
  isDisabled,
  props,
}: {
  dataType?: DataType;
  options?: Option[];
  expectedValue?: unknown;
  defaultValue?: unknown;
  isDisabled: boolean;
  props: InputProps;
}): ReactElement => {
  if (options) {
    const optionsMap: Record<string, Option> = options.reduce(
      (map, option) =>
        Object.assign(map, {
          [option.description as string]: { value: option.description, label: option.description },
        }),
      {}
    );

    if (options.length > 4) {
      return (
        <Select
          items={(optionsMap as unknown) as Record<string, Item>}
          isDisabled={isDisabled}
          defaultValue={(defaultValue || Object.values(optionsMap)[0].value) as string}
          styled={{
            Dropdown: css`
              position: static;
            `,
          }}
        />
      );
    }

    return (
      <RadioGroup
        name={`${(options[0].id as string).slice(0, 9)}${'0'.repeat(2)}`}
        defaultValue={defaultValue ? { value: defaultValue as string } : Object.values(optionsMap)[0]}
        options={optionsMap}
        isDisabled={isDisabled}
        styled={{
          RadioGroup: css`
            margin: var(--i-medium) 0;
          `,
        }}
      />
    );
  }

  switch (dataType) {
    case 'string':
      return <TextInput defaultValue={defaultValue as string} {...props} isDisabled={isDisabled} />;
    case 'boolean':
      if (expectedValue !== undefined) {
        return (
          <Checkbox
            defaultValue={expectedValue as boolean}
            isDisabled={isDisabled}
            styled={{
              CheckboxContainer: css`
                margin-left: var(--i-regular);
              `,
            }}
          />
        );
      }

      return <Switch defaultValue={defaultValue as boolean} isDisabled={isDisabled} />;
    case 'integer':
    case 'number':
    default:
      return <NumberInput defaultValue={defaultValue as number} {...props} isDisabled={isDisabled} />;
  }
};

export const formatProps = ({ title, dataType }: { title?: string; dataType?: DataType }): InputProps => {
  if (!title) {
    return {};
  }

  const formatPlaceholder = (placeholder: string) => `Введіть ${placeholder.toLowerCase()}`;
  const formatSuffix = (suffix: string) => <Text variant="caption">{suffix.replace(/\s/g, '')}</Text>;

  const suffix = title.match(/\(.+\)/);

  return {
    placeholder: formatPlaceholder(title.slice(0, suffix ? title.indexOf('(') : title.length)).trim(),
    suffix: suffix ? formatSuffix(suffix[0].slice(1, -1)) : formatSuffix(dataType as string),
  };
};

export const isBoolean = (dataType?: DataType): dataType is 'boolean' => dataType === 'boolean';
