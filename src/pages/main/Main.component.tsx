import React from 'react';

import { ThemeProvider } from 'ustudio-ui/theme';

import CategoriesList from 'pages/categories-list/CategoriesList.component';
import Styled from './Main.styles';

import { Hero, Content } from './modules';

const Main = () => {
  return (
    <ThemeProvider
      override={{
        palette: {
          lightest: '#1a1a1a',
          light: '#8c8c8c',
          neutral: '#8c8c8c',
          dark: '#eee',
          darkest: '#f5f5f5',
        },
      }}
    >
      <main>
        <Hero />

        <Content />

        <Styled.CategoryListWrapper>
          <CategoriesList />
        </Styled.CategoryListWrapper>
      </main>
    </ThemeProvider>
  );
};

export default Main;
