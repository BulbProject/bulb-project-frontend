import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Flex } from 'ustudio-ui';

import { Container } from 'shared';
import logo from 'assets/images/logo.svg';

import Styled from './ErrorPage.styles';

export const ErrorPage = () => {
  const { push } = useHistory();

  return (
    <Container>
      <Styled.Content direction="column">
        <Flex alignment={{ horizontal: 'center' }}>
          <Styled.Logo src={logo} alt="Bulb Project Logo" />
        </Flex>

        <Flex alignment={{ horizontal: 'center', vertical: 'center' }}>
          <Styled.ErrorDescription align="center" variant="h1">
            Ooops... Something went wrong
          </Styled.ErrorDescription>
        </Flex>

        <Styled.ButtonsContainer alignment={{ horizontal: 'space-around', vertical: 'center' }}>
          <Button appearance="text" onClick={() => window.location.reload()}>
            Refresh page
          </Button>

          <Button appearance="text" onClick={() => push('/')}>
            Main page
          </Button>
        </Styled.ButtonsContainer>
      </Styled.Content>
    </Container>
  );
};
