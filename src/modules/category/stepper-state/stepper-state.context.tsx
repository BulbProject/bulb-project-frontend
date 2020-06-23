import React, { FC, createContext, useContext, useState, useMemo, useCallback } from 'react';

import { modifyId } from 'shared/utils';
import { useCategory } from 'core/context/category-provider';

import { Step } from './entity';

interface StepperStateService {
  currentStep: Step;
  steps: Record<string, Step>;
  stepsTitles: string[];
  isLastStep: boolean;
  isFirstStep: boolean;
  isNextStepAvailable: boolean;
  setNextStepAvailable(nextValue: boolean): void;
  goToStep(modifyCallback: (id: number) => number): () => void;
}

const StepperStateContext = createContext<StepperStateService | undefined>(undefined);

const StepperState: FC = ({ children }) => {
  const { category } = useCategory();

  const steps = useMemo(() => Object.fromEntries(category.criteria.map((criterion) => [criterion.id, criterion])), [
    category.id,
  ]);

  const [currentStep, setCurrentStep] = useState<Step>(Object.values(steps)[0]);

  const [isNextStepAvailable, setNextStepAvailable] = useState(false);

  const { title } = useMemo(() => currentStep, [currentStep.id]);

  const stepsTitles = useMemo(() => Object.values(steps).map((step) => step.title), []);

  const isLastStep = useMemo(() => stepsTitles.indexOf(title) === stepsTitles.length - 1, [title]);

  const isFirstStep = useMemo(() => stepsTitles.indexOf(title) === 0, [title]);

  const goToStep = useCallback<StepperStateService['goToStep']>(
    (modifyCallback) => () => {
      setTimeout(() => {
        setCurrentStep(steps[modifyId(currentStep.id, 1, modifyCallback)]);
      }, 100);
    },
    [currentStep.id]
  );

  return (
    <StepperStateContext.Provider
      value={{
        currentStep,
        steps,
        stepsTitles,
        isLastStep,
        isFirstStep,
        isNextStepAvailable,
        setNextStepAvailable,
        goToStep,
      }}
    >
      {children}
    </StepperStateContext.Provider>
  );
};

export const useStepperState = (): StepperStateService => {
  const context = useContext(StepperStateContext);

  if (context === undefined) {
    throw new ReferenceError('Use StepperState inside its provider.');
  }

  return context;
};

export default StepperState;
