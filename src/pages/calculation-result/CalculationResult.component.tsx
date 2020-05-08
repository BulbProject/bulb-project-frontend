import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Text from 'ustudio-ui/components/Text';
import Spinner from 'ustudio-ui/components/Spinner';
import Flex from 'ustudio-ui/components/Flex';
import Cell from 'ustudio-ui/components/Grid/Cell';
import Grid from 'ustudio-ui/components/Grid/Grid';

import { CategoryHeader, ErrorBoundary, FadeIn, ErrorPage } from 'components';
import { Container } from 'shared';
import type { CategoryVersion } from 'types/data';
import { getCategoryVersionConfig } from 'config';
import { useRequest } from 'hooks';
import type { StoreRequestedNeed } from 'types/globals';
import { RequestedNeed } from './modules/RequestedNeed';

import { CalculationContextProvider } from './store';

const CalculationResult: React.FC = () => {
  const { categoryId, version } = useParams();

  // proper typings will come with the proper response
  const [calculationData, setCalculationData] = useState<{ payload: StoreRequestedNeed } | null>(null);

  const { data: categoryVersion, isLoading, error } = useRequest<CategoryVersion>(
    getCategoryVersionConfig(categoryId as string, version as string)
  );

  const { category: { title, description, classification } = {} } = categoryVersion || ({} as CategoryVersion);

  useEffect(() => {
    const sessionStorageData = sessionStorage.getItem(`${categoryId}/${version}`);

    if (sessionStorageData) {
      setCalculationData(JSON.parse(sessionStorageData));
    }
  }, []);

  return (
    <ErrorBoundary>
      <FadeIn>
        {categoryVersion && calculationData && <CategoryHeader {...{ title, description, classification }} />}

        {calculationData && categoryVersion && !isLoading && !error ? (
          <CalculationContextProvider category={categoryVersion.category} requestedNeed={calculationData.payload}>
            <Grid
              padding={{ left: 'large', right: 'large', top: 'large', bottom: 'large' }}
              xs={{ gap: 32 }}
              lg={{ gap: 32 }}
            >
              <Cell lg={{ size: 3 }}>
                <RequestedNeed />
              </Cell>

              <Cell lg={{ size: 9 }}>Items</Cell>
            </Grid>
          </CalculationContextProvider>
        ) : (
          <Container>
            <Flex margin={{ top: 'large' }} alignment={{ horizontal: 'center' }}>
              {isLoading && <Spinner delay={500} />}

              {(!calculationData || !categoryVersion) && !isLoading && (
                <Text color="negative">
                  Нажаль, Ви ще не проводили <Link to={`/categories/${categoryId}/${version}`}>розрахунків</Link> для
                  цієї категорії ☹️
                </Text>
              )}

              {error && !isLoading && <ErrorPage />}
            </Flex>
          </Container>
        )}
      </FadeIn>
    </ErrorBoundary>
  );
};

export default CalculationResult;
