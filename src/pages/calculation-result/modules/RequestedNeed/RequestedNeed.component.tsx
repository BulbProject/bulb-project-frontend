import React, { useState } from 'react';
import { Form } from 'formfish';

import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';
import type { StoreRequestedNeed } from 'types/globals';

import { useCalculationContext } from '../../store';
import { Criterion } from './components';

import Styled from './RequestedNeed.styles';
import type { RequestedNeedProps } from './RequestedNeed.types';

export const RequestedNeed: React.FC<RequestedNeedProps> = ({ error, isLoading, setSubmitting, recalculate }) => {
  const {
    category: { criteria, id },
    requestedNeed,
    dispatch,
  } = useCalculationContext();

  const [hasFormChanged, setFormChanged] = useState(false);

  return (
    <Styled.Wrapper>
      <Styled.Overlay isLoading={isLoading} alignment={{ horizontal: 'center', vertical: 'center' }}>
        <Spinner appearance={{ size: 64 }} />
      </Styled.Overlay>

      <Styled.RequestedNeed direction="column">
        <Flex margin={{ bottom: 'large' }}>
          <Text variant="h3">Ваш вибір</Text>
        </Flex>

        <Form
          name={id}
          watch={(state) => {
            setFormChanged(JSON.stringify(state[id]) !== JSON.stringify(requestedNeed));
          }}
          onSubmit={(state) => {
            setSubmitting(true);

            dispatch({
              type: 'recalculate',
              payload: state[id] as StoreRequestedNeed,
            });

            recalculate(state[id] as StoreRequestedNeed);
          }}
        >
          <>
            {criteria.map((criterion) => (
              <Criterion {...criterion} key={criterion.id} />
            ))}

            <Styled.Recalculate type="submit" appearance="text" isDisabled={!hasFormChanged || isLoading}>
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
      </Styled.RequestedNeed>
    </Styled.Wrapper>
  );
};
