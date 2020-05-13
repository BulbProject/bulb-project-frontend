import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Form } from 'formfish';
import { Grid } from 'ustudio-ui';
import Cell from 'ustudio-ui/components/Grid/Cell';
import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import Alert from 'ustudio-ui/components/Alert';
import useMediaQuery from 'ustudio-ui/hooks/use-media-query';
import { useHistory } from 'react-router-dom';

import { modifyId, sortByValue, prepareRequestedNeed } from 'utils';
import { postCalculationConfig } from 'config';
import { useRequest } from 'hooks';
import { RequestedNeed } from 'types/data';

import { FadeIn } from 'components';

import { useCategoryContext } from '../../store';
import { Criterion } from '../Form/components';
import { isRequirementGroupFilled } from './Stepper.module';

import { Overlay, Step, StepperButton } from './components';

import Styled from './Stepper.styles';

export const Stepper: React.FC = () => {
  const { currentCriterion, criteria, requestedNeed, requestedNeedData, category, dispatch } = useCategoryContext();

  const { title, description } = useMemo(() => currentCriterion, [currentCriterion.id]);

  const steps = useMemo(() => Object.values(criteria), []);
  const titles = useMemo(() => steps.map((step) => step.title), []);

  const isStepActive = useCallback((stepTitle: string): boolean => titles.indexOf(stepTitle) <= titles.indexOf(title), [
    title,
  ]);
  const activeStep = useMemo((): string => titles.find((stepTitle) => stepTitle === currentCriterion.title) as string, [
    title,
  ]);
  const isLastStep = useMemo((): boolean => titles.indexOf(title) === steps.length - 1, [title]);
  const isFirstStep = useMemo((): boolean => titles.indexOf(title) === 0, [title]);

  const [isNextStepAvailable, setNextStepAvailable] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      setTimeout(() => setSubmitting(false), 0);
    }
  }, [isSubmitting]);

  const { isLoading, error, triggerRequest, data: calculationResponse } = useRequest<RequestedNeed>(
    postCalculationConfig(category.id, category.version, { requestedNeed: requestedNeedData } as {
      requestedNeed: RequestedNeed;
    }),
    {
      dependencies: [requestedNeedData],
      isRequesting: Boolean(requestedNeedData) && isSubmitting,
    }
  );

  const setStep = (modify: (id: number) => number) => () => {
    setTimeout(() => {
      dispatch({
        type: 'set_current_criterion',
        payload: modifyId(currentCriterion.id, 1, modify),
      });
    }, 100);
  };

  const { push } = useHistory();

  const isXs = useMediaQuery('screen and (min-width: 576px)');
  const isMd = useMediaQuery('screen and (min-width: 768px)');

  const ForwardButton = ({ appearance = 'text' }: { appearance?: 'text' | 'contained' }) => {
    return isLastStep ? (
      <StepperButton
        intent="positive"
        appearance={appearance}
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
        appearance={appearance}
        isActive
        onClick={setStep((id) => id + 1)}
        isDisabled={!currentCriterion.activeRequirementGroup || !isNextStepAvailable}
      >
        Далі
      </StepperButton>
    );
  };

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
      {isLoading && isSubmitting && (
        <FadeIn>
          <Overlay isActive={isLoading && isSubmitting} error={error?.message} triggerRequest={triggerRequest} />
        </FadeIn>
      )}

      {error && !isLoading && (
        <Alert onChange={triggerRequest} isOpen={Boolean(error)} horizontalPosition="center" verticalPosition="top">
          Упс, щось пішло не так...
        </Alert>
      )}

      {!isLoading && !error && Boolean(requestedNeedData) && (
        <Styled.Modal
          title="Успіх!"
          isOpen={!isLoading && !error && Boolean(requestedNeedData)}
          onChange={() => {
            sessionStorage.setItem(
              `${category.id}/${category.version}`,
              JSON.stringify({
                payload: requestedNeed,
                response: calculationResponse,
              })
            );

            push(`/categories/${category.id}/${category.version}/calculation-result`);
          }}
        >
          <Text>Ваш розрахунковий запит був успішно надісланий :)</Text>
        </Styled.Modal>
      )}

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
          if (isRequirementGroupFilled({ state, currentCriterion })) {
            setNextStepAvailable(true);
          } else {
            setNextStepAvailable(false);
          }
        }}
        onSubmit={(state) => {
          const newRequestedNeed =
            state?.[currentCriterion.id]?.[currentCriterion.activeRequirementGroup?.id || ''] || {};

          if (isSubmitting) {
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
              <ForwardButton />
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
                  <ForwardButton appearance="contained" />
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
