import React from 'react';
import Flex from 'ustudio-ui/components/Flex';

import { Container } from 'shared/Container';
import { Category } from 'types/data';

import Styled from './CategoryHeader.styles';

export const CategoryHeader: React.FC<Partial<Pick<Category, 'title' | 'description' | 'classification'>>> = ({
  title,
  description,
  classification,
}) => {
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
