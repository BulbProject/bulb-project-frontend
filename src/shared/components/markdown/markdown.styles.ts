import styled, { css } from 'styled-components';

import Text from 'ustudio-ui/components/Text';
import { Mixin } from 'ustudio-ui/theme';

const alignedText = css`
  @media screen and (min-width: 768px) {
    padding: 0 152px;
  }

  @media screen and (min-width: 992px) {
    padding: 0 185px;
  }

  @media screen and (min-width: 1200px) {
    padding: 0 224px;
  }
`;

const Root = styled.article`
  margin: var(--i-large) 0;

  display: flex;
  flex-direction: column;

  scroll-snap-type: y mandatory;
`;

const Divider = styled.hr`
  background-color: var(--c-base-weak);
`;

const Heading = styled.h1`
  margin: var(--i-medium) 0;

  color: var(--c-contrast-week);

  scroll-margin: calc(54px + 2rem) 0 0;

  ${alignedText};

  &[data-level='1'],
  &[data-level='2'] {
    text-align: center;
  }

  &[data-level='1'] {
    margin-bottom: var(--i-large);

    font-size: 32px;
  }

  &[data-level='2'] {
    font-size: 24px;
  }

  &[data-level='3'] {
    font-size: 18px;
    font-weight: 600;
    font-variant: all-small-caps oldstyle-nums;
  }
`;

const TextNode = styled(Text).attrs(() => ({ variant: 'body' }))`
  display: inline-block;

  margin: var(--i-medium) 0;

  ${alignedText};

  color: var(--c-dark);
  font-size: 14px;
  line-height: 1.5em;
`;

const ListItem = styled(TextNode).attrs(() => ({
  forwardedAs: 'li',
}))`
  margin: 0;

  &:before {
    content: '– ';
  }
`;

const Quote = styled.blockquote`
  margin: var(--i-large) 0 var(--i-regular);
  padding-left: var(--i-regular);

  border-left: 2px solid var(--c-primary);
  color: var(--c-contrast-weak);

  ${TextNode} {
    margin: 0;
    padding: 0;
  }

  & + ${TextNode} {
    padding: 0;
  }
`;

const List = styled.ul(
  ({ depth, ordered }: { depth: number; ordered: boolean }) => css`
    display: grid;
    grid-auto-rows: auto;
    grid-gap: var(--i-medium);

    margin: var(--i-medium) 0;
    padding-left: ${depth ? 'var(--i-large)' : 0};

    list-style-position: inside;
    list-style-type: ${ordered ? 'decimal' : 'circle'};
  `
);

const Link = styled.a`
  ${Mixin.Font.bodyRegular};
`;

const Image = styled.img`
  width: 100%;
  height: auto;

  display: block;
`;

const Styled = { TextNode, Quote, Heading, Root, List, ListItem, Divider, Link, Image };

export default Styled;
