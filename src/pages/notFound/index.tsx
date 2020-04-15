import React from 'react';

import { useHistory } from 'react-router-dom';
import { Cell, Grid, Button, Flex } from 'ustudio-ui';

import logo from 'assets/images/logo.svg';
import Styled from './styles';


const NotFoundPage = () => {
  const { goBack, replace } = useHistory();

  return (
    <Styled.Wrapper>
      <Styled.Container>
        <Cell xs={{ offset: { before: 2, after: 2 }, size: 8 }}>
          <Grid xs={{ direction: 'column' }}>
            <Cell xs={{ size: 4, offset: { before: 3 } }}>
              <Flex alignment={{ horizontal: 'center' }}>
                <Styled.ErrorStatus variant="h1">4</Styled.ErrorStatus>
                <Styled.Logo src={logo} alt="Bulb Project Logo" />
                <Styled.ErrorStatus variant="h1">4</Styled.ErrorStatus>
              </Flex>
            </Cell>

            <Cell xs={{ size: 2 }}>
              <Flex alignment={{ horizontal: 'center', vertical: 'center' }}>
                <Styled.ErrorDescription variant="h1">We could not find this page</Styled.ErrorDescription>
              </Flex>
            </Cell>

            <Cell xs={{ size: 3 }}>
              <Flex alignment={{ horizontal: 'space-around', vertical: 'center' }}>
                <Button appearance="text" onClick={() => goBack()}>
                  Go Back
                </Button>
                <Button appearance="text" onClick={() => replace('/')}>
                  Main page
                </Button>
              </Flex>
            </Cell>
          </Grid>
        </Cell>
      </Styled.Container>
    </Styled.Wrapper>
  );
};
export default NotFoundPage;
