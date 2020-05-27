import React from 'react';

import { CategoryCardData } from '../../../../CategoriesList.types';

import Styled from '../../Card.styles';

export const BaseCard = ({ title, description, status }: CategoryCardData) => {
  return (
    <Styled.ContentCard isDisabled={status === 'pending'}>
      <Styled.CardContent>
        <Styled.CardTitle variant="h3">{title}</Styled.CardTitle>

        <Styled.CardDescription variant="small">{description}</Styled.CardDescription>
      </Styled.CardContent>
    </Styled.ContentCard>
  );
};
