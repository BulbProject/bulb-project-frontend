import styled, { css } from 'styled-components';
import Text from 'ustudio-ui/components/Text';

const Requirement = styled.label`
  display: block;

  &:not(:last-child) {
    margin-bottom: var(--i-regular);
  }
`;

const Title = styled(Text)<{ isBoolean: boolean }>(({ isBoolean }) =>
  isBoolean
    ? css`
        margin-bottom: 2px;
        margin-left: var(--i-medium);
      `
    : css`
        margin-bottom: var(--i-small);
      `
);

export default { Requirement, Title };
