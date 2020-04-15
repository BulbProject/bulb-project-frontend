import React from 'react';

import { Flex, Placeholder } from 'ustudio-ui';

import Styled from '../../../styles/categories';
import { getRandomWidth } from '../../../utils';

const StubCard = () => {
  return (
    <Styled.BaseCard direction="column">
      <Styled.StubTitle
        appearance={{
          height: 'h5',
          width: getRandomWidth(25, 100),
        }}
        variant="text"
      />

      <Styled.StubDescription
        appearance={{
          height: 'small',
          width: getRandomWidth(25, 100),
        }}
        variant="text"
      />

      <Flex>
        <Placeholder
          appearance={{
            height: 'small',
            width: '52px',
          }}
          variant="text"
        />

        <Styled.StubClassificationDescription
          appearance={{
            height: 'small',
            width: getRandomWidth(25, 100),
          }}
          variant="text"
        />
      </Flex>
    </Styled.BaseCard>
  );
};

export default StubCard;
