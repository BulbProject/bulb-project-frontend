import { Criterion } from 'types/data';

export interface SpecificationProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  criterion: Criterion;
}
