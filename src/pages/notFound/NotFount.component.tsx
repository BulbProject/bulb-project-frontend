import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from 'ustudio-ui/components/Button';
import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

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
          <Text color="var(--c-dark)" align="center" variant="h1">
            We could not find this page
          </Text>
        </Flex>

        <Flex margin={{ top: 'large' }} alignment={{ horizontal: 'space-around', vertical: 'center' }}>
          <Button appearance="text" onClick={() => goBack()}>
            Go Back
          </Button>

          <Button appearance="text" onClick={() => replace('/')}>
            Main page
          </Button>
        </Flex>
      </Styled.Content>
    </Container>
  );
};

export default NotFoundPage;
