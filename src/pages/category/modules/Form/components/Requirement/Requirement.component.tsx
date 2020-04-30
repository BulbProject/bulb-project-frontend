import React from 'react';
import { css } from 'styled-components';
import { RequirementWithOptionDetails as RequirementProps } from 'ts4ocds/extensions/options';
import { Field } from 'formfish';

import { useCategoryContext } from 'pages/category/store';
import { Checkbox } from 'ustudio-ui';
import Flex from 'ustudio-ui/components/Flex';
import { formatProps, isBoolean, renderInput } from './Requirement.module';

import Styled from './Requirement.styles';

export const Requirement = ({
  id,
  title,
  expectedValue,
  dataType,
  optionDetails,
  isActive,
  hasBooleanSelection,
  toggleGroup,
}: RequirementProps & { isActive: boolean; hasBooleanSelection?: boolean; toggleGroup?(state: boolean): void }) => {
  const { requestedNeed, currentCriterion } = useCategoryContext();

  const getValue = () => {
    if (optionDetails) {
      return (value: { value: string }) => value.value;
    }

    return undefined;
  };

  const setValue = () => {
    if (optionDetails) {
      return (value: { value: string } | string) => {
        if (typeof value === 'object') {
          return value;
        }

        return { value };
      };
    }

    return undefined;
  };

  return (
    <Styled.Requirement htmlFor={id}>
      <Flex
        direction={isBoolean(dataType) ? 'row' : 'column'}
        isReversed={isBoolean(dataType)}
        alignment={{ horizontal: isBoolean(dataType) ? 'end' : 'start', vertical: 'center' }}
      >
        {title && (
          <Styled.Title
            variant="caption"
            isBoolean={isBoolean(dataType)}
            styled={{
              Text: css`
                color: ${isActive ? 'var(--c-darkest)' : 'var(--c-neutral)'};
                cursor: ${isActive ? 'default' : 'not-allowed'};
              `,
            }}
          >
            {optionDetails && 'optionGroups' in optionDetails ? optionDetails.optionGroups[0].description : title}
          </Styled.Title>
        )}

        {hasBooleanSelection ? (
          <Field name={id} watch={toggleGroup ? (state) => toggleGroup(state as boolean) : undefined}>
            <Checkbox
              defaultValue={expectedValue as boolean}
              styled={{
                CheckboxContainer: css`
                  margin-left: var(--i-regular);
                `,
              }}
            />
          </Field>
        ) : (
          <Field name={id} getValue={getValue()} setValue={setValue()}>
            {renderInput({
              isActive,
              dataType,
              expectedValue,
              defaultValue: requestedNeed[currentCriterion.id]?.[id],
              props: formatProps({ title, dataType }),
              // eslint-disable-next-line no-nested-ternary
              options: optionDetails
                ? 'optionGroups' in optionDetails
                  ? optionDetails.optionGroups?.[0].options
                  : []
                : undefined,
            })}
          </Field>
        )}
      </Flex>
    </Styled.Requirement>
  );
};
