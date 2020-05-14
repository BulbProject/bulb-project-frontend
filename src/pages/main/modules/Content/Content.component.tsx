import React from 'react';
import Flex from 'ustudio-ui/components/Flex';

import { useRequest } from 'hooks';
import { getMainContentFiles } from 'config';
import { Container } from 'shared';
import { FadeIn } from 'components/FadeIn';
import ArrowIcon from '../../../../assets/icons/arrow.inline.svg';

import { Document } from './components';

import Styled from './Content.styles';

export const Content = () => {
  const { isLoading, error, data: fileNames } = useRequest<{ name: string }[]>(getMainContentFiles());

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
          <Flex>{!isLoading && fileNames && fileNames.map(({ name }) => <Document key={name} fileName={name} />)}</Flex>
        </Container>
      </Styled.Content>
    </FadeIn>
  );
};
