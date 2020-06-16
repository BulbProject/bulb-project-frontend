import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';

import { useRequest } from 'honks';
import axios from 'axios';
import { getMainContentFile } from 'config';
import { FadeIn, renderers } from 'components';

export const Document: React.FC<{ fileName: string }> = ({ fileName }) => {
  const { onPending, onSuccess, onFail, sendRequest } = useRequest<{ content: string }>(async () => {
    const { data } = await axios(getMainContentFile(fileName.slice(0, -3)));

    return data;
  });

  useEffect(() => {
    (async () => {
      await sendRequest();
    })();
  }, []);

  return (
    <FadeIn>
      {onPending(() => (
        <Flex alignment={{ vertical: 'center', horizontal: 'center' }}>
          <Spinner />
        </Flex>
      ))}

      {onSuccess(({ content }) => (
        <ReactMarkdown escapeHtml={false} source={content} renderers={renderers} />
      ))}

      {onFail(() => (
        <ReactMarkdown escapeHtml={false} source="Не вдалося знайти цей документ" renderers={renderers} />
      ))}
    </FadeIn>
  );
};
