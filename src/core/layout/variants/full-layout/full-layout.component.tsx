import React, { FC } from 'react';

import { Footer } from '../../footer';
import { Header } from '../../header';

import Styled from './full-layout.styles';

export const FullLayout: FC = ({ children }) => {
  return (
    <>
      <Header />

      <Styled.Layout>
        <Styled.Main>{children}</Styled.Main>

        <Footer />
      </Styled.Layout>
    </>
  );
};
