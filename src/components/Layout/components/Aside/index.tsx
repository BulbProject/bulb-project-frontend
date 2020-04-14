import React from 'react';

import { Spinner, Flex, Button } from 'ustudio-ui';

import { useRequest } from 'hooks';

import { getInfoFiles } from 'config';

import { stringToKebabCase, kebabCaseToSentenceCase } from 'utils';

import refreshIcon from 'assets/icons/refresh.svg';

import Styled from './styles';

export const Aside = () => {
  const [trigger, setTrigger] = React.useState(false);
  const { isLoading, data: filesList, error } = useRequest<{ name: string }[]>(getInfoFiles(), [trigger]);

  return (
    <>
      <Styled.AsideTitle variant="h3">Resources</Styled.AsideTitle>

      <Styled.Nav>
        {isLoading && (
          <Flex alignment={{ horizontal: 'center' }}>
            <Spinner appearance={{ size: 48 }} />
          </Flex>
        )}

        {!isLoading &&
          !error &&
          filesList?.map(({ name }) => {
            const infoPageUrl = stringToKebabCase(name.replace(/\.md/, ''));

            return (
              <Styled.NavLink to={`/info/${infoPageUrl}`} key={name}>
                {kebabCaseToSentenceCase(infoPageUrl)}
              </Styled.NavLink>
            );
          })}

        {!isLoading && error && (
          <Styled.ErrorContainer alignment={{ horizontal: 'center' }} direction="column">
            <Styled.ErrorText>Hmm, something went wrong, please try again</Styled.ErrorText>
            <Button onClick={() => setTrigger(!trigger)}>
              <Styled.RefreshIcon src={refreshIcon} alt="Refresh icon" />
            </Button>
          </Styled.ErrorContainer>
        )}
      </Styled.Nav>
    </>
  );
};
