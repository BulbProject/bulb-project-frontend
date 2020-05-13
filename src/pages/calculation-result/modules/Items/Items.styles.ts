import styled, { css } from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';

const Items = styled(Flex)`
  position: relative;

  overflow-x: hidden;

  &:after {
    content: '';

    position: absolute;
    top: calc(50% - 7px);
    bottom: 0;
    right: 0;

    width: 30px;

    background-image: linear-gradient(to left, rgba(222, 222, 222, 0.7), rgba(222, 222, 222, 0));

    pointer-events: none;

    @media screen and (min-width: 798px) {
      top: 0;
    }
  }

  @media screen and (max-width: 797px) {
    &:before {
      content: '';

      position: absolute;
      top: calc(50% - 7px);
      bottom: 0;
      left: 0;

      width: 30px;

      background-image: linear-gradient(to right, rgba(222, 222, 222, 0.7), rgba(222, 222, 222, 0));

      pointer-events: none;
    }
  }
`;

const AvailableVariants = styled(Flex)<{ isMd: boolean }>(
  ({ isMd }) => css`
    position: relative;

    max-width: ${isMd ? 'calc(100% - 360px)' : 'calc(100vw - 4rem)'};

    overflow-x: auto;
  `
);

export default { Items, AvailableVariants };
