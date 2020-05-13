import styled, { css } from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';

const Items = styled(Flex)`
  position: relative;

  overflow-x: hidden;

  @media screen and (min-width: 798px) {
    &:after {
      content: '';

      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;

      width: 30px;

      background-image: linear-gradient(to left, rgba(222, 222, 222, 0.7), rgba(222, 222, 222, 0));

      pointer-events: none;
    }
  }
`;

const AvailableVariants = styled(Flex)<{ isMd: boolean }>(
  ({ isMd }) => css`
    position: relative;

    max-width: ${isMd ? 'calc(100% - 360px)' : 'calc(100vw - 4rem)'};

    overflow-x: auto;

    ${!isMd
      ? css`
          &:after,
          &:before {
            content: '';

            position: absolute;
            top: 0;
            bottom: 0;

            width: 30px;

            pointer-events: none;
          }

          &:after {
            right: 0;

            background-image: linear-gradient(to left, rgba(222, 222, 222, 0.7), rgba(222, 222, 222, 0));
          }

          &:before {
            left: 0;

            background-image: linear-gradient(to right, rgba(222, 222, 222, 0.7), rgba(222, 222, 222, 0));
          }
        `
      : ``}
  `
);

export default { Items, AvailableVariants };
