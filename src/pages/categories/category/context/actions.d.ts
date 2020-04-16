interface SetCurrentCriteria {
  type: 'set_current_criterion';
  payload: string;
}

interface SetActiveRequirementGroup {
  type: 'set_active_requirement_group';
  payload: {
    criterionId: string;
    requirementGroupId: string;
  };
}

interface AddRequestedNeed {
  type: 'add_requested_need';
  payload: {
    criterionId: string;
    requirements: Record<string, unknown>;
  };
}

export type CategoryContextAction = SetCurrentCriteria | SetActiveRequirementGroup | AddRequestedNeed;
