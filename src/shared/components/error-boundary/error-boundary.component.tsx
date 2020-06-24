import React, { ReactElement, ReactNode } from 'react';

import { ErrorPage } from '../error-page';

interface ErrorBoundaryProps {
  children?: ReactElement | ReactElement[];
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  {
    error: null | Error;
  }
> {
  public constructor(props: ErrorBoundaryProps) {
    super(props);

    // eslint-disable-next-line immutable/no-mutation
    this.state = { error: null };
  }

  public componentDidCatch(error: Error): void {
    this.setState({
      error,
    });
  }

  public render(): ReactNode {
    const { error } = this.state;
    const { children } = this.props;

    return error ? <ErrorPage /> : children;
  }
}
