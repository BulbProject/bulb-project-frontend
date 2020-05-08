import React from 'react';
import { Form } from 'formfish';

import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';

import { useCalculationContext } from '../../store';
import { Criterion } from './components';

export const RequestedNeed = () => {
  const {
    category: { criteria, id },
  } = useCalculationContext();

  return (
    <Flex direction="column">
      <Flex margin={{ bottom: 'large' }}>
        <Text variant="h3">Ваш вибір</Text>
      </Flex>

      <Form name={id} onSubmit={console.log}>
        {criteria.map((criterion) => (
          <Criterion {...criterion} key={criterion.id} />
        ))}
      </Form>
    </Flex>
  );
};
