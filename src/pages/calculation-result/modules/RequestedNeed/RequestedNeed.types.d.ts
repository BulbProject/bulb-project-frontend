import type { StoreRequestedNeed } from 'types/globals';

export interface RequestedNeedProps {
  error?: string;
  isLoading: boolean;
  setSubmitting(isSubmitting: boolean): void;
  recalculate(requestedNeed: StoreRequestedNeed): void;
}
