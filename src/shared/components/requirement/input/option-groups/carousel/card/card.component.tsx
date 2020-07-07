import React, { FC } from 'react';

import type { CarouselCard } from '../entity';

import Styled from './card.styles';

export const Card: FC<CarouselCard & { isCardSelected: boolean; onCardSelect(id: string): void }> = ({
  id,
  title,
  url,
  onCardSelect,
  isCardSelected,
}) => {
  return (
    <Styled.Card onClick={() => onCardSelect(id)} isCardSelected={isCardSelected}>
      <Styled.IconContainer>
        <Styled.Icon src={url} alt={title} />
      </Styled.IconContainer>

      <Styled.Title align="center" variant="caption">
        {title}
      </Styled.Title>
    </Styled.Card>
  );
};
