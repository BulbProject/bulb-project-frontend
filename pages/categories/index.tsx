import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { Text, Flex, Cell, Placeholder, Button } from 'ustudio-ui';

import Styled from '../../styles/categories';
import Classification from '../../components/Classification';
import { requestData } from '../../utils';
import { CategoryCard, ShortCategoryInfo, CategoryVersion } from '../../types/data';
import { getCategoriesConfig, getCategoryVersionConfig } from '../../config';
import { RequestError } from '../../types';
import { useRouter } from 'next/router';

const Categories: NextPage<{ categoriesList?: ShortCategoryInfo[]; error?: RequestError }> = ({
  categoriesList = [],
  error,
}) => {
  const [fullCategories, setFullCategories] = useState([] as CategoryCard[]);
  const [isLoading, setIsLoading] = useState(false);
  const { reload } = useRouter();

  const getRandomWidth = () => {
    return `${Math.floor(Math.random() * (100 - 25)) + 25}%`;
  };

  const getCategory = async (id: string, version: string) => {
    const { data: categoryVersion, error } = await requestData<CategoryVersion>(getCategoryVersionConfig(id, version));

    return { id, version, categoryVersion, error };
  };

  const transformCategoryData = (categoryVersion: CategoryVersion) => ({
    id: categoryVersion.category.id,
    title: categoryVersion.category.title,
    description: categoryVersion.category.description,
    classification: categoryVersion.category.classification,
    version: categoryVersion.version,
  });

  const getFullCategoriesInfo = async () => {
    setIsLoading(true);

    const promises = categoriesList?.map(async _cat => {
      return await getCategory(_cat.id, _cat.version);
    });

    Promise.all(promises)
      .then((responses: { id: string; version: string; categoryVersion?: CategoryVersion; error?: RequestError }[]) => {
        const transformedCategories = responses.reduce((accCat: CategoryCard[], resData) => {
          if (!resData.categoryVersion)
            return [
              ...accCat,
              {
                id: resData.id,
                version: resData.version,
                error: resData.error,
              },
            ];

          return [
            ...accCat,
            {
              id: resData.id,
              version: resData.version,
              data: transformCategoryData(resData.categoryVersion),
            },
          ];
        }, []);

        setFullCategories(transformedCategories);

      })
      .catch((err: RequestError) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const reloadItem = (id: string, version: string) => {
    const category = getCategory(id, version);

    Promise.resolve(category).then(resData => {
      if (resData.categoryVersion) {
        const filteredCategories = fullCategories.filter(_cat => _cat.id !== id);
        setFullCategories([
          ...filteredCategories,
          {
            id,
            version,
            data: transformCategoryData(resData.categoryVersion),
          },
        ]);
      }
    });
  };

  useEffect(() => {
    getFullCategoriesInfo();
  }, []);

  return (
    <Styled.Wrapper>
      <Styled.Container isContainer>
        <Cell xs={{ offset: { before: 2, after: 2 }, size: 8 }}>
          {error ? (
            <Flex direction="column" alignment={{ horizontal: 'center' }}>
              <Text>Sorry, we could not get categories list to load.</Text>
              <Styled.ButtonContainer alignment={{ horizontal: 'center' }}>
                <Button intent="positive" onClick={() => reload()}>
                  Try again
                </Button>
              </Styled.ButtonContainer>
            </Flex>
          ) : (
            <Flex direction="column">
              <Styled.ListTitle variant="h1">Categories</Styled.ListTitle>
              {!categoriesList?.length && <Text variant="h3">No categories</Text>}

              {isLoading &&
                categoriesList?.map((category, categoryIndex) => (
                  <Styled.BaseCard key={categoryIndex} direction="column">
                    <Styled.StubTitle
                      appearance={{
                        height: 'h5',
                        width: getRandomWidth(),
                      }}
                      variant="text"
                    />
                    <Styled.StubDescription
                      appearance={{
                        height: 'small',
                        width: getRandomWidth(),
                      }}
                      variant="text"
                    />
                    <Flex>
                      <Placeholder
                        appearance={{
                          height: 'small',
                          width: '52px',
                        }}
                        variant="text"
                      />
                      <Styled.StubClassificationDescription
                        appearance={{
                          height: 'small',
                          width: getRandomWidth(),
                        }}
                        variant="text"
                      />
                    </Flex>
                  </Styled.BaseCard>
                ))}

              {!isLoading &&
                fullCategories?.map(category =>
                  category?.data ? (
                    <Link
                      key={`${category.id}-${category.version}`}
                      href={`/categories/${category.data.id}/${category.data.version}`}
                      passHref
                    >
                      <Styled.Link>
                        <Styled.Card direction="column">
                          <Styled.CardTitle variant="h5">{category.data.title}</Styled.CardTitle>
                          <Styled.CardDescription variant="small">{category.data.description}</Styled.CardDescription>
                          <Classification
                            id={category.data.classification.id}
                            description={category.data.classification.description}
                          />
                        </Styled.Card>
                      </Styled.Link>
                    </Link>
                  ) : (
                    <Styled.BaseCard alignment={{ horizontal: 'center' }} key={`${category.id}-${category.version}`}>
                      <button onClick={() => reloadItem(category.id, category.version)}>
                        <Styled.ReloadIcon />
                      </button>
                    </Styled.BaseCard>
                  )
                )}
            </Flex>
          )}
        </Cell>
      </Styled.Container>
    </Styled.Wrapper>
  );
};

Categories.getInitialProps = async () => {
  const { data: shortCategories, error } = await requestData<ShortCategoryInfo[]>(getCategoriesConfig());

  return { categoriesList: shortCategories, error };
};

export default Categories;
