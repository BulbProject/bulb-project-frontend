import React from 'react';

import { Button, Flex, Text } from 'ustudio-ui';

import Styled from '../../../styles/categories';
import { useRouter } from 'next/router';

const StubCard = () => {
  const { reload } = useRouter();

  return (
    <Flex direction="column" alignment={{ horizontal: 'center' }}>
      <Text>Sorry, we could not get categories list to load.</Text>

      <Styled.ButtonContainer alignment={{ horizontal: 'center' }}>
        <Button intent="positive" onClick={() => reload()}>
          Try again
        </Button>
      </Styled.ButtonContainer>
    </Flex>
  );
};

export default StubCard;
