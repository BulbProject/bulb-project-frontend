import styled, { css } from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

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
  width: 2rem;
  height: 2rem;

  margin: 0 0 0 var(--i-medium);

  background-position: center;
`;

const TextWrapper = styled(Flex)`
  width: auto;
`;

const CopyrightText = styled(Text)`
  font-weight: 700;
  font-size: 0.6rem;
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
  TextWrapper,
};
