import { Dispatch } from 'react';
import { FormValidationAction } from './actions';

export type FormValidationContextState = Record<string, string>;

export type FormValidationContextDispatch = Dispatch<FormValidationAction>;

export interface FormValidationContextValue {
  state: FormValidationContextState;
  dispatch: FormValidationContextDispatch;
}
