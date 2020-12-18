import { Dispatch } from 'react';
import { RequestedNeed, RequirementGroup } from 'shared/entity/data';
import { CalculationResponse } from './calculation-response';

export type CalculationAction =
  | SetActiveRequirementGroup
  | AddFormData
  | SetFormData
  | AddCalculationPayload
  | AddCalculationData
  | AddRelatedRequirementId;

export class CalculationDispatcher {
  public constructor(private readonly dispatch: Dispatch<CalculationAction>) {}

  public selectRequirementGroup(payload: SetActiveRequirementGroup['payload']): void {
    return this.dispatch({
      type: 'select_requirement_group',
      payload,
    });
  }

  public addFormData(payload: AddFormData['payload']): void {
    return this.dispatch({
      type: 'add_form_data',
      payload,
    });
  }

  public setFormData(payload: SetFormData['payload']): void {
    return this.dispatch({
      type: 'set_form_data',
      payload,
    });
  }

  public addCalculationPayload(payload?: RequestedNeed): void {
    return this.dispatch({
      type: 'add_calculation_payload',
      payload,
    });
  }

  public addCalculationData(payload: CalculationResponse): void {
    return this.dispatch({
      type: 'add_calculation_data',
      payload,
    });
  }

  public addRelatedRequirementId(payload: AddRelatedRequirementId['payload']): void {
    return this.dispatch({
      type: 'add_related_requirement_id',
      payload,
    });
  }
}

interface SetActiveRequirementGroup {
  type: 'select_requirement_group';
  payload: {
    criterionId: string;
    requirementGroup?: RequirementGroup;
  };
}

interface AddFormData {
  type: 'add_form_data';
  payload: {
    criterionId: string;
    requirements: Record<string, unknown>;
  };
}

interface SetFormData {
  type: 'set_form_data';
  payload: Record<string, Record<string, unknown>>;
}

interface AddRelatedRequirementId {
  type: 'add_related_requirement_id';
  payload: {
    criterionId: string;
    relatedRequirementId: string;
  };
}

interface AddCalculationPayload {
  type: 'add_calculation_payload';
  payload?: RequestedNeed;
}

interface AddCalculationData {
  type: 'add_calculation_data';
  payload: CalculationResponse;
}
