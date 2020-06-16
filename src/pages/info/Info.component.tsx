import React, { useEffect } from 'react';

import { useParams, useHistory } from 'react-router-dom';

import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';
import Text from 'ustudio-ui/components/Text';

import { Helmet } from 'react-helmet';

import ReactMarkdown from 'react-markdown';

import { useRequest } from 'honks';
import axios, { AxiosError } from 'axios';
import { getInfoFile } from 'config';

import { Container } from 'shared';
import { Layout, FadeIn, renderers } from 'components';

import ArrowIcon from '../../assets/icons/arrow.inline.svg';
import ReloadIcon from '../../assets/icons/reload.inline.svg';

import Styled from './Info.styles';

const InfoComponent = () => {
  const { goBack } = useHistory();
  const { infoFileName } = useParams();
  const { onPending, onSuccess, onFail, isFail, result, sendRequest } = useRequest<{ content: string }, AxiosError>(
    async () => {
      const { data } = await axios(getInfoFile(infoFileName as string));

      return data;
    }
  );

  useEffect(() => {
    (async () => sendRequest())();
  }, []);

  return (
    <Layout>
      <Container>
        {onPending(() => {
          return (
            <FadeIn>
              <Styled.CenteredContainer>
                <Spinner appearance={{ size: 64 }} delay={300} />
              </Styled.CenteredContainer>
            </FadeIn>
          );
        })}

        {onSuccess(({ content }) => {
          return (
            <>
              <Helmet>
                <title>{infoFileName}</title>
              </Helmet>

              <FadeIn>
                <ReactMarkdown
                  escapeHtml={false}
                  source={content || 'Не вдалося знайти цей документ'}
                  renderers={renderers}
                />
              </FadeIn>
            </>
          );
        })}

        {onFail(() => {
          return (
            <Flex direction="column" alignment={{ horizontal: 'center' }}>
              <FadeIn>
                <Flex margin={{ top: 'large', bottom: 'regular' }}>
                  <Text variant="h3" align="center" color="var(--c-negative)">
                    Хм, щось пішло не так...
                  </Text>
                </Flex>

                <Flex alignment={{ horizontal: 'center' }}>
                  <Styled.ActionButton onClick={() => goBack()}>
                    <ArrowIcon />
                    Назад
                  </Styled.ActionButton>

                  {/* eslint-disable-next-line consistent-return */}
                  {onFail(({ code }) => {
                    if (code === '404') {
                      return (
                        <Flex isInline margin={{ left: 'regular' }}>
                          <Styled.ActionButton onClick={sendRequest}>
                            <ReloadIcon />
                            Оновити сторінку
                          </Styled.ActionButton>
                        </Flex>
                      );
                    }
                  })}
                </Flex>
              </FadeIn>
            </Flex>
          );
        })}
      </Container>
    </Layout>
  );
};

export default InfoComponent;
