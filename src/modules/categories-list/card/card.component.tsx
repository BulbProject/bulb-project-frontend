import React, { FC } from 'react';

import { CategoriesListItem } from 'shared/entity/data';

import { BaseCard } from './base-card';
import Styled from './card.styles';

export const Card: FC<{
  category: CategoriesListItem;
}> = ({ category }) => {
  switch (category.status) {
    case 'active': {
      return (
        <Styled.Link to={`/categories/${category.id}/${category.version}`}>
          <BaseCard {...category} />
        </Styled.Link>
      );
    }
    case 'pending':
    default: {
      return <BaseCard {...category} />;
    }
  }
};
