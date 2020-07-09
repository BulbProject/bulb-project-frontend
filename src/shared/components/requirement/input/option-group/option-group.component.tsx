import React, { FC, useMemo } from 'react';
import type { OptionGroup as OptionGroupType, RequirementWithOptionDetails } from 'ts4ocds/extensions/options';

import Select from 'ustudio-ui/components/Select/Select';

import { Field } from '../field';
import { mapOptionsToItems } from '../utils';

import Styled from './option-group.styles';

export const OptionGroup: FC<{
  optionGroup?: OptionGroupType;
  requirement: RequirementWithOptionDetails;
  isDisabled?: boolean;
  defaultValue?: string;
}> = ({ optionGroup, requirement, isDisabled, defaultValue }) => {
  const optionsMap = useMemo(() => (optionGroup ? mapOptionsToItems(optionGroup.options) : {}), [optionGroup?.options]);

  return (
    <Field requirement={requirement} isDisabled={isDisabled}>
      <Select
        placeholder="Виберіть один із доступних варіантів"
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
