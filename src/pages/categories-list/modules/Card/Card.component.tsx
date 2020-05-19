import React, { useState } from 'react';

import Cell from 'ustudio-ui/components/Grid/Cell';

import { CategoryCardData } from '../../CategoriesList.types';
import { BaseCard, ErrorCard, StubCard } from './components';
import Styled from './Card.styles';
import StyledCell from '../../CategoriesList.styles';

export const Card = ({
                       categoryVersion: category,
                       cardIndex,
                       version,
                       error,
                       reload,
                     }: {
  categoryVersion?: CategoryCardData;
  cardIndex: number;
  version: string;
  reload: () => void;
  error?: string;
}) => {
  const [isLoading, setLoading] = useState(false);

  const reloadItem = async () => {
    setLoading(true);
    await reload();
    setLoading(false);
  };

  if (cardIndex === 0) {
    return (
      <StyledCell.BigCell image={category?.image}>
        <Styled.CardContentContainer>
          <Styled.CardContent>
            <Styled.CardTitle variant="h2">{category?.title}</Styled.CardTitle>
            <Styled.CardDescription>{category?.description}</Styled.CardDescription>
          </Styled.CardContent>
        </Styled.CardContentContainer>
      </StyledCell.BigCell>
    );
  }
  if (cardIndex === 1) {
    return <StyledCell.WideCell image={category?.image}> {category?.id}</StyledCell.WideCell>;
  }
  if (cardIndex === 1 || cardIndex === 4 || cardIndex === 7) {
    return <StyledCell.WideCell image={category?.image}> {category?.id}</StyledCell.WideCell>;
  }

  return <StyledCell.Cell image={category?.image}>{category?.id}</StyledCell.Cell>;
};
