import React, { useCallback, useMemo, useState } from 'react';
import { Form } from 'formfish';
import Cell from 'ustudio-ui/components/Grid/Cell';
import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import { useHistory } from 'react-router-dom';

import { modifyId, sortById } from 'utils';
import { postCalculationConfig } from 'config';
import { useRequest } from 'hooks';
import { RequestedNeed } from 'types/data';

import { FadeIn } from 'components';

import { useCategoryContext } from '../../store';
import { Criteria } from '../Form/components';
import { getRequestedNeed, isRequirementGroupFilled } from './Stepper.module';

import { Overlay, Step, StepperButton } from './components';

import Styled from './Stepper.styles';

export const Stepper: React.FC<{
  isBooleanGroupActive: boolean;
  setBooleanGroupActive: (isActive: boolean) => void;
}> = ({ isBooleanGroupActive, setBooleanGroupActive }) => {
  const { currentCriterion, criteria, requestedNeed, requestedNeedData, category, dispatch } = useCategoryContext();

  const { title, description } = useMemo(() => currentCriterion, [currentCriterion.id]);

  const steps = useMemo(() => Object.values(criteria), []);
  const titles = useMemo(() => steps.map((step) => step.title), []);

  const isStepActive = useCallback((stepTitle: string): boolean => titles.indexOf(stepTitle) <= titles.indexOf(title), [
    title,
  ]);
  const isLastStep = useMemo((): boolean => titles.indexOf(title) === steps.length - 1, [title]);
  const isFirstStep = useMemo((): boolean => titles.indexOf(title) === 0, [title]);

  const [isNextStepAvailable, setNextStepAvailable] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const { isLoading, error, triggerRequest, data: calculationResponse } = useRequest<RequestedNeed>(
    postCalculationConfig(category.id, category.version, { requestedNeed: requestedNeedData } as {
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
          title="Успіх!"
          isOpen={!isLoading && !error && Boolean(requestedNeedData)}
          onChange={() => {
            if (calculationResponse) {
              sessionStorage.setItem(calculationResponse.id, JSON.stringify(calculationResponse));

              replace('/');
            }
          }}
        >
          <Text>Ваш розрахунковий запит був успішно надісланий :)</Text>
        </Styled.Modal>
      )}

      <Styled.Stepper length={steps.length}>
        {steps.sort(sortById).map((step, index) => (
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
        watch={(state) => {
          if (isRequirementGroupFilled({ state, currentCriterion }) || isBooleanGroupActive) {
            setNextStepAvailable(true);
          } else {
            setNextStepAvailable(false);
          }
        }}
        onSubmit={(state) => {
          const newRequestedNeed = state[currentCriterion.id][currentCriterion.activeRequirementGroup];

          if (isSubmitting) {
            dispatch({
              type: 'add_requested_need_data',
              payload: getRequestedNeed({
                ...requestedNeed,
                [currentCriterion.id]: {
                  ...newRequestedNeed,
                },
              }),
            });
          }

          dispatch({
            type: 'add_requested_need',
            payload: {
              criterionId: currentCriterion.id,
              requirements: newRequestedNeed as Record<string, unknown>,
            },
          });
        }}
      >
        <Styled.Container isContainer>
          <Cell xs={{ size: 2 }}>
            <StepperButton isActive={!isFirstStep} onClick={setStep((id) => id - 1)}>
              Назад
            </StepperButton>
          </Cell>

          <Styled.Step xs={{ size: 8 }}>
            <Flex direction="column">
              <Criteria {...{ isBooleanGroupActive, setBooleanGroupActive }} />
            </Flex>
          </Styled.Step>

          <Cell xs={{ size: 2 }}>
            {isLastStep ? (
              <StepperButton
                isActive
                onClick={() => {
                  setSubmitting(true);
                }}
                isDisabled={!currentCriterion.activeRequirementGroup || !isNextStepAvailable}
              >
                Завершити
              </StepperButton>
            ) : (
              <StepperButton
                isActive
                onClick={setStep((id) => id + 1)}
                isDisabled={!currentCriterion.activeRequirementGroup || !isNextStepAvailable}
              >
                Далі
              </StepperButton>
            )}
          </Cell>
        </Styled.Container>
      </Form>
    </Flex>
  );
};
