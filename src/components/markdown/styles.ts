import styled, { css } from 'styled-components';

import { Mixin } from 'ustudio-ui/theme';

const Root = styled.article`
  margin: var(--i-large) 0;
  scroll-snap-type: y mandatory;
`;

const Divider = styled.hr`
  background-color: var(--c-light);
`;

const Heading = styled.h1`
  margin: 2rem 0 0;
  scroll-margin: calc(54px + 2rem) 0 0;
`;

const Paragraph = styled.div`
  ${Mixin.Font.bodyRegular};
  margin: var(--i-medium) 0;
`;

const Quote = styled.blockquote`
  border-left: 2px solid var(--c-primary);
  padding-left: 1rem;
  margin: 1rem 0;
  color: var(--c-dark);

  ${Paragraph} {
    margin: 0;
  }
`;

const List = styled.ul(
  ({ depth, ordered }: { depth: number; ordered: boolean }) => css`
    display: grid;
    grid-auto-rows: auto;
    grid-gap: 0.5rem;

    margin: 0.25rem 0;
    padding-left: ${depth ? '2rem' : 0};

    list-style-position: inside;
    list-style-type: ${ordered ? 'decimal' : 'circle'};
  `
);

export const Styled = { Paragraph, Quote, Heading, Root, List, Divider };
