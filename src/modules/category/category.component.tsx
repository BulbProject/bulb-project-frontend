import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { ErrorBoundary, CategoryHeader, Fade } from 'shared/components';
import { FormValidator } from 'shared/context/form-validator';
import { useCalculation } from 'shared/context/calculation';
import { useCategory } from 'core/context/category-provider';

import { Form } from './form';
import { Stepper } from './stepper';
import StepperState from './stepper-state';

const Category: FC = () => {
  const { push } = useHistory();

  const {
    category: { id },
    version,
  } = useCategory();
  const { calculationData } = useCalculation();

  useEffect(() => {
    if (calculationData) {
      push(`/categories/${id}/${version}/calculation-result`);
    }
  }, [calculationData]);

  return (
    <Fade>
      <ErrorBoundary>
        <CategoryHeader />

        <StepperState>
          <FormValidator>
            <Form>
              <Stepper />
            </Form>
          </FormValidator>
        </StepperState>
      </ErrorBoundary>
    </Fade>
  );
};

export default Category;
