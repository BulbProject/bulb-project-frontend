import { NextPage } from 'next';
import React, { useState } from 'react';

import { Alert, Cell, Flex, Text } from 'ustudio-ui';

import { getCategoryVersionConfig } from '../../../../config';
import { CategoryVersion } from '../../../../types';
import { requestData } from '../../../../utils';

import Styled from './styles';

const CategoryPage: NextPage<{ categoryVersion?: CategoryVersion; error?: string }> = ({
  categoryVersion = {},
  error,
}) => {
  const [isAlertOpen, setAlertOpen] = useState(!!error);

  const { category: { title, description, classification } = {} } = categoryVersion;

  return (
    <Styled.Container>
      <Cell xs={{ offset: { before: 2, after: 2 }, size: 8 }}>
        {error && !categoryVersion ? (
          <Alert
            isOpen={isAlertOpen}
            onChange={() => setAlertOpen(false)}
            verticalPosition="top"
            horizontalPosition="center"
          >
            {error}
          </Alert>
        ) : (
          <Flex direction="column">
            <Text variant="h3">{title}</Text>

            {description && <Styled.CategoryDescription variant="small">{description}</Styled.CategoryDescription>}

            <Styled.Classification id={classification?.id} description={classification?.description} />
          </Flex>
        )}
      </Cell>
    </Styled.Container>
  );
};

CategoryPage.getInitialProps = async context => {
  const { categoryId, version } = context.query;

  const { data: categoryVersion, error } = await requestData<CategoryVersion>(
    getCategoryVersionConfig(categoryId as string, version as string)
  );

  return { categoryVersion, error };
};

export default CategoryPage;
