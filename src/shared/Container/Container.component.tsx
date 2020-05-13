import React, { FC } from 'react';

import Cell from 'ustudio-ui/components/Grid/Cell';
import useMediaQuery from 'ustudio-ui/hooks/use-media-query';

import { containerCellProps } from './Container.module';

import Styled from './Container.styles';

export const Container: FC = ({ children }) => {
  const isMd = useMediaQuery('screen and (min-width: 768px)');

  return (
    <Styled.Container isContainer={isMd}>
      <Cell xs={containerCellProps(12)} md={containerCellProps(10)} lg={containerCellProps(8)}>
        {children}
      </Cell>
    </Styled.Container>
  );
};
