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

export type FormValidationAction = SetErrorAction | ClearErrorAction;

const setError = (id: string, message: string): SetErrorAction => {
  return {
    type: 'set_error',
    payload: { id, message },
  };
};

export const setMinValueError = (id: string, minValue: number): SetErrorAction => {
  return setError(id, `Введене значення має бути не менше ніж ${minValue}.`);
};

export const setMaxValueError = (id: string, maxValue: number): SetErrorAction => {
  return setError(id, `Введене значення має бути не більше ніж ${maxValue}.`);
};

export const setMinMaxValueError = (id: string, [minValue, maxValue]: [number, number]): SetErrorAction => {
  return setError(id, `Введене значення має бути в межах від ${minValue} до ${maxValue}.`);
};

export const clearError = (id: string): ClearErrorAction => {
  return {
    type: 'clear_error',
    payload: { id },
  };
};
