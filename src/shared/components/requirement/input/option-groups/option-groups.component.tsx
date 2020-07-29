import React, { FC, useMemo } from 'react';
import type { OptionGroup as OptionGroupType, RequirementWithOptionDetails } from 'ts4ocds/extensions/options';
import Select from 'ustudio-ui/components/Select/Select';
import type { Group } from 'ustudio-ui/components/Select/select.types';

import { sortByValue } from 'shared/utils';

import { Document } from 'ts4ocds';
import { Field } from '../field';
import { mapOptionsToItems } from '../utils';
import { CarouselGroups } from '../../../carousel-groups';
import { GroupType } from '../../../carousel-groups/carousel-groups.types';

import Styled from './option-groups.styles';
import { OptionGroup } from '../../../option-group';
import { Title } from '../../../title';
import { useCategory } from '../../../../../core/context/category-provider';
import { CarouselCard } from '../../../entity';

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

  const {
    category: { documents },
  } = useCategory();

  const cards: CarouselCard[] = useMemo(() => {
    return optionGroups.map(({ id }) => {
      const { url, title } = documents?.find(({ relatedItem }) => relatedItem === id) ?? ({} as Document);

      return {
        id,
        title,
        url,
      } as CarouselCard;
    });
  }, [documents]);

  return showCarousel ? (
    <CarouselGroups
      requirement={requirement}
      groups={optionGroups as GroupType[]}
      defaultValue={defaultValue}
      criterionId={criterionId}
      docs={cards}
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
