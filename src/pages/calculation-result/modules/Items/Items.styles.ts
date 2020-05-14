import styled from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';

const Items = styled(Flex)`
  position: relative;

  overflow-x: hidden;

  &:after {
    content: none;

    position: absolute;
    top: calc(50% - 7px);
    bottom: 0;
    right: 0;

    width: 30px;

    background-image: linear-gradient(to left, rgba(222, 222, 222, 0.7), rgba(222, 222, 222, 0));

    pointer-events: none;

    @media screen and (min-width: 798px) {
      content: '';

      top: 0;
    }
  }

  @media screen and (max-width: 797px) {
    &:before {
      content: none;
    }
  }
`;

const AvailableVariants = styled(Flex)`
  position: relative;

  max-width: calc(100% - 360px);

  overflow-x: auto;

  @media (max-width: 796px) {
    max-width: calc(100vw - 1rem);
  }
`;

export default { Items, AvailableVariants };
