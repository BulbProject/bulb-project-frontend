import { AvailableVariant, Item } from 'types/data';

export interface CategoryFeatureProps {
  availableVariant: AvailableVariant;
  item: Item;
  isItemRequested?: boolean;
}
