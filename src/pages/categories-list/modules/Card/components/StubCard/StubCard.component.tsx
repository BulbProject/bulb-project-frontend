import React from 'react';

import Spinner from 'ustudio-ui/components/Spinner';

import Styled from '../../Card.styles';

export const StubCard = () => {
  return (
    <Styled.BaseCard alignment={{ vertical: 'center', horizontal: 'center' }}>
      <Spinner />
    </Styled.BaseCard>
  );
};
