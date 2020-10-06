import React, { FC, useState } from 'react';
import { Form } from 'formfish';
import Flex from 'ustudio-ui/components/Flex';
import { useTranslation } from 'react-i18next';

import { useFormValidator } from 'shared/context/form-validator';
import { useCalculation } from 'shared/context/calculation';
import { prepareRequestedNeed, isFormFilledIn } from 'shared/utils';
import { useCategory } from 'core/context/category-provider';

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

  const { t } = useTranslation('criterion');

  return (
    <Styled.Wrapper>
      <Flex direction="column">
        <Form
          name={id}
          watch={(state) => {
            setFormChanged(JSON.stringify(state[id]) !== JSON.stringify(formData) && isFormFilledIn(state[id]));
          }}
          onSubmit={(state) => {
            if (!hasValidationFailed()) {
              setSubmitting(true);
              recalculate();

              dispatch.setFormData(state[id] as Record<string, Record<string, unknown>>);

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
              {t('recalculate')}
            </Styled.Recalculate>
          </>
        </Form>
      </Flex>
    </Styled.Wrapper>
  );
};
