import React, { FC } from 'react';
import { createGlobalStyle } from 'styled-components';

// @ToDo: extract CategoriesList to a shared component
// eslint-disable-next-line boundaries/allowed-types
import CategoriesList from 'modules/categories-list/categories-list.component';

import { Documents } from '../documents';
import { Hero } from '../hero';

import Styled from './layout.styles';

const DarkMode = createGlobalStyle`
  :root {
    --c-base-strong: var(--c-darkest);
    --c-base-weak: var(--c-dark);
    --c-contrast-strong: var(--c-lightest);
    --c-contrast-weak: var(--c-light);
    --c-faint-strong: var(--c-dark);
  }

  #fp-nav {
    a {
      &:after {
        content: unset;
      }
    }

    span {
      background-color: var(--c-secondary) !important;
    }
  }
`;

export const Layout: FC = () => {
  return (
    <Styled.Main>
      {[
        <Hero key="Hero" />,
        <Documents key="Documents" />,
        <Styled.CategoryListWrapper key="CategoryListWrapper">
          <CategoriesList />
        </Styled.CategoryListWrapper>,
      ].map((component, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`${index}`} className="section">
            {component}
          </div>
        );
      })}

      <DarkMode />
    </Styled.Main>
  );
};
