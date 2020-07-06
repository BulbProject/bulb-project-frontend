import React, { FC, useMemo } from 'react';

import { useMedia } from 'shared/hooks';
import { Items } from '../items';
import { PartialLayout } from '../partial-layout';
import { ItemsLayout } from '../items-layout';

import { AvailableVariant } from '../../../shared/entity/data';

import Styled from '../calculation-result.styles';
import layoutConfig from '../layout.config';
import { Container } from '../../../shared/components/container';
import { RequestedNeed } from '../requested-need';

export const FullLayout: FC<{
  availableVariants: AvailableVariant[];
  hasMany: boolean;
  itemsQuantity: number;
  requestedVariant?: string;
  isDrawerOpen: boolean;
  setDrawerOpen: (isDrawerOpen: boolean) => void;
}> = ({
  availableVariants,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasMany,
  itemsQuantity,
  requestedVariant,
  isDrawerOpen,
  setDrawerOpen,
}) => {
  // Const [isDrawerOpen, setDrawerOpen] = useState(false);

  const isXl = useMedia(`screen and (min-width: ${layoutConfig.maxWidth}px)`);

  const requestedNeed = useMemo(
    () => availableVariants.find((variant) => variant.relatedItem === requestedVariant) as AvailableVariant,
    [requestedVariant]
  );

  const items = useMemo(() => {
    return requestedVariant
      ? availableVariants.filter((variant) => variant.relatedItem !== requestedVariant)
      : availableVariants;
  }, [requestedNeed]);

  if (requestedVariant === undefined) {
    return (
      <PartialLayout itemsQuantity={itemsQuantity}>
        <Styled.Wrapper alignment={{ horizontal: isXl() ? 'center' : 'start' }}>
          <Items
            availableVariants={items}
            isDrawerOpen={isDrawerOpen}
            setDrawerOpen={setDrawerOpen}
            showFilter
            noRequestedVariant
          />
        </Styled.Wrapper>
      </PartialLayout>
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

          <Items availableVariants={items} isDrawerOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen} showFilter />
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
