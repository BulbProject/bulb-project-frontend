import { Dispatch } from 'react';

export class FormValidatorDispatcher {
  public constructor(private readonly dispatch: Dispatch<FormValidatorAction>) {}

  private static setError(id: string, message: string): SetErrorAction {
    return {
      type: 'set_error',
      payload: { id, message },
    };
  }

  public setMinValueError(id: string, minValue: number): void {
    this.dispatch(FormValidatorDispatcher.setError(id, `Введене значення має бути не менше ніж ${minValue}.`));
  }

  public setMaxValueError(id: string, maxValue: number): void {
    this.dispatch(FormValidatorDispatcher.setError(id, `Введене значення має бути не більше ніж ${maxValue}.`));
  }

  public setMinMaxValueError(id: string, [minValue, maxValue]: [number, number]): void {
    this.dispatch(
      FormValidatorDispatcher.setError(id, `Введене значення має бути в межах від ${minValue} до ${maxValue}.`)
    );
  }

  public clearError(id: string): void {
    this.dispatch({
      type: 'clear_error',
      payload: { id },
    });
  }
}

interface ErrorPayload {
  id: string;
  message: string;
}

interface SetErrorAction {
  type: 'set_error';
  payload: ErrorPayload;
}

interface ClearErrorAction {
  type: 'clear_error';
  payload: {
    id: string;
  };
}

export type FormValidatorAction = SetErrorAction | ClearErrorAction;
