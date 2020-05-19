import React from 'react';
import useMediaQuery from 'ustudio-ui/hooks/use-media-query';

import Styled from './ItemsLayout.styles';

export const ItemsLayout: React.FC<{ itemsQuantity: number }> = ({ itemsQuantity, children }) => {
  const isLg = useMediaQuery('screen and (min-width: 832px)');

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
        <Styled.ManyLayout quantity={itemsQuantity} isLg={isLg}>
          {children}
        </Styled.ManyLayout>
      );
    }
  }
};
