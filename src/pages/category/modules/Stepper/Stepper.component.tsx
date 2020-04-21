import React, { ReactElement, useState } from 'react';
import { Form } from 'formfish';
import { FieldSet } from 'formfish/context/form/FormContext';
import { Cell, Flex, Text } from 'ustudio-ui';
import { useHistory } from 'react-router-dom';

import { modifyId } from 'utils';
import { postCalculation } from 'config';
import { useRequest } from 'hooks';
import { RequestedNeed } from 'types/data';

import { FadeIn } from 'components';

import { useCategoryContext } from '../../store';
import { CategoryContextStateValue } from '../../store/CategoryContext';
import { getRequestedNeed } from './Stepper.module';

import { Overlay, Step, StepperButton } from './components';

import Styled from './Stepper.styles';

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
  const { currentCriterion, criteria, requestedNeed, requestedNeedData, category, dispatch } = useCategoryContext();

  const { title, description } = currentCriterion;
  const steps = Object.values(criteria);

  const titles = steps.map(step => step.title);

  const isStepActive = (stepTitle: string): boolean => titles.indexOf(stepTitle) <= titles.indexOf(title);
  const isLastStep = (): boolean => titles.indexOf(title) === steps.length - 1;
  const isFirstStep = (): boolean => titles.indexOf(title) === 0;

  const [isNextStepAvailable, setNextStepAvailable] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const { isLoading, error, triggerRequest } = useRequest(
    postCalculation(category.id, category.version, { requestedNeed: requestedNeedData } as {
      requestedNeed: RequestedNeed;
    }),
    [requestedNeedData],
    Boolean(requestedNeedData)
  );

  const setStep = (modify: (id: number) => number) => () => {
    setTimeout(() => {
      dispatch({
        type: 'set_current_criterion',
        payload: modifyId(currentCriterion.id, 1, modify),
      });
    }, 100);
  };

  const { replace } = useHistory();

  return (
    <Flex direction="column">
      {isLoading && isSubmitting && (
        <FadeIn>
          <Overlay isActive={isLoading && isSubmitting} error={error?.message} triggerRequest={triggerRequest} />
        </FadeIn>
      )}

      {!isLoading && !error && Boolean(requestedNeedData) && (
        <Styled.Modal
          title="Success!"
          isOpen={!isLoading && !error && Boolean(requestedNeedData)}
          onChange={() => replace('/')}
        >
          <Text>Your calculation request was successfully sent :)</Text>
        </Styled.Modal>
      )}

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
        name={currentCriterion.id}
        watch={state => {
          if (isRequirementGroupFilled({ state, currentCriterion })) {
            setNextStepAvailable(true);
          } else {
            setNextStepAvailable(false);
          }
        }}
        onSubmit={state => {
          const newRequestedNeed =
            // Need to fix `formfish` type declarations, as it is incorrectly says there is no index signature on the `state`
            // @ts-ignore
            state[currentCriterion.id][currentCriterion.activeRequirementGroup];

          if (isSubmitting) {
            dispatch({
              type: 'add_requested_need_data',
              payload: getRequestedNeed({
                ...requestedNeed,
                [currentCriterion.id]: {
                  // Need to fix `formfish` type declarations, as it is incorrectly says there is no index signature on the `state`
                  // @ts-ignore
                  ...newRequestedNeed,
                },
              }),
            });
          }

          dispatch({
            type: 'add_requested_need',
            payload: {
              criterionId: currentCriterion.id,
              // Need to fix `formfish` type declarations, as it is incorrectly says there is no index signature on the `state`
              // @ts-ignore
              requirements: newRequestedNeed,
            },
          });
        }}
      >
        <Styled.Container isContainer>
          <Cell xs={{ size: 2 }}>
            <StepperButton isActive={!isFirstStep()} onClick={setStep(id => id - 1)}>
              Previous
            </StepperButton>
          </Cell>

          <Cell xs={{ size: 8 }}>
            <Flex direction="column">{children as ReactElement}</Flex>
          </Cell>

          <Cell xs={{ size: 2 }}>
            {isLastStep() ? (
              <StepperButton
                isActive
                onClick={() => {
                  setSubmitting(true);
                }}
                isDisabled={!currentCriterion.activeRequirementGroup || !isNextStepAvailable}
              >
                Submit
              </StepperButton>
            ) : (
              <StepperButton
                isActive
                onClick={setStep(id => id + 1)}
                isDisabled={!currentCriterion.activeRequirementGroup || !isNextStepAvailable}
              >
                Next
              </StepperButton>
            )}
          </Cell>
        </Styled.Container>
      </Form>
    </Flex>
  );
};

export default Stepper;
