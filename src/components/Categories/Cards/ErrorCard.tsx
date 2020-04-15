import React from 'react';

import Styled from '../../../styles/categories';

const ErrorCard = ({ updateCategoryData }: { updateCategoryData: () => void }) => {
  return (
    <Styled.BaseCard alignment={{ horizontal: 'center' }}>
      <button type="button" onClick={updateCategoryData}>
        <Styled.ReloadIcon />
      </button>
    </Styled.BaseCard>
  );
};

export default ErrorCard;
