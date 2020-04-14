import React, { FC, useState } from 'react';

import Styled from './styles';

// @ts-ignore
import logo from '../../../public/assets/images/logo.svg';

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
        <Styled.DrawerTitle variant="h3">Resources</Styled.DrawerTitle>

        <Styled.Nav>
          {['Handbook', 'Contacts', 'How to use?'].map(page => (
            <Styled.NavLink to="/" key={page}>
              {page}
            </Styled.NavLink>
          ))}
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
