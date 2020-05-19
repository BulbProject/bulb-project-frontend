import React, { useState } from 'react';

import StyledCell from './CardsLayout.styles';

export const CardsLayout: React.FC<{ cardIndex: number; image?: string }> = ({ cardIndex, image, children }) => {
  if (cardIndex === 0) {
    return <StyledCell.BigCell image={image}>{children}</StyledCell.BigCell>;
  }
  if (cardIndex === 1) {
    return <StyledCell.WideCell image={image}>{children}</StyledCell.WideCell>;
  }
  if (cardIndex === 1 || cardIndex === 4 || cardIndex === 7) {
    return <StyledCell.WideCell image={image}> {children}</StyledCell.WideCell>;
  }

  return <StyledCell.Cell image={image}>{children}</StyledCell.Cell>;
};
