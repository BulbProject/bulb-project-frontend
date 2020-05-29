import React, { FC } from 'react';

import { Helmet } from 'react-helmet';

import { Footer } from '../Footer';
import { Header } from '../Header';

import Styled from './Layout.styles';

export const Layout: FC = ({ children }) => {
  return (
    <>
      <Helmet titleTemplate="Bulb Project | %s" defaultTitle="Bulb Project" />

      <Header />

      <Styled.Layout>
        <Styled.Main>{children}</Styled.Main>

        <Footer />
      </Styled.Layout>
    </>
  );
};
