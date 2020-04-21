import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { Cell, Flex, Grid, Spinner, Text } from 'ustudio-ui';

import { getCategoryVersionConfig } from 'config';
import { useRequest } from 'hooks';
import { CategoryVersion, Criterion } from 'types/data';
import { sortById } from 'utils';
import { FadeIn, ErrorBoundary } from 'components';
import { Container } from 'shared';

import { Stepper, Criteria } from './modules';
import { CategoryContextProvider } from './store';

import Styled from './Category.styles';

const CategoryPage: React.FC = () => {
  const { categoryId, version } = useParams();
  const { goBack } = useHistory();

  const { data: categoryVersion, isLoading, error } = useRequest<CategoryVersion>(
    getCategoryVersionConfig(categoryId as string, version as string)
  );

  const { category: { title, description, criteria, classification } = {} } = (categoryVersion ||
    {}) as CategoryVersion;

  const [steps, setSteps] = useState<Criterion[]>([]);

  useEffect(() => {
    if (criteria) {
      const sortedCriteria = criteria.sort(sortById);

      setSteps(sortedCriteria);
    }
  }, [criteria]);

  return !(error || isLoading) ? (
    <ErrorBoundary>
      <FadeIn>
        <Styled.Wrapper>
          <Container>
            <Flex direction="column">
              <Text variant="h3">{title}</Text>

              {description && <Styled.CategoryDescription variant="small">{description}</Styled.CategoryDescription>}

              <Styled.Classification {...classification} />
            </Flex>
          </Container>
        </Styled.Wrapper>

        <CategoryContextProvider category={{ id: categoryId as string, version: version as string }} criteria={steps}>
          <Stepper>
            <Criteria />
          </Stepper>
        </CategoryContextProvider>
      </FadeIn>
    </ErrorBoundary>
  ) : (
    <FadeIn>
      <Styled.Wrapper>
        <Container>
          <Flex direction="column" alignment={{ horizontal: 'center' }}>
            {isLoading && <Spinner appearance={{ size: 48 }} delay={300} />}

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
                      <Styled.RetryButton intent="positive" onClick={() => window.location.reload()}>
                        Try again
                      </Styled.RetryButton>
                    </Flex>
                  </Cell>
                </Grid>
              </>
            )}
          </Flex>
        </Container>
      </Styled.Wrapper>
    </FadeIn>
  );
};

export default CategoryPage;
