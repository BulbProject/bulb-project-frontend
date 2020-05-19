import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Text from 'ustudio-ui/components/Text';
import Spinner from 'ustudio-ui/components/Spinner';
import Flex from 'ustudio-ui/components/Flex';
import useMediaQuery from 'ustudio-ui/hooks/use-media-query';

import { Layout, ErrorBoundary, ErrorPage, FadeIn } from 'components';
import { Container } from 'shared';

import type { AvailableVariant, Category, CategoryVersion, RequestedNeed as RequestedNeedType } from 'types/data';
import { getCategoryVersionConfig, postCalculationConfig } from 'config';
import { useRequest } from 'hooks';

import type { StoreRequestedNeed } from 'types/globals';
import { prepareRequestedNeed } from 'utils';
import FilterIcon from '../../assets/icons/filter.inline.svg';

import { Items, ItemsLayout } from './modules';
import { RequestedNeed } from './modules/RequestedNeed';

import { CalculationContextProvider } from './store';
import Styled from './CalculationResult.styles';

const CalculationResult: React.FC = () => {
  const isLg = useMediaQuery('screen and (min-width: 832px)');
  const isXl = useMediaQuery('screen and (min-width: 1130px)');

  const { categoryId, version } = useParams();

  const [isSubmitting, setSubmitting] = useState(false);
  const [requestedNeed, setRequestedNeed] = useState<StoreRequestedNeed | null>(null);
  const [newRequestedNeed, setNewRequestedNeed] = useState<StoreRequestedNeed | null>(null);
  const [availableVariants, setAvailableVariants] = useState<AvailableVariant[] | null>([]);

  const { data: categoryVersion, isLoading, error } = useRequest<CategoryVersion>(
    getCategoryVersionConfig(categoryId as string, version as string)
  );

  const {
    isLoading: isRecalculating,
    error: recalculationError,
    triggerRequest: recalculate,
    data: calculationResponse,
  } = useRequest<{ availableVariants: AvailableVariant[]; category: string; version: string }>(
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
    }
  }, [newRequestedNeed]);

  useEffect(() => {
    if (!isRecalculating && !recalculationError && newRequestedNeed) {
      sessionStorage.setItem(
        `${categoryId}/${version}`,
        JSON.stringify({
          payload: newRequestedNeed,
          response: calculationResponse,
        })
      );
      setRequestedNeed(newRequestedNeed);
      // @ts-ignore
      setAvailableVariants(calculationResponse?.availableVariants);

      setNewRequestedNeed(null);
    }
  }, [isRecalculating]);

  useEffect(() => {
    const sessionStorageData = sessionStorage.getItem(`${categoryId}/${version}`);

    if (sessionStorageData) {
      const parsedData = JSON.parse(sessionStorageData);

      setRequestedNeed(parsedData.payload);
      setAvailableVariants(parsedData.response.availableVariants);
    }
  }, []);

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const [hoveredObservation, setHoveredObservation] = useState('');

  const itemsQuantity = useMemo(() => (availableVariants || []).length, [availableVariants?.length]);
  const hasMany = useMemo(() => itemsQuantity > 1, [itemsQuantity]);

  const RequestedNeedComponent = (
    <RequestedNeed
      hasMany={hasMany}
      isDrawerOpen={isDrawerOpen}
      setDrawerOpen={setDrawerOpen}
      isRecalculating={isRecalculating}
      setSubmitting={setSubmitting}
      category={categoryVersion?.category as Category}
      requestedNeed={availableVariants?.[0] as AvailableVariant}
      hoveredObservation={hoveredObservation}
      setHoveredObservation={setHoveredObservation}
      setNewRequestedNeed={setNewRequestedNeed}
      recalculationError={recalculationError?.message}
    />
  );

  return (
    <Layout>
      <ErrorBoundary>
        {requestedNeed && categoryVersion && availableVariants && !isLoading && !error ? (
          <CalculationContextProvider
            category={categoryVersion.category}
            requestedNeed={requestedNeed as StoreRequestedNeed}
          >
            <FadeIn>
              <ItemsLayout itemsQuantity={itemsQuantity}>
                {hasMany ? (
                  <Styled.Wrapper alignment={{ horizontal: 'start' }}>
                    {RequestedNeedComponent}

                    <Items
                      availableVariants={availableVariants}
                      hoveredObservation={hoveredObservation}
                      setHoveredObservation={setHoveredObservation}
                    />
                  </Styled.Wrapper>
                ) : (
                  <Container>{RequestedNeedComponent}</Container>
                )}
              </ItemsLayout>
            </FadeIn>

            {!isLg && (
              <Styled.MobileFilterButton onClick={() => setDrawerOpen(!isDrawerOpen)}>
                <FilterIcon />
              </Styled.MobileFilterButton>
            )}
          </CalculationContextProvider>
        ) : (
          <Container>
            <Flex margin={{ top: 'large' }} alignment={{ horizontal: 'center' }}>
              {isLoading && <Spinner delay={500} />}

              {!isLoading && (!requestedNeed || !categoryVersion || error?.statusCode === 404) && (
                <Text color="negative">
                  Нажаль, Ви ще не проводили <Link to={`/categories/${categoryId}/${version}`}>розрахунків</Link> для
                  цієї категорії ☹️
                </Text>
              )}

              {error && error.statusCode !== 404 && !isLoading && <ErrorPage />}
            </Flex>
          </Container>
        )}
      </ErrorBoundary>
    </Layout>
  );
};

export default CalculationResult;
