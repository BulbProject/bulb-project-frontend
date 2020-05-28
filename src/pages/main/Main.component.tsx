import React, { useEffect, useState } from 'react';

import 'fullpage.js/vendors/scrolloverflow';
import ReactFullpage from '@fullpage/react-fullpage';

import useMediaQuery from 'ustudio-ui/hooks/use-media-query';

import { CategoriesList } from 'pages/categories-list/CategoriesList.component';
import Styled from './Main.styles';
import { DarkMode } from './Main.module';
import { Hero, Content } from './modules';

const Main = () => {
  const [isPageMounted, setPageMounted] = useState(false);

  useEffect(() => {
    setPageMounted(true);
  }, []);

  const isMd = useMediaQuery('screen and (min-width: 768px)');

  const MainContent = () => (
    <main>
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
    </main>
  );

  return (
    <>
      {isPageMounted && isMd && (
        <ReactFullpage
          licenseKey="Nu9TbnPK-hA3_269z-aVtu9yF4-g7gX7RCY"
          navigation
          scrollOverflow
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
