import styled, { css } from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';
import { Mixin } from 'ustudio-ui/theme';

const PartnerLink = styled.a(
  ({ image, width = 8, height = 4 }: { image: string; width?: number; height?: number }) => css`
    width: ${width}rem;
    height: ${height}rem;

    margin: var(--i-regular);

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
  align-items: center;

  ${Mixin.Screen.lg(css`
    justify-content: space-between;
  `)};
`;

export default {
  Footer,
  FooterContent,
  PartnerLink,
};
