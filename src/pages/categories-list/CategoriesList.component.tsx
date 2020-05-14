import React, { useEffect, useState } from 'react';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import Spinner from 'ustudio-ui/components/Spinner';

import { motion } from 'framer-motion';

import { getCategoriesConfig } from 'config';
import { useRequest } from 'hooks';

import { ErrorBoundary, FadeIn } from 'components';
import { Container } from 'shared';

import { CategoriesListEntity } from 'types/data';

import { Card, Error } from './modules';

import Styled from './CategoriesList.styles';
import { getCategory, sortCategories } from './CategoriesList.module';
import { CategoryCard } from './CategoriesList.types';

const CategoriesList = () => {
  const [fullCategories, setFullCategories] = useState([] as CategoryCard[]);
  const [isLoading, setLoading] = useState(true);

  const { data: categoriesList, error: listError, triggerRequest: triggerList } = useRequest<CategoriesListEntity[]>(
    getCategoriesConfig()
  );

  const getFullCategoriesInfo = async () => {
    setLoading(true);

    const categoriesPromises = categoriesList?.map((_cat) => {
      const category = getCategory(_cat.id, _cat.version);

      return category;
    });

    if (categoriesPromises?.length) {
      Promise.all(categoriesPromises)
        .then((resolvedCategories) => {
          setFullCategories(resolvedCategories);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const reloadItem = (id: string, version: string) => {
    const category = getCategory(id, version);

    Promise.resolve(category).then(({ categoryVersion }) => {
      if (categoryVersion) {
        const filteredCategories = fullCategories.filter((_cat) => _cat.id !== id);
        setFullCategories([
          ...filteredCategories,
          {
            id,
            version,
            categoryVersion,
          },
        ]);
      }
    });
  };

  useEffect(() => {
    if (categoriesList) {
      getFullCategoriesInfo();
    }
  }, [categoriesList]);

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

        {!isLoading && (
          <FadeIn>
            <Flex direction="column">
              <Flex margin={{ bottom: 'large' }}>
                <Text variant="h1">Виберіть категорію для проведення розрахунків</Text>
              </Flex>

              {!fullCategories?.length && <Text variant="h3">Тут ще немає категорій</Text>}

              {sortCategories(fullCategories)?.map((category, index) => (
                <motion.div
                  key={category.id}
                  variants={{
                    visible: { opacity: 1, x: 0 },
                    hidden: { opacity: 0, x: (index + 1) * -10 },
                  }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card
                    version={category.version}
                    category={category.categoryVersion}
                    error={category.error}
                    reload={() => reloadItem(category.id, category.version)}
                  />
                </motion.div>
              ))}
            </Flex>
          </FadeIn>
        )}

        {!isLoading && listError && (
          <FadeIn>
            <Error reloadCategories={triggerList} />
          </FadeIn>
        )}
      </Container>
    </ErrorBoundary>
  );
};

export default CategoriesList;
