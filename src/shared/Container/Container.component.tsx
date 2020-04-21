import React, { FC } from 'react';

import { Cell } from 'ustudio-ui';

import { containerCellProps } from './Container.module';
import Styled from './Container.styles';

export const Container: FC = ({ children }) => (
  <Styled.Container isContainer>
    <Cell xs={containerCellProps}>{children}</Cell>
  </Styled.Container>
);
