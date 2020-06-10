import type { Dispatch } from 'react';

import type { FormValidationAction } from './actions';

export type FormValidationContextState = Record<string, string>;

export interface FormValidationContextValue {
  hasValidationFailed: boolean;
  state: FormValidationContextState;
  dispatch: Dispatch<FormValidationAction>;
}
