import React, { FC, useState, useMemo } from 'react';
import type { OptionGroup as OptionGroupType, RequirementWithOptionDetails } from 'ts4ocds/extensions/options';
import Select from 'ustudio-ui/components/Select/Select';
import type { Group } from 'ustudio-ui/components/Select/select.types';
import FormField from 'formfish/components/Field';
import type { Document } from 'ts4ocds';

import { sortByValue } from 'shared/utils';
import { useCategory } from 'core/context/category-provider';

import { mapOptionsToItems } from '../requirement/input/utils';
import { OptionGroup } from '../option-group';
import { Title } from '../title';
import { CarouselGroups } from '../carousel-groups';

import type { GroupType } from '../carousel-groups/entity/group-type';
import type { CarouselCard } from '../entity';

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
        items: mapOptionsToItems(
          optionGroup,
          ({ option, optionGroupId }) => `${optionGroupId}_${option.value}`
        ),
      };
    }, {});
  }, [optionGroups]);

  const {
    category: { documents },
  } = useCategory();

  const [selectedOptionGroupId, setSelectedOptionGroupId] = useState('');

  const cards: CarouselCard[] = useMemo(() => {
    return optionGroups.map(({ id }) => {
      const { url, title } = documents?.find(({ relatedItem }) => relatedItem === id) ?? ({} as Document);

      return {
        id,
        title,
        url,
      } as CarouselCard;
    });
  }, [JSON.stringify(documents), JSON.stringify(optionGroups)]);

  return showCarousel ? (
    <CarouselGroups
      requirement={requirement}
      groups={optionGroups as GroupType[]}
      defaultValue={defaultValue}
      criterionId={criterionId}
      cards={cards}
      getPreselectedGroup={(_defaultValue) => {
        return optionGroups.find(({ options }) => {
          return options.map(({ value }) => value).includes(_defaultValue);
        }) as { id: string } | undefined;
      }}
      renderGroup={({ selectedGroup }) => {
        return (
          <>
            <Title
              dataType={requirement.dataType}
              title={selectedGroup.description as string}
              color="var(--c-primary)"
            />

            <OptionGroup
              optionGroup={selectedGroup as OptionGroupType}
              requirement={requirement}
              defaultValue={defaultValue}
              isDisabled={isDisabled}
              isDefaultOpen
            />
          </>
        );
      }}
    />
  ) : (
    <FormField
      name={requirement.id}
      renderInput={({ value = defaultValue, setValue }) => {
        return (
          <Select
            value={`${selectedOptionGroupId}_${value}`}
            onChange={(selectValue) => {
              if (selectValue === undefined) {
                setValue(selectValue);
              }

              // eslint-disable-next-line prefer-named-capture-group,@typescript-eslint/prefer-regexp-exec
              const [, optionGroupId, optionValue] = selectValue.match(/(\d+)_(.+)/u) as [string, string, string];

              setValue(optionValue);
              setSelectedOptionGroupId(optionGroupId);
            }}
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
        );
      }}
    />
  );
};
