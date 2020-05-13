import React from 'react';
import useMediaQuery from 'ustudio-ui/hooks/use-media-query';

import Styled from './StepperButton.styles';

export const StepperButton: React.FC<{
  isActive: boolean;
  onClick: () => void;
  isDisabled?: boolean;
}> = ({ isActive, children, onClick, isDisabled = false }) => {
  const isMd = useMediaQuery('screen and (min-width: 768px)');

  return (
    <Styled.StepperButton
      appearance={isMd ? 'text' : 'contained'}
      type="submit"
      isActive={isActive}
      onClick={onClick}
      isDisabled={isDisabled}
    >
      {children}
    </Styled.StepperButton>
  );
};
