import styled, { css } from 'styled-components';

const Link = styled.a<{ image: string }>(
  ({ image }) => css`
    height: 4rem;
    width: 8rem;

    margin-bottom: var(--i-regular);

    background-image: url(${image});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    transition: opacity var(--transition);

    &:hover {
      opacity: 0.75;

      &:after {
        content: unset;
      }
    }

    &:not(:last-child) {
      margin-right: var(--i-large);
    }
  `
);

export default { Link };
