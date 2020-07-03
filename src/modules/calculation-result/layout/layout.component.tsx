import React, { useState } from 'react';

import { useMedia } from 'shared/hooks';
import { Items } from '../items';
import { PartialLayout } from '../partial-layout';

import { AvailableVariant } from '../../../shared/entity/data';

import Styled from '../calculation-result.styles';
import layoutConfig from '../layout.config';

export const Layout: React.FC<{ availableVariants: AvailableVariant[]; hasMany: boolean; itemsQuantity: number }> = ({
  availableVariants,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasMany,
  itemsQuantity,
}) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const isXl = useMedia(`screen and (min-width: ${layoutConfig.maxWidth}px)`);

  return (
    <PartialLayout itemsQuantity={itemsQuantity}>
      <Styled.Wrapper alignment={{ horizontal: isXl() ? 'center' : 'start' }}>
        <Items
          availableVariants={availableVariants}
          isDrawerOpen={isDrawerOpen}
          setDrawerOpen={setDrawerOpen}
          showFilter
          noRequested
        />
      </Styled.Wrapper>
    </PartialLayout>
  );
};
