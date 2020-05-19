import React, { useEffect, useState } from 'react';

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
import { getCategory, sortCategories } from './CategoriesList.module';
import { CategoryCard } from './CategoriesList.types';
import { CardLayout } from './modules/CardLayout';

const CategoriesList = () => {
  const [fullCategories, setFullCategories] = useState([] as CategoryCard[]);
  const [isLoading, setLoading] = useState(true);

  const { data: categoriesList, error: listError, triggerRequest } = useRequest<CategoriesListEntity[]>(
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

  const hardcodedCards = [
    {
      id: 1,
      title: 'Електричні лампи внутрішнього освітлення',
      description:
        'Основними вимогами, що ставляться до сучасного освітлення є наступні: забезпечення найкращих умов зорової роботи, керування освітленням безпосередньо із робочого місця, енергоефективність, енергозбереження протягом усього періоду експлуатації, мінімізація шкоди навколишньому середовищу.',
      status: 'active',
      image: 'https://allkharkov.ua/img/news_cont/news10/2018-05-08_10_solar.jpg',
    },
    {
      id: 2,
      title: 'Електричні лампи внутрішнього освітлення',
      description:
        'Основними вимогами, що ставляться до сучасного освітлення є наступні: забезпечення найкращих умов зорової роботи, керування освітленням безпосередньо із робочого місця, енергоефективність, енергозбереження протягом усього періоду експлуатації, мінімізація шкоди навколишньому середовищу.',
      status: 'active',
      image: 'https://allkharkov.ua/img/news_cont/news10/2018-05-08_10_solar.jpg',
    },
    {
      id: 3,
      title: 'Електричні лампи внутрішнього освітлення',
      description:
        'Основними вимогами, що ставляться до сучасного освітлення є наступні: забезпечення найкращих умов зорової роботи, керування освітленням безпосередньо із робочого місця, енергоефективність, енергозбереження протягом усього періоду експлуатації, мінімізація шкоди навколишньому середовищу.',
      status: 'active',
      image: 'https://allkharkov.ua/img/news_cont/news10/2018-05-08_10_solar.jpg',
    },
    {
      id: 4,
      title: 'Електричні лампи внутрішнього освітлення',
      description:
        'Основними вимогами, що ставляться до сучасного освітлення є наступні: забезпечення найкращих умов зорової роботи, керування освітленням безпосередньо із робочого місця, енергоефективність, енергозбереження протягом усього періоду експлуатації, мінімізація шкоди навколишньому середовищу.',
      status: 'active',
      image: 'https://allkharkov.ua/img/news_cont/news10/2018-05-08_10_solar.jpg',
    },
    {
      id: 5,
      title: 'Електричні лампи внутрішнього освітлення',
      description:
        'Основними вимогами, що ставляться до сучасного освітлення є наступні: забезпечення найкращих умов зорової роботи, керування освітленням безпосередньо із робочого місця, енергоефективність, енергозбереження протягом усього періоду експлуатації, мінімізація шкоди навколишньому середовищу.',
      status: 'active',
      image: 'https://allkharkov.ua/img/news_cont/news10/2018-05-08_10_solar.jpg',
    },
    {
      id: 6,
      title: 'Електричні лампи внутрішнього освітлення',
      description:
        'Основними вимогами, що ставляться до сучасного освітлення є наступні: забезпечення найкращих умов зорової роботи, керування освітленням безпосередньо із робочого місця, енергоефективність, енергозбереження протягом усього періоду експлуатації, мінімізація шкоди навколишньому середовищу.',
      status: 'active',
      image: 'https://allkharkov.ua/img/news_cont/news10/2018-05-08_10_solar.jpg',
    },
    {
      id: 7,
      title: 'Електричні лампи внутрішнього освітлення',
      description:
        'Основними вимогами, що ставляться до сучасного освітлення є наступні: забезпечення найкращих умов зорової роботи, керування освітленням безпосередньо із робочого місця, енергоефективність, енергозбереження протягом усього періоду експлуатації, мінімізація шкоди навколишньому середовищу.',
      status: 'active',
      image: 'https://allkharkov.ua/img/news_cont/news10/2018-05-08_10_solar.jpg',
    },
    {
      id: 8,
      title: 'Електричні лампи внутрішнього освітлення',
      description:
        'Основними вимогами, що ставляться до сучасного освітлення є наступні: забезпечення найкращих умов зорової роботи, керування освітленням безпосередньо із робочого місця, енергоефективність, енергозбереження протягом усього періоду експлуатації, мінімізація шкоди навколишньому середовищу.',
      status: 'active',
      image: 'https://allkharkov.ua/img/news_cont/news10/2018-05-08_10_solar.jpg',
    },
  ];

  return (
    <Layout>
      <ErrorBoundary>
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
              {!fullCategories?.length && <Text variant="h3">Тут ще немає категорій</Text>}

              <Styled.Grid>
                <Styled.BigCell>
                  <Styled.CategoriesHeader>
                    <Text variant="h1" styled={{ Text: { fontWeight: 400 } }}>
                      Виберіть категорію для проведення розрахунків
                    </Text>
                  </Styled.CategoriesHeader>
                </Styled.BigCell>
                {hardcodedCards.map((card, cardIndex) => (
                  <CardLayout cardIndex={cardIndex} image={card.image}>
                    <Card categoryVersion={{ ...card }} version="v1" reload={() => {}} cardIndex={cardIndex} />
                  </CardLayout>
                ))}
              </Styled.Grid>
            </Flex>
          </FadeIn>
        )}

        {!isLoading && listError && (
          <FadeIn>
            <Error reloadCategories={triggerRequest} />
          </FadeIn>
        )}
      </ErrorBoundary>
    </Layout>
  );
};

export default CategoriesList;
