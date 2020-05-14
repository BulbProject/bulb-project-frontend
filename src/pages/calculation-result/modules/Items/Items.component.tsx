import React, { useEffect, useMemo, useState } from 'react';
import Text from 'ustudio-ui/components/Text';

import useMediaQuery from 'ustudio-ui/hooks/use-media-query';

import type { AvailableVariant, Item as ItemType } from 'types/data';
import ArrowIcon from '../../../../assets/icons/arrow.inline.svg';

import { useCalculationContext } from '../../store';

import { Item } from '../Item';
import Styled from './Items.styles';

export const Items = ({ availableVariants }: { availableVariants: AvailableVariant[] }) => {
  const {
    category: { items, documents },
  } = useCalculationContext();

  const isMd = useMediaQuery('screen and (min-width: 798px)');

  const hasMany = useMemo(() => availableVariants.length > 2, [availableVariants.length]);

  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
    setActiveItem(0);
  }, [JSON.stringify(availableVariants)]);

  return (
    <Styled.Items direction="column">
      <Styled.ItemsTitle>
        <Text variant="body" appearance="bold" color="var(--c-dark)">
          Більш енергоефективні варіанти
        </Text>
      </Styled.ItemsTitle>

      <Styled.AvailableVariants isMd={isMd}>
        {hasMany && activeItem > 0 && (
          <Styled.CarouselButton rotation={0} $position="left" onClick={() => setActiveItem(activeItem - 1)}>
            <ArrowIcon />
          </Styled.CarouselButton>
        )}

        <Styled.Carousel $offset={activeItem * 380}>
          {availableVariants.slice(1).map((variant) => {
            const relatedItem = items.find((item) => item.id === variant.relatedItem) as ItemType;

            const relatedDocument = documents?.find(
              (document) => document.relatesTo === 'item' && document.relatedItem === relatedItem.id
            );

            return <Item key={variant.id} variant={variant} item={relatedItem} document={relatedDocument?.url} />;
          })}
        </Styled.Carousel>

        {hasMany && activeItem < availableVariants.length - 2 && (
          <Styled.CarouselButton rotation={180} $position="right" onClick={() => setActiveItem(activeItem + 1)}>
            <ArrowIcon />
          </Styled.CarouselButton>
        )}
      </Styled.AvailableVariants>
    </Styled.Items>
  );
};
