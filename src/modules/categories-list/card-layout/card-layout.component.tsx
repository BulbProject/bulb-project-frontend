import React, { FC } from 'react';

import StyledCell from './card-layout.styles';

export const CardLayout: FC<{ cardIndex: number; image?: string }> = ({ cardIndex, image, children }) => {
  if (cardIndex === 0) {
    return <StyledCell.BigCell image={image}>{children}</StyledCell.BigCell>;
  }

  if (cardIndex % 3 === 1) {
    return <StyledCell.WideCell image={image}> {children}</StyledCell.WideCell>;
  }

  return <StyledCell.Cell image={image}>{children}</StyledCell.Cell>;
};
