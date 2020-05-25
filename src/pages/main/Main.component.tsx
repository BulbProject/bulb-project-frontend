import React, { useEffect, useState } from 'react';

import ReactFullpage from '@fullpage/react-fullpage';
import 'fullpage.js/vendors/scrolloverflow';

import { createGlobalStyle } from 'styled-components';

import useMediaQuery from 'ustudio-ui/hooks/use-media-query';

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

  #fp-nav{
    a{
      &::after{
        content: unset;
      }
    }

    span{
      background-color: var(--c-secondary)!important;
    }
  }
`;

const Main = () => {
  const [isPageMounted, setPageMounted] = useState(false);

  useEffect(() => {
    setPageMounted(true);
  }, []);

  const isMd = useMediaQuery('screen and (min-width: 768px)');

  const MainContent = () => (
    <Styled.Main>
      <div className="section">
        <Hero />
      </div>

      <div className="section">
        <Content />
      </div>

      <div className="section">
        <Styled.CategoryListWrapper>
          <CategoriesList />
        </Styled.CategoryListWrapper>
      </div>

      <DarkMode />
    </Styled.Main>
  );

  return (
    <>
      {isPageMounted && isMd && (
        <ReactFullpage
          licenseKey="Nu9TbnPK-hA3_269z-aVtu9yF4-g7gX7RCY"
          navigation
          scrollOverflow
          callbacks={['onLeave']}
          render={() => {
            return <MainContent />;
          }}
        />
      )}

      {isPageMounted && !isMd && <MainContent />}
    </>
  );
};

export default Main;
