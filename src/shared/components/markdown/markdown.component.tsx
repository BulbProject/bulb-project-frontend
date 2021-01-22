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
  // eslint-disable-next-line object-shorthand
  link: ({ href, children }: { href: string; children: any }) => {
    if (href.startsWith('$')) {
      const baseUrl = href.slice(1);

      return (
        <MdCarousel images={children?.[0]?.props?.children?.split(',').map((src: string) => `${baseUrl}/${src}`)} />
      );
    }

    return <Styled.Link href={href}>{children}</Styled.Link>;
  },
};

export const Markdown: FC<{
  source: string;
}> = ({ source }) => {
  return <ReactMarkdown escapeHtml={false} transformLinkUri={(uri) => uri} renderers={renderers} source={source} />;
};
