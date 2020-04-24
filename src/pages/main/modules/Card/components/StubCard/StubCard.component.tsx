import React from 'react';

import Flex from 'ustudio-ui/components/Flex';
import Placeholder from 'ustudio-ui/components/Placeholder';

import { getRandomWidth } from 'utils';

import Styled from '../../Card.styles';

export const StubCard = () => {
  return (
    <Styled.BaseCard direction="column">
      <Flex margin={{ bottom: 'medium' }}>
        <Placeholder
          appearance={{
            height: 'h5',
            width: getRandomWidth(25, 100),
          }}
          variant="text"
        />
      </Flex>

      <Flex margin={{ bottom: 'regular' }}>
        <Placeholder
          appearance={{
            height: 'small',
            width: getRandomWidth(25, 100),
          }}
          variant="text"
        />
      </Flex>

      <Flex>
        <Placeholder
          appearance={{
            height: 'small',
            width: '52px',
          }}
          variant="text"
        />
        <Flex margin={{ left: 'regular' }}>
          <Placeholder
            appearance={{
              height: 'small',
              width: getRandomWidth(25, 100),
            }}
            variant="text"
          />
        </Flex>
      </Flex>
    </Styled.BaseCard>
  );
};
