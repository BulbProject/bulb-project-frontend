import styled, { css } from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';
import { itemWidth } from '../../CalculationResult.module';

const Items = styled(Flex)<{ quantity: number; hasMany: boolean }>(
  ({ quantity, hasMany }) => css`
    position: relative;

    max-width: 100%;
    width: ${itemWidth * quantity}px;

    overflow-x: auto;

    &:before,
    &:after {
      position: absolute;
      top: 0;
      bottom: 0;

      width: 30px;

      pointer-events: none;
    }

    &:before {
      content: '';
      left: 0;

      background-image: linear-gradient(to right, rgba(238, 238, 238, 0.5), rgba(222, 222, 222, 0));
    }

    &:after {
      content: ${hasMany ? `''` : 'unset'};
      right: 0;

      background-image: linear-gradient(to left, rgba(238, 238, 238, 0.5), rgba(222, 222, 222, 0));
    }
  `
);

const AvailableVariants = styled(Flex)<{ isMd: boolean }>`
  position: relative;
  height: 100%;

  overflow-x: auto;
`;

const ItemsTitle = styled(Flex)`
  margin-top: calc(var(--i-regular) + 5px);
  margin-bottom: calc(var(--i-large) + 5px);

  padding-left: var(--i-large);
`;

export default { Items, AvailableVariants, ItemsTitle };
