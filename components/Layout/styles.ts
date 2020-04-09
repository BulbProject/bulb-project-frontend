import styled, { css } from 'styled-components';

import { Drawer as uDrawer, Text } from 'ustudio-ui';

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

const DrawerButton = styled.button(
  ({ drawerIsShow }: { drawerIsShow: boolean }) => css`
    width: 2rem;
    height: 22px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    z-index: 801;

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

    transition: var(--transition);

    &:before,
    &:after {
      content: '';
      width: 32px;
      height: 2px;

      background-color: var(--c-darkest);

      transform-origin: right center;

      transition: var(--transition);
    }

    ${drawerIsShow
      ? css`
          background-position-x: 32px;

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

const Drawer = styled(uDrawer)`
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
  &:not(:last-child) {
    margin-bottom: var(--i-large);
  }
`;

const Main = styled.main`
  flex-grow: 1;
`;

const Footer = styled.footer`
  padding: 4px 0;

  background-color: var(--c-light);

  font-size: 12px;
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
