import React, { ReactElement } from 'react';
import { Requirement as RequirementProps, DataType } from 'ts4ocds/extensions/requirements';
import { NumberInput, Switch, TextInput, Text, Flex } from 'ustudio-ui';
import { Field } from 'formfish';

import Styled from './styles';

interface InputProps {
  placeholder?: string;
  suffix?: ReactElement;
}

const renderInput = ({ id, dataType, props }: { id: string; dataType: DataType; props: InputProps }): ReactElement => {
  switch (dataType) {
    case 'string':
      return <TextInput id={id} {...props} />;
    case 'boolean':
      return <Switch id={id} />;
    case 'integer':
    case 'number':
    default:
      return <NumberInput id={id} {...props} />;
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

const Requirement = ({ id, title, dataType }: RequirementProps) => {
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

        <Field name={id}>{renderInput({ id, dataType, props: formatProps({ title, dataType }) })}</Field>
      </Flex>
    </Styled.Requirement>
  );
};

export default Requirement;
