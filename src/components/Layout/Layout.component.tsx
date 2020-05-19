import React, { FC, useState } from 'react';

import { Helmet } from 'react-helmet';
import { css } from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';

import logo from 'assets/images/logo.svg';

import { Aside } from '../Aside';
import { Footer } from '../Footer';
import { SocialLinks } from '../SocialLinks';

import Styled from './Layout.styles';

export const Layout: FC = ({ children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Helmet titleTemplate="Bulb Project | %s" defaultTitle="Bulb Project" />

      <Styled.Layout>
        <Styled.HeaderWrapper>
          <Styled.Header alignment={{ horizontal: 'space-between', vertical: 'center' }}>
            <Styled.LogoLink to="/">
              <Styled.LogoImage src={logo} alt="Bulb Project Logo" />

              <Styled.LogoText>Bulb Project</Styled.LogoText>
            </Styled.LogoLink>

            <Flex isInline>
              <Styled.LinksHeaderContainer>
                <SocialLinks />
              </Styled.LinksHeaderContainer>

              <Styled.DrawerButton drawerIsOpen={isDrawerOpen} onClick={() => setDrawerOpen(!isDrawerOpen)} />
            </Flex>
          </Styled.Header>
        </Styled.HeaderWrapper>

        <Styled.Drawer
          position="right"
          showOverlay
          isOpen={isDrawerOpen}
          onChange={() => setDrawerOpen(false)}
          styled={{
            Drawer: css`
              z-index: var(--l-topmost);
            `,
            Overlay: css`
              background-color: var(--c-darkest);

              z-index: calc(var(--l-topmost) - 1);
            `,
          }}
        >
          <Styled.DrawerButton drawerIsOpen={isDrawerOpen} onClick={() => setDrawerOpen(!isDrawerOpen)} />

          <Aside closeDrawer={() => setDrawerOpen(false)} />
        </Styled.Drawer>

        <Styled.Main>{children}</Styled.Main>

        <Footer />
      </Styled.Layout>
    </>
  );
};
