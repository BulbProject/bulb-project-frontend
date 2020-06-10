import styled, { css } from 'styled-components';
import Text from 'ustudio-ui/components/Text';

const Requirement = styled.label`
  position: relative;

  display: block;
  width: 100%;

  &:not(:last-child) {
    margin-bottom: var(--i-regular);
  }
`;

const Title = styled(Text)<{ isBoolean: boolean }>(
  ({ isBoolean }) => css`
    ${isBoolean
      ? css`
          margin-bottom: 2px;
          margin-right: var(--i-regular);
        `
      : css`
          margin-bottom: var(--i-small);
        `};

    transition: color var(--transition);
  `
);

const Error = styled(Text)`
  position: absolute;

  bottom: -1rem;
  left: 0;
`;

export default { Requirement, Title, Error };
