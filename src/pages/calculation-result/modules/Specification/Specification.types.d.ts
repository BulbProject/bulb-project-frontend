import { Criterion } from 'ts4ocds/extensions/requirements';
import { AvailableVariant } from 'types/data';

export interface SpecificationProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  criterion: Criterion;
  availableVariant: AvailableVariant;
}
