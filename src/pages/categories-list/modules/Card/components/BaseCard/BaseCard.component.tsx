import React from 'react';

import { CategoryCardData } from '../../../../CategoriesList.types';

import Styled from '../../Card.styles';

export const BaseCard = ({ title, description, status }: CategoryCardData) => {
  return (
    <Styled.ContentCard isDisabled={status === 'pending'}>
      <Styled.CardContent>
        <Styled.CardTitle variant="h2">{title}</Styled.CardTitle>

        <Styled.CardDescription>{description}</Styled.CardDescription>
      </Styled.CardContent>
    </Styled.ContentCard>
  );
};
