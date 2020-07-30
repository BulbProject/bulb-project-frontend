import React, { FC, useMemo } from 'react';

import { useMedia } from 'shared/hooks';
import { useCategory } from 'core/context/category-provider';

import Styled from './items-layout.styles';

export const ItemsLayout: FC<{ itemsQuantity: number; isRequestedNeedAbsent?: boolean }> = ({
  itemsQuantity,
  isRequestedNeedAbsent = false,
  children,
}) => {
  const isLg = useMedia('screen and (min-width: 832px)');

  const { category } = useCategory();

  const shouldShiftImage = useMemo(() => ['31500000-1'].includes(category.id), [category.id]);

  switch (itemsQuantity) {
    case 1: {
      return <Styled.SingleLayout>{children}</Styled.SingleLayout>;
    }
    case 2: {
      return <Styled.DoubleLayout shouldShiftImage={shouldShiftImage}>{children}</Styled.DoubleLayout>;
    }
    case 3: {
      return (
        <Styled.TripleLayout shouldShiftImage={shouldShiftImage} isRequestedNeedAbsent={isRequestedNeedAbsent}>
          {children}
        </Styled.TripleLayout>
      );
    }
    default: {
      return (
        <Styled.ManyLayout
          quantity={itemsQuantity}
          isLg={isLg()}
          shouldShiftImage={shouldShiftImage}
          isRequestedNeedAbsent={isRequestedNeedAbsent}
        >
          {children}
        </Styled.ManyLayout>
      );
    }
  }
};
