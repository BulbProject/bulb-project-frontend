import styled, { css, keyframes } from 'styled-components';

import { Drawer as LibDrawer, Text } from 'ustudio-ui';
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

  box-shadow: var(--s-light);
`;

const LogoLink = styled.a`
  max-height: 3rem;

  display: flex;
  align-items: center;

  &:after {
    content: none;
  }
`;

const LogoImage = styled.img`
  width: 2rem;
  margin-right: var(--i-medium);
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

    transition: var(--transition);
    transition-delay: 0s;

    &:before,
    &:after {
      content: '';
      width: 32px;
      height: 2px;

      background-color: var(--c-darkest);

      transform-origin: right center;

      transition: var(--transition);
      transition-delay: 0s;
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
  min-width: 320px;

  flex-direction: column;

  padding: var(--i-regular) var(--i-large);
`;

const DrawerTitle = styled(Text)`
  margin-bottom: 2.5rem;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const NavLink = styled.a`
  margin-bottom: var(--i-large);
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
  DrawerTitle,
  Nav,
  NavLink,
  Main,
  Footer,
};
