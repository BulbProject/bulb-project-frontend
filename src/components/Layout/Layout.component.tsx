import React, { FC, useState, lazy, Suspense } from 'react';

import { Helmet } from 'react-helmet';

import { Flex, Placeholder } from 'ustudio-ui';

import logo from 'assets/images/logo.svg';

import Styled from './Layout.styles';

const Aside = lazy(() => import('../Aside/Aside.component'));

const AsidePlaceholder = (
  <Flex direction="column">
    <Placeholder variant="text" appearance={{ height: 'body', width: '60%' }} />
    <Placeholder variant="text" appearance={{ height: 'body', width: '40%' }} />
    <Placeholder variant="text" appearance={{ height: 'body', width: '30%' }} />
    <Placeholder variant="text" appearance={{ height: 'body', width: '70%' }} />
  </Flex>
);
export const Layout: FC = ({ children }) => {
  const [drawerIsOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Helmet titleTemplate="Bulb Project | %s" defaultTitle="Bulb Project" />

      <Styled.Layout>
        <Styled.Header>
          <Styled.LogoLink to="/">
            <Styled.LogoImage src={logo} alt="Bulb Project Logo" />
            <Styled.LogoText>Bulb Project</Styled.LogoText>
          </Styled.LogoLink>

          <Styled.DrawerButton drawerIsOpen={drawerIsOpen} onClick={() => setDrawerOpen(!drawerIsOpen)} />
        </Styled.Header>

        <Styled.Drawer position="right" showOverlay isOpen={drawerIsOpen} onChange={() => setDrawerOpen(false)}>
          <Suspense fallback={AsidePlaceholder}>
            <Aside closeDrawer={() => setDrawerOpen(false)} />
          </Suspense>
        </Styled.Drawer>

        <Styled.Main>{children}</Styled.Main>

        <Styled.Footer>
          © 2020{' '}
          <a href="https://ustudio.company" target="_blank" rel="noreferrer noopener">
            uStudio LLC
          </a>{' '}
          ❤️
        </Styled.Footer>
      </Styled.Layout>
    </>
  );
};
