import React, { ReactElement, ReactNode } from 'react';

import { Styled } from './Markdown.styles';

export const renderers = {
  thematicBreak: Styled.Divider,
  root: Styled.Root,
  heading: ({ children, level }: { children: ReactElement[]; level: number }) => (
    <Styled.Heading
      as={`h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'}
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
};
