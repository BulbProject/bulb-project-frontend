import styled from 'styled-components';
import { HashLink } from 'react-router-hash-link';

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Carousel = styled.div`
  width: 100%;
  margin-top: 36px;

  display: flex;
  align-items: center;

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

  padding: 0 42px;

  position: relative;

  flex-shrink: 0;

  scroll-snap-align: center;
`;

const Anchor = styled(HashLink)`
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

const NavigationList = styled.ul`
  margin-top: 4px;

  display: flex;
  align-items: center;
  justify-content: center;

  & > li:not(:last-child) {
    margin-right: 12px;
  }
`;

const NavigationItem = styled(HashLink)`
  width: 12px;
  height: 12px;

  display: block;

  border-radius: 8px;
  border: 1px solid var(--c-primary);

  background-color: transparent;

  &[data-active='true'] {
    background-color: var(--c-primary);
  }

  &:after {
    content: unset;
  }
`;

const Styled = {
  CarouselWrapper,
  Carousel,
  List,
  Item,
  PreviousAnchor,
  NextAnchor,
  PreviousButton,
  NextButton,
  Image,
  NavigationList,
  NavigationItem,
};

export default Styled;
