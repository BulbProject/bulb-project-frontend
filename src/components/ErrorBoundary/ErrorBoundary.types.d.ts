import { ReactElement } from 'react';

export interface State {
  error: null | Error;
}

export interface Props {
  children: ReactElement | ReactElement[];
}
