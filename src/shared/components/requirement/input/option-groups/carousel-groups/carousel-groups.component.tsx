import React, { FC, useMemo, useState } from 'react';

import type { Document } from 'ts4ocds';
import type { RequirementWithOptionDetails } from 'ts4ocds/extensions/options';
import type { OptionGroup as OptionGroupType } from 'ts4ocds/extensions/options/option-group';

import Flex from 'ustudio-ui/components/Flex';
import useAutoTransition from 'honks/use-auto-transition';

import { useCategory } from 'core/context/category-provider';
import { useCalculation } from 'shared/context/calculation';

import { Title } from '../../../title';

import { OptionGroup } from '../../option-group';

import { Carousel } from '../carousel';
import { CarouselCard } from '../carousel/entity';

import Styled from './carousel-groups.styles';

export const CarouselGroups: FC<{
  criterionId?: string;
  requirement: RequirementWithOptionDetails;
  optionGroups: OptionGroupType[];
  defaultValue: string;
  isDisabled?: boolean;
}> = ({ criterionId, requirement, optionGroups, defaultValue, isDisabled }) => {
  const { formData } = useCalculation();
  const {
    category: { documents },
  } = useCategory();

  const preselectedGroup = useMemo(() => {
    const isRequirementInForm = Boolean(
      criterionId &&
        // `formData` at some moment in time can not contain `currentStep.id`
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        Object.keys((formData?.[criterionId] as Record<string, string>) || {}).find(
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

  return (
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
                isDefaultOpen
              />
            </Flex>
          )}
        </div>
      </Styled.SelectedGroupContainer>
    </Flex>
  );
};
