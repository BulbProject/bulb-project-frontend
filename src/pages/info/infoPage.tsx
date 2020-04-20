import React from 'react';

import { useParams, useHistory } from 'react-router-dom';

import { Button, Flex, Spinner } from 'ustudio-ui';

import { Helmet } from 'react-helmet';

import ReactMarkdown from 'react-markdown';
import { renderers } from 'components/markdown/renderers';

import { useRequest } from 'hooks';
import { getInfoFile } from 'config';

import Container from 'components/Container';
import FadeIn from 'components/FadeIn';

import { kebabCaseToSentenceCase } from 'utils';

import arrowIcon from 'assets/icons/arrow.svg';
import refreshIcon from 'assets/icons/refresh.svg';

import Styled from './styles';

const InfoPage = () => {
  const { goBack } = useHistory();
  const { infoFileName } = useParams();
  const { isLoading, data: infoFileContent, error, triggerRequest } = useRequest(getInfoFile(infoFileName as string));

  return (
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
            <title>{kebabCaseToSentenceCase(infoFileName as string)}</title>
          </Helmet>

          <FadeIn>
            <ReactMarkdown escapeHtml={false} source={infoFileContent as string} renderers={renderers} />
          </FadeIn>
        </>
      )}

      {!isLoading && error && (
        <FadeIn>
          <Flex direction="column" alignment={{ horizontal: 'center' }}>
            <Styled.ErrorText variant="h3" align="center">
              Hmm, something went wrong
            </Styled.ErrorText>

            <Flex alignment={{ horizontal: 'center' }}>
              <Button onClick={() => goBack()}>
                <Styled.Icon src={arrowIcon} alt="Go back icon" />
                Go to back
              </Button>

              {error?.statusCode !== 404 && (
                <Styled.RefreshButton onClick={() => triggerRequest()}>
                  <Styled.Icon src={refreshIcon} alt="Go back icon" />
                  Refresh
                </Styled.RefreshButton>
              )}
            </Flex>
          </Flex>
        </FadeIn>
      )}
    </Container>
  );
};

export default InfoPage;
