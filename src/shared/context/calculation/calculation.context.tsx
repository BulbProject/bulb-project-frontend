import React, { FC, createContext, useContext, useReducer, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAsync from 'honks/use-async';
import axios, { AxiosError } from 'axios';

import { css } from 'styled-components';
import Modal from 'ustudio-ui/components/Modal';
import Text from 'ustudio-ui/components/Text';

import type { RequestedNeed } from 'shared/entity/data';
import { useApi } from 'core/context/api-provider';
import { useCategory } from 'core/context/category-provider';
import { Overlay } from 'modules/category/stepper/overlay';

import type { CalculationState } from './entity';
import { CalculationDispatcher } from './entity/calculation.actions';
import { calculationReducer } from './entity/calculation.reducer';
import { CalculationResponse } from './entity/calculation-response';

interface CalculationValue extends CalculationState {
  isSubmitting: boolean;
  dispatch: CalculationDispatcher;
  setSubmitting(value: boolean): void;
}

export const CalculationContext = createContext<CalculationValue | undefined>(undefined);

const Calculation: FC = ({ children }) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const [state, _dispatch] = useReducer(calculationReducer, {
    formData: {},
    selectedRequirementGroups: {},
  });

  const dispatch = new CalculationDispatcher(_dispatch);

  const { postCalculationConfig } = useApi();
  const { category, version } = useCategory();

  const { call: postCalculation, isResolved, isRejected, result, onPending, onReject } = useAsync<
    CalculationResponse,
    AxiosError
  >(async () => {
    const { data } = await axios(
      postCalculationConfig(category.id, version, { requestedNeed: state?.calculationPayload } as {
        requestedNeed: RequestedNeed;
      })
    );

    return data;
  });

  useEffect(() => {
    if (state?.calculationPayload && isSubmitting) {
      postCalculation();
    }
  }, [state?.calculationPayload?.id, isSubmitting]);

  const { push } = useHistory();

  useEffect(() => {
    if (isResolved(result) && isSubmitting) {
      sessionStorage.setItem(
        `${category.id}/${version}`,
        JSON.stringify({
          payload: state.calculationPayload,
          response: result.data,
        })
      );

      dispatch.addCalculationData(result.data);

      setSubmitting(false);

      push(`/categories/${category.id}/${version}/calculation-result`);
    }
  }, [isResolved(result), isSubmitting]);

  useEffect(() => {
    if (isRejected(result)) {
      setModalOpen(true);
      setSubmitting(false);
    }
  }, [isRejected(result)]);

  return (
    <CalculationContext.Provider
      value={{
        ...state,
        isSubmitting,
        setSubmitting,
        dispatch,
      }}
    >
      {isSubmitting && onPending(() => <Overlay isActive triggerRequest={postCalculation} />)}

      {onReject((error) => {
        return (
          <Modal
            isOpen={isModalOpen}
            onChange={() => setModalOpen(false)}
            title="Помилка"
            styled={{
              Overlay: css`
                background-color: var(--c-darkest);
              `,
              Title: css`
                color: var(--c-negative);
              `,
            }}
          >
            <Text>{error.response?.data.message || error.message}</Text>
          </Modal>
        );
      })}

      {children}
    </CalculationContext.Provider>
  );
};

export const useCalculation = (): CalculationValue => {
  const context = useContext(CalculationContext);

  if (context === undefined) {
    throw new ReferenceError('Use CalculationState inside its provider.');
  }

  return context;
};

export default Calculation;
