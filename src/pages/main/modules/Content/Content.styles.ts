import styled, { keyframes } from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';

const Content = styled.section`
  position: relative;

  background-image: linear-gradient(to bottom, rgba(26, 26, 26, 1), rgba(26, 26, 26, 1) 75%, rgba(26, 26, 26, 0.975));
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
    top: 0;
    opacity: 1;
  }

  12.5% {
    top: -2rem;
    opacity: 1;
  }

  25% {
    top: 0;
    opacity: 0;
  }
`;

const Arrow = styled(Flex)`
  position: absolute;
  top: 0;

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

const DocumentContainer = styled(Flex)`
  min-height: 100vh;

  justify-content: center;
  align-items: center;
`;

export default { Content, Arrow, DocumentContainer };
