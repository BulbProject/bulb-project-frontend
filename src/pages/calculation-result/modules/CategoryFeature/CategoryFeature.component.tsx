import React, { FC } from 'react';
import { useCalculationContext } from '../../store';

import { LampsFeature } from './components';
import { CategoryFeatureProps } from './CategoryFeature.types';

export const CategoryFeature: FC<CategoryFeatureProps> = (props) => {
  const { category } = useCalculationContext();

  switch (category.id) {
    case '31500000-1':
    default:
      return <LampsFeature {...props} />;
  }
};
