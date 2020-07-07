import styled, { css } from 'styled-components';

const Carousel = styled.div`
  width: 100%;

  margin: 0 var(--i-regular);

  display: flex;

  overflow-x: hidden;
`;

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

    transition: opacity var(--transition);

    pointer-events: ${$isVisible ? 'auto' : 'none'};

    svg {
      transform: rotateY(${Number(Boolean($direction === 'left')) * 180}deg);
    }
  `
);

const Styled = { Carousel, List, ListItem, Chevron };

export default Styled;
