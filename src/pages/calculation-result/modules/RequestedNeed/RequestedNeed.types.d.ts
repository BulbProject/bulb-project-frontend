import type { AvailableVariant } from 'types/data';
import type { StoreRequestedNeed } from 'types/globals';

export interface RequestedNeedProps {
  hasMany: boolean;
  isDrawerOpen: boolean;
  setDrawerOpen: (isDrawerOpen: boolean) => void;
  recalculationError?: string;
  isRecalculating: boolean;
  setSubmitting: (isSubmitting: boolean) => void;
  requestedNeed: AvailableVariant;
  setNewRequestedNeed: (requestedNeed: StoreRequestedNeed) => void;
}
