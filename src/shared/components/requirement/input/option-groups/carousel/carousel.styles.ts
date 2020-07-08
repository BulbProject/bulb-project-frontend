import styled, { css } from 'styled-components';

const Carousel = styled.div<{ showLeftShadow: boolean; showRightShadow: boolean }>(
  ({ showLeftShadow, showRightShadow }) => css`
    position: relative;

    width: 100%;

    margin: 0 var(--i-regular);

    display: flex;

    overflow-x: hidden;

    &:before,
    &:after {
      position: absolute;

      width: 3rem;
      height: 100%;

      z-index: 2;
    }

    &:before {
      content: ${showLeftShadow ? `''` : 'unset'};

      left: 0;
      background-image: linear-gradient(to right, rgba(245, 245, 245, 0.9), rgba(255, 255, 255, 0));
    }

    &:after {
      content: ${showRightShadow ? `''` : 'unset'};

      right: 0;
      background-image: linear-gradient(to left, rgba(245, 245, 245, 0.9), rgba(255, 255, 255, 0));
    }
  `
);

const List = styled.ul<{ currentIndex: number; shift: number }>(
  ({ currentIndex: _, shift }) => css`
    position: relative;
    right: ${shift}px;

    margin: var(--i-regular) 0;

    display: flex;
    align-items: flex-start;

    transition: right var(--transition);
  `
);

const ListItem = styled.li`
  width: 7rem;

  display: flex;
  justify-content: center;

  &:not(:last-child) {
    margin-right: var(--i-regular);
  }
`;

const Chevron = styled.button<{ $direction: 'left' | 'right'; $isVisible: boolean }>(
  ({ $direction, $isVisible }) => css`
    width: 2rem;
    height: 2rem;

    margin-top: 3rem;

    color: var(--c-primary);

    opacity: ${Number(Boolean($isVisible))};

    transition: var(--transition);

    pointer-events: ${$isVisible ? 'auto' : 'none'};

    svg {
      transform: rotateY(${Number(Boolean($direction === 'left')) * 180}deg);
    }

    &:hover,
    &:focus {
      color: var(--c-primary-light);
    }
  `
);

const Styled = { Carousel, List, ListItem, Chevron };

export default Styled;
