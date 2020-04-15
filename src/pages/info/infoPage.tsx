import React from 'react';

import { useParams, useHistory } from 'react-router-dom';

import { Button, Cell, Flex, Grid, Spinner } from 'ustudio-ui';

import { Helmet } from 'react-helmet';

import ReactMarkdown from 'react-markdown';
import { renderers } from 'components/markdown/renderers';

import { useRequest } from 'hooks';
import { getInfoFile } from 'config';

import { kebabCaseToSentenceCase } from 'utils';

import arrowIcon from 'assets/icons/arrow.svg';
import refreshIcon from 'assets/icons/refresh.svg';

import Styled from './styles';

const InfoPage = () => {
  const { goBack } = useHistory();
  const { infoFileName } = useParams();
  const { isLoading, data: infoFileContent, error, triggerRequest } = useRequest(getInfoFile(infoFileName as string));

  return (
    <Grid isContainer>
      <Cell xs={{ offset: { before: 2, after: 2 }, size: 8 }}>
        {isLoading && !error && (
          <Styled.CenteredContainer>
            <Spinner appearance={{ size: 80 }} />
          </Styled.CenteredContainer>
        )}

        {!isLoading && !error && (
          <>
            <Helmet>
              <title>{kebabCaseToSentenceCase(infoFileName as string)}</title>
            </Helmet>

            <ReactMarkdown escapeHtml={false} source={infoFileContent as string} renderers={renderers} />
          </>
        )}

        {!isLoading && error && (
          <Flex direction="column" alignment={{ horizontal: 'center' }}>
            <Styled.ErrorText variant="h3"> Hmm, something went wrong</Styled.ErrorText>

            <Flex alignment={{ horizontal: 'center' }}>
              <Button onClick={() => goBack()}>
                <Styled.Icon src={arrowIcon} alt="Go back icon" />
                Go to back
              </Button>

              {error.statusCode !== 404 && (
                <Styled.RefreshButton onClick={() => triggerRequest()}>
                  <Styled.Icon src={refreshIcon} alt="Go back icon" />
                  Refresh
                </Styled.RefreshButton>
              )}
            </Flex>
          </Flex>
        )}
      </Cell>
    </Grid>
  );
};

export default InfoPage;
