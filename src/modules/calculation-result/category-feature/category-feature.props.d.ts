import { AvailableVariant, Item } from 'shared/entity/data';

export interface CategoryFeatureProps {
  availableVariant: AvailableVariant;
  item: Item;
  isItemRequested?: boolean;
}
