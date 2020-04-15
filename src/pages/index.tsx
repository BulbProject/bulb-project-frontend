import React from 'react';
import { Text, Flex, Spinner } from 'ustudio-ui';

import { getCategoriesConfig } from 'config';
import { useRequest } from 'hooks';

import Card from 'components/Categories/Cards/Card';
import Error from 'components/Categories/error';
import Container from 'components/Container';

import { CategoriesListEntity } from 'types/data';

import Styled from '../styles/categories';

const Categories = () => {
  const { data: categoriesList, error, isLoading, triggerRequest } = useRequest<CategoriesListEntity[]>(
    getCategoriesConfig()
  );

  return (
    <Container>
      {isLoading && (
        <Flex alignment={{ vertical: 'center', horizontal: 'center' }}>
          <Spinner appearance={{ size: 64 }} />
        </Flex>
      )}

      {!isLoading && categoriesList && (
        <Flex direction="column">
          <Styled.ListTitle variant="h1">Select category for future calculation</Styled.ListTitle>

          {!categoriesList?.length && <Text variant="h3">There are no categories yet</Text>}

          {categoriesList?.map(category => (
            <Card key={category.id} {...category} />
          ))}
        </Flex>
      )}

      {!isLoading && error && <Error updateCategories={triggerRequest} />}
    </Container>
  );
};

export default Categories;
