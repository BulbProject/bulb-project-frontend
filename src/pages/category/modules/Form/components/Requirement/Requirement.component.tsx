import React, { ReactElement } from 'react';
import { css } from 'styled-components';
import { RequirementWithOptionDetails as RequirementProps, Option } from 'ts4ocds/extensions/options';
import { DataType } from 'ts4ocds/extensions/requirements';
import { Field } from 'formfish';

import { useCategoryContext } from 'pages/category/store';
import Flex from 'ustudio-ui/components/Flex';
import NumberInput from 'ustudio-ui/components/Input/NumberInput';
import Switch from 'ustudio-ui/components/Switch';
import TextInput from 'ustudio-ui/components/Input/TextInput';
import Checkbox from 'ustudio-ui/components/Checkbox';
import RadioGroup from 'ustudio-ui/components/RadioGroup';
import Text from 'ustudio-ui/components/Text';

import Styled from './Requirement.styles';

interface InputProps {
  placeholder?: string;
  suffix?: ReactElement;
}

const renderInput = ({
  dataType,
  options,
  expectedValue,
  defaultValue,
  props,
}: {
  dataType: DataType;
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
            margin-top: var(--i-medium);
          `,
          RadioButton: css`
            margin-right: var(--i-medium);
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

const formatProps = ({ title, dataType }: { title?: string; dataType: DataType }): InputProps => {
  if (!title) {
    return {};
  }

  const formatPlaceholder = (placeholder: string) => `Enter ${placeholder.toLowerCase()}`;
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

const isBoolean = (dataType: DataType): dataType is 'boolean' => dataType === 'boolean';

export const Requirement = ({ id, title, expectedValue, dataType, optionDetails }: RequirementProps) => {
  const { requestedNeed, currentCriterion } = useCategoryContext();

  const getValue = () => {
    if (optionDetails) {
      return (value: { value: string }) => value.value;
    }

    if (expectedValue !== undefined) {
      return () => expectedValue;
    }

    return undefined;
  };

  const setValue = optionDetails
    ? (value: { value: string } | string) => {
        if (typeof value === 'object') {
          return value;
        }

        return { value };
      }
    : undefined;

  return (
    <Styled.Requirement htmlFor={id}>
      <Flex
        direction={isBoolean(dataType) ? 'row' : 'column'}
        isReversed={isBoolean(dataType)}
        alignment={{ horizontal: isBoolean(dataType) ? 'end' : 'start', vertical: 'center' }}
      >
        {title && (
          <Styled.Title variant="caption" isBoolean={isBoolean(dataType)}>
            {optionDetails && 'optionGroups' in optionDetails ? optionDetails.optionGroups[0].description : title}
          </Styled.Title>
        )}

        <Field name={id} getValue={getValue()} setValue={setValue}>
          {renderInput({
            dataType,
            expectedValue,
            defaultValue: requestedNeed[currentCriterion.id]?.[id],
            props: formatProps({ title, dataType }),
            // eslint-disable-next-line no-nested-ternary
            options: optionDetails
              ? 'optionGroups' in optionDetails
                ? optionDetails.optionGroups?.[0].options
                : []
              : undefined,
          })}
        </Field>
      </Flex>
    </Styled.Requirement>
  );
};
