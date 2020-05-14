import React from 'react';
import ReactMarkdown from 'react-markdown';
import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';

import { useRequest } from 'hooks';
import { getMainContentFile } from 'config';
import { FadeIn, renderers } from 'components';

export const Document: React.FC<{ fileName: string }> = ({ fileName }) => {
  const { isLoading, error, data } = useRequest<{ content: string }>(getMainContentFile(fileName.slice(0, -3)));

  if (isLoading && !error) {
    return (
      <FadeIn>
        <Flex alignment={{ vertical: 'center', horizontal: 'center' }}>
          <Spinner />
        </Flex>
      </FadeIn>
    );
  }

  return (
    <FadeIn>
      <ReactMarkdown
        escapeHtml={false}
        source={data?.content || 'Не вдалося знайти цей документ'}
        renderers={renderers}
      />
    </FadeIn>
  );
};
