import styled, { css, keyframes } from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';
import { Mixin } from 'ustudio-ui/theme';

const Content = styled.section`
  position: relative;

  background-color: var(--c-lightest);
`;

const arrowBlink = keyframes`
  0% {
    opacity: 0;
  }
  
  50% {
    opacity: 1;
  }
  
  100% {
    opacity: 0;
  }
`;

const show = keyframes`
  0% {
    top: 0;
  }
  
  50% {
    top: -2rem;
  }
  
  100% {
    top: 0;
  }
`;

const Arrow = styled(Flex)`
  position: absolute;
  top: 0;

  height: 2rem;

  color: var(--c-primary);
  background-color: var(--c-lightest);

  animation: ${show} 1.5s ease-in-out;
  animation-delay: 1.5s;

  svg {
    width: 1rem;
    height: 1rem;

    opacity: 0;

    transform: rotate(-90deg);

    animation: ${arrowBlink} 1.5s ease-in-out;
    animation-delay: 1.5s;
  }
`;

export default { Content, Arrow };
