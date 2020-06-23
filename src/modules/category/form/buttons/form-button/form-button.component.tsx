import React, { FC } from 'react';

import Styled from './form-button.styles';

export const FormButton: FC<{
  isActive: boolean;
  isDisabled?: boolean;
  appearance?: string;
  intent?: string;
  onClick(): void;
}> = ({ isActive, children, onClick, isDisabled = false, appearance = 'text', intent = 'primary' }) => {
  return (
    <Styled.FormButton
      appearance={appearance as 'text'}
      intent={intent as 'primary'}
      type="submit"
      isActive={isActive}
      onClick={onClick}
      isDisabled={isDisabled}
    >
      {children}
    </Styled.FormButton>
  );
};
