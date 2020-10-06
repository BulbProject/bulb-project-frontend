import styled, { css } from 'styled-components';

import Text from 'ustudio-ui/components/Text';
import { Mixin } from 'ustudio-ui/theme';

const Root = styled.article`
  margin: var(--i-large);
  scroll-snap-type: y mandatory;
`;

const Divider = styled.hr`
  background-color: var(--c-base-weak);
`;

const Heading = styled.h1`
  color: var(--c-contrast-week);
  margin: var(--i-large) 0 0;
  scroll-margin: calc(54px + 2rem) 0 0;
`;

const Paragraph = styled(Text).attrs(() => ({ variant: 'article' }))`
  color: var(--c-contrast-strong);
  margin: var(--i-medium) 0;
`;

const Quote = styled.blockquote`
  margin: var(--i-large) 0 var(--i-regular);
  padding-left: var(--i-regular);

  border-left: 2px solid var(--c-primary);
  color: var(--c-contrast-weak);

  ${Paragraph} {
    margin: 0;
  }
`;

const List = styled.ul(
  ({ depth, ordered }: { depth: number; ordered: boolean }) => css`
    display: grid;
    grid-auto-rows: auto;
    grid-gap: var(--i-medium);

    margin: var(--i-small) 0;
    padding-left: ${depth ? 'var(--i-large)' : 0};

    list-style-position: inside;
    list-style-type: ${ordered ? 'decimal' : 'circle'};
  `
);

const Link = styled.a`
  ${Mixin.Font.bodyRegular};
`;

const Styled = { Paragraph, Quote, Heading, Root, List, Divider, Link };

export default Styled;
