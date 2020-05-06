import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Text from 'ustudio-ui/components/Text';
import Spinner from 'ustudio-ui/components/Spinner';
import Flex from 'ustudio-ui/components/Flex';

import { CategoryHeader, ErrorBoundary, FadeIn } from 'components';
import { Container } from 'shared';
import { CategoryVersion, RequestedNeed } from 'types/data';
import { getCategoryVersionConfig } from 'config';
import { useRequest } from 'hooks';
import { ErrorPage } from '../../components/ErrorPage';

const CalculationResult: React.FC = () => {
  const { categoryId, version } = useParams();

  // proper typings will come with the proper response
  const [calculationData, setCalculationData] = useState<RequestedNeed | null>(null);

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

        <Container>
          <Flex margin={{ top: 'large' }} alignment={{ horizontal: 'center' }}>
            {calculationData && categoryVersion && !isLoading && !error && (
              <Text variant="code">{JSON.stringify(calculationData, null, 2)}</Text>
            )}

            {isLoading && <Spinner delay={500} />}

            {(!calculationData || !categoryVersion) && !isLoading && (
              <Text color="negative">
                Нажаль, Ви ще не проводили <Link to={`/categories/${categoryId}/${version}`}>розрахунків</Link> для цієї
                категорії ☹️
              </Text>
            )}

            {error && !isLoading && <ErrorPage />}
          </Flex>
        </Container>
      </FadeIn>
    </ErrorBoundary>
  );
};

export default CalculationResult;
