import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { css } from 'styled-components';

import Text from 'ustudio-ui/components/Text';
import Spinner from 'ustudio-ui/components/Spinner';
import Flex from 'ustudio-ui/components/Flex';
import Drawer from 'ustudio-ui/components/Drawer';
import Button from 'ustudio-ui/components/Button';
import useMediaQuery from 'ustudio-ui/hooks/use-media-query';

import { Layout, CategoryHeader, ErrorBoundary, FadeIn, ErrorPage } from 'components';
import { Container } from 'shared';

import type { AvailableVariant, CategoryVersion, RequestedNeed as RequestedNeedType } from 'types/data';
import { getCategoryVersionConfig, postCalculationConfig } from 'config';
import { useRequest } from 'hooks';

import type { StoreRequestedNeed } from 'types/globals';
import { prepareRequestedNeed } from 'utils';
import FilterIcon from '../../assets/icons/filter.inline.svg';

import { Filter } from './modules/Filter';
import { Items } from './modules/Items';

import { CalculationContextProvider } from './store';
import Styled from './CalculationResult.styles';

const CalculationResult: React.FC = () => {
  const isXl = useMediaQuery('screen and (min-width: 1154px)');

  const { categoryId, version } = useParams();

  const [isSubmitting, setSubmitting] = useState(false);
  const [requestedNeed, setRequestedNeed] = useState<StoreRequestedNeed | null>(null);
  const [newRequestedNeed, setNewRequestedNeed] = useState<StoreRequestedNeed | null>(null);
  const [availableVariants, setAvailableVariants] = useState<AvailableVariant[] | null>([]);

  const { data: categoryVersion, isLoading, error } = useRequest<CategoryVersion>(
    getCategoryVersionConfig(categoryId as string, version as string)
  );

  const { category: { title, description, classification } = {} } = categoryVersion || ({} as CategoryVersion);

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

  return (
    <Layout>
      <ErrorBoundary>
        <FadeIn>
          {categoryVersion && requestedNeed && <CategoryHeader {...{ title, description, classification }} />}

          {requestedNeed && categoryVersion && !isLoading && !error ? (
            <CalculationContextProvider
              category={categoryVersion.category}
              requestedNeed={requestedNeed as StoreRequestedNeed}
            >
              <Styled.Wrapper alignment={{ horizontal: 'center' }}>
                <Styled.RequestedNeed alignment={{ horizontal: 'space-between' }}>
                  <Text variant="h3">Те, що Ви шукали</Text>

                  <Styled.FilterButton
                    appearance="text"
                    onClick={() => setDrawerOpen(!isDrawerOpen)}
                    iconAfter={<FilterIcon />}
                  >
                    Змінити умови
                  </Styled.FilterButton>

                  <Drawer
                    isOpen={isDrawerOpen}
                    onChange={() => setDrawerOpen(false)}
                    showOverlay
                    position="left"
                    styled={{
                      Drawer: css`
                        z-index: var(--l-topmost);
                      `,
                      Overlay: css`
                        background-color: var(--c-darkest);

                        z-index: calc(var(--l-topmost) - 1);
                      `,
                    }}
                  >
                    <Filter
                      error={recalculationError?.message}
                      isLoading={isRecalculating}
                      setSubmitting={setSubmitting}
                      recalculate={(state) => {
                        setNewRequestedNeed(state);
                        setDrawerOpen(false);
                      }}
                    />
                  </Drawer>
                </Styled.RequestedNeed>

                {/* {availableVariants ? (
                  <Items availableVariants={availableVariants} />
                ) : (
                  <Text>Відсутні можливі варіанти</Text>
                )} */}
              </Styled.Wrapper>
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
    </Layout>
  );
};

export default CalculationResult;
