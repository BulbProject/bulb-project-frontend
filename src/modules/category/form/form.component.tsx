import React, { FC, ReactElement } from 'react';
import { Form as FormComponent, FormFieldSet } from 'formfish';
import Cell from 'ustudio-ui/components/Grid/Cell';
import useMediaQuery from 'ustudio-ui/hooks/use-media-query';

import { useFormValidator } from 'shared/context/form-validator';
import { prepareRequestedNeed } from 'shared/utils';
import type { FormData } from 'shared/entity';
import { useCalculation } from 'shared/context/calculation';

import { useStepperState } from '../stepper-state';
import { Criteria } from './criteria';
import Styled from './form.styles';
import { ForwardButton, BackButton } from './buttons';

const isRequirementGroupFilled = ({
  state,
  currentStepId,
  requirementGroupId,
}: {
  state: FormFieldSet;
  currentStepId: string;
  requirementGroupId?: string;
}): boolean => {
  const criterion = state[currentStepId] as Record<string, unknown>;
  const requirementGroup = criterion?.[requirementGroupId ?? ''];

  return (
    Boolean(requirementGroup) &&
    // eslint-disable-next-line sonarjs/no-identical-functions
    !JSON.stringify(requirementGroup, (key, value) => {
      if (value === undefined) {
        return 'undefined';
      }

      return value;
    }).includes('undefined')
  );
};

export const Form: FC = ({ children }) => {
  const { hasValidationFailed } = useFormValidator();
  const { currentStep, setNextStepAvailable, isFirstStep } = useStepperState();
  const { dispatch, formData, isSubmitting, setSubmitting, selectedRequirementGroups } = useCalculation();

  const isXs = useMediaQuery('screen and (min-width: 576px)');
  const isMd = useMediaQuery('screen and (min-width: 768px)');

  return (
    <FormComponent
      name={currentStep.id}
      watch={(state) => {
        setNextStepAvailable(
          isRequirementGroupFilled({
            state,
            currentStepId: currentStep.id,
            requirementGroupId: selectedRequirementGroups[currentStep.id]?.id,
          }) && !hasValidationFailed
        );
      }}
      onSubmit={(state) => {
        const recentRequirementGroup =
          state?.[currentStep.id]?.[selectedRequirementGroups?.[currentStep.id]?.id ?? ''] || {};

        if (isSubmitting && !hasValidationFailed) {
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

      {isMd ? (
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
              {!isFirstStep && isXs && (
                <Cell>
                  <BackButton appearance="outlined" />
                </Cell>
              )}

              <Cell>
                <ForwardButton appearance="contained" onFinish={() => setSubmitting(true)} />
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
    </FormComponent>
  );
};
