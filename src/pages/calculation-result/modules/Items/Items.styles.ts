import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';

const getShadowGradient = (direction: 'left' | 'right'): FlattenSimpleInterpolation => {
  return css`linear-gradient(to ${direction}, rgba(216, 216, 216, 0.5), rgba(222, 222, 222, 0))`;
};

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

    background-image: ${getShadowGradient('right')};
  }

  &:after {
    right: 0;

    background-image: ${getShadowGradient('left')};
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
