import React from 'react';
import CloseIcon from '../../assets/icons/times.inline.svg';

import Styled from './CloseButton.styles';

export const CloseButton: React.FC<{ onClick: (option: boolean) => void }> = ({ onClick }) => {
  return (
    <Styled.Button onClick={() => onClick(false)}>
      <CloseIcon />
    </Styled.Button>
  );
};
