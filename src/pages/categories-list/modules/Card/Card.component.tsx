import React, { useState } from 'react';

import { CategoryCardData } from '../../CategoriesList.types';
import { BaseCard, ErrorCard, StubCard } from './components';
import Styled from './Card.styles';

export const Card = ({
  category,
  version,
  error,
  reload,
}: {
  category?: CategoryCardData;
  version: string;
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
        <Styled.Link key={`${category.id}-${version}`} to={`/categories/${category.id}/${version}`}>
          <BaseCard
            id={category.id}
            title={category.title}
            description={category.description}
            classification={category.classification}
            status={category.status}
            version={version}
          />
        </Styled.Link>
      )}

      {!isLoading && category && category.status === 'pending' && (
        <BaseCard
          id={category.id}
          title={category.title}
          description={category.description}
          classification={category.classification}
          status={category.status}
          version={version}
        />
      )}

      {!isLoading && error && <ErrorCard updateCategoryData={reloadItem} />}
    </>
  );
};
