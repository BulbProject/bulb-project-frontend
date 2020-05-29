import { AvailableVariant, Category } from 'types/data';
import { StoreRequestedNeed } from 'types/globals';

export interface RequestedNeedProps {
  hasMany: boolean;
  isDrawerOpen: boolean;
  setDrawerOpen: (isDrawerOpen: boolean) => void;
  recalculationError?: string;
  isRecalculating: boolean;
  setSubmitting: (isSubmitting: boolean) => void;
  category: Category;
  requestedNeed: AvailableVariant;
  setNewRequestedNeed: (requestedNeed: StoreRequestedNeed) => void;
}
