import React from 'react';

import { useRequest } from '../../../hooks';
import { getCategoryVersionConfig } from '../../../config';

import BaseCard from './BaseCard';
import StubCard from './StubCard';
import ErrorCard from './ErrorCard';

import { CategoriesListEntity, CategoryVersion } from '../../../types/data';

const Card = ({ id, version }: CategoriesListEntity) => {

  const { data: categoryVersion, isLoading, triggerRequest } = useRequest<CategoryVersion>(
    getCategoryVersionConfig(id, version)
  );

  const { category: { title, description, classification } = {} } = (categoryVersion || {}) as CategoryVersion;

  return (
    <>
      {isLoading && <StubCard />}

      {!isLoading && (
        <>
          {categoryVersion ? (
            <BaseCard
              id={id}
              title={title}
              description={description}
              classification={classification}
              version={version}
            />
          ) : (
            <ErrorCard updateCategoryData={triggerRequest} />
          )}
        </>
      )}
    </>
  );
};

export default Card;
