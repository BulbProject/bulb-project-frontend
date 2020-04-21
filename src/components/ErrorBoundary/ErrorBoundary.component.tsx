import React from 'react';

import { ErrorPage } from 'components/ErrorPage';

import { Props, State } from './ErrorBoundary.types';

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error: Error) {
    this.setState({
      error,
    });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    return error ? <ErrorPage /> : children;
  }
}
