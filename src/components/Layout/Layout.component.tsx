import React, { FC, useState } from 'react';

import { Helmet } from 'react-helmet';
import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

import logo from 'assets/images/logo.svg';

import { Aside } from '../Aside';
import { SocialLinks } from '../SocialLinks';
import { Container } from '../../shared/Container';

import Styled from './Layout.styles';

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

          <Flex isInline>
            <Styled.LinksHeaderContainer>
              <SocialLinks />
            </Styled.LinksHeaderContainer>

            <Styled.DrawerButton drawerIsOpen={drawerIsOpen} onClick={() => setDrawerOpen(!drawerIsOpen)} />
          </Flex>
        </Styled.Header>

        <Styled.Drawer position="right" showOverlay isOpen={drawerIsOpen} onChange={() => setDrawerOpen(false)}>
          <Aside closeDrawer={() => setDrawerOpen(false)} />
        </Styled.Drawer>

        <Styled.Main>{children}</Styled.Main>

        <Styled.Footer>
          <Container>
            <Styled.FooterContent alignment={{ vertical: 'center' }}>
              <Flex direction="column" isInline>
                <Text variant="h6">Контакти:</Text>

                <Text variant="small">
                  <a href="tel:+38 (044) 281-42-87">+38 (044) 281-42-87</a>,{' '}
                  <a href="tel: 0-800-503-400">0-800-503-400</a>
                </Text>

                <Text variant="small">вул. Бульварно-Кудрявська, 22,</Text>

                <Text variant="small">м. Київ, 01601</Text>

                <Text variant="small">
                  <a href="mailto:feedback@prozorro.ua">feedback@prozorro.ua</a>
                </Text>
              </Flex>

              <Styled.LinksFooterContainer>
                <SocialLinks />
              </Styled.LinksFooterContainer>

              <Flex isInline alignment={{ horizontal: 'center', vertical: 'center' }}>
                <Styled.LogoImage src={logo} alt="Bulb Project Logo" />

                <Flex margin={{ top: 'regular' }} direction="column">
                  <Text variant="small">Розроблено </Text>

                  <Text variant="small">
                    <a href="https://ustudio.company" target="_blank" rel="noreferrer noopener">
                      uStudio LLC
                    </a>
                  </Text>

                  <Text variant="small">© 2020</Text>
                </Flex>
              </Flex>
            </Styled.FooterContent>
          </Container>
        </Styled.Footer>
      </Styled.Layout>
    </>
  );
};
