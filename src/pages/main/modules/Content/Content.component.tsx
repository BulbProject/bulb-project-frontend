import React, { useEffect, useMemo } from 'react';

import axios, { AxiosResponse } from 'axios';
import { useRequest } from 'honks';
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
  const { onSuccess, onFail, onPending, isSuccess, result, sendRequest } = useRequest<{ name: string }[]>(async () => {
    const { data } = await axios(getMainContentFiles());

    return data;
  });

  useEffect(() => {
    (async () => sendRequest())();
  }, []);

  const fileNames = isSuccess(result) ? result.data : null;

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
            {onSuccess((names) => {
              return names.map(({ name }) => <Document key={name} fileName={name} />);
            })}

            {onFail(() => {
              return (
                <Styled.CentredContainer>
                  <Text color="var(--c-contrast-strong)">
                    Тут мав бути дуже цікавий контент, але він не завантажився
                  </Text>

                  <Flex alignment={{ horizontal: 'center' }} margin={{ top: 'large' }}>
                    <Button intent="positive" onClick={sendRequest}>
                      Хочу цікавий контент!
                    </Button>
                  </Flex>
                </Styled.CentredContainer>
              );
            })}

            {onPending(() => {
              return (
                <Styled.CentredContainer>
                  <Spinner appearance={{ size: 64 }} delay={300} />
                </Styled.CentredContainer>
              );
            })}
          </Styled.DocumentContainer>
        </Container>
      </Styled.Content>
    </FadeIn>
  );
};
