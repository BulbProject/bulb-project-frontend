import React, { FC } from 'react';

import Styled from '../card.styles';

export const ErrorCard: FC<{
  updateCategoryData(): void;
}> = ({ updateCategoryData }) => {
  return (
    <Styled.BaseCard alignment={{ horizontal: 'center' }}>
      <button type="button" onClick={updateCategoryData}>
        <Styled.ReloadIcon />
      </button>
    </Styled.BaseCard>
  );
};
