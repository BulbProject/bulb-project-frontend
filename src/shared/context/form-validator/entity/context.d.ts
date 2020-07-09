import { FormValidatorDispatcher } from './form-validator.actions';

export type FormValidatorState = Record<string, string>;

export interface FormValidatorValue {
  state: FormValidatorState;
  dispatch: FormValidatorDispatcher;
  hasValidationFailed(criterionId?: string): boolean;
}
