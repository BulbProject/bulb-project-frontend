import type { StoreRequestedNeed } from 'types/globals';

export interface RequestedNeedProps {
  isHidden?: boolean;
  error?: string;
  isLoading: boolean;
  setSubmitting(isSubmitting: boolean): void;
  recalculate(requestedNeed: StoreRequestedNeed): void;
}
