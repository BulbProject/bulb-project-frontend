import React from 'react';

import { CategoryCardData } from '../../CategoriesList.types';

import Styled from './Card.styles';

export const Card = ({
  categoryVersion: category,
  version,
}: {
  categoryVersion?: CategoryCardData;
  version: string;
}) => {
  return (
    <Styled.CardContentContainer>
      <Styled.CardContent>
        <Styled.CardTitle variant="h2">{category?.title}</Styled.CardTitle>

        <Styled.CardDescription>{category?.description}</Styled.CardDescription>
      </Styled.CardContent>
    </Styled.CardContentContainer>
  );
};
