import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Grid from 'ustudio-ui/components/Grid/Grid';
import Cell from 'ustudio-ui/components/Grid/Cell';
import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';
import Text from 'ustudio-ui/components/Text';

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
              <Styled.CategoryTitle variant="h2">{title}</Styled.CategoryTitle>

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
                <Text>На жаль, ми не змогли завантажити цю категорію.</Text>

                <Grid xs={{ gap: 32 }}>
                  <Cell>
                    <Flex alignment={{ horizontal: 'end' }}>
                      <Styled.RetryButton onClick={() => goBack()}>Назад</Styled.RetryButton>
                    </Flex>
                  </Cell>

                  <Cell>
                    <Flex alignment={{ horizontal: 'start' }}>
                      <Styled.RetryButton intent="positive" onClick={() => window.location.reload()}>
                        Оновити сторінку
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
