import React from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Cell, Flex, Grid, Text } from 'ustudio-ui';

import { getCategoryVersionConfig } from '../../../../config';
import { RequestError } from '../../../../types';
import { CategoryVersion } from '../../../../types/data';
import { requestData } from '../../../../utils';

import Styled from './styles';

const CategoryPage: NextPage<{ categoryVersion?: CategoryVersion; error?: RequestError }> = ({
  categoryVersion = {},
  error,
}) => {
  const { category: { title, description, classification } = {} } = categoryVersion;
  const { reload, back } = useRouter();

  return (
    <Styled.Wrapper>
      <Styled.Container isContainer>
        <Cell xs={{ offset: { before: 2, after: 2 }, size: 8 }}>
          {error ? (
            <Flex direction="column" alignment={{ horizontal: 'center' }}>
              <Text>Sorry, we could not get this category to load.</Text>

              <Grid xs={{ gap: 32 }}>
                <Cell>
                  <Flex alignment={{ horizontal: 'end' }}>
                    <Styled.RetryButton onClick={() => back()}>Go back</Styled.RetryButton>
                  </Flex>
                </Cell>

                <Cell>
                  <Flex alignment={{ horizontal: 'start' }}>
                    <Styled.RetryButton intent="positive" onClick={() => reload()}>
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

              <Styled.Classification id={classification?.id} description={classification?.description} />
            </Flex>
          )}
        </Cell>
      </Styled.Container>
    </Styled.Wrapper>
  );
};

CategoryPage.getInitialProps = async context => {
  const { categoryId, version } = context.query;

  const { data: categoryVersion, error } = await requestData<CategoryVersion>(
    getCategoryVersionConfig(categoryId as string, version as string)
  );

  return { categoryVersion, error };
};

export default CategoryPage;
