import { Dispatch } from 'react';
import { RequestedNeed, RequirementGroup } from 'shared/entity/data';
import { CalculationResponse } from './calculation-response';

export type CalculationAction = SetActiveRequirementGroup | AddFormData | AddCalculationPayload | AddCalculationData;

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

interface AddCalculationPayload {
  type: 'add_calculation_payload';
  payload?: RequestedNeed;
}

interface AddCalculationData {
  type: 'add_calculation_data';
  payload: CalculationResponse;
}
