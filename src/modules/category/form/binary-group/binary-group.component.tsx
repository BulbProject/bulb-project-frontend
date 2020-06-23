import { useMount } from 'honks';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { css } from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';
import Checkbox from 'ustudio-ui/components/Checkbox';
import Text from 'ustudio-ui/components/Text';

import FieldSet from 'formfish/components/FieldSet';
import Field from 'formfish/components/Field';

import { RequirementGroup as RequirementGroupType } from 'shared/entity/data';
import { useCalculation } from 'shared/context/calculation';

import { useStepperState } from '../../stepper-state';
import { RequirementGroup } from '../requirement-group';

import Styled from './binary-group.styles';

export const BinaryGroup: FC<{
  booleanGroup: RequirementGroupType;
  nonBooleanGroup: RequirementGroupType;
}> = ({ booleanGroup, nonBooleanGroup }) => {
  const hasMounted = useMount();

  const { currentStep } = useStepperState();
  const { dispatch, formData } = useCalculation();

  const [isBooleanGroupActive, setBooleanGroupActive] = useState(false);
  const [prevBooleanValue, setPrevBooleanValue] = useState<undefined | boolean>();

  const dispatchActiveRequirementGroup = useCallback((value: boolean) => {
    dispatch.selectRequirementGroup({
      criterionId: currentStep.id,
      requirementGroup: value ? booleanGroup : nonBooleanGroup,
    });
  }, []);

  useEffect(() => {
    // Many unknown types and records
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const prevValue = formData[currentStep.id]?.[booleanGroup.requirements[0].id] as boolean;

    dispatchActiveRequirementGroup(Boolean(prevValue));
    setBooleanGroupActive(Boolean(prevValue));
    setPrevBooleanValue(prevValue);
  }, []);

  return hasMounted() ? (
    <Flex direction="column">
      <Styled.MarginCompensation />

      <RequirementGroup {...nonBooleanGroup} isDisabled={isBooleanGroupActive} />

      <Styled.Divider />

      <Styled.CheckboxContainer alignment={{ horizontal: 'end', vertical: 'center' }}>
        <Text
          variant="caption"
          align="right"
          styled={{
            Text: css`
              width: 100%;
            `,
          }}
        >
          {booleanGroup.description}
        </Text>

        <FieldSet name={booleanGroup.id}>
          <Field
            name={booleanGroup.requirements[0].id}
            renderInput={({ value: formValue = prevBooleanValue ?? false, setValue }) => {
              return (
                <Checkbox
                  value={formValue as boolean}
                  onChange={(inputValue = prevBooleanValue ?? false) => {
                    setValue(inputValue);

                    setBooleanGroupActive(inputValue);

                    dispatchActiveRequirementGroup(inputValue);
                  }}
                  styled={{
                    CheckboxContainer: css`
                      margin-left: var(--i-medium);
                    `,
                  }}
                  defaultValue={prevBooleanValue ?? false}
                />
              );
            }}
          />
        </FieldSet>
      </Styled.CheckboxContainer>
    </Flex>
  ) : null;
};
