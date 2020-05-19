import styled from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';

const Items = styled(Flex)`
  position: relative;

  @media screen and (min-width: 1130px) {
    max-width: calc(100% - 450px);
  }

  &:before,
  &:after {
    position: absolute;
    top: 0;
    bottom: 0;

    z-index: 2;

    width: 30px;

    pointer-events: none;
  }

  &:before {
    content: '';
    left: 0;

    background-image: linear-gradient(to right, rgba(216, 216, 216, 0.5), rgba(222, 222, 222, 0));
  }

  &:after {
    right: 0;

    background-image: linear-gradient(to left, rgba(216, 216, 216, 0.5), rgba(222, 222, 222, 0));
  }
`;

const AvailableVariants = styled(Flex)`
  position: relative;
  height: 100%;

  padding-top: calc(var(--i-large) * 2 + var(--i-regular));
`;

const ItemsTitle = styled(Flex)`
  width: auto;

  position: absolute;

  top: calc(var(--i-regular) + 5px);
  left: var(--i-regular);

  text-transform: uppercase;
  white-space: nowrap;
`;

export default { Items, AvailableVariants, ItemsTitle };
