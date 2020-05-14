import styled, { css } from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';

const Items = styled(Flex)<{ hasMany: boolean }>(
  ({ hasMany }) => css`
    position: relative;

    overflow-x: hidden;

    width: 380px;

    &:before {
      content: ${hasMany ? 'unset' : `''`};

      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;

      width: 30px;

      background-image: linear-gradient(to right, rgba(222, 222, 222, 0.7), rgba(222, 222, 222, 0));

      pointer-events: none;
    }
  `
);

const AvailableVariants = styled(Flex)<{ isMd: boolean }>`
  position: relative;
  height: 100%;

  overflow-x: hidden;
`;

const Carousel = styled(Flex)<{ $offset: number }>(
  ({ $offset }) => css`
    position: absolute;

    top: 0;
    bottom: 0;
    left: ${-$offset}px;

    transition: left var(--transition);
  `
);

const CarouselButton = styled.button<{ rotation: number; $position: 'left' | 'right' }>(
  ({ rotation, $position }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 30px;
    height: 100%;

    position: absolute;

    top: 0;
    ${$position}: 0;

    z-index: 10;

    color: var(--c-primary);

    &:hover {
      &:before {
        opacity: 0.5;
      }
    }

    svg {
      width: 1rem;

      transform: rotate(${rotation}deg);
    }

    &:before {
      content: '';

      width: 30px;
      height: 30px;

      border-radius: 15px;

      position: absolute;

      top: 50%;
      ${$position}: 0;
      bottom: 0;

      transform: translateY(-50%);

      background-color: var(--c-primary-light);

      opacity: 0.25;

      transition: opacity var(--transition);
    }
  `
);

const ItemsTitle = styled(Flex)`
  margin-top: calc(var(--i-regular) + 5px);
  margin-bottom: calc(var(--i-large) + 5px);

  padding-left: var(--i-large);
`;

export default { Items, AvailableVariants, Carousel, CarouselButton, ItemsTitle };
