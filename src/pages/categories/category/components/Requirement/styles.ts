import styled, { css } from 'styled-components';
import { RadioGroup as UIRadioGroup, Text } from 'ustudio-ui';

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

const RadioGroup = styled(UIRadioGroup)`
  margin-top: var(--i-medium);

  li > label {
    span {
      margin-right: var(--i-medium) !important;
    }
  }
`;

export default { Requirement, Title, RadioGroup };
