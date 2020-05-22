import type { Criterion } from 'ts4ocds/extensions/requirements';
import type { AvailableVariant } from 'types/data';

export interface SpecificationProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  criterion: Criterion;
  availableVariant: AvailableVariant;
}
