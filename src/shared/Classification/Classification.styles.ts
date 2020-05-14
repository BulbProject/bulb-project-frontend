import styled, { css } from 'styled-components';
import { Text } from 'ustudio-ui';

const circleDimension = 0.4;

const ClassificationId = styled(Text)<{ isDisabled: boolean }>(
  ({ isDisabled }) => css`
    color: ${isDisabled ? 'var(--c-neutral)' : 'var(--c-secondary)'};

    white-space: nowrap;

    position: relative;

    margin-right: var(--i-regular);
    padding-right: var(--i-regular);

    &:after {
      content: '';

      width: ${circleDimension}rem;
      height: ${circleDimension}rem;

      position: absolute;
      right: -${circleDimension / 2}rem;
      top: ${circleDimension + 0.1}rem;

      transform: translateY(-50%);

      background-color: ${isDisabled ? 'var(--c-neutral)' : 'var(--c-secondary)'};
      border-radius: 50%;
    }
  `
);

export default { ClassificationId };
