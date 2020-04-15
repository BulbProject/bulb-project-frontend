import React, { ReactElement } from 'react';
import { Requirement as RequirementProps } from 'ts4ocds/extensions/requirements';
import { NumberInput, Switch, TextInput, Text } from 'ustudio-ui';
import { Field } from 'formfish';

import Styled from './styles';

interface InputProps {
  placeholder?: string;
  suffix?: ReactElement;
}

const renderInput = (dataType: RequirementProps['dataType'], props: InputProps): ReactElement => {
  switch (dataType) {
    case 'string':
      return <TextInput {...props} />;
    case 'boolean':
      return <Switch />;
    case 'integer':
    case 'number':
    default:
      return <NumberInput {...props} />;
  }
};

const formatProps = ({ title, dataType }: { title?: string; dataType: RequirementProps['dataType'] }): InputProps => {
  if (!title) {
    return {};
  }

  const format = title.match(/(.+)(?=,).+(\(.+\))/);

  if (format) {
    return {
      placeholder: `Enter ${format[1].toLowerCase()}`,
      suffix: <Text variant="caption">{format[2].slice(1, -1)}</Text>,
    };
  }

  return {
    placeholder: title,
    suffix: <Text variant="caption">{dataType}</Text>,
  };
};

const Requirement = ({ id, title, dataType }: RequirementProps) => {
  return (
    <Styled.Requirement>
      {title && <Styled.Title>{title}</Styled.Title>}

      <Field name={id}>{renderInput(dataType, formatProps({ title, dataType }))}</Field>
    </Styled.Requirement>
  );
};

export default Requirement;
