import { Reducer } from 'react';
import { CalculationState } from './calculation-state';
import { CalculationAction } from './calculation.actions';

export const calculationReducer: Reducer<CalculationState, CalculationAction> = (state, action) => {
  switch (action.type) {
    case 'select_requirement_group': {
      const { requirementGroup, criterionId } = action.payload;

      return {
        ...state,
        selectedRequirementGroups: {
          ...state.selectedRequirementGroups,
          [criterionId]: requirementGroup,
        },
      };
    }
    case 'add_form_data': {
      const { criterionId, requirements } = action.payload;

      return {
        ...state,
        formData: {
          ...state.formData,
          [criterionId]: requirements,
        },
      };
    }
    case 'add_related_requirement_id': {
      const { relatedRequirementId, criterionId } = action.payload;

      return {
        ...state,
        relatedRequirementIds: {
          ...state.relatedRequirementIds,
          [criterionId]: relatedRequirementId,
        },
      };
    }
    case 'set_form_data': {
      return {
        ...state,
        formData: action.payload,
      };
    }
    case 'add_calculation_payload': {
      return {
        ...state,
        calculationPayload: action.payload,
      };
    }
    case 'add_calculation_data': {
      return {
        ...state,
        calculationData: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
