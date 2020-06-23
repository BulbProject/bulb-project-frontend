import React, { FC } from 'react';
import { Intent } from 'ustudio-ui/theme/theme';

import Styled from './fallback-button.styles';

export const FallbackButton: FC<{
  intent?: Intent;
  onClick(): void;
}> = ({ onClick, intent, children }) => {
  return (
    <Styled.FallbackButton onClick={onClick} intent={intent}>
      {children}
    </Styled.FallbackButton>
  );
};
