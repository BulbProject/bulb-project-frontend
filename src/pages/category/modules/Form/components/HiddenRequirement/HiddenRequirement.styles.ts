import styled, { css } from 'styled-components';

const HiddenRequirement = styled.input<{ isInteractive: boolean }>(({ isInteractive }) =>
  isInteractive
    ? css`
        width: 1rem;
        height: 1rem;
        opacity: 0;
        visibility: hidden;
      `
    : css`
        width: 0;
        height: 0;
        opacity: 0;
        display: none;
        pointer-events: none;
      `
);

export default { HiddenRequirement };
