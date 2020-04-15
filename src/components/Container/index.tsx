import React, { FC } from 'react';

import { Cell } from 'ustudio-ui';

import { containerCellProps } from './config';
import Styled from './styles';

const Container: FC = ({ children }) => (
  <Styled.Container isContainer>
    <Cell xs={containerCellProps}>{children}</Cell>
  </Styled.Container>
);

export default Container;
