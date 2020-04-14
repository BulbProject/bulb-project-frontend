import React from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';

import { Cell, Flex, Grid, Spinner, Text } from 'ustudio-ui';

import { getCategoryVersionConfig } from 'config';
import { useRequest } from 'hooks';
import { CategoryVersion } from 'types/data';

import { Stepper } from './components';

import Styled from './styles';

const headerCellProps = { offset: { before: 2, after: 2 }, size: 8 };

const CategoryPage: React.FC = () => {
  const { categoryId, version } = useParams();
  const location = useLocation();
  const { goBack, replace } = useHistory();

  const { data: categoryVersion, isLoading, error } = useRequest<CategoryVersion>(
    getCategoryVersionConfig(categoryId as string, version as string)
  );

  const { category: { title, description, criteria, classification } = {} } = (categoryVersion ||
    {}) as CategoryVersion;

  return error || !categoryVersion || isLoading ? (
    <Styled.Wrapper>
      <Styled.Container>
        <Cell xs={headerCellProps}>
          <Flex direction="column" alignment={{ horizontal: 'center' }}>
            {isLoading && <Spinner />}

            {error && (
              <>
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
              </>
            )}
          </Flex>
        </Cell>
      </Styled.Container>
    </Styled.Wrapper>
  ) : (
    <>
      <Styled.Wrapper>
        <Styled.Container>
          <Cell xs={headerCellProps}>
            <Flex direction="column">
              <Text variant="h3">{title}</Text>

              {description && <Styled.CategoryDescription variant="small">{description}</Styled.CategoryDescription>}

              <Styled.Classification {...classification} />
            </Flex>
          </Cell>
        </Styled.Container>
      </Styled.Wrapper>

      <Stepper
        steps={criteria?.map(criterion => criterion.title) as string[]}
        activeStep={criteria?.[2]?.title || ''}
      />
    </>
  );
};

export default CategoryPage;
