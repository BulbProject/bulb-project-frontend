import React, { FC, useMemo } from 'react';
import type { OptionGroup as OptionGroupType, RequirementWithOptionDetails } from 'ts4ocds/extensions/options';
import Select from 'ustudio-ui/components/Select/Select';
import type { Group } from 'ustudio-ui/components/Select/select.types';

import { isRelatedOptionGroup, sortByValue } from 'shared/utils';

import { Field } from '../field';
import { useRelatedRequirement } from '../hooks';
import { mapOptionsToItems } from '../utils';
import { CarouselGroups } from './carousel-groups';

import Styled from './option-groups.styles';

export const OptionGroups: FC<{
  optionGroups: OptionGroupType[];
  requirement: RequirementWithOptionDetails;
  isDisabled?: boolean;
  defaultValue: string;
  showCarousel?: boolean;
  criterionId?: string;
}> = ({ optionGroups, requirement, isDisabled, defaultValue, showCarousel, criterionId }) => {
  const groupsMap: Group[] = useMemo(() => {
    return optionGroups.sort(sortByValue('id')).map((optionGroup) => {
      return {
        title: optionGroup.description as string,
        items: mapOptionsToItems(optionGroup.options),
      };
    }, {});
  }, [optionGroups]);

  const watch = useRelatedRequirement(optionGroups.filter(isRelatedOptionGroup).flatMap(({ options }) => options));

  return showCarousel ? (
    <CarouselGroups
      isDisabled={isDisabled}
      requirement={requirement}
      optionGroups={optionGroups}
      defaultValue={defaultValue}
      criterionId={criterionId}
    />
  ) : (
    <Field requirement={requirement} isDisabled={isDisabled} watch={watch}>
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
