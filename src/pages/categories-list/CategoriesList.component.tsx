import React, { useEffect, useState } from 'react';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import Spinner from 'ustudio-ui/components/Spinner';

import { getCategoriesConfig } from 'config';
import { useRequest } from 'honks';
import axios from 'axios';

import { ErrorBoundary, FadeIn, Layout } from 'components';

import type { CategoriesListEntity } from 'types/data';

import { Card, Error, CardLayout } from './modules';

import Styled from './CategoriesList.styles';
import { getCategory, sortCategories } from './CategoriesList.module';
import type { CategoryCard } from './CategoriesList.types';

export const CategoriesList = () => {
  const [fullCategories, setFullCategories] = useState([] as CategoryCard[]);
  const [isLoading, setLoading] = useState(true);

  const { onFail, isFail, isSuccess, result, sendRequest } = useRequest<CategoriesListEntity[]>(async () => {
    const { data } = await axios(getCategoriesConfig());

    return data;
  });

  const categoriesList = isSuccess(result) ? result.data : null;

  const getFullCategoriesInfo = async () => {
    setLoading(true);

    const categoriesPromises = categoriesList?.map((_cat) => {
      const category = getCategory(_cat.id, _cat.version);

      return category;
    });

    if (categoriesPromises?.length) {
      Promise.all(categoriesPromises)
        .then((resolvedCategories) => {
          setFullCategories(resolvedCategories);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const reloadItem = (id: string, version: string) => {
    const category = getCategory(id, version);

    Promise.resolve(category).then(({ categoryVersion }) => {
      if (categoryVersion) {
        const filteredCategories = fullCategories.filter((_cat) => _cat.id !== id);
        setFullCategories([
          ...filteredCategories,
          {
            id,
            version,
            categoryVersion,
          },
        ]);
      }
    });
  };

  useEffect(() => {
    (async () => sendRequest())();
  }, []);

  useEffect(() => {
    if (categoriesList) {
      getFullCategoriesInfo();
    }
  }, [categoriesList]);

  return (
    <ErrorBoundary>
      <Styled.CategoriesListContainer>
        {isLoading && (
          <FadeIn>
            <Styled.LoaderContainer>
              <Spinner appearance={{ size: 64 }} delay={300} />
            </Styled.LoaderContainer>

            <Styled.Grid elementAmount={fullCategories.length + 1}>
              <Styled.BigCell />

              {/* need for correct scroll in fullpage.js */}
              {[...Array(8).keys()].map((category, cardIndex) => (
                <CardLayout cardIndex={cardIndex} key={category} />
              ))}
            </Styled.Grid>
          </FadeIn>
        )}

        {!isLoading && !isFail(result) && (
          <Flex alignment={{ vertical: 'center' }}>
            <FadeIn>
              {!fullCategories?.length && <Text variant="h3">Тут ще немає категорій</Text>}

              <Styled.Grid elementAmount={fullCategories.length + 1}>
                <Styled.BigCell>
                  <Styled.CategoriesHeader>
                    <Styled.Title variant="h1">Виберіть категорію для&nbsp;проведення розрахунків</Styled.Title>
                  </Styled.CategoriesHeader>
                </Styled.BigCell>

                {sortCategories(fullCategories).map((category, cardIndex) => (
                  <CardLayout cardIndex={cardIndex} image={category.categoryVersion?.image} key={category.id}>
                    <Card {...category} reload={() => reloadItem(category.id, category.version)} />
                  </CardLayout>
                ))}
              </Styled.Grid>
            </FadeIn>
          </Flex>
        )}

        {onFail(() => {
          return (
            <FadeIn>
              <Error reloadCategories={sendRequest} />
            </FadeIn>
          );
        })}
      </Styled.CategoriesListContainer>
    </ErrorBoundary>
  );
};

const CategoriesListPage = () => (
  <Layout>
    <CategoriesList />
  </Layout>
);

export default CategoriesListPage;
