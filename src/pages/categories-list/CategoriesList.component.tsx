import React from 'react';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import Spinner from 'ustudio-ui/components/Spinner';

import { motion } from 'framer-motion';

import { getCategoriesConfig } from 'config';
import { useRequest } from 'hooks';

import { ErrorBoundary, FadeIn, Layout } from 'components';
import { Container } from 'shared';

import { CategoriesListEntity } from 'types/data';

import { Card, Error } from './modules';

import Styled from './CategoriesList.styles';

const CategoriesList = () => {
  const { data: categoriesList, error, isLoading, triggerRequest } = useRequest<CategoriesListEntity[]>(
    getCategoriesConfig()
  );

  return (
    <Layout>
      <ErrorBoundary>
        <Container>
          {isLoading && (
            <FadeIn>
              <Styled.LoaderContainer>
                <Spinner appearance={{ size: 64 }} delay={300} />
              </Styled.LoaderContainer>
            </FadeIn>
          )}

          {!isLoading && categoriesList && (
            <FadeIn>
              <Flex direction="column">
                <Flex margin={{ bottom: 'large' }}>
                  <Text variant="h1">Виберіть категорію для проведення розрахунків</Text>
                </Flex>

                {!categoriesList?.length && <Text variant="h3">Тут ще немає категорій</Text>}

                {categoriesList?.map((category, index) => (
                  <motion.div
                    key={category.id}
                    variants={{
                      visible: { opacity: 1, x: 0 },
                      hidden: { opacity: 0, x: (index + 1) * -10 },
                    }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Card {...category} />
                  </motion.div>
                ))}
              </Flex>
            </FadeIn>
          )}

          {!isLoading && error && (
            <FadeIn>
              <Error reloadCategories={triggerRequest} />
            </FadeIn>
          )}
        </Container>
      </ErrorBoundary>
    </Layout>
  );
};

export default CategoriesList;
