import styled, { css } from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';
import { Mixin } from 'ustudio-ui/theme';

const LogoImage = styled.img`
  width: 3rem;
  margin-right: var(--i-large);
`;

const Footer = styled.footer`
  padding: var(--i-regular) 0;

  background-color: var(--c-light);
`;

const FooterContent = styled(Flex)`
  flex-direction: column;
  justify-content: center;

  ${Mixin.Screen.xs(css`
    flex-direction: row;
    justify-content: space-between;
  `)};
`;

const ContactContainer = styled(Flex)`
  text-align: center;

  ${Mixin.Screen.xs(css`
    text-align: left;
  `)};
`;

const FooterLogoContainer = styled(Flex)`
  flex-direction: row;
  ${Mixin.Screen.xs(css`
    flex-direction: column;
  `)};

  ${Mixin.Screen.lg(css`
    flex-direction: row;
  `)};

  ${LogoImage} {
    ${Mixin.Screen.xs(css`
      margin: 0 0 var(--i-medium);
    `)};

    ${Mixin.Screen.lg(css`
      margin: 0 var(--i-large) 0 0;
    `)};
  }
`;

const LinksFooterContainer = styled.div`
  margin: var(--i-regular) 0;

  ${Mixin.Screen.xs(css`
    margin: 0 var(--i-regular);
  `)};
`;

export default {
  Footer,
  FooterContent,
  FooterLogoContainer,
  LinksFooterContainer,
  LogoImage,
  ContactContainer,
};
