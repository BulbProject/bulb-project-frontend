import React, { FC } from 'react';

import Cell from 'ustudio-ui/components/Grid/Cell';
import { useMedia } from 'shared/hooks';

import Styled from './container.styles';

const containerCellProps = (
  size: number,
  useGap = true
): {
  size: number;
  offset?: {
    before: number;
    after: number;
  };
} => {
  return {
    size,
    offset: useGap ? { before: (12 - size) / 2, after: (12 - size) / 2 } : undefined,
  };
};

interface ContainerProps {
  useGap?: boolean;
}

export const Container: FC<ContainerProps> = ({ children, useGap }) => {
  const isMd = useMedia('screen and (min-width: 768px)');

  return (
    <Styled.Container isContainer={isMd()}>
      <Cell xs={containerCellProps(12, useGap)} md={containerCellProps(10, useGap)} lg={containerCellProps(8, useGap)}>
        {children}
      </Cell>
    </Styled.Container>
  );
};
