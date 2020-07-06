import React from 'react';
import { useCategory } from 'core/context/category-provider';

import { CategoryFeatureProps } from './category-feature.props';
import { LampsFeature } from './features';

export const CategoryFeature = (props: CategoryFeatureProps): JSX.Element | null => {
  const { category } = useCategory();

  // eslint-disable-next-line sonarjs/no-small-switch
  switch (category.id) {
    case '31500000-1':
      return <LampsFeature {...props} />;
    default:
      return null;
  }
};
