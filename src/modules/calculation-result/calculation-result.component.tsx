import React, { FC, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';

import { useMedia } from 'shared/hooks';
import { ErrorBoundary, Container, Loader, Fade } from 'shared/components';
import { useCalculation } from 'shared/context/calculation';
import { useCategory } from 'core/context/category-provider';
import FilterIcon from '../../assets/icons/filter.inline.svg';

import { Layout } from './layout';

import Styled from './calculation-result.styles';

const CalculationResult: FC = () => {
  const isLg = useMedia('screen and (min-width: 832px)');
  const [isLoading, setLoading] = useState(true);

  const { t } = useTranslation('calculation-result');

  const { calculationData, calculationPayload, dispatch } = useCalculation();

  const { availableVariants, requestedVariant } = calculationData ?? {};
  const itemsQuantity = useMemo(() => (availableVariants ?? []).length, [availableVariants?.length]);
  const hasMany = useMemo(() => itemsQuantity > 1, [itemsQuantity]);

  const {
    category: { id: categoryId },
    version,
  } = useCategory();

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const sessionStorageData = sessionStorage.getItem(`${categoryId}/${version}`);

    if (sessionStorageData) {
      const parsedData = JSON.parse(sessionStorageData);

      dispatch.addCalculationPayload(parsedData.payload);
      dispatch.addCalculationData(parsedData.response);
    }
    setLoading(false);
  }, []);

  return (
    <Fade>
      <ErrorBoundary>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {calculationPayload && availableVariants && (
              <>
                <Layout
                  itemsQuantity={itemsQuantity}
                  hasMany={hasMany}
                  availableVariants={availableVariants}
                  requestedVariant={requestedVariant}
                  isDrawerOpen={isDrawerOpen}
                  setDrawerOpen={setDrawerOpen}
                />

                {!isLg() && (
                  <Styled.MobileFilterButton onClick={() => setDrawerOpen(!isDrawerOpen)}>
                    <FilterIcon />
                  </Styled.MobileFilterButton>
                )}
              </>
            )}

            {(!calculationPayload || !availableVariants) && (
              <Container>
                <Flex margin={{ top: 'large' }} alignment={{ horizontal: 'center' }}>
                  <Text color="negative">
                    {t('no-calculation-start')}
                    <Link to={`/categories/${categoryId}/${version}`}>{t('no-calculation-middle')}</Link>
                    {t('no-calculation-end')}☹️
                  </Text>
                </Flex>
              </Container>
            )}
          </>
        )}
      </ErrorBoundary>
    </Fade>
  );
};

export default CalculationResult;
