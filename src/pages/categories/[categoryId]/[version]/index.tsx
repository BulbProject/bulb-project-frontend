import React from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';

import { Cell, Flex, Grid, Spinner, Text } from 'ustudio-ui';

import { getCategoryVersionConfig } from 'config';
import { useRequest } from 'hooks';
import { CategoryVersion } from 'types/data';

import Styled from './styles';

const CategoryPage: React.FC = () => {
  const { categoryId, version } = useParams();
  const location = useLocation();
  const { goBack, replace } = useHistory();

  const { data: categoryVersion, isLoading, error } = useRequest<CategoryVersion>(
    getCategoryVersionConfig(categoryId as string, version as string)
  );

  const { category: { title, description, classification } = {} } = (categoryVersion || {}) as CategoryVersion;

  return isLoading ? (
    <Spinner />
  ) : (
    <Styled.Wrapper>
      <Styled.Container isContainer>
        <Cell xs={{ offset: { before: 2, after: 2 }, size: 8 }}>
          {error || !categoryVersion ? (
            <Flex direction="column" alignment={{ horizontal: 'center' }}>
              <Text>Sorry, we could not get this category to load.</Text>

              <Grid xs={{ gap: 32 }}>
                <Cell>
                  <Flex alignment={{ horizontal: 'end' }}>
                    <Styled.RetryButton onClick={() => goBack()}>Go back</Styled.RetryButton>
                  </Flex>
                </Cell>

                <Cell>
                  <Flex alignment={{ horizontal: 'start' }}>
                    <Styled.RetryButton intent="positive" onClick={() => replace(location)}>
                      Try again
                    </Styled.RetryButton>
                  </Flex>
                </Cell>
              </Grid>
            </Flex>
          ) : (
            <Flex direction="column">
              <Text variant="h3">{title}</Text>

              {description && <Styled.CategoryDescription variant="small">{description}</Styled.CategoryDescription>}

              <Styled.Classification {...classification} />
            </Flex>
          )}
        </Cell>
      </Styled.Container>
    </Styled.Wrapper>
  );
};

export default CategoryPage;
