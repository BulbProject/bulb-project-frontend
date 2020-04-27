import React, { ReactElement } from 'react';
import { css } from 'styled-components';
import { Option } from 'ts4ocds/extensions/options';
import { DataType } from 'ts4ocds/extensions/requirements';

import Checkbox from 'ustudio-ui/components/Checkbox';
import NumberInput from 'ustudio-ui/components/Input/NumberInput';
import TextInput from 'ustudio-ui/components/Input/TextInput';
import RadioGroup from 'ustudio-ui/components/RadioGroup';
import Switch from 'ustudio-ui/components/Switch';
import Text from 'ustudio-ui/components/Text';

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
      (map, option) => Object.assign(map, { [option.description as string]: { value: option.description } }),
      {}
    );

    return (
      <RadioGroup
        name={`${(options[0].id as string).slice(0, 9)}${'0'.repeat(2)}`}
        defaultValue={defaultValue ? { value: defaultValue as string } : Object.values(optionsMap)[0]}
        options={optionsMap}
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
      return <TextInput defaultValue={defaultValue as string} {...props} />;
    case 'boolean':
      if (expectedValue !== undefined) {
        return (
          <Checkbox
            defaultValue={expectedValue as boolean}
            isDisabled={Boolean(expectedValue)}
            styled={{
              CheckboxContainer: css`
                margin-left: var(--i-large);
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

export const formatProps = ({ title, dataType }: { title?: string; dataType?: DataType }): InputProps => {
  if (!title) {
    return {};
  }

  const formatPlaceholder = (placeholder: string) => `Введіть ${placeholder.toLowerCase()}`;
  const formatSuffix = (suffix: string) => <Text variant="caption">{suffix.replace(/\s/g, '')}</Text>;

  const format = title.match(/(.+)(?=,?).+(\(.+\))/);

  if (format) {
    return {
      placeholder: formatPlaceholder(format[1]),
      suffix: formatSuffix(format[2].slice(1, -1)),
    };
  }

  return {
    placeholder: formatPlaceholder(title),
    suffix: formatSuffix(dataType as string),
  };
};

export const isBoolean = (dataType?: DataType): dataType is 'boolean' => dataType === 'boolean';
