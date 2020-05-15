import styled, { css } from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';
import { itemWidth } from '../../CalculationResult.module';

const Items = styled(Flex)<{ quantity: number; hasMany: boolean; isLg: boolean }>(
  ({ quantity, hasMany, isLg }) => css`
    position: relative;

    max-width: 100%;
    width: ${itemWidth * quantity}px;

    overflow-x: ${isLg ? 'auto' : 'visible'};

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
      content: ${hasMany && isLg ? `''` : 'unset'};
      right: 0;

      background-image: linear-gradient(to left, rgba(216, 216, 216, 0.5), rgba(222, 222, 222, 0));
    }
  `
);

const AvailableVariants = styled(Flex)<{ isLg: boolean }>(
  ({ isLg }) => css`
    position: relative;
    height: 100%;

    overflow-x: ${isLg ? 'auto' : 'visible'};
  `
);

const ItemsTitle = styled(Flex)`
  margin-top: calc(var(--i-regular) + 5px);
  margin-bottom: calc(var(--i-large) + 5px);

  padding-left: var(--i-large);
`;

export default { Items, AvailableVariants, ItemsTitle };
