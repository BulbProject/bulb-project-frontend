import React, { FC } from 'react';
import { createGlobalStyle } from 'styled-components';
import { v4 as uuid } from 'uuid';

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
        Hero,
        Documents,
        () => (
          <Styled.CategoryListWrapper>
            <CategoriesList layoutVariant="empty" />
          </Styled.CategoryListWrapper>
        ),
      ].map((Component) => (
        <div key={uuid()} className="section">
          <Component />
        </div>
      ))}

      <DarkMode />
    </Styled.Main>
  );
};
