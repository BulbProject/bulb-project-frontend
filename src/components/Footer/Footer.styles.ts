import styled, { css } from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';
import { Mixin } from 'ustudio-ui/theme';

const PartnerLink = styled.a(
  ({ image, width = 8 }: { image: string; width?: number }) => css`
    width: ${width}rem;
    height: 4rem;

    margin: var(--i-small);

    background-image: url(${image});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    transition: var(--transition);

    filter: brightness(0);

    &:hover {
      filter: brightness(1);
    }

    &:after {
      display: none;
    }
  `
);

const Footer = styled.footer`
  background-color: var(--c-base-weak);
`;

const FooterContent = styled(Flex)`
  justify-content: center;
  flex-wrap: wrap;
  padding: var(--i-large);

  ${Mixin.Screen.lg(css`
    justify-content: space-between;
  `)};
`;

export default {
  Footer,
  FooterContent,
  PartnerLink,
};
