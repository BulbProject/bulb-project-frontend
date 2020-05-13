import React from 'react';

import Styled from './StepperButton.styles';

export const StepperButton: React.FC<{
  isActive: boolean;
  onClick: () => void;
  isDisabled?: boolean;
  appearance?: string;
  intent?: string;
}> = ({ isActive, children, onClick, isDisabled = false, appearance = 'text', intent = 'primary' }) => {
  return (
    <Styled.StepperButton
      appearance={appearance as 'text'}
      intent={intent as 'primary'}
      type="submit"
      isActive={isActive}
      onClick={onClick}
      isDisabled={isDisabled}
    >
      {children}
    </Styled.StepperButton>
  );
};
