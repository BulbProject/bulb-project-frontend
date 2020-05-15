import React, { useMemo } from 'react';
import Text from 'ustudio-ui/components/Text';

import useMediaQuery from 'ustudio-ui/hooks/use-media-query';

import type { AvailableVariant, Item as ItemType } from 'types/data';

import { useCalculationContext } from '../../store';

import { Item } from '../Item';
import Styled from './Items.styles';

export const Items = ({
  availableVariants,
  hoveredObservation,
  setHoveredObservation,
}: {
  availableVariants: AvailableVariant[];
  hoveredObservation: string;
  setHoveredObservation: (id: string) => void;
}) => {
  const {
    category: { items, documents },
  } = useCalculationContext();

  const isMd = useMediaQuery('screen and (min-width: 798px)');

  const itemsQuantity = useMemo(() => availableVariants.length - 1, [availableVariants.length]);
  const hasMany = useMemo(() => itemsQuantity > 1, [itemsQuantity]);

  return (
    <Styled.Items direction="column" quantity={itemsQuantity} hasMany={hasMany}>
      <Styled.ItemsTitle>
        <Text variant="body" appearance="bold" color="var(--c-dark)">
          Більш енергоефективні варіанти
        </Text>
      </Styled.ItemsTitle>

      <Styled.AvailableVariants isMd={isMd}>
        {availableVariants.slice(1).map((variant) => {
          const relatedItem = items.find((item) => item.id === variant.relatedItem) as ItemType;

          const relatedDocument = documents?.find(
            (document) => document.relatesTo === 'item' && document.relatedItem === relatedItem.id
          );

          return (
            <Item
              key={variant.id}
              variant={variant}
              item={relatedItem}
              document={relatedDocument?.url}
              hoveredObservation={hoveredObservation}
              setHoveredObservation={setHoveredObservation}
            />
          );
        })}
      </Styled.AvailableVariants>
    </Styled.Items>
  );
};
