import React, { FC, useMemo } from 'react';
import { OptionGroup as OptionGroupType, RequirementWithOptionDetails } from 'ts4ocds/extensions/options';

import Select from 'ustudio-ui/components/Select/Select';
import { Field } from '../field';

import Styled from './option-group.styles';

import { mapOptionsToItems } from '../utils';

export const OptionGroup: FC<{
  optionGroup: OptionGroupType;
  requirement: RequirementWithOptionDetails;
  isDisabled?: boolean;
  defaultValue: string;
}> = ({ optionGroup, requirement, isDisabled, defaultValue }) => {
  const optionsMap = useMemo(() => mapOptionsToItems(optionGroup.options), [optionGroup.options]);

  return (
    <Field requirement={requirement} isDisabled={isDisabled}>
      <Select
        autocomplete={Object.values(optionsMap).length >= 10}
        isDisabled={isDisabled}
        items={optionsMap}
        defaultValue={defaultValue}
        styled={{
          ValuesListItem: Styled.ValuesListItem,
        }}
      />
    </Field>
  );
};
