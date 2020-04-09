import React, { FC, useState } from 'react';

import Link from 'next/link';

import Styles from './styles';

const Layout: FC = ({ children }) => {
  const [drawerIsShow, setDrawerIsShow] = useState(false);

  return (
    <Styles.Layout>
      <Styles.Header>
        <Link href="/" passHref>
          <Styles.LogoLink>
            <Styles.LogoImage src="/assets/images/logo.png" alt="Bulb Project Logo" />
            <Styles.LogoText>Bulb Project</Styles.LogoText>
          </Styles.LogoLink>
        </Link>

        <Styles.DrawerButton drawerIsShow={drawerIsShow} onClick={() => setDrawerIsShow(!drawerIsShow)} />
      </Styles.Header>
      <Styles.Drawer position="right" showOverlay isOpen={drawerIsShow} onChange={() => setDrawerIsShow(false)}>
        <Styles.DrawerTitle variant="h3">Resources</Styles.DrawerTitle>
        <Styles.Nav>
          <Link href="/" passHref>
            <Styles.NavLink>Handbook</Styles.NavLink>
          </Link>

          <Link href="/" passHref>
            <Styles.NavLink>Contacts</Styles.NavLink>
          </Link>

          <Link href="/" passHref>
            <Styles.NavLink>How to use?</Styles.NavLink>
          </Link>
        </Styles.Nav>
      </Styles.Drawer>
      <Styles.Main>{children}</Styles.Main>
      <Styles.Footer>
        © 2020{' '}
        <a href="https://ustudio.company" target="_blank" rel="noreferrer noopener">
          uStudio LLC
        </a>{' '}
        ❤️
      </Styles.Footer>
    </Styles.Layout>
  );
};

export default Layout;
