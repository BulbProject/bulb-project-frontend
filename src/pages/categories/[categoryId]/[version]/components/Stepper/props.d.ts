export interface StepProps {
  title: string;
  index: number;
  isActive: boolean;
}

export type Step = StepProps['title'];

export interface StepperProps {
  steps: Step[];
  activeStep: Step;
}
