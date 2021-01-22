import React, { FC, ReactElement, ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';

import Styled from './markdown.styles';
import { MdCarousel } from '../markdown-carousel/md-carousel';

const renderers = {
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
  link({ href, children }: { href: any; children: any }) {
    console.log(href);

    if (href.startsWith('$')) {
      const value = children?.[0].props?.children;

      console.log(value);
    }

    return children === '$carousel' ? <MdCarousel images={href.split(',')} /> : <Styled.Link />;
  },
};

export const Markdown: FC<{
  source: string;
}> = ({ source }) => {
  return <ReactMarkdown escapeHtml={false} renderers={renderers} source={source} />;
};
