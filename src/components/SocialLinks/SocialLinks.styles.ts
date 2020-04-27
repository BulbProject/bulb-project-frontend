import styled from 'styled-components';

const SocialLink = styled.a`
  width: 1.3rem;
  margin: 0 0.7rem;

  color: var(--c-darkest);

  transition: var(--transition);

  &:hover {
    color: var(--c-primary);
  }

  &:after {
    display: none;
  }
`;

export default {
  SocialLink,
};
