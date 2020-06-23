import React, { FC } from 'react';

import { CategoryCardData } from '../../entity';

import Styled from '../card.styles';

export const BaseCard: FC<CategoryCardData> = ({ title, description, status }) => {
  return (
    <Styled.ContentCard isDisabled={status === 'pending'}>
      <Styled.CardContent>
        <Styled.CardTitle variant="h3">{title}</Styled.CardTitle>

        <Styled.CardDescription variant="small">{description}</Styled.CardDescription>
      </Styled.CardContent>
    </Styled.ContentCard>
  );
};
