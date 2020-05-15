import { AvailableVariant, Item as ItemType } from 'types/data';

export interface ItemProps {
  variant: AvailableVariant;
  item: ItemType;
  document?: string;
  isRequested?: boolean;
  hoveredObservation: string;
  setHoveredObservation: (id: string) => void;
  hasMany?: boolean;
  isSearched?: boolean;
}
