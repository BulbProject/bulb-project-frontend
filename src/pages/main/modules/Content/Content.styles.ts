import styled, { keyframes } from 'styled-components';

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

const Content = styled.section`
  position: relative;

  padding: var(--i-large) 0;

  background-color: var(--c-lightest);

  animation: ${show} 1.5s ease-in-out;
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

const Arrow = styled.span`
  position: absolute;
  top: 0.5rem;
  left: 50%;

  transform: translateX(-50%) rotate(-90deg);

  opacity: 0;

  width: 1rem;
  height: 1rem;

  color: var(--c-primary);

  animation: ${arrowBlink} 1.5s ease-in-out;
`;

export default { Content, Arrow };
