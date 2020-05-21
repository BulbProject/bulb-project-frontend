import styled, { css } from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';
import { Mixin } from 'ustudio-ui/theme';

const PartnerLink = styled.a(
  ({ color, image }) => `
  margin: var(--i-small);
  height: 4rem;
width: 8rem;
background-image: url(${image});

  transition: var(--transition);

  &:hover {
    color: ${color};
  }

  &:after {
    display: none;
  }
`
);

const Footer = styled.footer`
  padding: var(--i-regular) 0;

  background-color: var(--c-light);
`;

const FooterContent = styled(Flex)`
  justify-content: center;
  flex-wrap: wrap;

  ${Mixin.Screen.md(css`
    justify-content: space-between;
    flex-wrap: nowrap;
  `)};
`;

export default {
  Footer,
  FooterContent,
  PartnerLink,
};
