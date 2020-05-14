import styled, { css } from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';

const Items = styled(Flex)`
  position: relative;

  overflow-x: hidden;

  width: 450px;

  &:before {
    content: '';

    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;

    width: 30px;

    background-image: linear-gradient(to right, rgba(238, 238, 238, 0.5), rgba(222, 222, 222, 0));

    pointer-events: none;
  }
`;

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
    height: 30px;

    border-radius: 15px;

    overflow: hidden;

    position: absolute;

    top: 50%;
    ${$position}: var(--i-small);

    z-index: 10;

    transform: translateY(-50%);

    color: var(--c-primary);

    opacity: 0.5;

    transition: opacity var(--transition);

    &:hover {
      opacity: 0.75;

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

      width: 100%;
      height: 100%;

      position: absolute;

      top: 0;
      ${$position}: 0;

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

const IndicatorsContainer = styled(Flex)`
  position: absolute;
  top: 3.5rem;
  left: 0;
  right: 0;
`;

const Indicator = styled.div(
  ({ active }: { active: boolean }) => css`
    width: ${active ? '12px' : 'var(--i-medium)'};
    height: ${active ? '12px' : 'var(--i-medium)'};

    margin: var(--i-small);

    border-radius: ${active ? '12px' : 'var(--i-medium)'};

    background-color: ${active ? 'var(--c-primary)' : 'var(--c-neutral)'};

    transition: var(--transition);
  `
);

export default { Items, AvailableVariants, Carousel, CarouselButton, ItemsTitle, IndicatorsContainer, Indicator };
