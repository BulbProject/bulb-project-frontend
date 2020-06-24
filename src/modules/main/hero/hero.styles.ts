import styled, { css, keyframes } from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import { Mixin } from 'ustudio-ui/theme';

const Hero = styled(Flex)`
  position: relative;

  height: 100vh;
  padding: 0 2rem;

  color: var(--c-white);

  background-image: linear-gradient(to bottom, rgba(26, 26, 26, 1), rgba(26, 26, 26, 1) 75%, rgba(26, 26, 26, 0.975));

  ${Mixin.Screen.xs(css`
    padding: 4rem 2rem;
  `)}
`;

const textAppearance = keyframes`
  from {
    bottom: -2rem;
  }

  to {
    bottom: 0;
  }
`;

const HeroText = styled(Text).attrs(() => ({
  align: 'center',
}))`
  position: relative;

  animation: ${textAppearance} 1.5s;
`;

const HeroCaption = styled(HeroText)`
  position: relative;

  ${Mixin.Font.caption()};

  color: var(--c-secondary-light);

  &:before,
  &:after {
    content: '';

    height: 1px;
    width: 1rem;

    position: absolute;
    top: 50%;

    transform: translateY(-50%);

    background-color: var(--c-secondary-light);
  }

  &:before {
    left: -1.5rem;
  }

  &:after {
    right: -1.5rem;
  }
`;

const HeroDescription = styled(HeroText)`
  width: 100%;
  max-width: 730px;

  margin-top: 3rem;

  ${Mixin.Screen.xs(css`
    width: 75%;
  `)}

  ${Mixin.Screen.md(css`
    width: 66%;
  `)}

  ${Mixin.Screen.lg(css`
    width: 50%;
  `)}
`;

const ActionImage = styled.img`
  position: relative;
  z-index: 2;

  margin-bottom: var(--i-regular);

  opacity: 0.8;

  transition: opacity var(--transition);

  ${Mixin.Device.desktop(css`
    &:hover {
      opacity: 1;
    }

    &:active {
      opacity: 0.8;
    }
  `)}

  ${Mixin.Device.mobile(css`
    &:focus {
      opacity: 1;
    }
  `)}
`;

const ActionButton = styled(Text)`
  color: var(--c-dark);

  transition: transform var(--transition);

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
  }
`;

const Link = styled(RouterLink)`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  margin-bottom: var(--i-large);

  &:after {
    content: unset;
  }
`;

const ripple = keyframes`
  0% {
    opacity: 0;
    width: 0;
    height: 0;
  }

  15% {
    opacity: 1;
  }

  50%,
  100% {
    opacity: 0;
    width: 4rem;
    height: 4rem;
  }
`;

const bump = keyframes`
  0% {
    transform: scale(0.975);
  }

  50% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.975);
  }
`;

const CallToAction = styled.button`
  position: relative;
  overflow: hidden;

  width: 4rem;

  transition: var(--transition);

  animation: ${bump} 2s ease-in-out infinite;

  &:before {
    content: '';

    position: absolute;
    top: 33%;
    left: 50%;
    z-index: 1;

    border-radius: 4rem;

    transform: translateX(-50%) translateY(-50%);

    background-image: radial-gradient(
      circle,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0.75) 100%
    );

    animation: ${ripple} 3s infinite;
  }
`;

const arrowBlink = keyframes`
  0% {
    opacity: 0;
  }

  12.5% {
    opacity: 1;
  }

  25% {
    opacity: 0;
  }
`;

const show = keyframes`
  0% {
    bottom: -2rem;
    opacity: 1;
  }

  12.5% {
    bottom: 0;
    opacity: 1;
  }

  25% {
    bottom: -2rem;
    opacity: 0;
  }
`;

const Arrow = styled(Flex)`
  position: absolute;
  bottom: 0;

  opacity: 0;

  height: 2rem;

  color: var(--c-secondary);
  background-color: var(--c-darkest);

  animation: ${show} 6s ease-in-out infinite;
  animation-delay: 1.5s;

  svg {
    width: 1rem;
    height: 1rem;

    opacity: 0;

    transform: rotate(-90deg);

    animation: ${arrowBlink} 6s ease-in-out infinite;
    animation-delay: 1.5s;
  }
`;

const Styled = { Hero, HeroText, HeroCaption, HeroDescription, ActionImage, CallToAction, ActionButton, Link, Arrow };

export default Styled;
