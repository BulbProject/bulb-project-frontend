import React, { useCallback, useEffect, useState } from 'react';
import { css } from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';
import Checkbox from 'ustudio-ui/components/Checkbox';
import Text from 'ustudio-ui/components/Text';
import FieldSet from 'formfish/components/FieldSet';
import Field from 'formfish/components/Field';

import { useCategoryContext } from '../../../../store';
import { RequirementGroup } from '../RequirementGroup';

import { BinaryGroupProps } from './BinaryGroup.types';
import Styled from './BinaryGroup.styles';

export const BinaryGroup: React.FC<BinaryGroupProps> = ({ booleanGroup, nonBooleanGroup }) => {
  const { dispatch, currentCriterion, requestedNeed } = useCategoryContext();

  const [isMounted, setMounted] = useState(false);
  const [isBooleanGroupActive, setBooleanGroupActive] = useState(false);
  const [prevBooleanValue, setPrevBooleanValue] = useState<undefined | boolean>();

  const setActiveRequirementGroup = useCallback((value: boolean) => {
    dispatch({
      type: 'set_active_requirement_group',
      payload: {
        requirementGroup: value ? booleanGroup : nonBooleanGroup,
        criterionId: currentCriterion.id,
      },
    });
  }, []);

  useEffect(() => {
    const prevValue = requestedNeed[currentCriterion.id]?.[booleanGroup.requirements[0].id] as boolean;

    setActiveRequirementGroup(Boolean(prevValue));
    setBooleanGroupActive(Boolean(prevValue));
    setPrevBooleanValue(prevValue);
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return isMounted ? (
    <Flex direction="column">
      <Styled.MarginCompensation />

      <RequirementGroup {...nonBooleanGroup} isDisabled={isBooleanGroupActive} />

      <Styled.Divider />

      <Styled.CheckboxContainer alignment={{ horizontal: 'end', vertical: 'center' }}>
        <Text variant="caption">{booleanGroup.description}</Text>

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

                    setActiveRequirementGroup(inputValue);
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
  ) : (
    <></>
  );
};
