import React, { FC } from 'react';

import { ErrorBoundary, CategoryHeader } from 'shared/components';
import { FormValidator } from 'shared/context/form-validator';

import { Form } from './form';
import { Stepper } from './stepper';
import StepperState from './stepper-state';

const Category: FC = () => {
  return (
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
  );
};

export default Category;
