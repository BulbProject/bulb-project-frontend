import styled, { css } from 'styled-components';
import { Button, Flex } from 'ustudio-ui';

const Overlay = styled(Flex)<{ isActive: boolean }>(
  ({ isActive }) => css`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    background-color: var(--c-lightest);

    opacity: ${isActive ? 0.5 : 0};
    pointer-events: ${isActive ? 'auto' : 'none'};

    transition: opacity var(--transition);
  `
);

const RetryButton = styled(Button)`
  margin-top: var(--i-large);
`;

export default { Overlay, RetryButton };
