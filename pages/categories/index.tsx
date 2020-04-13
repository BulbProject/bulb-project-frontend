import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Text, Flex, Cell, Placeholder, Button } from 'ustudio-ui';

import Styled from '../../styles/categories';
import Classification from '../../components/Classification';
import { requestData } from '../../utils';
import { CategoryCard, CategoriesListEntity, CategoryVersion, CategoryCardData } from '../../types/data';
import { getCategoriesConfig, getCategoryVersionConfig } from '../../config';
import { RequestError } from '../../types';

const Categories: NextPage<{ categoriesList?: CategoriesListEntity[]; error?: RequestError }> = ({
  categoriesList = [],
  error,
}) => {
  const [fullCategories, setFullCategories] = useState([] as CategoryCard[]);
  const [loading, setLoading] = useState(false);
  const { reload } = useRouter();

  const getRandomWidth = () => {
    return `${Math.floor(Math.random() * (100 - 25)) + 25}%`;
  };

  const getCategory = async (id: string, version: string) => {
    const { data: categoryVersion, error } = await requestData<CategoryVersion>(getCategoryVersionConfig(id, version));

    return { id, version, categoryVersion, error };
  };

  const transformCategoryData: ({
    version,
    category: { id, title, description, classification },
  }: CategoryVersion) => CategoryCardData = ({ version, category: { id, title, description, classification } }) => ({
    id,
    title,
    description,
    classification,
    version,
  });

  const getFullCategoriesInfo = async () => {
    setLoading(true);

    const categoriesListPromises = categoriesList?.map(async category => {
      return await getCategory(category.id, category.version);
    });

    Promise.all(categoriesListPromises)
      .then((responses: { id: string; version: string; categoryVersion?: CategoryVersion; error?: RequestError }[]) => {
        const transformedCategories = responses.reduce((fullInfoCategories: CategoryCard[], responseData) => {
          if (!responseData.categoryVersion)
            return [
              ...fullInfoCategories,
              {
                id: responseData.id,
                version: responseData.version,
                error: responseData.error,
              },
            ];

          return [
            ...fullInfoCategories,
            {
              id: responseData.id,
              version: responseData.version,
              data: transformCategoryData(responseData.categoryVersion),
            },
          ];
        }, []);

        setFullCategories(transformedCategories);
      })
      .catch((err: RequestError) => console.log(err))
      .finally(() => setLoading(false));
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

              {loading &&
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

              {!loading &&
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
  const { data: categoriesList, error } = await requestData<CategoriesListEntity[]>(getCategoriesConfig());

  return { categoriesList, error };
};

export default Categories;
