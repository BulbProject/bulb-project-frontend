import { Criterion as OCDSCriterion } from 'ts4ocds/extensions/requirements';

export interface Criterion extends OCDSCriterion {
  id: string;
  title: string;
}
