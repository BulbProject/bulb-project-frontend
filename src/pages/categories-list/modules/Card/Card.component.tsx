import React, { useState } from 'react';

import { CategoryCardData } from '../../CategoriesList.types';
import { BaseCard, ErrorCard, StubCard } from './components';

export const Card = ({
  category,
  version,
  error,
  reload,
  isDisabled
}: {
  category?: CategoryCardData;
  version: string;
  isDisabled: boolean
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

      {!isLoading && category && (
        <BaseCard
          id={category.id}
          title={category.title}
          description={category.description}
          classification={category.classification}
          version={version}
          isDisabled={isDisabled}
        />
      )}

      {!isLoading && error && <ErrorCard updateCategoryData={reloadItem} />}
    </>
  );
};
