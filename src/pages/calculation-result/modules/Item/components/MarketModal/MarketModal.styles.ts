import styled from 'styled-components';

const Link = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    img {
      opacity: 0.75;
    }

    &:after {
      content: unset;
    }
  }

  &:not(:last-child) {
    margin-right: var(--i-large);
  }
`;

const Logo = styled.img`
  height: 3rem;
  width: auto;

  margin-bottom: var(--i-regular);

  transition: opacity var(--transition);
`;

export default { Link, Logo };
