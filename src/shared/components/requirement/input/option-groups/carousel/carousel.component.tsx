import React, { FC, MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Flex from 'ustudio-ui/components/Flex';

import ChevronIcon from '../../../../../../assets/icons/chevron.inline.svg';

import { Card } from './card';

import type { CarouselCard } from './entity';
import Styled from './carousel.styles';
import { carouselConfig } from './carousel.config';

const { cardWidth } = carouselConfig;

const getRefWidth = <R extends MutableRefObject<HTMLElement | null>>(ref: R): number => {
  return ref.current?.getBoundingClientRect().width ?? 0;
};

export const Carousel: FC<{ cards: CarouselCard[]; selectedCard?: string; onCardSelect(id: string): void }> = ({
  cards,
  selectedCard,
  onCardSelect,
}) => {
  const [hasMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  const listRef = useRef<HTMLUListElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const [shift, setShift] = useState(0);
  const listWidth = useMemo(() => getRefWidth(listRef), [hasMounted]);
  const carouselWidth = useMemo(() => getRefWidth(carouselRef), [hasMounted]);

  const dependencies = [shift, listWidth, carouselWidth];

  const selectedCardIndex = useMemo(() => selectedCard && Math.floor(Number(selectedCard.slice(6, 8))), [
    selectedCard,
  ]) as number | undefined;

  useEffect(() => {
    if (selectedCardIndex && listWidth > carouselWidth) {
      setShift(
        Math.min(
          Math.max(
            (selectedCardIndex - 1) * cardWidth + 16 * (selectedCardIndex - 1) + cardWidth / 2 - carouselWidth / 2,
            0
          ),
          listWidth - carouselWidth
        )
      );
    }
  }, [hasMounted]);

  const shouldShiftLeft = useMemo(() => shift > 0, dependencies);

  const shiftLeft = useCallback(() => {
    if (shouldShiftLeft) {
      setShift(Math.max(0, shift - carouselWidth * 0.75));
    }
  }, dependencies);

  const shouldShiftRight = useMemo(
    () => (shift < listWidth - carouselWidth || shift === 0) && listWidth > carouselWidth,
    dependencies
  );

  const shiftRight = useCallback(() => {
    if (shouldShiftRight) {
      setShift(Math.min(listWidth - carouselWidth, shift + carouselWidth * 0.75));
    }
  }, dependencies);

  useEffect(() => {
    const handleShift = (_event: Event): void => {
      const event = _event as KeyboardEvent;

      if (event.key === 'ArrowRight' && shouldShiftRight) {
        shiftRight();
      }

      if (event.key === 'ArrowLeft' && shouldShiftLeft) {
        shiftLeft();
      }
    };

    if (hasMounted) {
      document.addEventListener('keydown', handleShift);
    }

    return () => {
      document.removeEventListener('keydown', handleShift);
    };
  }, [hasMounted, shiftLeft, shouldShiftLeft, shiftRight, shouldShiftRight]);

  const onCardClick = useCallback((card: HTMLButtonElement) => {
    const bodyWidth = document.querySelector('body')?.clientWidth as number;
    const cardOffset =
      card.getBoundingClientRect().left - (bodyWidth - carouselWidth) / 2 - carouselWidth / 2 + cardWidth / 2;

    if (cardOffset > 0 && shouldShiftRight) {
      return setShift(Math.min(listWidth - carouselWidth, shift + cardOffset));
    }

    if (cardOffset < 0 && shouldShiftLeft) {
      return setShift(Math.max(0, shift + cardOffset));
    }
  }, dependencies);

  return (
    <Flex>
      <Styled.Chevron onClick={shiftLeft} $isVisible={shouldShiftLeft} $direction="left">
        <ChevronIcon />
      </Styled.Chevron>

      <Styled.Carousel ref={carouselRef} showLeftShadow={shouldShiftLeft} showRightShadow={shouldShiftRight}>
        <Styled.List ref={listRef} currentIndex={0} shift={shift}>
          {cards.map((card) => {
            return (
              <Styled.ListItem key={card.id}>
                <Card
                  {...card}
                  isCardSelected={selectedCard === card.id}
                  onCardSelect={(id: string, cardElement: HTMLButtonElement) => {
                    onCardSelect(id);
                    onCardClick(cardElement);
                  }}
                />
              </Styled.ListItem>
            );
          })}
        </Styled.List>
      </Styled.Carousel>

      <Styled.Chevron onClick={shiftRight} $isVisible={shouldShiftRight} $direction="right">
        <ChevronIcon />
      </Styled.Chevron>
    </Flex>
  );
};
