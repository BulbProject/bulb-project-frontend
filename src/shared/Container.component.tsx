import React, { FC } from 'react';

import { Cell } from 'ustudio-ui';

import { containerCellProps } from './Container.config';
import Styled from './Container.styles';

const Container: FC = ({ children }) => (
  <Styled.Container isContainer>
    <Cell xs={containerCellProps}>{children}</Cell>
  </Styled.Container>
);

export default Container;
