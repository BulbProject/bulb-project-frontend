import React from 'react';

import { createGlobalStyle } from 'styled-components';

import CategoriesList from 'pages/categories-list/CategoriesList.component';

import Styled from './Main.styles';
import { Hero, Content } from './modules';

export const DarkMode = createGlobalStyle`
  :root {
    --c-base-strong: var(--c-darkest);
    --c-base-weak: var(--c-dark);
    --c-contrast-strong: var(--c-lightest);
    --c-contrast-weak: var(--c-light);
    --c-faint-strong: var(--c-dark);
  }
`;

const Main = () => {
  return (
    <Styled.Main>
      <Styled.ScrollWrapper>
        <Hero />
      </Styled.ScrollWrapper>

      <Styled.ScrollWrapper>
        <Content />
      </Styled.ScrollWrapper>

      <Styled.ScrollWrapper>
        <Styled.CategoryListWrapper>
          <CategoriesList />
        </Styled.CategoryListWrapper>
      </Styled.ScrollWrapper>
      <DarkMode />
    </Styled.Main>
  );
};

export default Main;
