import React, { FC, useEffect } from 'react';
import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';
import useAsync from 'honks/use-async';
import axios from 'axios';

import { Markdown } from 'shared/components';

import { Document as DocumentProps } from '../entity';
import { useDocumentsApi } from '../../documents-api-provider';

export const Document: FC<DocumentProps> = ({ name }) => {
  const { getDocumentConfig } = useDocumentsApi();

  const { onPending, onResolve, onReject, call: getDocument } = useAsync<{ content: string }>(async () => {
    const { data } = await axios(getDocumentConfig(name.slice(0, -3)));

    return data;
  });

  useEffect(() => {
    getDocument();
  }, []);

  return (
    <>
      {onPending(() => (
        <Flex alignment={{ vertical: 'center', horizontal: 'center' }}>
          <Spinner />
        </Flex>
      ))}

      {onResolve(({ content }) => (
        <Markdown source={content} />
      ))}

      {onReject(() => (
        <Markdown source="Не вдалося знайти цей документ" />
      ))}
    </>
  );
};
