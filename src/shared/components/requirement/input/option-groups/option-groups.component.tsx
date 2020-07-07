import React, { FC, useMemo } from 'react';
import { OptionGroup, RequirementWithOptionDetails } from 'ts4ocds/extensions/options';

import Select from 'ustudio-ui/components/Select/Select';
import { Group } from 'ustudio-ui/components/Select/select.types';

import { sortByValue } from 'shared/utils';

import { Field } from '../field';
import { mapOptionsToItems } from '../utils';

import Styled from './option-groups.styles';

export const OptionGroups: FC<{
  optionGroups: OptionGroup[];
  requirement: RequirementWithOptionDetails;
  isDisabled?: boolean;
  defaultValue: string;
}> = ({ optionGroups, requirement, isDisabled, defaultValue }) => {
  const groupsMap: Group[] = useMemo(() => {
    return optionGroups.sort(sortByValue('id')).map((optionGroup) => {
      return {
        title: optionGroup.description as string,
        items: mapOptionsToItems(optionGroup.options),
      };
    }, {});
  }, [optionGroups]);

  return (
    <Field requirement={requirement} isDisabled={isDisabled}>
      <Select
        autocomplete={groupsMap.flatMap((group) => Object.values(group.items)).length >= 10}
        isDisabled={isDisabled}
        groups={groupsMap}
        defaultValue={defaultValue}
        styled={{
          ValuesListItem: Styled.MultiValuesListItem,
          ValuesListTitle: Styled.ValuesListTitle,
          // Another problem with UI Kit type declarations
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          Dropdown: Styled.Dropdown,
        }}
      />
    </Field>
  );
};
