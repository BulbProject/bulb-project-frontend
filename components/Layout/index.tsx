import React, { FC, useState } from 'react';

import Link from 'next/link';

import Styled from './styles';

const Layout: FC = ({ children }) => {
  const [drawerIsOpen, setDrawerOpen] = useState(false);

  return (
    <Styled.Layout>
      <Styled.Header>
        <Link href="/" passHref>
          <Styled.LogoLink>
            <Styled.LogoImage src="/assets/images/logo.png" alt="Bulb Project Logo" />
            <Styled.LogoText>Bulb Project</Styled.LogoText>
          </Styled.LogoLink>
        </Link>

        <Styled.DrawerButton drawerIsOpen={drawerIsOpen} onClick={() => setDrawerOpen(!drawerIsOpen)} />
      </Styled.Header>

      <Styled.Drawer position="right" showOverlay isOpen={drawerIsOpen} onChange={() => setDrawerOpen(false)}>
        <Styled.DrawerTitle variant="h3">Resources</Styled.DrawerTitle>
        <Styled.Nav>
          <Link href="/" passHref>
            <Styled.NavLink>Handbook</Styled.NavLink>
          </Link>

          <Link href="/" passHref>
            <Styled.NavLink>Contacts</Styled.NavLink>
          </Link>

          <Link href="/" passHref>
            <Styled.NavLink>How to use?</Styled.NavLink>
          </Link>
        </Styled.Nav>
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
