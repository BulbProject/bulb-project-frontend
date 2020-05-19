import React, { useState } from 'react';

import StyledCell from './CardLayout.styles';

export const CardLayout: React.FC<{ cardIndex: number; image?: string }> = ({ cardIndex, image, children }) => {
  if (cardIndex === 0) {
    return <StyledCell.BigCell image={image}>{children}</StyledCell.BigCell>;
  }
  if (cardIndex % 3 === 1) {
    return <StyledCell.WideCell image={image}> {children}</StyledCell.WideCell>;
  }

  return <StyledCell.Cell image={image}>{children}</StyledCell.Cell>;
};
