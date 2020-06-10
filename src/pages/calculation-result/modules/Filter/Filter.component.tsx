import React, { useState } from 'react';
import { Form } from 'formfish';

import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';

import type { StoreRequestedNeed } from 'types/globals';
import { useFormValidationContext } from 'context/FormValidation';

import { useCalculationContext } from '../../store';
import { Criterion } from './components';

import Styled from './Filter.styles';
import type { FilterProps } from './Filter.types';

export const Filter: React.FC<FilterProps> = ({ error, isLoading, setSubmitting, recalculate }) => {
  const {
    category: { criteria, id },
    requestedNeed,
    dispatch,
  } = useCalculationContext();

  const { hasValidationFailed } = useFormValidationContext();

  const [hasFormChanged, setFormChanged] = useState(false);

  return (
    <Styled.Wrapper>
      {isLoading && (
        <Styled.Overlay isLoading={isLoading} alignment={{ horizontal: 'center', vertical: 'center' }}>
          <Spinner appearance={{ size: 64 }} />
        </Styled.Overlay>
      )}

      <Flex direction="column">
        <Form
          name={id}
          watch={(state) => {
            setFormChanged(JSON.stringify(state[id]) !== JSON.stringify(requestedNeed));
          }}
          onSubmit={(state) => {
            if (!hasValidationFailed) {
              setSubmitting(true);

              dispatch({
                type: 'recalculate',
                payload: state[id] as StoreRequestedNeed,
              });

              recalculate(state[id] as StoreRequestedNeed);
            }
          }}
        >
          <>
            {criteria.map((criterion) => (
              <Criterion {...criterion} key={criterion.id} />
            ))}

            <Styled.Recalculate type="submit" isDisabled={!hasFormChanged || isLoading || hasValidationFailed}>
              Перерахувати
            </Styled.Recalculate>

            {error && (
              <Flex direction="column" margin={{ bottom: 'medium' }}>
                <Text color="var(--c-negative)" align="center" variant="small">
                  {error}
                </Text>
              </Flex>
            )}
          </>
        </Form>
      </Flex>
    </Styled.Wrapper>
  );
};
