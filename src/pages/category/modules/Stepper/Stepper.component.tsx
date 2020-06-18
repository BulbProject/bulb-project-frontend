import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Form } from 'formfish';
import Cell from 'ustudio-ui/components/Grid/Cell';
import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import Modal from 'ustudio-ui/components/Modal'
import useMediaQuery from 'ustudio-ui/hooks/use-media-query';
import { useHistory } from 'react-router-dom';
import { css } from 'styled-components';

import { modifyId, sortByValue, prepareRequestedNeed } from 'utils';
import { postCalculationConfig } from 'config';
import { useRequest } from 'honks';
import axios, { AxiosError } from 'axios';
import { RequestedNeed } from 'types/data';

import { FadeIn } from 'components';
import { useFormValidationContext } from 'context/FormValidation';

import { useCategoryContext } from '../../store';
import { Criterion } from '../Form/components';
import { isRequirementGroupFilled } from './Stepper.module';

import { Overlay, Step, StepperButton } from './components';

import Styled from './Stepper.styles';

export const Stepper: React.FC = () => {
  const { push } = useHistory();

  const isXs = useMediaQuery('screen and (min-width: 576px)');
  const isMd = useMediaQuery('screen and (min-width: 768px)');

  const { currentCriterion, criteria, requestedNeed, requestedNeedData, category, dispatch } = useCategoryContext();

  const [isNextStepAvailable, setNextStepAvailable] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const { hasValidationFailed } = useFormValidationContext();

  const { isSuccess, onPending, onFail, sendRequest: postCalculation, result, isFail } = useRequest<
    RequestedNeed,
    AxiosError
  >(async () => {
    const { data } = await axios(
      postCalculationConfig(category.id, category.version, { requestedNeed: requestedNeedData } as {
        requestedNeed: RequestedNeed;
      })
    );

    return data;
  });

  const { title, description } = useMemo(() => currentCriterion, [currentCriterion.id]);
  const steps = useMemo(() => Object.values(criteria), []);
  const titles = useMemo(() => steps.map((step) => step.title), []);
  const activeStep = useMemo((): string => titles.find((stepTitle) => stepTitle === currentCriterion.title) as string, [
    title,
  ]);
  const isLastStep = useMemo((): boolean => titles.indexOf(title) === steps.length - 1, [title]);
  const isFirstStep = useMemo((): boolean => titles.indexOf(title) === 0, [title]);

  const isStepActive = useCallback((stepTitle: string): boolean => titles.indexOf(stepTitle) <= titles.indexOf(title), [
    title,
  ]);

  const setStep = useCallback(
    (modify: (id: number) => number) => () => {
      setTimeout(() => {
        dispatch({
          type: 'set_current_criterion',
          payload: modifyId(currentCriterion.id, 1, modify),
        });
      }, 100);
    },
    [currentCriterion.id]
  );

  useEffect(() => {
    if (isSubmitting && requestedNeedData) {
      postCalculation();
    }
  }, [isSubmitting, requestedNeedData]);

  useEffect(() => {
    if (isSuccess(result)) {
      sessionStorage.setItem(
        `${category.id}/${category.version}`,
        JSON.stringify({
          payload: requestedNeed,
          response: result.data,
        })
      );

      push(`/categories/${category.id}/${category.version}/calculation-result`);
    }
  }, [isSuccess(result)]);

  useEffect(() => {
    if (isFail(result)) {
      setModalOpen(true);
      setSubmitting(false);
    }
  }, [isFail(result)]);

  const BackButton = ({ appearance = 'text' }: { appearance?: 'text' | 'outlined' }) => (
    <StepperButton appearance={appearance} isActive={!isFirstStep} onClick={setStep((id) => id - 1)}>
      Назад
    </StepperButton>
  );

  const Criteria = (
    <Flex direction="column">
      {steps.map((criterion) => {
        if (currentCriterion.id === criterion.id) {
          return <Criterion key={criterion.id} {...criterion} />;
        }

        return null;
      })}
    </Flex>
  );

  return (
    <Flex direction="column">
      {isSubmitting &&
        onPending(() => (
          <FadeIn>
            <Overlay isActive error={onFail((error) => error) as string | undefined} triggerRequest={postCalculation} />
          </FadeIn>
        ))}

      {onFail((error) => {
        return (
          <Modal
            isOpen={isModalOpen}
            onChange={() => setModalOpen(false)}
            title="Помилка"
            styled={{
              Overlay: css`
              background-color: var(--c-darkest);
            `,
              Title: css`
            color: var(--c-negative)
            `,
            }}
          >
            <Text>{error.response?.data.message || error.message}</Text>
          </Modal>
        );
      })}

      <Styled.Stepper alignment={{ horizontal: 'center' }} length={steps.length}>
        {isMd ? (
          steps
            .sort(sortByValue('id'))
            .map((step, index) => (
              <Step title={step.title} key={step.id} isActive={isStepActive(step.title)} index={index} />
            ))
        ) : (
          <div>
            <Styled.MobileStep align="center" color="var(--c-primary)" variant="h3">
              {activeStep}
            </Styled.MobileStep>
          </div>
        )}
      </Styled.Stepper>

      {description && (
        <Styled.Description align="center" variant={isMd ? 'h3' : 'body'}>
          {description}
        </Styled.Description>
      )}

      <Form
        name={currentCriterion.id}
        watch={(state) => {
          setNextStepAvailable(isRequirementGroupFilled({ state, currentCriterion }) && !hasValidationFailed);
        }}
        onSubmit={(state) => {
          const newRequestedNeed =
            state?.[currentCriterion.id]?.[currentCriterion.activeRequirementGroup?.id || ''] || {};

          if (isSubmitting && !hasValidationFailed) {
            dispatch({
              type: 'add_requested_need_data',
              payload: prepareRequestedNeed({
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
        {isMd ? (
          <Styled.Container isContainer>
            <Cell xs={{ size: 2 }}>
              <BackButton />
            </Cell>

            <Styled.Step xs={{ size: 8 }}>{Criteria}</Styled.Step>

            <Cell xs={{ size: 2 }}>
              {isLastStep ? (
                <StepperButton
                  intent="positive"
                  appearance="text"
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
                  appearance="text"
                  isActive
                  onClick={setStep((id) => id + 1)}
                  isDisabled={!currentCriterion.activeRequirementGroup || !isNextStepAvailable}
                >
                  Далі
                </StepperButton>
              )}
            </Cell>
          </Styled.Container>
        ) : (
          <Styled.Container xs={{ direction: 'column', template: 'auto-fill, 100px' }}>
            <Styled.Step>{Criteria}</Styled.Step>

            <Cell>
              <Styled.MobileButtonsContainer xs={{ gap: 32 }}>
                {!isFirstStep && isXs && (
                  <Cell>
                    <BackButton appearance="outlined" />
                  </Cell>
                )}

                <Cell>
                  {isLastStep ? (
                    <StepperButton
                      intent="positive"
                      appearance="contained"
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
                      appearance="contained"
                      isActive
                      onClick={setStep((id) => id + 1)}
                      isDisabled={!currentCriterion.activeRequirementGroup || !isNextStepAvailable}
                    >
                      Далі
                    </StepperButton>
                  )}
                </Cell>

                {!isFirstStep && !isXs && (
                  <Cell>
                    <BackButton appearance="outlined" />
                  </Cell>
                )}
              </Styled.MobileButtonsContainer>
            </Cell>
          </Styled.Container>
        )}
      </Form>
    </Flex>
  );
};
