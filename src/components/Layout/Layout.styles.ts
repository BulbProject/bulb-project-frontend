import { Link } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

import LibDrawer from 'ustudio-ui/components/Drawer';

import { Mixin } from 'ustudio-ui/theme';

const Layout = styled.div`
  height: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  height: 64px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: var(--i-regular) var(--i-large);

  background-image: linear-gradient(to top, #f6f6f6, #fff);

  box-shadow: var(--s-light);
`;

const LogoLink = styled(Link)`
  max-height: 3rem;

  display: flex;
  align-items: center;

  &:after {
    content: none;
  }
`;

const LogoImage = styled.img`
  width: 4rem;
  margin-right: var(--i-regular);
`;

const LogoText = styled.span`
  line-height: 1;
  font-size: 24px;
  font-weight: 700;
  color: var(--c-darkest);
  user-select: none;
`;

const OpenDrawerButtonAnimation = keyframes`
  0% {
    opacity: 0;
  }

  50% {
    z-index: 801;
    opacity: 0;
  }

  100% {
    z-index: 801;
    opacity: 1;
  }
`;

const CloseDrawerButtonAnimation = keyframes`
  0% {
    opacity: 0;
  }

  50% {
    z-index: 1;
    opacity: 0;
  }

  100% {
    z-index: 1;
    opacity: 1;
  }
`;

const DrawerButton = styled.button(
  ({ drawerIsOpen }: { drawerIsOpen: boolean }) => css`
    --delay: calc(var(--transition) * 2);

    width: 2rem;
    height: 22px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    border: none;

    background-image: linear-gradient(
      to bottom,
      var(--c-lightest) calc(50% - 1px),
      var(--c-darkest) calc(50% - 1px),
      var(--c-darkest) calc(50% + 1px),
      var(--c-lightest) calc(50% + 1px)
    );
    background-repeat: no-repeat;
    background-position-x: 0;

    animation-name: ${CloseDrawerButtonAnimation};
    animation-duration: calc(var(--delay) * 2);
    animation-fill-mode: both;

    transition: calc(var(--transition) / 2);
    transition-delay: calc(var(--delay) * 2);

    &:before,
    &:after {
      content: '';
      width: 32px;
      height: 2px;

      background-color: var(--c-darkest);

      transform-origin: right center;

      transition: calc(var(--transition) / 2);
      transition-delay: calc(var(--delay) * 2);
    }

    ${drawerIsOpen
      ? css`
          background-position-x: 32px;
          animation-name: ${OpenDrawerButtonAnimation};
          animation-duration: var(--delay);
          animation-fill-mode: forwards;

          transition-delay: var(--delay);

          &:before,
          &:after {
            transition-delay: var(--delay);
          }

          &:before {
            transform: rotate(-45deg) scale(0.89);
          }

          &:after {
            transform: rotate(45deg) scale(0.89);
          }
        `
      : ''};
  `
);

const Drawer = styled(LibDrawer)`
  width: 320px;

  flex-direction: column;

  padding: var(--i-regular) var(--i-large);
`;

const Main = styled.main`
  flex-grow: 1;
`;

const Footer = styled.footer`
  padding: var(--i-small) 0;

  background-color: var(--c-light);

  ${Mixin.Font.bodySmall()};
  text-align: center;
`;

export default {
  Layout,
  Header,
  LogoLink,
  LogoImage,
  LogoText,
  DrawerButton,
  Drawer,
  Main,
  Footer,
};
