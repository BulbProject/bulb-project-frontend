import styled, { css } from 'styled-components';
import { Button, Flex } from 'ustudio-ui';

const Background = styled.div`
  background-color: var(--c-lightest);

  z-index: calc(var(--l-topmost) - 1);
`;

const Overlay = styled(Flex)<{ isActive: boolean }>(
  ({ isActive }) => css`
    transition: opacity var(--transition);

    z-index: var(--l-topmost);

    &,
    & + ${Background} {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }

    & + ${Background} {
      opacity: ${isActive ? 0.5 : 0};

      pointer-events: ${isActive ? 'auto' : 'none'};
    }
  `
);

const RetryButton = styled(Button)`
  margin-top: var(--i-large);
`;

export default { Overlay, Background, RetryButton };
