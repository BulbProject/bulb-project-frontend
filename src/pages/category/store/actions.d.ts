import { RequestedNeed, RequirementGroup } from 'types/data';

interface SetCurrentCriteria {
  type: 'set_current_criterion';
  payload: string;
}

interface SetActiveRequirementGroup {
  type: 'set_active_requirement_group';
  payload: {
    criterionId: string;
    requirementGroup: RequirementGroup;
  };
}

interface AddRequestedNeed {
  type: 'add_requested_need';
  payload: {
    criterionId: string;
    requirements: Record<string, unknown>;
  };
}

interface AddRequestedNeedData {
  type: 'add_requested_need_data';
  payload: RequestedNeed;
}

export type CategoryContextAction =
  | SetCurrentCriteria
  | SetActiveRequirementGroup
  | AddRequestedNeed
  | AddRequestedNeedData;
