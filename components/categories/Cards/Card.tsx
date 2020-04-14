import React, { useEffect, useState } from 'react';

import { CategoriesListEntity, CategoryVersion } from '../../../types/data';
import { RequestError } from '../../../types';
import BaseCard from './BaseCard';
import StubCard from './StubCard';
import { requestData } from '../../../utils';
import { getCategoryVersionConfig } from '../../../config';
import ErrorCard from './ErrorCard';
import { CategoryCard } from './props';

type Error = RequestError | undefined;

const Card = ({ id, version }: CategoriesListEntity) => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(undefined as Error);
  const [category, setCategory] = useState((null as unknown) as CategoryCard);

  const getCategory = async () => {
    setLoading(true);

    const { data: categoryVersion, error } = await requestData<CategoryVersion>(getCategoryVersionConfig(id, version));

    if (categoryVersion) {
      setCategory({
        id: categoryVersion.category.id,
        title: categoryVersion.category.title,
        description: categoryVersion.category.description,
        version: categoryVersion.version,
        classification: categoryVersion.category.classification,
      });
    }

    setError(error);

    setLoading(false);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      {isLoading ? (
        <StubCard />
      ) : error ? (
        <ErrorCard reloadItem={getCategory} />
      ) : (
        <BaseCard
          id={category.id}
          title={category.title}
          description={category.version}
          classification={category.classification}
          version={category.version}
        />
      )}
    </>
  );
};

export default Card;
