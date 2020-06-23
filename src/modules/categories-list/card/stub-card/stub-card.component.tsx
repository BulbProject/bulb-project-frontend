import React, { FC } from 'react';

import Spinner from 'ustudio-ui/components/Spinner';

import Styled from '../card.styles';

export const StubCard: FC = () => {
  return (
    <Styled.BaseCard alignment={{ vertical: 'center', horizontal: 'center' }}>
      <Spinner />
    </Styled.BaseCard>
  );
};
