import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Text from 'ustudio-ui/components/Text';
import Spinner from 'ustudio-ui/components/Spinner';
import Flex from 'ustudio-ui/components/Flex';
import useMediaQuery from 'ustudio-ui/hooks/use-media-query';

import { useRequest } from 'honks';
import axios from 'axios';

import { Layout, ErrorBoundary, ErrorPage, FadeIn } from 'components';
import { Container } from 'shared';

import type { AvailableVariant, CategoryVersion, RequestedNeed as RequestedNeedType } from 'types/data';
import { getCategoryVersionConfig, postCalculationConfig } from 'config';

import type { StoreRequestedNeed } from 'types/globals';
import { prepareRequestedNeed } from 'utils';
import FilterIcon from '../../assets/icons/filter.inline.svg';
import { maxWidth } from './CalculationResult.module';

import { Items, ItemsLayout } from './modules';
import { RequestedNeed } from './modules/RequestedNeed';

import { CalculationContextProvider } from './store';
import Styled from './CalculationResult.styles';

const CalculationResult: React.FC = () => {
  const isLg = useMediaQuery('screen and (min-width: 832px)');
  const isXl = useMediaQuery(`screen and (min-width: ${maxWidth}px)`);

  const { categoryId, version } = useParams();

  const [isSubmitting, setSubmitting] = useState(false);
  const [requestedNeed, setRequestedNeed] = useState<StoreRequestedNeed | null>(null);
  const [newRequestedNeed, setNewRequestedNeed] = useState<StoreRequestedNeed | null>(null);
  const [availableVariants, setAvailableVariants] = useState<AvailableVariant[] | null>(null);

  useEffect(() => {
    const sessionStorageData = sessionStorage.getItem(`${categoryId}/${version}`);

    if (sessionStorageData) {
      const parsedData = JSON.parse(sessionStorageData);

      setRequestedNeed(parsedData.payload);
      setAvailableVariants(parsedData.response.availableVariants);
    }
  }, []);

  const {
    onSuccess: onCategorySuccess,
    onPending: onCategoryPending,
    onFail: onCategoryFail,
    sendRequest: requestCategory,
  } = useRequest<CategoryVersion>(async () => {
    const { data } = await axios(getCategoryVersionConfig(categoryId as string, version as string));

    return data;
  });

  const {
    isPending: isCalculationPending,
    onFail: onCalculationFail,
    isFail: hasCalculationFailed,
    sendRequest: calculate,
    result: calculationResponse,
  } = useRequest<{ availableVariants: AvailableVariant[]; category: string; version: string }>(async () => {
    const { data } = await axios(
      postCalculationConfig(categoryId as string, version as string, {
        requestedNeed: newRequestedNeed ? prepareRequestedNeed(newRequestedNeed) : ({} as RequestedNeedType),
      })
    );

    return data;
  });

  useEffect(() => {
    if (!availableVariants) {
      (async () => {
        await requestCategory();
      })();
    }
  }, []);

  useEffect(() => {
    if (isSubmitting && Boolean(newRequestedNeed)) {
      (async () => {
        await calculate();

        setSubmitting(false);
      })();
    }
  }, [newRequestedNeed, isSubmitting, Boolean(newRequestedNeed)]);

  useEffect(() => {
    if (!isCalculationPending() && !hasCalculationFailed(calculationResponse) && newRequestedNeed) {
      sessionStorage.setItem(
        `${categoryId}/${version}`,
        JSON.stringify({
          payload: newRequestedNeed,
          response: calculationResponse?.data,
        })
      );
      setRequestedNeed(newRequestedNeed);
      // availableVariants are supposed to be defined in here
      // @ts-ignore
      setAvailableVariants(calculationResponse?.data.availableVariants);

      setNewRequestedNeed(null);
    }
  }, [isCalculationPending()]);

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const itemsQuantity = useMemo(() => (availableVariants || []).length, [availableVariants?.length]);
  const hasMany = useMemo(() => itemsQuantity > 1, [itemsQuantity]);

  const RequestedNeedComponent = (
    <RequestedNeed
      hasMany={hasMany}
      isDrawerOpen={isDrawerOpen}
      setDrawerOpen={setDrawerOpen}
      isRecalculating={isCalculationPending()}
      setSubmitting={setSubmitting}
      requestedNeed={availableVariants?.[0] as AvailableVariant}
      setNewRequestedNeed={setNewRequestedNeed}
      recalculationError={onCalculationFail((error) => error.message) as string | undefined}
    />
  );

  return (
    <Layout>
      <ErrorBoundary>
        {
          onCategoryPending<ReactElement>(() => {
            return (
              <Flex margin={{ top: 'large' }} alignment={{ horizontal: 'center' }}>
                <Spinner delay={500} />
              </Flex>
            );
          }) as ReactElement
        }

        {
          onCategorySuccess(({ category }) => {
            if (requestedNeed && availableVariants) {
              return (
                <CalculationContextProvider category={category} requestedNeed={requestedNeed as StoreRequestedNeed}>
                  <FadeIn>
                    <ItemsLayout itemsQuantity={itemsQuantity}>
                      {hasMany ? (
                        <Styled.Wrapper alignment={{ horizontal: isXl ? 'center' : 'start' }}>
                          {RequestedNeedComponent}

                          <Items availableVariants={availableVariants} />
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
              );
            }

            return (
              <Container>
                <Flex margin={{ top: 'large' }} alignment={{ horizontal: 'center' }}>
                  <Text color="negative">
                    Нажаль, Ви ще не проводили <Link to={`/categories/${categoryId}/${version}`}>розрахунків</Link> для
                    цієї категорії ☹️
                  </Text>
                </Flex>
              </Container>
            );
          }) as ReactElement
        }

        {onCategoryFail(() => <ErrorPage />) as ReactElement}
      </ErrorBoundary>
    </Layout>
  );
};

export default CalculationResult;
