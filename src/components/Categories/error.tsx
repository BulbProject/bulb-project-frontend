import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { Button, Flex, Text } from 'ustudio-ui';

import Styled from '../../styles/categories';

const Error = () => {
  const location = useLocation();
  const { replace } = useHistory();

  return (
    <Flex direction="column" alignment={{ horizontal: 'center' }}>
      <Text>Sorry, we could not get categories list to load.</Text>

      <Styled.ButtonContainer alignment={{ horizontal: 'center' }}>
        <Button intent="positive" onClick={() => replace(location)}>
          Try again
        </Button>
      </Styled.ButtonContainer>
    </Flex>
  );
};

export default Error;
