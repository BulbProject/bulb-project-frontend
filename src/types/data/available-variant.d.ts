import { Metric } from 'ts4ocds/extensions/metrics';
import { Item } from 'ts4ocds';

export interface AvailableVariant {
  id: string;
  relatedItem: string;
  quantity: string;
  forecasts: Metric[];
  targets: Metric[];
  //@TODO need clarification avgValue and relatedProducts types
  avgValue: {};
  relatedProducts: Item[];
}
