import React from 'react';
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

            <Styled.ContentContainer direction="column">{children}</Styled.ContentContainer>

            <Flex alignment={{ horizontal: 'space-between' }}>
              <StepperButton
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
                isActive={!isLastStep()}
                onClick={() => {
                  dispatch({
                    type: 'set_current_criterion',
                    payload: modifyId(currentCriterion.id, 1, id => id + 1),
                  });
                }}
              >
                Next
              </StepperButton>
            </Flex>
          </Flex>
        </Cell>
      </Styled.Container>
    </Flex>
  );
};

export default Stepper;
