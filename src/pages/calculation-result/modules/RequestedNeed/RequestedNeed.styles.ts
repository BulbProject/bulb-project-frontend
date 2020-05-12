import styled, { css } from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';
import Button from 'ustudio-ui/components/Button';

const Wrapper = styled.div`
  position: relative;

  flex: calc(1 / 4);
  margin-right: var(--i-large);
`;

const RequestedNeed = styled(Flex)`
  position: sticky;
  top: calc(var(--i-large) + 64px);
`;

const Recalculate = styled(Button)`
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
