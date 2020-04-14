import React from 'react';

import Styled from '../../../styles/categories';

const ErrorCard: React.FC<{ reloadItem: () => Promise<void> }> = ({ reloadItem }) => {
  return (
    <Styled.BaseCard alignment={{ horizontal: 'center' }}>
      <button onClick={reloadItem}>
        <Styled.ReloadIcon />
      </button>
    </Styled.BaseCard>
  );
};

export default ErrorCard;
