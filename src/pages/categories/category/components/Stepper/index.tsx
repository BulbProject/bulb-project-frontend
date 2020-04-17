import React, { ReactElement, useState } from 'react';
import { Form } from 'formfish';
import { FieldSet } from 'formfish/context/form/FormContext';
import { Cell, Flex, Text } from 'ustudio-ui';
import { modifyId } from 'utils';

import { useCategoryContext } from '../../context';
import { CategoryContextStateValue } from '../../context/CategoryContext';

import { Step, StepperButton } from './components';

import Styled from './styles';

const isRequirementGroupFilled = ({
  state,
  currentCriterion,
}: {
  state: FieldSet;
  currentCriterion: CategoryContextStateValue['currentCriterion'];
}): boolean => {
  const criterion = state[currentCriterion.id] as FieldSet;
  const requirementGroup = criterion?.[currentCriterion.activeRequirementGroup];

  if (requirementGroup) {
    return Object.values(requirementGroup).findIndex(requirement => requirement.value === undefined) === -1;
  }

  return false;
};

const Stepper: React.FC = ({ children }) => {
  const { currentCriterion, criteria, dispatch } = useCategoryContext();

  const { title, description } = currentCriterion;
  const steps = Object.values(criteria);

  const titles = steps.map(step => step.title);

  const isStepActive = (stepTitle: string): boolean => titles.indexOf(stepTitle) <= titles.indexOf(title);
  const isLastStep = (): boolean => titles.indexOf(title) === steps.length - 1;
  const isFirstStep = (): boolean => titles.indexOf(title) === 0;

  const [isNextStepAvailable, setNextStepAvailable] = useState(false);

  const setStep = (modify: (id: number) => number) => {
    dispatch({
      type: 'set_current_criterion',
      payload: modifyId(currentCriterion.id, 1, modify),
    });
  };

  return (
    <Flex direction="column">
      <Styled.Stepper length={steps.length}>
        {steps.map((step, index) => (
          <Step title={step.title} key={step.id} isActive={isStepActive(step.title)} index={index} />
        ))}
      </Styled.Stepper>

      {description && (
        <Text align="center" variant="h3">
          {description}
        </Text>
      )}

      <Form
        watch={state => {
          if (isRequirementGroupFilled({ state, currentCriterion })) {
            setNextStepAvailable(true);
          } else {
            setNextStepAvailable(false);
          }
        }}
        onSubmit={state => {
          dispatch({
            type: 'add_requested_need',
            payload: {
              criterionId: currentCriterion.id,
              // Need to fix `formfish` type declarations, as it is incorrectly says there is no index signature on the `state`
              // @ts-ignore
              requirements: state[currentCriterion.id][currentCriterion.activeRequirementGroup],
            },
          });
        }}
        name={currentCriterion.id}
      >
        <Styled.Container isContainer>
          <Cell xs={{ size: 2 }}>
            <StepperButton type="button" isActive={!isFirstStep()} onClick={() => setStep(id => id - 1)}>
              Previous
            </StepperButton>
          </Cell>

          <Cell xs={{ size: 8 }}>
            <Flex direction="column">{children as ReactElement}</Flex>
          </Cell>

          <Cell xs={{ size: 2 }}>
            <StepperButton
              type="submit"
              isActive={!isLastStep()}
              onClick={() => {
                setTimeout(() => {
                  setStep(id => id + 1);
                }, 100);
              }}
              isDisabled={!currentCriterion.activeRequirementGroup || !isNextStepAvailable}
            >
              Next
            </StepperButton>
          </Cell>
        </Styled.Container>
      </Form>
    </Flex>
  );
};

export default Stepper;
