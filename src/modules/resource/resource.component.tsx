import React, { FC, useEffect } from 'react';

import { useParams, useHistory } from 'react-router-dom';

import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';
import Text from 'ustudio-ui/components/Text';

import { Helmet } from 'react-helmet';
import axios, { AxiosError } from 'axios';
import useAsync from 'honks/use-async';

import { Container, Markdown, Fade } from 'shared/components';
import { useResourcesApi } from 'core/context/resources-api-provider';

import ArrowIcon from '../../assets/icons/arrow.inline.svg';
import ReloadIcon from '../../assets/icons/reload.inline.svg';

import Styled from './resource.styles';

const Resource: FC = () => {
  const { goBack } = useHistory();
  const { resourceFileName } = useParams();

  const { getResourceFileConfig } = useResourcesApi();

  const { onPending, onResolve, onReject, call: getResourceFile } = useAsync<{ content: string }, AxiosError>(
    async () => {
      const { data } = await axios(getResourceFileConfig(resourceFileName as string));

      return data;
    }
  );

  useEffect(() => {
    getResourceFile();
  }, [resourceFileName]);

  return (
    <Fade>
      <Container>
        <Helmet>
          <title>{resourceFileName}</title>
        </Helmet>

        {onPending(() => {
          return (
            <Styled.CenteredContainer>
              <Spinner appearance={{ size: 64 }} delay={300} />
            </Styled.CenteredContainer>
          );
        })}

        {onResolve(({ content }) => {
          return (
            <Fade>
              <Markdown source={content} />
            </Fade>
          );
        })}

        {onReject(({ code }) => {
          return (
            <Flex direction="column" alignment={{ horizontal: 'center' }}>
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

                {code === '404' && (
                  <Flex isInline margin={{ left: 'regular' }}>
                    <Styled.ActionButton onClick={getResourceFile}>
                      <ReloadIcon />
                      Оновити сторінку
                    </Styled.ActionButton>
                  </Flex>
                )}
              </Flex>
            </Flex>
          );
        })}
      </Container>
    </Fade>
  );
};

export default Resource;
