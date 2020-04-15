import { Form } from 'formfish';
import React, { ReactElement } from 'react';
import { Cell, Flex, Text } from 'ustudio-ui';
import { modifyId } from 'utils';

import { containerCellProps } from '../../config';
import { useCategoryContext } from '../../context';

import { Step, StepperButton } from './components';

import Styled from './styles';

const Stepper: React.FC = ({ children }) => {
  const { currentCriterion, criteria, dispatch } = useCategoryContext();

  const { title, description } = currentCriterion;
  const steps = Object.values(criteria);

  const titles = steps.map(step => step.title);

  const isStepActive = (stepTitle: string): boolean => titles.indexOf(stepTitle) <= titles.indexOf(title);
  const isLastStep = (): boolean => titles.indexOf(title) === steps.length - 1;
  const isFirstStep = (): boolean => titles.indexOf(title) === 0;

  return (
    <Flex direction="column">
      <Styled.Stepper length={steps.length}>
        {steps.map((step, index) => (
          <Step title={step.title} key={step.id} isActive={isStepActive(step.title)} index={index} />
        ))}
      </Styled.Stepper>

      <Styled.Container isContainer>
        <Cell xs={containerCellProps}>
          <Flex direction="column">
            {description && (
              <Text align="center" variant="h3">
                {description}
              </Text>
            )}

            <Form
              onSubmit={state => {
                dispatch({
                  type: 'add_requested_need',
                  payload: {
                    criterionId: currentCriterion.id,
                    // @ts-ignore
                    requirements: state[currentCriterion.id][currentCriterion.activeRequirementGroup],
                  },
                });
              }}
              name={currentCriterion.id}
            >
              {children as ReactElement}

              <Flex alignment={{ horizontal: 'space-between' }}>
                <StepperButton
                  type="button"
                  isActive={!isFirstStep()}
                  onClick={() =>
                    dispatch({
                      type: 'set_current_criterion',
                      payload: modifyId(currentCriterion.id, 1, id => id - 1),
                    })
                  }
                >
                  Previous
                </StepperButton>

                <StepperButton
                  type="submit"
                  isActive={!isLastStep()}
                  onClick={() => {
                    setTimeout(() => {
                      dispatch({
                        type: 'set_current_criterion',
                        payload: modifyId(currentCriterion.id, 1, id => id + 1),
                      });
                    }, 100);
                  }}
                >
                  Next
                </StepperButton>
              </Flex>
            </Form>
          </Flex>
        </Cell>
      </Styled.Container>
    </Flex>
  );
};

export default Stepper;
