import styled, { css } from 'styled-components';
import Button from 'ustudio-ui/components/Button';

const StepperButton = styled(Button)<{ isActive: boolean }>(
  ({ isActive }) => css`
    width: 100%;
    margin: var(--i-large);

    transition: height var(--transition);

    ${isActive
      ? css`
          opacity: 1;
          pointer-events: auto;
        `
      : css`
          opacity: 0;
          pointer-events: none;
        `};
  `
);

export default { StepperButton };
