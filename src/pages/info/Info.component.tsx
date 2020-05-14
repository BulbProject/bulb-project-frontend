import React from 'react';

import { useParams, useHistory } from 'react-router-dom';

import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';
import Text from 'ustudio-ui/components/Text';

import { Helmet } from 'react-helmet';

import ReactMarkdown from 'react-markdown';

import { useRequest } from 'hooks';
import { getInfoFile } from 'config';

import { Container } from 'shared';
import { Layout, FadeIn, renderers } from 'components';

import ArrowIcon from '../../assets/icons/arrow.inline.svg';
import ReloadIcon from '../../assets/icons/reload.inline.svg';

import Styled from './Info.styles';

const InfoComponent = () => {
  const { goBack } = useHistory();
  const { infoFileName } = useParams();
  const { isLoading, data, error, triggerRequest } = useRequest<{ content: string }>(
    getInfoFile(infoFileName as string),
    {
      dependencies: [infoFileName],
    }
  );

  return (
    <Layout>
      <Container>
        {isLoading && !error && (
          <FadeIn>
            <Styled.CenteredContainer>
              <Spinner appearance={{ size: 64 }} delay={300} />
            </Styled.CenteredContainer>
          </FadeIn>
        )}

        {!isLoading && !error && (
          <>
            <Helmet>
              <title>{infoFileName}</title>
            </Helmet>

            <FadeIn>
              <ReactMarkdown
                escapeHtml={false}
                source={data?.content || 'Не вдалося знайти цей документ'}
                renderers={renderers}
              />
            </FadeIn>
          </>
        )}

        {!isLoading && error && (
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

                {error?.statusCode !== 404 && (
                  <Flex isInline margin={{ left: 'regular' }}>
                    <Styled.ActionButton onClick={() => triggerRequest()}>
                      <ReloadIcon />
                      Оновити сторінку
                    </Styled.ActionButton>
                  </Flex>
                )}
              </Flex>
            </FadeIn>
          </Flex>
        )}
      </Container>
    </Layout>
  );
};

export default InfoComponent;
