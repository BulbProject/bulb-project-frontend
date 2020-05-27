import styled, { css } from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';
import { Mixin } from 'ustudio-ui/theme';

const PartnerLink = styled.a(
  ({ image, width = 9 }: { image: string; width?: number }) => css`
    width: ${width}rem;
    height: 3rem;

    margin: var(--i-regular) var(--i-small);

    background-image: url(${image});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;

    transition: var(--transition);
    filter: grayscale(1);

    &:hover,
    &:focus {
      filter: grayscale(0);
    }

    &:after {
      display: none;
    }
  `
);

const CopyrightLogoLink = styled(PartnerLink)`
  margin: var(--i-regular) 0 var(--i-regular) var(--i-regular);
`;

const CopyrightText = styled(Flex)`
  width: auto;
`;

const Footer = styled.div`
  background-color: var(--c-base-weak);
  padding: var(--i-regular) 0;
`;

const FooterContent = styled(Flex)`
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;

  ${Mixin.Screen.lg(css`
    justify-content: space-between;
  `)};
`;

export default {
  Footer,
  FooterContent,
  PartnerLink,
  CopyrightLogoLink,
  CopyrightText,
};
