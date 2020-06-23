import React, { FC, useCallback, useEffect, useState } from 'react';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

import axios, { AxiosRequestConfig } from 'axios';
import useAsync from 'honks/use-async';

import { ErrorBoundary, Loader } from 'shared/components';
import type { CategoriesListItem, CategoryVersion } from 'shared/entity/data';
import { useApi } from 'core/context/api-provider';
import type { Variant } from 'core/layout/layout-variant';
import { useLayoutVariant } from 'core/layout';

import { Card } from './card';
import { CardLayout } from './card-layout';
import { Error } from './error';
import type { CategoryCard, CategoryCardData } from './entity';

import Styled from './categories-list.styles';

const transformCategoryData = (categoryVersion?: CategoryVersion): CategoryCardData | undefined => {
  if (!categoryVersion) {
    return undefined;
  }

  const { id, title, description, documents } = categoryVersion.category;
  const { status, version } = categoryVersion;

  return {
    id,
    title,
    status,
    description,
    version,
    image: documents?.find((document) => !document.relatedItem)?.url,
  };
};

const getCategory = async (
  [id, version]: [string, string],
  config: (id: string, version: string) => AxiosRequestConfig
): Promise<CategoryCard> => {
  const { data: categoryVersion } = await axios(config(id, version));

  return { id, version, categoryVersion: transformCategoryData(categoryVersion) };
};

const sortCategories = (categories: CategoryCard[]): CategoryCard[] => {
  const pendingCategories = categories.filter((category) => category.categoryVersion?.status === 'pending');
  const activeCategories = categories.filter((category) => category.categoryVersion?.status === 'active');
  const categoriesWithoutStatus = categories.filter((category) => !category?.categoryVersion?.status);

  return [...activeCategories, ...pendingCategories, ...categoriesWithoutStatus];
};

const CategoriesList: FC<{
  layoutVariant?: Variant;
}> = ({ layoutVariant = 'full' }) => {
  useLayoutVariant(layoutVariant);

  const [categoriesVersions, setCategoriesVersions] = useState<CategoryCard[]>([]);
  const [isLoading, setLoading] = useState(true);

  const { getCategoriesConfig, getCategoryVersionConfig } = useApi();

  const { call: getCategories, onResolve, onReject, result: categoriesResult } = useAsync<CategoriesListItem[]>(
    async () => {
      const { data } = await axios(getCategoriesConfig());

      return data;
    }
  );

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    onResolve(async (categories) => {
      setLoading(true);

      setCategoriesVersions(
        await Promise.all(
          categories.map(async ({ id, version }) => getCategory([id, version], getCategoryVersionConfig))
        )
      );

      setLoading(false);
    });
  }, [categoriesResult]);

  const reloadItem = useCallback(async ([id, version]: [string, string]) => {
    const { categoryVersion } = await getCategory([id, version], getCategoryVersionConfig);

    if (categoryVersion) {
      setCategoriesVersions([
        ...categoriesVersions,
        {
          id,
          version,
          categoryVersion,
        },
      ]);
    }
  }, []);

  return (
    <ErrorBoundary>
      <Styled.CategoriesListContainer>
        {isLoading && (
          <>
            <Loader size={64} />

            <Styled.Grid elementAmount={categoriesVersions.length + 1}>
              <Styled.BigCell />

              {/* Need for correct scroll in fullpage.js */}
              {[...new Array(8).keys()].map((category, cardIndex) => (
                <CardLayout cardIndex={cardIndex} key={category} />
              ))}
            </Styled.Grid>
          </>
        )}

        {onResolve(() => {
          return (
            !isLoading && (
              <Flex alignment={{ vertical: 'center' }}>
                {!categoriesVersions.length && <Text variant="h3">Тут ще немає категорій</Text>}

                <Styled.Grid elementAmount={categoriesVersions.length + 1}>
                  <Styled.BigCell>
                    <Styled.CategoriesHeader>
                      <Styled.Title variant="h1">Виберіть категорію для&nbsp;проведення розрахунків</Styled.Title>
                    </Styled.CategoriesHeader>
                  </Styled.BigCell>

                  {sortCategories(categoriesVersions).map((category, cardIndex) => {
                    return (
                      <CardLayout cardIndex={cardIndex} image={category.categoryVersion?.image} key={category.id}>
                        <Card
                          category={category.categoryVersion}
                          reload={async () => reloadItem([category.id, category.version])}
                        />
                      </CardLayout>
                    );
                  })}
                </Styled.Grid>
              </Flex>
            )
          );
        })}

        {onReject(() => (
          <Error reloadCategories={getCategories} />
        ))}
      </Styled.CategoriesListContainer>
    </ErrorBoundary>
  );
};

export default CategoriesList;
