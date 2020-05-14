import type { StoreRequestedNeed } from 'types/globals';

export interface FilterProps {
  error?: string;
  isLoading: boolean;
  setSubmitting(isSubmitting: boolean): void;
  recalculate(requestedNeed: StoreRequestedNeed): void;
}
