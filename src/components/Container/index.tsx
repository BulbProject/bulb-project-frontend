import React, { FC } from 'react';

import { Cell } from 'ustudio-ui';

import { containerCellProps } from './config';
import Styled from '../../styles/categories';

const Container: FC = ({ children }) => (
  <Styled.Wrapper>
    <Styled.Container isContainer>
      <Cell xs={containerCellProps}>{children}</Cell>
    </Styled.Container>
  </Styled.Wrapper>
);

export default Container;
