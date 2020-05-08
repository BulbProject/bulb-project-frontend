import React, { useState } from 'react';
import { Form } from 'formfish';

import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';

import { useCalculationContext } from '../../store';
import { Criterion } from './components';

import Styled from './RequestedNeed.styles';
import { RequestedNeedProps } from './RequestedNeed.types';

export const RequestedNeed: React.FC<RequestedNeedProps> = ({
  error,
  isLoading,
  isSubmitting,
  setSubmitting,
  recalculate,
}) => {
  const {
    category: { criteria, id },
    requestedNeed,
  } = useCalculationContext();

  const [hasFormChanged, setFormChanged] = useState(false);

  return (
    <div>
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
            if (isSubmitting) {
              recalculate(state);
            }
          }}
        >
          {criteria.map((criterion) => (
            <Criterion {...criterion} key={criterion.id} />
          ))}
        </Form>

        {error && (
          <Flex direction="column">
            <Text color="var(--c-negative)">{error}</Text>
          </Flex>
        )}

        <Styled.Recalculate
          type="submit"
          appearance="text"
          isLoading={isLoading}
          isDisabled={!hasFormChanged}
          onClick={() => {
            setSubmitting(true);
          }}
        >
          Перерахувати
        </Styled.Recalculate>
      </Styled.RequestedNeed>
    </div>
  );
};
