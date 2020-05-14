import React, { useMemo } from 'react';
import Flex from 'ustudio-ui/components/Flex';

import { useRequest } from 'hooks';
import { getMainContentFiles } from 'config';
import { Container } from 'shared';
import { FadeIn } from 'components/FadeIn';
import useMediaQuery from 'ustudio-ui/hooks/use-media-query';
import ArrowIcon from '../../../../assets/icons/arrow.inline.svg';

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
        <Styled.Arrow alignment={{ horizontal: 'center', vertical: 'center' }}>
          <ArrowIcon />
        </Styled.Arrow>

        <Container>
          <Flex direction={documentsDirection}>
            {!isLoading && fileNames && fileNames.map(({ name }) => <Document key={name} fileName={name} />)}
          </Flex>
        </Container>
      </Styled.Content>
    </FadeIn>
  );
};
