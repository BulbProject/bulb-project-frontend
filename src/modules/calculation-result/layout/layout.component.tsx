import React, { FC, useMemo } from 'react';

import { useMedia } from 'shared/hooks';
import { AvailableVariant } from 'shared/entity/data';
import { Container } from 'shared/components/container';

import Styled from '../calculation-result.styles';
import layoutConfig from '../layout.config';
import { RequestedNeed } from '../requested-need';
import { Items } from '../items';
import { ItemsLayout } from '../items-layout';

export const Layout: FC<{
  availableVariants: AvailableVariant[];
  hasMany: boolean;
  itemsQuantity: number;
  requestedVariant?: string;
  isDrawerOpen: boolean;
  setDrawerOpen: (isDrawerOpen: boolean) => void;
}> = ({ availableVariants, hasMany, itemsQuantity, requestedVariant, isDrawerOpen, setDrawerOpen }) => {
  const isXl = useMedia(`screen and (min-width: ${layoutConfig.maxWidth}px)`);

  const requestedNeed = useMemo(
    () => availableVariants.find((variant) => variant.relatedItem === requestedVariant) as AvailableVariant,
    [requestedVariant, JSON.stringify(availableVariants)]
  );

  const items = useMemo(() => {
    return requestedVariant
      ? availableVariants.filter((variant) => variant.relatedItem !== requestedVariant)
      : availableVariants;
  }, [requestedVariant, JSON.stringify(availableVariants)]);

  if (requestedVariant === undefined) {
    return (
      <ItemsLayout itemsQuantity={itemsQuantity}>
        <Styled.Wrapper alignment={{ horizontal: isXl() ? 'center' : 'start' }}>
          <Items
            availableVariants={items}
            isDrawerOpen={isDrawerOpen}
            setDrawerOpen={setDrawerOpen}
            showFilter
            isRequestedNeedAbsent
          />
        </Styled.Wrapper>
      </ItemsLayout>
    );
  }

  return (
    <ItemsLayout itemsQuantity={itemsQuantity}>
      {hasMany ? (
        <Styled.Wrapper alignment={{ horizontal: isXl() ? 'center' : 'start' }}>
          <RequestedNeed
            hasMany={hasMany}
            isDrawerOpen={isDrawerOpen}
            setDrawerOpen={setDrawerOpen}
            requestedNeed={requestedNeed}
          />

          <Items availableVariants={items} isDrawerOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen} />
        </Styled.Wrapper>
      ) : (
        <Container>
          <RequestedNeed
            hasMany={hasMany}
            isDrawerOpen={isDrawerOpen}
            setDrawerOpen={setDrawerOpen}
            requestedNeed={requestedNeed}
          />
        </Container>
      )}
    </ItemsLayout>
  );
};
