import React, { FC, memo, useState } from 'react';
import { css } from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';

import { LanguageSelect } from 'shared/components/language-select';

import logo from '../../../assets/images/logo.svg';

import { Aside } from './aside';

import Styled from './header.styles';
import { SocialLinks } from './social-links';

export const Header: FC = memo(() => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
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

            <LanguageSelect />

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
    </>
  );
});
