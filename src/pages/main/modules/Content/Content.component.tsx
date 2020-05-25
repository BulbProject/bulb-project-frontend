import React, { useMemo } from 'react';

import { useRequest } from 'hooks';
import { getMainContentFiles } from 'config';
import { Container } from 'shared';
import { FadeIn } from 'components/FadeIn';
import useMediaQuery from 'ustudio-ui/hooks/use-media-query';

import { Document } from './components';

import Styled from './Content.styles';

export const Content = () => {
  const { isLoading, error, data: fileNames } = useRequest<{ name: string }[]>(getMainContentFiles());

  const isLg = useMediaQuery('screen and (min-width: 992px)');

  const documentsDirection = useMemo(() => {
    if ((fileNames || [])?.length > 2) return 'column';

    return isLg ? 'row' : 'column';
  }, [fileNames, isLg]);

  if (error) {
    return null;
  }

  return (
    <FadeIn>
      <Styled.Content>
        <Container>
          <Styled.DocumentContainer direction={documentsDirection}>
            {!isLoading && fileNames && fileNames.map(({ name }) => <Document key={name} fileName={name} />)}
          </Styled.DocumentContainer>
        </Container>
      </Styled.Content>
    </FadeIn>
  );
};
