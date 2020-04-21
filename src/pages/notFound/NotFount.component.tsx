import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Flex } from 'ustudio-ui';

import { Container } from 'shared';
import logo from 'assets/images/logo.svg';

import Styled from './NotFound.styles';

const NotFoundPage = () => {
  const { goBack, replace } = useHistory();

  return (
    <Container>
      <Styled.Content direction="column">
        <Flex alignment={{ horizontal: 'center' }}>
          <Styled.ErrorStatus>4</Styled.ErrorStatus>

          <Styled.Logo src={logo} alt="Bulb Project Logo" />

          <Styled.ErrorStatus>4</Styled.ErrorStatus>
        </Flex>

        <Flex alignment={{ horizontal: 'center', vertical: 'center' }}>
          <Styled.ErrorDescription align="center" variant="h1">
            We could not find this page
          </Styled.ErrorDescription>
        </Flex>

        <Styled.ButtonsContainer alignment={{ horizontal: 'space-around', vertical: 'center' }}>
          <Button appearance="text" onClick={() => goBack()}>
            Go Back
          </Button>

          <Button appearance="text" onClick={() => replace('/')}>
            Main page
          </Button>
        </Styled.ButtonsContainer>
      </Styled.Content>
    </Container>
  );
};

export default NotFoundPage;
