import React, { FC, useState } from 'react';
import { Form } from 'formfish';

import Flex from 'ustudio-ui/components/Flex';

import { useFormValidator } from 'shared/context/form-validator';
import { useCategory } from 'core/context/category-provider';
import { useCalculation } from 'shared/context/calculation';
import { prepareRequestedNeed } from 'shared/utils';

import { Criterion } from './criterion';

import Styled from './filter.styles';

export const Filter: FC<{
  recalculate(): void;
}> = ({ recalculate }) => {
  const {
    category: { criteria, id },
  } = useCategory();

  const { formData, setSubmitting, dispatch } = useCalculation();

  const { hasValidationFailed } = useFormValidator();

  const [hasFormChanged, setFormChanged] = useState(false);

  return (
    <Styled.Wrapper>
      <Flex direction="column">
        <Form
          name={id}
          watch={(state) => {
            setFormChanged(
              JSON.stringify(state[id]) !== JSON.stringify(formData) &&
                !JSON.stringify(state[id], (_, val) => (val === undefined ? 'undefined' : val)).includes('undefined')
            );
          }}
          onSubmit={(state) => {
            if (!hasValidationFailed()) {
              setSubmitting(true);
              recalculate();

              dispatch.addCalculationPayload(
                prepareRequestedNeed(state[id] as Record<string, Record<string, unknown>>)
              );
            }
          }}
        >
          <>
            {criteria.map((criterion) => (
              <Criterion {...criterion} key={criterion.id} />
            ))}

            <Styled.Recalculate type="submit" isDisabled={!hasFormChanged || hasValidationFailed()}>
              Перерахувати
            </Styled.Recalculate>
          </>
        </Form>
      </Flex>
    </Styled.Wrapper>
  );
};
