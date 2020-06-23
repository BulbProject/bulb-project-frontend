import React, { FC } from 'react';
import { useMedia } from 'shared/hooks';

import Styled from './items-layout.styles';

export const ItemsLayout: FC<{ itemsQuantity: number }> = ({ itemsQuantity, children }) => {
  const isLg = useMedia('screen and (min-width: 832px)');

  switch (itemsQuantity) {
    case 1: {
      return <Styled.SingleLayout>{children}</Styled.SingleLayout>;
    }
    case 2: {
      return <Styled.DoubleLayout>{children}</Styled.DoubleLayout>;
    }
    case 3: {
      return <Styled.TripleLayout>{children}</Styled.TripleLayout>;
    }
    default: {
      return (
        <Styled.ManyLayout quantity={itemsQuantity} isLg={isLg()}>
          {children}
        </Styled.ManyLayout>
      );
    }
  }
};
