import React from 'react';
import { NextPage } from 'next';
import { Text, Flex, Cell } from 'ustudio-ui';

import Styled from '../../styles/categories';
import { requestData } from '../../utils';
import { CategoriesListEntity } from '../../types/data';
import { getCategoriesConfig } from '../../config';
import { RequestError } from '../../types';
import Card from '../../components/categories/Cards/Card';
import Error from './../../components/categories/Error';

const Categories: NextPage<{ categoriesList?: CategoriesListEntity[]; error?: RequestError }> = ({
  categoriesList = [],
  error,
}) => {
  return (
    <Styled.Wrapper>
      <Styled.Container isContainer>
        <Cell xs={{ offset: { before: 2, after: 2 }, size: 8 }}>
          {error ? (
            <Error />
          ) : (
            <Flex direction="column">
              <Styled.ListTitle variant="h1">Select category for future calculation</Styled.ListTitle>
              {!categoriesList?.length && <Text variant="h3">There are no categories yet</Text>}
              {categoriesList?.map(category => (
                <Card key={category.id} id={category.id} version={category.version} date={category.date} />
              ))}
            </Flex>
          )}
        </Cell>
      </Styled.Container>
    </Styled.Wrapper>
  );
};

Categories.getInitialProps = async () => {
  const { data: categoriesList, error } = await requestData<CategoriesListEntity[]>(getCategoriesConfig());

  return { categoriesList, error };
};

export default Categories;
