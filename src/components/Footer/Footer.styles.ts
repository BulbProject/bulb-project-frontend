import styled, { css } from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';
import { Mixin } from 'ustudio-ui/theme';

const PartnerLink = styled.a(
  ({ image, width = 8 }: { image: string; width?: number }) => css`
    margin: var(--i-small);
    height: 4rem;
    width: ${width}rem;
    background-image: url(${image});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    transition: var(--transition);

    &:hover {
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
