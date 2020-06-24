import useAsync from 'honks/use-async';
import React, { FC, useEffect, useMemo } from 'react';

import axios, { AxiosError } from 'axios';

import { useMedia } from 'shared/hooks';
import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';
import Button from 'ustudio-ui/components/Button';

import { Container, Loader } from 'shared/components';

import { useDocumentsApi } from '../documents-api-provider';
import type { Document as DocumentType } from './entity';

import { Document } from './document';
import Styled from './documents.styles';

export const Documents: FC = () => {
  const { getDocumentsConfig } = useDocumentsApi();

  const { onResolve, onReject, onPending, isResolved, result, call: getDocuments } = useAsync<
    DocumentType[],
    AxiosError
  >(async () => {
    const { data } = await axios(getDocumentsConfig());

    return data;
  });

  useEffect(() => {
    getDocuments();
  }, []);

  const fileNames = useMemo(() => (isResolved(result) ? result.data : null), [result]);

  const isLg = useMedia('screen and (min-width: 992px)');

  const documentsDirection = useMemo(() => {
    if ((fileNames ?? []).length > 2) return 'column';

    return isLg() ? 'row' : 'column';
  }, [fileNames, isLg()]);

  return (
    <Styled.Content>
      <Container>
        <Styled.DocumentContainer direction={documentsDirection}>
          {onResolve((documents) => {
            return documents.map(({ name }) => <Document key={name} name={name} />);
          })}

          {onReject(() => {
            return (
              <Styled.CentredContainer>
                <Text color="var(--c-contrast-strong)">Тут мав бути дуже цікавий контент, але він не завантажився</Text>

                <Flex alignment={{ horizontal: 'center' }} margin={{ top: 'large' }}>
                  <Button intent="positive" onClick={getDocuments}>
                    Хочу цікавий контент!
                  </Button>
                </Flex>
              </Styled.CentredContainer>
            );
          })}

          {onPending(() => {
            return <Loader size={64} />;
          })}
        </Styled.DocumentContainer>
      </Container>
    </Styled.Content>
  );
};
