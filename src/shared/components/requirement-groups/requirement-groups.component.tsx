import React, { FC } from 'react';
import FieldSet from 'formfish/components/FieldSet';
import type { Document } from 'ts4ocds';
import type { OptionGroup as OptionGroupType } from 'ts4ocds/extensions/options/option-group';

import type { Category, RequirementGroup, RequirementGroup as RequirementGroupType } from 'shared/entity/data';

import { useCalculation } from '../../context/calculation';

import type { CarouselCard } from '../entity';
import { Title } from '../title';
import { OptionGroups } from '../option-groups';
import { CarouselGroups } from '../carousel-groups';

export const RequirementGroups: FC<{
  selectedRequirementGroup: RequirementGroup | undefined;
  filteredDocuments: Category['documents'] | undefined;
  requirementGroups: RequirementGroup[];
  formData: Record<string, unknown>;
  id: string;
}> = ({ selectedRequirementGroup, filteredDocuments, requirementGroups, formData, id }) => {
  const { dispatch } = useCalculation();

  return (
    <CarouselGroups
      requirement={selectedRequirementGroup?.requirements[0]}
      groups={requirementGroups}
      defaultValue={(formData as Record<string, string>)[selectedRequirementGroup?.requirements[0].id as string]}
      /* eslint-disable-next-line no-shadow */
      documents={requirementGroups.map(({ id }) => {
        const { url, title } = filteredDocuments?.find(({ relatedItem }) => relatedItem === id) as Document;

        return {
          id,
          url,
          title,
        } as CarouselCard;
      })}
      getPreselectedGroup={(_defaultValue) => {
        return requirementGroups
          .flatMap(({ requirements }) =>
            requirements.flatMap(({ optionDetails }) => {
              return ('optionGroups' in optionDetails && optionDetails.optionGroups) as OptionGroupType[];
            })
          )
          .find(({ options }) => {
            return options.map(({ value }) => value).includes(_defaultValue);
          }) as { id: string } | undefined;
      }}
      renderGroup={({ selectedGroup: _selectedGroup, defaultValue }) => {
        const selectedGroup = _selectedGroup as RequirementGroupType;

        return (
          <>
            <Title
              dataType={selectedGroup.requirements[0].dataType}
              title={`${selectedGroup.description}`}
              color="var(--c-primary)"
            />

            <FieldSet name={selectedGroup.id}>
              <OptionGroups
                showCarousel={false}
                optionGroups={
                  'optionGroups' in selectedGroup.requirements[0].optionDetails
                    ? selectedGroup.requirements[0].optionDetails.optionGroups
                    : []
                }
                requirement={selectedGroup.requirements[0]}
                defaultValue={defaultValue}
              />
            </FieldSet>
          </>
        );
      }}
      onGroupSelect={(requirementGroupId) =>
        dispatch.selectRequirementGroup({
          criterionId: id,
          requirementGroup: requirementGroups.find((group) => group.id === requirementGroupId),
        })
      }
    />
  );
};
