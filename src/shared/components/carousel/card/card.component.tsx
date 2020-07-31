import React, { FC, useRef } from 'react';

import type { CarouselCard } from '../../entity';

import Styled from './card.styles';

export const Card: FC<
  CarouselCard & { isCardSelected: boolean; onCardSelect(id: string, card: HTMLButtonElement): void }
> = ({ id, title, url, onCardSelect, isCardSelected }) => {
  const cardRef = useRef<HTMLButtonElement>(null);

  return (
    <Styled.Card
      ref={cardRef}
      onClick={() => onCardSelect(id, cardRef?.current as HTMLButtonElement)}
      isCardSelected={isCardSelected}
    >
      <Styled.IconContainer>
        <Styled.Icon src={url} alt={title} />
      </Styled.IconContainer>

      <Styled.Title align="center" variant="caption">
        {title}
      </Styled.Title>
    </Styled.Card>
  );
};
