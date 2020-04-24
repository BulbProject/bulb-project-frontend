import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from 'ustudio-ui/components/Button';
import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

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
          <Text color="var(--c-dark)" align="center" variant="h1">
            Ooops... Something went wrong
          </Text>
        </Flex>

        <Flex margin={{ top: 'large' }} alignment={{ horizontal: 'space-around', vertical: 'center' }}>
          <Button appearance="text" onClick={() => window.location.reload()}>
            Refresh page
          </Button>

          <Button appearance="text" onClick={() => push('/')}>
            Main page
          </Button>
        </Flex>
      </Styled.Content>
    </Container>
  );
};
