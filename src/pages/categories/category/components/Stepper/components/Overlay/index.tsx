import React, { useEffect, useState } from 'react';
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
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (isActive && !error) {
      setTimeout(() => {
        setMounted(false);
      }, 300);
    }
  }, [isActive]);

  return isMounted ? (
    <Styled.Overlay alignment={{ horizontal: 'center', vertical: 'center' }} isActive={isActive}>
      {error ? (
        <Flex>
          <Text variant="h4" align="center">
            {error}
          </Text>

          <Styled.RetryButton onClick={triggerRequest}>Retry</Styled.RetryButton>
        </Flex>
      ) : (
        <Spinner appearance={{ size: 32 }} />
      )}
    </Styled.Overlay>
  ) : null;
};

export default Overlay;
