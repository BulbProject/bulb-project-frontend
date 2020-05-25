import React, { useState } from 'react';

import type { CategoryCardData } from '../../CategoriesList.types';

import Styled from './Card.styles';
import { BaseCard } from './components/BaseCard';
import { StubCard } from './components/StubCard';
import { ErrorCard } from './components/ErrorCard';

export const Card = ({
  categoryVersion: category,
  error,
  reload,
}: {
  categoryVersion?: CategoryCardData;
  reload: () => void;
  error?: string;
}) => {
  const [isLoading, setLoading] = useState(false);

  const reloadItem = async () => {
    setLoading(true);
    await reload();
    setLoading(false);
  };

  return (
    <>
      {isLoading && <StubCard />}

      {!isLoading && category && category.status === 'active' && (
        <Styled.Link to={`/categories/${category.id}/${category.version}`}>
          <BaseCard {...category} />
        </Styled.Link>
      )}

      {!isLoading && category && category.status === 'pending' && <BaseCard {...category} />}

      {!isLoading && error && <ErrorCard updateCategoryData={reloadItem} />}
    </>
  );
};
