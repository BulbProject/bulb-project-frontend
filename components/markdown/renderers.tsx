import React, { ReactElement, ReactNode } from 'react';

import { Styled } from './styles';

export const renderers = {
  thematicBreak: Styled.Divider,
  root: Styled.Root,
  heading: ({ children, level }: { children: ReactElement[]; level: number }) => (
    <Styled.Heading
      // @ts-ignore
      as={`h${level}`}
      id={children[0]?.props?.children
        .split(' ')
        .reduce((id: string, word: string) => `${id ? `${id}-` : ''}${word}`, ``)
        .toLowerCase()}
    >
      {children}
    </Styled.Heading>
  ),
  blockquote: Styled.Quote,
  paragraph: Styled.Paragraph,
  list: ({ depth, children, ordered }: { depth: number; children: ReactNode[]; ordered: boolean }) => (
    <Styled.List depth={depth} ordered={ordered}>
      {children}
    </Styled.List>
  ),
  listItem: Styled.ListItem,
  inlineCode: Styled.InlineCode,
  link: ({ href, children, title }: { href: string; children: string; title?: string }) => (
    <a href={href} title={title}>
      {children}
    </a>
  ),
};
