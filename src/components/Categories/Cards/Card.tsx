import React from 'react';

import { useRequest } from 'hooks';
import { getCategoryVersionConfig } from 'config';

import { CategoryVersion } from 'types/data';

import BaseCard from './BaseCard';
import StubCard from './StubCard';
import ErrorCard from './ErrorCard';

const Card = ({ id, version }: { id: string; version: string }) => {
  const { data: categoryVersion, isLoading, error, triggerRequest } = useRequest<CategoryVersion>(
    getCategoryVersionConfig(id, version)
  );

  const { category } = (categoryVersion || {}) as CategoryVersion;

  return (
    <>
      {isLoading && <StubCard />}

      {!isLoading && categoryVersion && (
        <BaseCard
          id={id}
          title={category.title}
          description={category.description}
          classification={category.classification}
          version={version}
        />
      )}

      {!isLoading && error && <ErrorCard updateCategoryData={triggerRequest} />}
    </>
  );
};

export default Card;
