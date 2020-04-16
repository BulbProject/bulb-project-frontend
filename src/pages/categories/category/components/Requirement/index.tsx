import React, { ReactElement } from 'react';
import { Requirement as RequirementProps, DataType } from 'ts4ocds/extensions/requirements';
import { NumberInput, Switch, TextInput, Text, Flex, Checkbox } from 'ustudio-ui';
import { Field } from 'formfish';

import Styled from './styles';

interface InputProps {
  placeholder?: string;
  suffix?: ReactElement;
}

const renderInput = ({
  dataType,
  expectedValue,
  props,
}: {
  dataType: DataType;
  expectedValue?: unknown;
  props: InputProps;
}): ReactElement => {
  switch (dataType) {
    case 'string':
      return <TextInput {...props} />;
    case 'boolean':
      if (expectedValue !== undefined) {
        return <Checkbox defaultValue={expectedValue as boolean} isDisabled={Boolean(expectedValue)} />;
      }

      return <Switch />;
    case 'integer':
    case 'number':
    default:
      return <NumberInput {...props} />;
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

const Requirement = ({ id, title, expectedValue, dataType }: RequirementProps) => {
  return (
    <Styled.Requirement htmlFor={id}>
      <Flex
        direction={isBoolean(dataType) ? 'row' : 'column'}
        isReversed={isBoolean(dataType)}
        alignment={{ horizontal: isBoolean(dataType) ? 'end' : 'start', vertical: 'center' }}
      >
        {title && (
          <Styled.Title variant="caption" isBoolean={isBoolean(dataType)}>
            {title}
          </Styled.Title>
        )}

        <Field name={id}>
          {renderInput({
            dataType,
            expectedValue,
            props: formatProps({ title, dataType }),
          })}
        </Field>
      </Flex>
    </Styled.Requirement>
  );
};

export default Requirement;
