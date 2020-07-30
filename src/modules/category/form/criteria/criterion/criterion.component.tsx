import React, { FC, useEffect, useMemo } from 'react';
import { css } from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';
import Select from 'ustudio-ui/components/Select/Select';
import { Mixin } from 'ustudio-ui/theme';
import FieldSet from 'formfish/components/FieldSet';

import { Criterion as CriterionProps, RequirementGroup as RequirementGroupType } from 'shared/entity/data';
import { useCalculation } from 'shared/context/calculation';

import { OptionGroup as OptionGroupType } from 'ts4ocds/extensions/options/option-group';

import { CarouselGroups } from 'shared/components/carousel-groups';
import { Title } from 'shared/components/title';
import { Document } from 'ts4ocds';

import { CarouselCard } from 'shared/components/entity';
import { OptionGroups } from 'shared/components/option-groups';
import { useCategory } from 'core/context/category-provider';

import { RequirementGroup } from '../../requirement-group';
import { BinaryGroup } from '../../binary-group';

const isGroupBoolean = (requirementGroup: RequirementGroupType): boolean => {
  return (
    requirementGroup.requirements.length === 1 &&
    requirementGroup.requirements[0].dataType === 'boolean' &&
    'expectedValue' in requirementGroup.requirements[0]
  );
};

const filterBooleanGroups = (requirementGroups: RequirementGroupType[]): RequirementGroupType[] => {
  return requirementGroups.filter(isGroupBoolean);
};

const getBooleanGroup = (requirementGroups: RequirementGroupType[]): RequirementGroupType => {
  return filterBooleanGroups(requirementGroups)[0];
};

const getNonBooleanGroup = (requirementGroups: RequirementGroupType[]): RequirementGroupType => {
  return requirementGroups.filter((requirementGroup) => !isGroupBoolean(requirementGroup))[0];
};

const hasBinarySelection = (requirementGroups: RequirementGroupType[]): boolean => {
  const hasTwoGroups = requirementGroups.length === 2;

  const hasBooleanGroup = filterBooleanGroups(requirementGroups).length === 1;

  return hasTwoGroups && hasBooleanGroup;
};

export const Criterion: FC<CriterionProps> = ({ requirementGroups, id }) => {
  const { selectedRequirementGroups, dispatch, formData } = useCalculation();

  const selectedRequirementGroup = useMemo(() => selectedRequirementGroups?.[id], [selectedRequirementGroups]);

  useEffect(() => {
    if (requirementGroups.length === 1) {
      dispatch.selectRequirementGroup({
        criterionId: id,
        requirementGroup: requirementGroups[0],
      });
    }
  }, []);

  const { hasBinaryGroups, booleanGroup, nonBooleanGroup } = useMemo(
    () => ({
      hasBinaryGroups: hasBinarySelection(requirementGroups),
      booleanGroup: getBooleanGroup(requirementGroups),
      nonBooleanGroup: getNonBooleanGroup(requirementGroups),
    }),
    []
  );

  if (hasBinaryGroups && booleanGroup && nonBooleanGroup) {
    return <BinaryGroup booleanGroup={booleanGroup} nonBooleanGroup={nonBooleanGroup} />;
  }

  const {
    category: { documents },
  } = useCategory();

  const filteredDocs = documents?.filter(({ relatedItem }) => {
    return requirementGroups.map(({ id: requirementGroupId }) => requirementGroupId).includes(relatedItem);
  });

  return (
    <Flex direction="column">
      {requirementGroups.length > 1 && filteredDocs?.length === 0 ? (
        <>
          <Select
            autocomplete={requirementGroups.length >= 10}
            placeholder="Виберіть один із доступних варіантів"
            // Select props declaration miss this prop
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            emptyListMessage="Нічого не знайдено"
            items={requirementGroups.reduce((items, requirementGroup) => {
              return Object.assign(items, {
                [requirementGroup.id]: {
                  value: requirementGroup.id,
                  label: `${requirementGroup.description}`,
                },
              });
            }, {})}
            value={selectedRequirementGroup?.id}
            onChange={(requirementGroupId) =>
              dispatch.selectRequirementGroup({
                criterionId: id,
                requirementGroup: requirementGroups.find(
                  (requirementGroup) => requirementGroup.id === requirementGroupId
                ),
              })
            }
            styled={{
              Select: css`
                ${selectedRequirementGroup ? Mixin.Font.bodyBold() : ''};
              `,
              ValuesListItem: css`
                &:before {
                  background: var(--c-primary-light);
                }
              `,
            }}
          />

          {selectedRequirementGroup && <RequirementGroup {...selectedRequirementGroup} />}
        </>
      ) : (
        <CarouselGroups
          requirement={selectedRequirementGroups?.[id]?.requirements[0]}
          groups={requirementGroups}
          defaultValue={
            (formData[id] as Record<string, string>)?.[selectedRequirementGroups?.[id]?.requirements[0].id as string]
          }
          /* eslint-disable-next-line no-shadow */
          docs={requirementGroups.map(({ id }) => {
            const { url, title } = filteredDocs?.find(({ relatedItem }) => relatedItem === id) as Document;

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
      )}
    </Flex>
  );
};
