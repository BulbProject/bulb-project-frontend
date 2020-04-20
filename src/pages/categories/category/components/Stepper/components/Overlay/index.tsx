import React from 'react';
import { Flex, Spinner, Text } from 'ustudio-ui';

import Styled from './styles';

const Overlay = ({
  isActive,
  error,
  triggerRequest,
}: {
  isActive: boolean;
  error?: string;
  triggerRequest: () => void;
}) => {
  return (
    <>
      <Styled.Overlay alignment={{ horizontal: 'center', vertical: 'center' }} isActive={isActive}>
        {error ? (
          <Flex direction="column" alignment={{ horizontal: 'center' }}>
            <Text variant="h4" align="center">
              {error}
            </Text>

            <Styled.RetryButton onClick={triggerRequest}>Retry</Styled.RetryButton>
          </Flex>
        ) : (
          <Spinner appearance={{ size: 64 }} />
        )}
      </Styled.Overlay>

      <Styled.Background />
    </>
  );
};

export default Overlay;
