import React, { useEffect, useState } from 'react';
import { Text, Flex, Cell, Spinner } from 'ustudio-ui';

import Styled from '../../styles/categories';
import { requestData } from '../../utils';
import { CategoriesListEntity } from '../../types/data';
import { getCategoriesConfig } from '../../config';
import { RequestError } from '../../types';
import Card from '../../components/categories/Cards/Card';
import Error from './../../components/categories/Error';

type ReqError = RequestError | undefined;

const Categories = () => {
  const [isLoading, setLoading] = useState(true);
  const [categoriesList, setCategoriesList] = useState((null as unknown) as CategoriesListEntity[]);
  const [error, setError] = useState(undefined as ReqError);

  const getCategoriesList = async () => {
    setLoading(true);
    const { data: categories, error } = await requestData<CategoriesListEntity[]>(getCategoriesConfig());

    if (categories) setCategoriesList(categories);

    setError(error);
    setLoading(false);
  };

  useEffect(() => {
    getCategoriesList();
  }, []);

  return (
    <Styled.Wrapper>
      <Styled.Container isContainer>
        <Cell xs={{ offset: { before: 2, after: 2 }, size: 8 }}>
          {error ? (
            <Error />
          ) : (
            <Flex direction="column">
              <Styled.ListTitle variant="h1">Select category for future calculation</Styled.ListTitle>

              {!isLoading ? (
                <Flex alignment={{ vertical: 'center', horizontal: 'center' }}>
                  <Spinner appearance={{ size: 52 }} />
                </Flex>
              ) : (
                <>
                  {!categoriesList?.length && <Text variant="h3">There are no categories yet</Text>}
                  {categoriesList?.map(category => (
                    <Card key={category.id} id={category.id} version={category.version} date={category.date} />
                  ))}
                </>
              )}
            </Flex>
          )}
        </Cell>
      </Styled.Container>
    </Styled.Wrapper>
  );
};

export default Categories;
