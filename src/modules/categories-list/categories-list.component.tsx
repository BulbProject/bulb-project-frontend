import React, { FC, useEffect } from 'react';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

import axios from 'axios';
import useAsync from 'honks/use-async';

import { ErrorBoundary, Loader, Fade } from 'shared/components';
import type { CategoriesListItem } from 'shared/entity/data';
import { useApi } from 'core/context/api-provider';

import { Card } from './card';
import { CardLayout } from './card-layout';
import { Error } from './error';

import Styled from './categories-list.styles';

const sortCategories = (categories: CategoriesListItem[]): CategoriesListItem[] => {
  const pendingCategories = categories.filter((category) => category.status === 'pending');
  const activeCategories = categories.filter((category) => category.status === 'active');
  const categoriesWithoutStatus = categories.filter((category) => !category.status);

  return [...activeCategories, ...pendingCategories, ...categoriesWithoutStatus];
};

const CategoriesList: FC = () => {
  const { getCategoriesConfig } = useApi();

  const { call: getCategories, onPending, onResolve, onReject } = useAsync<CategoriesListItem[]>(async () => {
    const { data } = await axios(getCategoriesConfig());

    return data;
  });

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Fade>
      <ErrorBoundary>
        <Styled.CategoriesListContainer>
          {onPending(() => (
            <Loader size={64} />
          ))}

          {onResolve((categories) => (
            <Fade>
              <Flex alignment={{ vertical: 'center' }}>
                {categories.length > 0 ? (
                  <Styled.Grid elementAmount={categories.length + 1}>
                    <Styled.BigCell>
                      <Styled.CategoriesHeader>
                        <Styled.Title variant="h1">Виберіть категорію для&nbsp;проведення розрахунків</Styled.Title>
                      </Styled.CategoriesHeader>
                    </Styled.BigCell>

                    {sortCategories(categories).map((category, cardIndex) => {
                      return (
                        <CardLayout cardIndex={cardIndex} image={category?.image} key={category.id}>
                          <Card category={category} />
                        </CardLayout>
                      );
                    })}
                  </Styled.Grid>
                ) : (
                  <Text variant="h3">Нажаль в систему ще не додано ні одної категорії</Text>
                )}
              </Flex>
            </Fade>
          ))}

          {onReject(() => (
            <Error reloadCategories={getCategories} />
          ))}
        </Styled.CategoriesListContainer>
      </ErrorBoundary>
    </Fade>
  );
};

export default CategoriesList;
