import React, { FC } from 'react';

import Styled from './step.styles';

export const Step: FC<{
  title: string;
  index: number;
  isActive: boolean;
}> = ({ title, index, isActive }) => {
  return (
    <Styled.Step isActive={isActive}>
      <Styled.StepTitle align="center">{title}</Styled.StepTitle>

      <Styled.StepCircle />

      {index > 0 && <Styled.StepProgress max={100} value={isActive ? 100 : 0} />}
    </Styled.Step>
  );
};
