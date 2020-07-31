import React, { FC, FormEvent } from 'react';

import Styled from './form-button.styles';

export const FormButton: FC<{
  isActive: boolean;
  isDisabled?: boolean;
  appearance?: string;
  intent?: string;
  onClick(event: FormEvent): void;
}> = ({ isActive, children, onClick, isDisabled = false, appearance = 'text', intent = 'primary' }) => {
  return (
    <Styled.FormButton
      appearance={appearance as 'text'}
      intent={intent as 'primary'}
      /**
       * This should fix incorrect form submission on `enter` press
       */
      type={isActive && !isDisabled ? 'submit' : 'button'}
      isActive={isActive}
      onClick={onClick}
      isDisabled={isDisabled}
    >
      {children}
    </Styled.FormButton>
  );
};
