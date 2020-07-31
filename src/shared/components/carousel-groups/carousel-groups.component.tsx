import React, { FC, useMemo, useState } from 'react';

import type { RequirementWithOptionDetails } from 'ts4ocds/extensions/options';

import Flex from 'ustudio-ui/components/Flex';
import useAutoTransition from 'honks/use-auto-transition';

import { useCalculation } from 'shared/context/calculation';

import { Carousel } from '../carousel';
import { CarouselCard } from '../entity';
import { GroupType } from './carousel-groups.types';

import Styled from './carousel-groups.styles';

export const CarouselGroups: FC<{
  criterionId?: string;
  requirement?: RequirementWithOptionDetails;
  groups: GroupType[];
  defaultValue: string;
  documents: CarouselCard[];
  getPreselectedGroup(defaultValue: string): GroupType | undefined;
  renderGroup({ selectedGroup, defaultValue }: { selectedGroup: GroupType; defaultValue: string }): JSX.Element;
  onGroupSelect?(groupId: string | number): void;
}> = ({ criterionId, requirement, groups, defaultValue, onGroupSelect, documents, getPreselectedGroup, renderGroup }) => {
  const { formData } = useCalculation();

  const preselectedGroup = useMemo(() => {
    const isRequirementInForm = Boolean(
      criterionId &&
        // `formData` at some moment in time can not contain `currentStep.id`
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        Object.keys((formData?.[criterionId] as Record<string, string>) || {}).find(
          (requirementId) => requirementId === requirement?.id
        )
    );

    if (isRequirementInForm) {
      return getPreselectedGroup(defaultValue);
    }
  }, []);

  const [selectedGroup, setSelectedGroup] = useState<GroupType | undefined>(preselectedGroup);
  const [hasSelectedOnce, setSelectedOnce] = useState(false);

  const [selectedGroupRef, selectedGroupHeight] = useAutoTransition<HTMLDivElement>(
    (div) => div.getBoundingClientRect().height,
    [Boolean(selectedGroup)]
  );

  return (
    <Flex direction="column">
      <Carousel
        selectedCard={selectedGroup?.id}
        onCardSelect={(id: string) => {
          if (onGroupSelect) onGroupSelect(id);
          setSelectedOnce(true);

          if (id !== selectedGroup?.id) {
            setSelectedGroup(undefined);

            setTimeout(() => setSelectedGroup(groups.find(({ id: optionGroupId }) => id === optionGroupId)), 150);
          }
        }}
        cards={documents}
      />

      <Styled.SelectedGroupContainer hasSelectedGroup={hasSelectedOnce} $height={selectedGroupHeight}>
        <div ref={selectedGroupRef}>
          {selectedGroup && (
            <Flex direction="column" margin={{ bottom: 'small' }}>
              {renderGroup({ selectedGroup, defaultValue })}
            </Flex>
          )}
        </div>
      </Styled.SelectedGroupContainer>
    </Flex>
  );
};
