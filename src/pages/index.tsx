import React from 'react';
import { Text, Flex, Spinner } from 'ustudio-ui';

import { motion } from 'framer-motion';

import { getCategoriesConfig } from 'config';
import { useRequest } from 'hooks';

import Card from 'components/Categories/Cards/Card';
import Error from 'components/Categories/error';
import Container from 'components/Container';
import ErrorBoundary from 'components/ErrorBoundary';
import FadeIn from 'components/FadeIn';

import { CategoriesListEntity } from 'types/data';

import Styled from '../styles/categories';

const Categories = () => {
  const { data: categoriesList, error, isLoading, triggerRequest } = useRequest<CategoriesListEntity[]>(
    getCategoriesConfig()
  );

  return (
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
              <Styled.ListTitle variant="h1">Select category for future calculation</Styled.ListTitle>

              {!categoriesList?.length && <Text variant="h3">There are no categories yet</Text>}

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
  );
};

export default Categories;
