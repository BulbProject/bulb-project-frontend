import styled, { css } from 'styled-components';
import { Button } from 'ustudio-ui';

const StepperButton = styled(Button)<{ isActive: boolean }>(({ isActive }) =>
  isActive
    ? css`
        opacity: 1;
        pointer-events: auto;
      `
    : css`
        opacity: 0;
        pointer-events: none;
      `
);

export default { StepperButton };
