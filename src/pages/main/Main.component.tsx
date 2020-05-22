import React, { useState } from 'react';

import { createGlobalStyle } from 'styled-components';

import { CategoriesList } from 'pages/categories-list/CategoriesList.component';

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
  const [activeIndicator, setActiveIndicator] = useState(1);

  return (
    <Styled.Main
      onScroll={(event) => {
        // @ts-ignore
        const activeScreen = Math.floor(event.target?.scrollTop / window.innerHeight);

        if (activeScreen <= 0) {
          setActiveIndicator(1);
        }

        if (activeScreen === 1) {
          setActiveIndicator(2);
        }

        if (activeScreen >= 2) {
          setActiveIndicator(3);
        }
      }}
    >
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

      <Styled.ScrollIndicators>
        {[1, 2, 3].map((indicator) => (
          <Styled.Indicator key={indicator} isActive={indicator === activeIndicator} />
        ))}
      </Styled.ScrollIndicators>
      <DarkMode />
    </Styled.Main>
  );
};

export default Main;
