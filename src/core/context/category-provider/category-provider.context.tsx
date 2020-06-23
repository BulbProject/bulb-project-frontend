import React, { FC, createContext, useContext, useEffect } from 'react';

import Flex from 'ustudio-ui/components/Flex';
import Cell from 'ustudio-ui/components/Grid/Cell';
import Grid from 'ustudio-ui/components/Grid/Grid';
import Text from 'ustudio-ui/components/Text';

import axios, { AxiosError } from 'axios';
import useAsync from 'honks/use-async';
import { useParams, useHistory } from 'react-router-dom';

import { Category, CategoryVersion } from 'shared/entity/data';
import { Container, FallbackButton, Loader } from 'shared/components';

import { useApi } from '../api-provider';

export interface CategoryData {
  category: Category;
  version: string;
}

const CategoryContext = createContext<CategoryData | undefined>(undefined);

const CategoryProvider: FC = ({ children }) => {
  const { categoryId, version } = useParams();
  const { goBack } = useHistory();

  const { getCategoryVersionConfig } = useApi();

  const { call: requestCategory, onResolve, onPending, onReject } = useAsync<Category, AxiosError>(async () => {
    const { data } = await axios(getCategoryVersionConfig(categoryId, version));

    return (data as CategoryVersion).category;
  });

  useEffect(() => {
    requestCategory();
  }, [categoryId, version]);

  return (
    <>
      {onResolve((category) => {
        return <CategoryContext.Provider value={{ category, version }}>{children}</CategoryContext.Provider>;
      })}

      {onPending(() => (
        <Loader size={64} />
      ))}

      {onReject(() => {
        return (
          <Container>
            <Flex direction="column" alignment={{ horizontal: 'center' }}>
              <Text>На жаль, ми не змогли завантажити цю категорію.</Text>

              <Grid xs={{ gap: 32 }}>
                <Cell>
                  <Flex alignment={{ horizontal: 'end' }}>
                    <FallbackButton onClick={goBack}>Назад</FallbackButton>
                  </Flex>
                </Cell>

                <Cell>
                  <Flex alignment={{ horizontal: 'start' }}>
                    <FallbackButton intent="positive" onClick={window.location.reload}>
                      Оновити сторінку
                    </FallbackButton>
                  </Flex>
                </Cell>
              </Grid>
            </Flex>
          </Container>
        );
      })}
    </>
  );
};

export const useCategory = (): CategoryData => {
  const context = useContext(CategoryContext);

  if (context === undefined) {
    throw new ReferenceError('Use Category inside its provider.');
  }

  return context;
};

export default CategoryProvider;
