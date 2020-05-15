import styled, { keyframes } from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';

const Content = styled.section`
  position: relative;

  height: 100vh;

  background-image: linear-gradient(to bottom, rgba(26, 26, 26, 1), rgba(26, 26, 26, 1) 75%, rgba(26, 26, 26, 0.975));
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
    opacity: 1;
  }

  50% {
    top: -2rem;
    opacity: 1;
  }

  100% {
    top: 0;
    opacity: 0;
  }
`;

const Arrow = styled(Flex)`
  position: absolute;
  top: 0;

  opacity: 0;

  height: 2rem;

  color: var(--c-secondary-light);
  background-color: rgba(26, 26, 26, 0.75);

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

const DocumentContainer = styled(Flex)`
  height: 100vh;

  justify-content: center;
  align-items: center;
`;

export default { Content, Arrow, DocumentContainer };
