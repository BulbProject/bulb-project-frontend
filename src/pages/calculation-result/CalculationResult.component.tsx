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
import { useRequest } from 'honks';
import axios from 'axios';

import type { StoreRequestedNeed } from 'types/globals';
import { prepareRequestedNeed } from 'utils';
import FilterIcon from '../../assets/icons/filter.inline.svg';
import { maxWidth } from './CalculationResult.module';

import { Items, ItemsLayout } from './modules';
import { RequestedNeed } from './modules/RequestedNeed';

import { CalculationContextProvider } from './store';
import Styled from './CalculationResult.styles';
//TODO: @drizzer14 look at component
const CalculationResult: React.FC = () => {
  const isLg = useMediaQuery('screen and (min-width: 832px)');
  const isXl = useMediaQuery(`screen and (min-width: ${maxWidth}px)`);

  const { categoryId, version } = useParams();

  const [isSubmitting, setSubmitting] = useState(false);
  const [requestedNeed, setRequestedNeed] = useState<StoreRequestedNeed | null>(null);
  const [newRequestedNeed, setNewRequestedNeed] = useState<StoreRequestedNeed | null>(null);
  const [availableVariants, setAvailableVariants] = useState<AvailableVariant[] | null>(null);

  const { isSuccess, isFail, onPending, onFail, result, sendRequest } = useRequest<CategoryVersion>(async () => {
    const { data } = await axios(getCategoryVersionConfig(categoryId as string, version as string));

    return data;
  });

  const {
    isPending: isRecalculationPending,
    onFail: onRecalculationFail,
    isFail: isRecalculationFailed,
    sendRequest: recalculate,
    result: calculationResponse,
  } = useRequest<{ availableVariants: AvailableVariant[]; category: string; version: string }>(async () => {
    const { data } = await axios(
      postCalculationConfig(categoryId as string, version as string, {
        requestedNeed: newRequestedNeed ? prepareRequestedNeed(newRequestedNeed) : ({} as RequestedNeedType),
      })
    );

    return data;
  });

  const categoryVersion = isSuccess(result) ? result.data : null;

  useEffect(() => {
    if (!availableVariants) {
      (async () => {
        await sendRequest();
        await recalculate();
      })();
    }
  }, []);

  useEffect(() => {
    if (isSubmitting && Boolean(newRequestedNeed)) {
      (async () => {
        await recalculate();

        setSubmitting(false);
      })();
    }
  }, [newRequestedNeed, isSubmitting, Boolean(newRequestedNeed)]);

  useEffect(() => {
    if (!isRecalculationPending && !isRecalculationFailed(calculationResponse) && newRequestedNeed) {
      sessionStorage.setItem(
        `${categoryId}/${version}`,
        JSON.stringify({
          payload: newRequestedNeed,
          response: calculationResponse,
        })
      );
      setRequestedNeed(newRequestedNeed);
      // availableVariants are supposed to be defined in here
      // @ts-ignore
      setAvailableVariants(calculationResponse?.availableVariants);

      setNewRequestedNeed(null);
    }
  }, [isRecalculationPending]);

  useEffect(() => {
    const sessionStorageData = sessionStorage.getItem(`${categoryId}/${version}`);

    if (sessionStorageData) {
      const parsedData = JSON.parse(sessionStorageData);

      setRequestedNeed(parsedData.payload);
      setAvailableVariants(parsedData.response.availableVariants);
    }
  }, []);

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const itemsQuantity = useMemo(() => (availableVariants || []).length, [availableVariants?.length]);
  const hasMany = useMemo(() => itemsQuantity > 1, [itemsQuantity]);

  const RequestedNeedComponent = (
    <RequestedNeed
      hasMany={hasMany}
      isDrawerOpen={isDrawerOpen}
      setDrawerOpen={setDrawerOpen}
      isRecalculating={isRecalculationPending()}
      setSubmitting={setSubmitting}
      category={categoryVersion?.category as Category}
      requestedNeed={availableVariants?.[0] as AvailableVariant}
      setNewRequestedNeed={setNewRequestedNeed}
      recalculationError={onRecalculationFail((error) => error.message) as string | undefined}
    />
  );

  return (
    <Layout>
      <ErrorBoundary>
        {requestedNeed && categoryVersion && availableVariants && !isFail(result) ? (
          <CalculationContextProvider
            category={categoryVersion.category}
            requestedNeed={requestedNeed as StoreRequestedNeed}
          >
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
        ) : (
          <Container>
            <Flex margin={{ top: 'large' }} alignment={{ horizontal: 'center' }}>
              {onPending(() => (
                <Spinner delay={500} />
              ))}

              {!requestedNeed && !isFail(result) && (
                <Text color="negative">
                  Нажаль, Ви ще не проводили <Link to={`/categories/${categoryId}/${version}`}>розрахунків</Link> для
                  цієї категорії ☹️
                </Text>
              )}

              {onFail(() => (
                <ErrorPage />
              ))}
            </Flex>
          </Container>
        )}
      </ErrorBoundary>
    </Layout>
  );
};

export default CalculationResult;
