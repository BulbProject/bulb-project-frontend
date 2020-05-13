import styled, { css } from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';
import Button from 'ustudio-ui/components/Button';

const RequestedNeed = styled(Flex)`
  position: sticky;
  top: calc(var(--i-large) + 64px);
`;

const Wrapper = styled.div<{ isHidden?: boolean }>(
  ({ isHidden }) => css`
  flex-shrink: 0;

  position: relative;

  ${
    isHidden
      ? css`
          width: 100%;
          margin-top: var(--i-large);

          ${RequestedNeed} {
            position: static;
            top: unset;
          }
        `
      : css`
          width: 320px;
          margin-right: var(--i-large);
        `
  }}`
);

const Recalculate = styled(Button)`
  position: sticky;
  bottom: 0;
  z-index: var(--l-bottom);

  width: 100%;

  padding: var(--i-regular);
`;

const Overlay = styled(Flex)<{ isLoading: boolean }>(
  ({ isLoading }) => css`
    height: 100%;

    position: absolute;
    top: 0;
    left: 0;

    z-index: var(--l-bottom);

    pointer-events: ${isLoading ? 'auto' : 'none'};
    opacity: ${isLoading ? 1 : 0};
    transition: opacity var(--transition);

    &:before {
      content: '';

      width: 100%;
      height: 100%;

      position: absolute;
      top: 0;
      left: 0;

      background-color: var(--c-light);

      opacity: 0.75;
    }
  `
);

export default { Wrapper, RequestedNeed, Recalculate, Overlay };
