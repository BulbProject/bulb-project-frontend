import React from 'react';
import { Text, Flex, Cell, Spinner } from 'ustudio-ui';


import { getCategoriesConfig } from '../config';
import { useRequest } from '../hooks';
import Styled from '../styles/categories';

import Card from '../components/Categories/Cards/Card';
import Error from '../components/Categories/error';

import { CategoriesListEntity } from '../types/data';

const Categories = () => {

  const { data: categoriesList, isLoading } = useRequest<CategoriesListEntity[]>(getCategoriesConfig());

  return (
    <Styled.Wrapper>
      <Styled.Container isContainer>
        <Cell xs={{ offset: { before: 2, after: 2 }, size: 8 }}>
          {isLoading && (
            <Flex alignment={{ vertical: 'center', horizontal: 'center' }}>
              <Spinner appearance={{ size: 52 }} />
            </Flex>
          )}
          {!isLoading && (
            <>
              {categoriesList ? (
                <Flex direction="column">
                  <Styled.ListTitle variant="h1">Select category for future calculation</Styled.ListTitle>

                  {!categoriesList?.length && <Text variant="h3">There are no categories yet</Text>}

                  {categoriesList?.map(category => (
                    <Card key={category.id} id={category.id} version={category.version} date={category.date} />
                  ))}
                </Flex>
              ) : (
                <Error />
              )}
            </>
          )}
        </Cell>
      </Styled.Container>
    </Styled.Wrapper>
  );
};

export default Categories;
