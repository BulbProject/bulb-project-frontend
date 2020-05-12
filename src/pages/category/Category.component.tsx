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
import { sortByValue } from 'utils';
import { FadeIn, ErrorBoundary, CategoryHeader } from 'components';
import { Container } from 'shared';

import { Stepper } from './modules';
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
      const sortedCriteria = criteria.sort(sortByValue('id'));

      setSteps(sortedCriteria);
    }
  }, [criteria]);

  return !(error || isLoading) ? (
    <ErrorBoundary>
      <FadeIn>
        <CategoryHeader {...{ title, description, classification }} />

        <CategoryContextProvider category={{ id: categoryId as string, version: version as string }} criteria={steps}>
          <Stepper />
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
