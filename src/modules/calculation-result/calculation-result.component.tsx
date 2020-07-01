import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';
import { useMedia } from 'shared/hooks';

import { ErrorBoundary, Container, Loader, Fade } from 'shared/components';
import type { AvailableVariant } from 'shared/entity/data';
import { useCalculation } from 'shared/context/calculation';
import { useCategory } from 'core/context/category-provider';
import FilterIcon from '../../assets/icons/filter.inline.svg';

import { Items } from './items';
import { ItemsLayout } from './items-layout';
import { RequestedNeed } from './requested-need';
import layoutConfig from './layout.config';
import Styled from './calculation-result.styles';

const CalculationResult: React.FC = () => {
  const isLg = useMedia('screen and (min-width: 832px)');
  const isXl = useMedia(`screen and (min-width: ${layoutConfig.maxWidth}px)`);

  const [isLoading, setLoading] = useState(true);

  const { calculationData: availableVariants, calculationPayload, dispatch } = useCalculation();

  const {
    category: { id: categoryId },
    version,
  } = useCategory();

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const itemsQuantity = useMemo(() => (availableVariants ?? []).length, [availableVariants?.length]);
  const hasMany = useMemo(() => itemsQuantity > 1, [itemsQuantity]);

  useEffect(() => {
    const sessionStorageData = sessionStorage.getItem(`${categoryId}/${version}`);

    if (sessionStorageData) {
      const parsedData = JSON.parse(sessionStorageData);

      dispatch.addCalculationPayload(parsedData.payload);
      dispatch.addCalculationData(parsedData.response.availableVariants);
    }
    setLoading(false);
  }, []);

  const RequestedNeedComponent = (
    <RequestedNeed
      hasMany={hasMany}
      isDrawerOpen={isDrawerOpen}
      setDrawerOpen={setDrawerOpen}
      requestedNeed={availableVariants?.[0] as AvailableVariant}
    />
  );

  return (
    <Fade>
      <ErrorBoundary>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {calculationPayload && availableVariants && (
              <>
                <ItemsLayout itemsQuantity={itemsQuantity}>
                  {hasMany ? (
                    <Styled.Wrapper alignment={{ horizontal: isXl() ? 'center' : 'start' }}>
                      {RequestedNeedComponent}

                      <Items availableVariants={availableVariants} />
                    </Styled.Wrapper>
                  ) : (
                    <Container>{RequestedNeedComponent}</Container>
                  )}
                </ItemsLayout>

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
                    Нажаль, Ви ще не проводили <Link to={`/categories/${categoryId}/${version}`}>розрахунків</Link> для
                    цієї категорії ☹️
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
