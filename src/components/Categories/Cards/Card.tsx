import React, { useState } from 'react';


import { useRequest } from '../../../hooks';
import { getCategoryVersionConfig } from '../../../config';

import BaseCard from './BaseCard';
import StubCard from './StubCard';
import ErrorCard from './ErrorCard';

import { CategoriesListEntity, CategoryVersion } from '../../../types/data';

const Card = ({ id, version }: CategoriesListEntity) => {
  const [updateCategoryCount, setUpdateCategoryCount] = useState(0);

  const updateCategoryData = () => {
    setUpdateCategoryCount(updateCategoryCount + 1);
  };

  const { data: categoryVersion, isLoading } = useRequest<CategoryVersion>(getCategoryVersionConfig(id, version), [
    updateCategoryCount,
  ]);

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
            <ErrorCard updateCategoryData={updateCategoryData} />
          )}
        </>
      )}
    </>
  );
};

export default Card;
