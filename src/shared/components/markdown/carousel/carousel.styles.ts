import styled from 'styled-components';

const Carousel = styled.div`
  width: 100%;
  margin: 0 auto;

  display: flex;
  align-items: center;

  /* !!! */
  overflow: hidden;
`;

const List = styled.ul`
  width: 100%;

  position: relative;
  z-index: 2;

  display: flex;

  overflow-x: auto;

  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 0;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    border: none;
  }
`;

const Item = styled.li`
  width: 100%;

  padding: 0 32px;

  position: relative;

  flex-shrink: 0;

  scroll-snap-align: center;
`;

const Anchor = styled.a`
  position: absolute;
  top: 50%;

  z-index: 2;

  width: 32px;
  height: 32px;

  transform: translateY(-8px);

  &:after {
    content: unset;
  }
`;

const PreviousAnchor = styled(Anchor)`
  left: 0;
`;

const NextAnchor = styled(Anchor)`
  right: 0;
`;

const Button = styled.button`
  width: 32px;
  height: 32px;

  position: relative;

  color: var(--c-primary);
`;

const PreviousButton = styled(Button)`
  left: 32px;

  transform: rotate(180deg);
`;

const NextButton = styled(Button)`
  right: 32px;
`;

const Image = styled.img`
  flex: 1;
  height: auto;
`;

const Styled = { Carousel, List, Item, PreviousAnchor, NextAnchor, PreviousButton, NextButton, Image };

export default Styled;
