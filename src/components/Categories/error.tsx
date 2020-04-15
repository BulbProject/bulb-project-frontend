import React from 'react';

import { Button, Flex, Text } from 'ustudio-ui';

import Styled from '../../styles/categories';

const Error = ({ updateCategories }: { updateCategories: () => void }) => {
  return (
    <Flex direction="column" alignment={{ horizontal: 'center' }}>
      <Text>Sorry, we could not get categories list to load.</Text>

      <Styled.ButtonContainer alignment={{ horizontal: 'center' }}>
        <Button intent="positive" onClick={updateCategories}>
          Try again
        </Button>
      </Styled.ButtonContainer>
    </Flex>
  );
};

export default Error;
