import React from 'react';
import { NextPage } from 'next';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Link from 'next/link';
import { Text, Flex, Cell } from 'ustudio-ui';

import Styled from './../styles/categories';
import { log } from 'util';

export const baseURL = 'http://185.25.116.133:8989';

const getCategoriesConfig = (): AxiosRequestConfig => ({
  method: 'get',
  url: `${baseURL}/categories`,
});
const getCategoryConfig = (id: string, version: string): AxiosRequestConfig => ({
  method: 'get',
  url: `${baseURL}/categories/${id}/${version}`,
});

interface ShortCategoryInfo {
  id: string;
  version: string;
  date: string;
}

interface CategoryCard {
  id: string;
  title: string;
  description: string;
  version: string;
  classification: {
    scheme: string;
    id: string;
    description: string;
  };
}

const Categories: NextPage<{ categories?: CategoryCard[]; error?: string }> = ({ categories, error }) => {
  return (
    <Styled.Wrapper>
      <Styled.Container isContainer>
        <Cell xs={{ offset: { before: 2, after: 2 }, size: 8 }}>
          <Flex direction="column">
            <Styled.ListTitle variant="h1">Categories</Styled.ListTitle>
            {!categories?.length && <Text variant="h3">No categories</Text>}

            {categories?.map(category => (
              <Link key={category.id} href={`/categories/${category.id}/${category.version}`} passHref>
                <Styled.Link>
                  <Styled.Card key={category.id} direction="column">
                    <Styled.CardTitle variant="h5">{category.title}</Styled.CardTitle>
                    <Styled.CardDescription variant="small">{category.description}</Styled.CardDescription>
                    <Flex alignment={{ vertical: 'center' }}>
                      <Styled.ClassificationId variant="small">{category.classification.id}</Styled.ClassificationId>
                      <Styled.ClassificationDescription variant="small">
                        {category.classification.description}
                      </Styled.ClassificationDescription>
                    </Flex>
                  </Styled.Card>
                </Styled.Link>
              </Link>
            ))}
          </Flex>
        </Cell>
      </Styled.Container>
    </Styled.Wrapper>
  );
};

Categories.getInitialProps = async () => {
  try {
    const { data }: AxiosResponse<ShortCategoryInfo[]> = await axios(getCategoriesConfig());

    const promises = data.map(async _cat => {
      const category: AxiosResponse<any> = await axios(getCategoryConfig(_cat.id, _cat.version));

      return category?.data;
    });
    const categories = await Promise.all(promises);

    const transformedCategories = categories.map(_cat => ({
      id: _cat.category.id,
      title: _cat.category.title,
      description: _cat.category.description,
      classification: _cat.category.classification,
      version: _cat.version,
    }));

    return { categories: transformedCategories };
  } catch (error) {
    return { error: error.message };
  }
};

export default Categories;
