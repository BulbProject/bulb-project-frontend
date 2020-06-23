import React, { FC } from 'react';
import Flex from 'ustudio-ui/components/Flex';

import { useCategory } from 'core/context/category-provider';

import { Container } from '../container';

import Styled from './category-header.styles';

export const CategoryHeader: FC = () => {
  const {
    category: { title, description, classification },
  } = useCategory();

  return (
    <Styled.Wrapper>
      <Container>
        <Flex direction="column">
          <Styled.CategoryTitle variant="h2">{title}</Styled.CategoryTitle>

          {description && <Styled.CategoryDescription variant="small">{description}</Styled.CategoryDescription>}

          <Styled.Classification {...classification} />
        </Flex>
      </Container>
    </Styled.Wrapper>
  );
};
