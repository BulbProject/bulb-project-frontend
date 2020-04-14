import React from 'react';

import Styled from './styles';

const StepperButton: React.FC<{ isActive: boolean; onClick: () => void }> = ({ isActive, children, onClick }) => {
  return (
    <Styled.StepperButton isActive={isActive} onClick={onClick}>
      {children}
    </Styled.StepperButton>
  );
};

export default StepperButton;
