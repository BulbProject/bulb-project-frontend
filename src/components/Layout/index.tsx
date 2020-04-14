import React, { FC, useState } from 'react';

import logo from 'assets/images/logo.svg';

import { Aside } from './components';

import Styled from './styles';

const Layout: FC = ({ children }) => {
  const [drawerIsOpen, setDrawerOpen] = useState(false);

  return (
    <Styled.Layout>
      <Styled.Header>
        <Styled.LogoLink to="/">
          <Styled.LogoImage src={logo} alt="Bulb Project Logo" />
          <Styled.LogoText>Bulb Project</Styled.LogoText>
        </Styled.LogoLink>

        <Styled.DrawerButton drawerIsOpen={drawerIsOpen} onClick={() => setDrawerOpen(!drawerIsOpen)} />
      </Styled.Header>

      <Styled.Drawer position="right" showOverlay isOpen={drawerIsOpen} onChange={() => setDrawerOpen(false)}>
        <Aside />
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
  );
};

export default Layout;
