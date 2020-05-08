import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Text from 'ustudio-ui/components/Text';
import Spinner from 'ustudio-ui/components/Spinner';
import Flex from 'ustudio-ui/components/Flex';
import Cell from 'ustudio-ui/components/Grid/Cell';
import Grid from 'ustudio-ui/components/Grid/Grid';

import { CategoryHeader, ErrorBoundary, FadeIn, ErrorPage } from 'components';
import { Container } from 'shared';

import type { AvailableVariant, CategoryVersion, RequestedNeed as RequestedNeedType } from 'types/data';
import { getCategoryVersionConfig, postCalculationConfig } from 'config';
import { useRequest } from 'hooks';

import type { StoreRequestedNeed } from 'types/globals';
import { prepareRequestedNeed } from 'utils';

import { RequestedNeed } from './modules/RequestedNeed';
import { Items } from './modules/Items';

import { CalculationContextProvider } from './store';

const CalculationResult: React.FC = () => {
  const { categoryId, version } = useParams();

  const [isSubmitting, setSubmitting] = useState(false);
  const [requestedNeed, setRequestedNeed] = useState<StoreRequestedNeed | null>(null);
  const [newRequestedNeed, setNewRequestedNeed] = useState<StoreRequestedNeed | null>(null);
  const [availableVariants, setAvailableVariants] = useState<AvailableVariant[] | null>([]);

  const { data: categoryVersion, isLoading, error } = useRequest<CategoryVersion>(
    getCategoryVersionConfig(categoryId as string, version as string)
  );

  const { category: { title, description, classification } = {} } = categoryVersion || ({} as CategoryVersion);

  useEffect(() => {
    const sessionStorageData = sessionStorage.getItem(`${categoryId}/${version}`);

    if (sessionStorageData) {
      const parsedData = JSON.parse(sessionStorageData);

      setRequestedNeed(parsedData.payload);
      setAvailableVariants(parsedData.response.availableVariants);
    }
  }, []);

  const { isLoading: isRecalculating, error: recalculationError, triggerRequest: recalculate } = useRequest(
    postCalculationConfig(categoryId as string, version as string, {
      requestedNeed: newRequestedNeed ? prepareRequestedNeed(newRequestedNeed) : ({} as RequestedNeedType),
    }),
    {
      dependencies: [newRequestedNeed],
      isRequesting: isSubmitting && Boolean(newRequestedNeed),
      isDefaultLoading: false,
    }
  );

  useEffect(() => {
    if (newRequestedNeed) {
      recalculate();

      setSubmitting(false);
      setNewRequestedNeed(null);
    }
  }, [newRequestedNeed]);

  return (
    <ErrorBoundary>
      <FadeIn>
        {categoryVersion && requestedNeed && <CategoryHeader {...{ title, description, classification }} />}

        {requestedNeed && categoryVersion && !isLoading && !error ? (
          <CalculationContextProvider
            category={categoryVersion.category}
            requestedNeed={requestedNeed as StoreRequestedNeed}
            availableVariants={availableVariants as AvailableVariant[]}
          >
            <Grid
              padding={{ left: 'large', right: 'large', top: 'large', bottom: 'large' }}
              xs={{ gap: 32 }}
              lg={{ gap: 32 }}
            >
              <Cell lg={{ size: 3 }}>
                <RequestedNeed
                  error={recalculationError?.message}
                  isLoading={isRecalculating}
                  setSubmitting={setSubmitting}
                  recalculate={(state) => {
                    setNewRequestedNeed(state);
                  }}
                />
              </Cell>

              <Cell lg={{ size: 9 }}>
                <Items />.
              </Cell>
            </Grid>
          </CalculationContextProvider>
        ) : (
          <Container>
            <Flex margin={{ top: 'large' }} alignment={{ horizontal: 'center' }}>
              {isLoading && <Spinner delay={500} />}

              {(!requestedNeed || !categoryVersion) && !isLoading && (
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
