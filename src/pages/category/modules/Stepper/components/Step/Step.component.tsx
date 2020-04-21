import React from 'react';
import { StepProps } from './Step.types';

import Styled from './Step.styles';

export const Step = ({ title, index, isActive }: StepProps) => {
  return (
    <Styled.Step isActive={isActive}>
      <Styled.StepTitle align="center">{title}</Styled.StepTitle>

      <Styled.StepCircle />

      {index > 0 && <Styled.StepProgress max={100} value={isActive ? 100 : 0} />}
    </Styled.Step>
  );
};
