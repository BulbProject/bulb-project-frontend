import React, { FC, useMemo, useState } from 'react';
import type { OptionGroup as OptionGroupType, RequirementWithOptionDetails } from 'ts4ocds/extensions/options';
import type { Document } from 'ts4ocds';

import useAutoTransition from 'honks/use-auto-transition';

import Flex from 'ustudio-ui/components/Flex';
import Select from 'ustudio-ui/components/Select/Select';
import type { Group } from 'ustudio-ui/components/Select/select.types';

import { sortByValue } from 'shared/utils';
import { useCategory } from 'core/context/category-provider';
import { useStepperState } from 'modules/category/stepper-state';
import { useCalculation } from 'shared/context/calculation';
import { Title } from '../../title';

import { Field } from '../field';
import { OptionGroup } from '../option-group';
import { mapOptionsToItems } from '../utils';

import { Carousel } from './carousel';
import type { CarouselCard } from './carousel/entity';
import Styled from './option-groups.styles';

export const OptionGroups: FC<{
  optionGroups: OptionGroupType[];
  requirement: RequirementWithOptionDetails;
  isDisabled?: boolean;
  defaultValue: string;
  showCarousel?: boolean;
}> = ({ optionGroups, requirement, isDisabled, defaultValue, showCarousel }) => {
  const {
    category: { documents },
  } = useCategory();

  const { formData } = useCalculation();
  const { currentStep } = useStepperState();

  const groupsMap: Group[] = useMemo(() => {
    return optionGroups.sort(sortByValue('id')).map((optionGroup) => {
      return {
        title: optionGroup.description as string,
        items: mapOptionsToItems(optionGroup.options),
      };
    }, {});
  }, [optionGroups]);

  const preselectedGroup = useMemo(() => {
    const isRequirementInForm = Boolean(
      // `formData` at some moment in time can not contain `currentStep.id`
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      Object.keys((formData?.[currentStep.id] as Record<string, string>) || {}).find(
        (requirementId) => requirementId === requirement.id
      )
    );

    if (isRequirementInForm) {
      return optionGroups.find(({ options }) => {
        return options.map(({ value }) => value).includes(defaultValue);
      });
    }
  }, []);

  const [selectedGroup, setSelectedGroup] = useState<OptionGroupType | undefined>(preselectedGroup);
  const [hasSelectedOnce, setSelectedOnce] = useState(false);

  const [selectedGroupRef, selectedGroupHeight] = useAutoTransition<HTMLDivElement>(
    (div) => div.getBoundingClientRect().height,
    [Boolean(selectedGroup)]
  );

  return showCarousel ? (
    <Flex direction="column">
      <Carousel
        selectedCard={selectedGroup?.id as string | undefined}
        onCardSelect={(id: string) => {
          setSelectedOnce(true);

          if (id !== selectedGroup?.id) {
            setSelectedGroup(undefined);

            setTimeout(() => setSelectedGroup(optionGroups.find(({ id: optionGroupId }) => id === optionGroupId)), 150);
          }
        }}
        cards={optionGroups.map(({ id }) => {
          const { url, title } = documents?.find(({ relatedItem }) => relatedItem === id) as Document;

          return {
            id,
            title,
            url,
          } as CarouselCard;
        })}
      />

      <Styled.SelectedGroupContainer hasSelectedGroup={hasSelectedOnce} $height={selectedGroupHeight}>
        <div ref={selectedGroupRef}>
          {selectedGroup && (
            <Flex direction="column" margin={{ bottom: 'small' }}>
              <Title
                dataType={requirement.dataType}
                title={selectedGroup.description as string}
                color="var(--c-primary)"
              />

              <OptionGroup
                optionGroup={selectedGroup}
                requirement={requirement}
                defaultValue={defaultValue}
                isDisabled={isDisabled}
              />
            </Flex>
          )}
        </div>
      </Styled.SelectedGroupContainer>
    </Flex>
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
