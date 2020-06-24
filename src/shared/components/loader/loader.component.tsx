import React, { FC } from 'react';
import { css } from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';

export const Loader: FC<{
  size?: number;
}> = ({ size = 32 }) => {
  return (
    <Flex
      alignment={{ horizontal: 'center', vertical: 'center' }}
      styled={{
        Flex: css`
          height: 100%;

          position: absolute;

          z-index: 10;

          top: 50%;
          left: 50%;

          transform: translate(-50%, -50%);

          &:before {
            content: '';

            position: absolute;

            background-color: var(--c-darkest);

            width: 100%;
            height: 100%;

            opacity: 0.25;
          }
        `,
      }}
    >
      <Spinner appearance={{ size }} delay={500} />
    </Flex>
  );
};
