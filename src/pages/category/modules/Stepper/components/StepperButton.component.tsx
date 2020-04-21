import React from 'react';

import Styled from './StepperButton.styles';

const StepperButton: React.FC<{
  isActive: boolean;
  onClick: () => void;
  isDisabled?: boolean;
}> = ({ isActive, children, onClick, isDisabled = false }) => {
  return (
    <Styled.StepperButton appearance="text" type="submit" isActive={isActive} onClick={onClick} isDisabled={isDisabled}>
      {children}
    </Styled.StepperButton>
  );
};

export default StepperButton;
