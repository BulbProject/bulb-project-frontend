import { Form } from 'formfish';
import React from 'react';
import { useCalculationContext } from '../../store';
import { Criterion } from './components/Criterion';

import Styled from './RequestedNeed.styles';

export const RequestedNeed = () => {
  const {
    category: { criteria, id },
  } = useCalculationContext();

  return (
    <Styled.RequestedNeed direction="column">
      <Styled.Title variant="h3">Ваш вибір</Styled.Title>

      <Form name={id} onSubmit={console.log}>
        {criteria.map((criterion) => (
          <Criterion {...criterion} key={criterion.id} />
        ))}
      </Form>
    </Styled.RequestedNeed>
  );
};
