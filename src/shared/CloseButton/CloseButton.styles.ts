import styled from 'styled-components';

const Button = styled.button`
  position: absolute;
  top: var(--i-regular);
  right: var(--i-regular);
  z-index: 1;

  width: 1rem;

  color: var(--c-negative);

  transition: color var(--transition);

  &:hover,
  &:focus {
    color: var(--c-negative-light);
  }
`;

export default { Button };
