import React, { useMemo } from 'react';

import { useRequest } from 'hooks';
import { getMainContentFiles } from 'config';
import { Container } from 'shared';
import { FadeIn } from 'components/FadeIn';
import useMediaQuery from 'ustudio-ui/hooks/use-media-query';

import Spinner from 'ustudio-ui/components/Spinner';
import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';
import Button from 'ustudio-ui/components/Button';
import Styled from './Content.styles';
import { Document } from './components';

export const Content = () => {
  const { isLoading, error, data: fileNames, triggerRequest } = useRequest<{ name: string }[]>(getMainContentFiles());

  const isLg = useMediaQuery('screen and (min-width: 992px)');

  const documentsDirection = useMemo(() => {
    if ((fileNames || [])?.length > 2) return 'column';

    return isLg ? 'row' : 'column';
  }, [fileNames, isLg]);

  return (
    <FadeIn>
      <Styled.Content>
        <Container>
          <Styled.DocumentContainer direction={documentsDirection}>
            {!isLoading && fileNames && fileNames.map(({ name }) => <Document key={name} fileName={name} />)}

            {!isLoading && error && (
              <Styled.CentredContainer>
                <Text color="var(--c-contrast-strong)">На жаль, ми не замогли завантажити файли.</Text>

                <Flex alignment={{ horizontal: 'center' }} margin={{ top: 'large' }}>
                  <Button intent="positive" onClick={triggerRequest}>
                    Спробувати ще
                  </Button>
                </Flex>
              </Styled.CentredContainer>
            )}

            {isLoading && (
              <Styled.CentredContainer>
                <Spinner appearance={{ size: 64 }} delay={300} />
              </Styled.CentredContainer>
            )}
          </Styled.DocumentContainer>
        </Container>
      </Styled.Content>
    </FadeIn>
  );
};
