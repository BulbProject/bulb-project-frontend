import React from 'react';

import Styled from './styles';

const StepperButton: React.FC<{
  type: 'button' | 'submit';
  isActive: boolean;
  onClick: () => void;
  isDisabled?: boolean;
}> = ({ type, isActive, children, onClick, isDisabled = false }) => {
  return (
    <Styled.StepperButton appearance="text" type={type} isActive={isActive} onClick={onClick} isDisabled={isDisabled}>
      {children}
    </Styled.StepperButton>
  );
};

export default StepperButton;
