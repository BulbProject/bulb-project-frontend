import React, { FC } from 'react';

import { CategoriesListItem } from 'shared/entity/data';

import Styled from '../card.styles';

export const BaseCard: FC<CategoriesListItem> = ({ title, description, status }) => {
  return (
    <Styled.ContentCard isDisabled={status === 'pending'}>
      <Styled.CardContent>
        <Styled.CardTitle variant="h3">{title}</Styled.CardTitle>

        <Styled.CardDescription variant="small">{description}</Styled.CardDescription>
      </Styled.CardContent>
    </Styled.ContentCard>
  );
};
