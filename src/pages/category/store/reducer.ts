import { Reducer } from 'react';

import { CategoryContextAction } from './actions';
import { CategoryContextStateValue } from './CategoryContext';

const categoryContextReducer: Reducer<CategoryContextStateValue, CategoryContextAction> = (state, action) => {
  switch (action.type) {
    case 'set_current_criterion': {
      const criterion = state.criteria[action.payload];

      return {
        ...state,
        currentCriterion: criterion,
        criteria: {
          ...state.criteria,
          [state.currentCriterion.id]: state.currentCriterion,
        },
      };
    }
    case 'set_active_requirement_group': {
      const { criterionId, requirementGroupId } = action.payload;
      const criterion = state.criteria[criterionId];

      return {
        ...state,
        currentCriterion: {
          ...criterion,
          activeRequirementGroup: requirementGroupId,
        },
      };
    }
    case 'add_requested_need': {
      const { criterionId, requirements } = action.payload;

      return {
        ...state,
        requestedNeed: {
          ...state.requestedNeed,
          [criterionId]: requirements,
        },
      };
    }
    case 'add_requested_need_data': {
      return {
        ...state,
        requestedNeedData: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default categoryContextReducer;
