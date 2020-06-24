import React, { FC } from 'react';
import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';
import Text from 'ustudio-ui/components/Text';

import { FallbackButton } from 'shared/components';

import Styled from './overlay.styles';

export const Overlay: FC<{
  isActive: boolean;
  error?: string;
  triggerRequest: () => void;
}> = ({ isActive, error, triggerRequest }) => {
  return (
    <>
      <Styled.Overlay alignment={{ horizontal: 'center', vertical: 'center' }} isActive={isActive}>
        {error ? (
          <Flex direction="column" alignment={{ horizontal: 'center' }}>
            <Text variant="h4" align="center">
              {error}
            </Text>

            <FallbackButton onClick={triggerRequest}>Retry</FallbackButton>
          </Flex>
        ) : (
          <Spinner appearance={{ size: 64 }} />
        )}
      </Styled.Overlay>

      <Styled.Background />
    </>
  );
};
