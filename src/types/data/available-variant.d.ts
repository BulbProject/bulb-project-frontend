import { Metric } from 'ts4ocds/extensions/metrics';
import { Value } from 'ts4ocds';

export interface AvailableVariant {
  id: string;
  relatedItem: string;
  quantity: string;
  forecasts: Metric[];
  targets: Metric[];
  avgValue: Value;
}
