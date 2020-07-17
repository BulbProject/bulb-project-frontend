import React, { FC, ReactElement } from 'react';
import { Form as FormComponent, FormFieldSet } from 'formfish';
import Cell from 'ustudio-ui/components/Grid/Cell';

import { useFormValidator } from 'shared/context/form-validator';
import { prepareRequestedNeed, isFormFilledIn } from 'shared/utils';

import { useCalculation } from 'shared/context/calculation';
import { useMedia } from 'shared/hooks';

import type { FormData } from 'shared/entity';
import type { RequirementGroup } from 'shared/entity/data';

import { useStepperState } from '../stepper-state';

import { Criteria } from './criteria';
import Styled from './form.styles';
import { ForwardButton, BackButton } from './buttons';

const isRequirementGroupFilled = ({
  state,
  currentStepId,
  requirementGroup,
}: {
  state: FormFieldSet;
  currentStepId: string;
  requirementGroup?: RequirementGroup;
}): boolean => {
  const criterion = state[currentStepId] as Record<string, unknown>;
  const formRequirementGroup = criterion?.[requirementGroup?.id ?? ''] as Record<string, unknown> | undefined;

  const areAllRequirementsConsidered =
    Object.keys(formRequirementGroup ?? {}).length === requirementGroup?.requirements.length;

  return (
    Boolean(formRequirementGroup) &&
    areAllRequirementsConsidered &&
    isFormFilledIn(formRequirementGroup)
  );
};

export const Form: FC = ({ children }) => {
  const { hasValidationFailed } = useFormValidator();
  const { currentStep, setNextStepAvailable, isFirstStep } = useStepperState();
  const {
    dispatch,
    formData,
    isSubmitting,
    setSubmitting,
    selectedRequirementGroups,
    calculationPayload,
  } = useCalculation();

  const isXs = useMedia('screen and (min-width: 576px)');
  const isMd = useMedia('screen and (min-width: 768px)');

  return (
    <FormComponent
      name={currentStep.id}
      watch={(state) => {
        setNextStepAvailable(
          isRequirementGroupFilled({
            state,
            currentStepId: currentStep.id,
            requirementGroup: selectedRequirementGroups[currentStep.id],
          }) && !hasValidationFailed(currentStep.id)
        );
      }}
      onSubmit={(state) => {
        // `state` at some moment in time can not contain `currentStep.id` an so on
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        const recentRequirementGroup = state?.[currentStep.id]?.[selectedRequirementGroups?.[currentStep.id]?.id ?? ''];

        if (calculationPayload) {
          dispatch.addCalculationPayload(undefined);
        }

        if (isSubmitting && !hasValidationFailed(currentStep.id)) {
          dispatch.addCalculationPayload(
            prepareRequestedNeed({
              ...formData,
              [currentStep.id]: {
                ...recentRequirementGroup,
              },
            } as FormData)
          );
        }

        dispatch.addFormData({
          criterionId: currentStep.id,
          requirements: recentRequirementGroup as FormData,
        });
      }}
    >
      {children as ReactElement}

      {isMd() ? (
        <Styled.Container isContainer>
          <Cell xs={{ size: 2 }}>
            <BackButton appearance="text" />
          </Cell>

          <Styled.StepContainer xs={{ size: 8 }}>
            <Criteria />
          </Styled.StepContainer>

          <Cell xs={{ size: 2 }}>
            <ForwardButton appearance="text" onFinish={() => setSubmitting(true)} />
          </Cell>
        </Styled.Container>
      ) : (
        <Styled.Container xs={{ direction: 'column', template: 'auto-fill, 100px' }}>
          <Styled.StepContainer>
            <Criteria />
          </Styled.StepContainer>

          <Cell>
            <Styled.MobileButtonsContainer xs={{ gap: 32 }}>
              {!isFirstStep && isXs() && (
                <Cell>
                  <BackButton appearance="outlined" />
                </Cell>
              )}

              <Cell>
                <ForwardButton appearance="contained" onFinish={() => setSubmitting(true)} />
              </Cell>

              {!isFirstStep && !isXs() && (
                <Cell>
                  <BackButton appearance="outlined" />
                </Cell>
              )}
            </Styled.MobileButtonsContainer>
          </Cell>
        </Styled.Container>
      )}
    </FormComponent>
  );
};
