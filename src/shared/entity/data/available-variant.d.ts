import { Metric } from 'ts4ocds/extensions/metrics';
import { Value } from 'ts4ocds';

import { Criterion } from './criterion';

export interface AvailableVariant {
  id: string;
  relatedItem: string;
  quantity: string;
  metrics: Metric[];
  avgValue: Value;
  relatedProducts: string[];
  criteria?: [Criterion];
}
