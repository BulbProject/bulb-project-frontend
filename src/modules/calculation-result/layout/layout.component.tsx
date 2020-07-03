import React, { useState } from 'react';

import { useCalculation } from 'shared/context/calculation';
import { useMedia } from 'shared/hooks';
import { Items } from '../items';
import { Container } from '../../../shared/components/container';
import { ItemsLayout } from '../items-layout';
import { PartialLayout } from '../partial-layout';
import { RequestedNeed } from '../requested-need';
import { AvailableVariant } from '../../../shared/entity/data';

import Styled from '../calculation-result.styles';
import layoutConfig from '../layout.config';

export const Layout: React.FC<{ availableVariants: AvailableVariant[], hasMany: boolean, itemsQuantity: any }> = ({ availableVariants, hasMany, itemsQuantity }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { calculationData } = useCalculation();
  const isXl = useMedia(`screen and (min-width: ${layoutConfig.maxWidth}px)`);

  const { requestedVariant } = calculationData ?? {};

  const RequestedNeedComponent = requestedVariant && (
    <RequestedNeed
      hasMany={hasMany}
      isDrawerOpen={isDrawerOpen}
      setDrawerOpen={setDrawerOpen}
      requestedNeed={availableVariants.find((availableVariant) => availableVariant.relatedItem === requestedVariant) as AvailableVariant}
    />
  );

  return (
    <>
      {!requestedVariant && hasMany && (
        <PartialLayout itemsQuantity={itemsQuantity}>
          <Styled.Wrapper alignment={{ horizontal: isXl() ? 'center' : 'start' }}>
            <Items
              availableVariants={availableVariants}
              isDrawerOpen={isDrawerOpen}
              setDrawerOpen={setDrawerOpen}
              showFilter
            />
          </Styled.Wrapper>
        </PartialLayout>
      )}

      {requestedVariant && (
        <ItemsLayout itemsQuantity={itemsQuantity}>
          {hasMany ? (
            <Styled.Wrapper alignment={{ horizontal: isXl() ? 'center' : 'start' }}>
              {RequestedNeedComponent}

              <Items
                availableVariants={availableVariants}
                isDrawerOpen={isDrawerOpen}
                setDrawerOpen={setDrawerOpen}
              />
            </Styled.Wrapper>
          ) : (
            <Container>{RequestedNeedComponent}</Container>
          )}
        </ItemsLayout>
      )}
    </>
  );
};
