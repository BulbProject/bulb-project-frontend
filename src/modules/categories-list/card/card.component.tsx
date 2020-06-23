import React, { FC, useCallback, useState } from 'react';

import { CategoryCardData } from '../entity';

import { BaseCard } from './base-card';
import { StubCard } from './stub-card';
import { ErrorCard } from './error-card';

import Styled from './card.styles';

export const Card: FC<{
  category?: CategoryCardData;
  reload(): Promise<void>;
}> = ({ category, reload }) => {
  const [isLoading, setLoading] = useState(false);

  const reloadItem = useCallback(async () => {
    setLoading(true);

    await reload();

    setLoading(false);
  }, []);

  if (isLoading) {
    return <StubCard />;
  }

  if (category) {
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
  }

  return <ErrorCard updateCategoryData={reloadItem} />;
};
