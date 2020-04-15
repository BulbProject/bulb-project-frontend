import React from 'react';

import Styled from './styles';

const StepperButton: React.FC<{ type: 'button' | 'submit'; isActive: boolean; onClick: () => void }> = ({
  type,
  isActive,
  children,
  onClick,
}) => {
  return (
    <Styled.StepperButton type={type} isActive={isActive} onClick={onClick}>
      {children}
    </Styled.StepperButton>
  );
};

export default StepperButton;
