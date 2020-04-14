import React from 'react';

import { Flex, Placeholder } from 'ustudio-ui';

import Styled from '../../../styles/categories';

const StubCard = () => {
  const getRandomWidth = () => {
    return `${Math.floor(Math.random() * (100 - 25)) + 25}%`;
  };

  return (
    <Styled.BaseCard direction="column">
      <Styled.StubTitle
        appearance={{
          height: 'h5',
          width: getRandomWidth(),
        }}
        variant="text"
      />

      <Styled.StubDescription
        appearance={{
          height: 'small',
          width: getRandomWidth(),
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
            width: getRandomWidth(),
          }}
          variant="text"
        />
      </Flex>
    </Styled.BaseCard>
  );
};

export default StubCard;
