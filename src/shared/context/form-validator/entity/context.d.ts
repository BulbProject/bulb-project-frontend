import { FormValidatorDispatcher } from './form-validator.actions';

export type FormValidatorState = Record<string, string>;

export interface FormValidatorValue {
  hasValidationFailed: boolean;
  state: FormValidatorState;
  dispatch: FormValidatorDispatcher;
}
