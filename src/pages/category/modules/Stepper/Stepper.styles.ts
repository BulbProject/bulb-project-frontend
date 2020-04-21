import styled, { css } from 'styled-components';

import { Flex, Grid, Modal as UIModal } from 'ustudio-ui';

import { StepStyled } from './components/Step';
import { stepCircleDimension, stepProgressHeight, stepHeight } from './Stepper.config';

const Stepper = styled(Flex)<{ length: number }>(
  ({ length }) => css`
    height: ${`${length > stepHeight ? stepHeight * 2 : stepHeight}rem`};
    margin-bottom: var(--i-large);

    ${StepStyled.Step} {
      width: ${`${100 / length}%`};

      ${length > 4
        ? css`
            &:nth-child(2n - 1) {
              align-self: flex-end;

              ${StepStyled.StepCircle} {
                top: -${stepCircleDimension / 2}rem;
              }

              ${StepStyled.StepProgress} {
                top: -${stepProgressHeight / 2}rem;
              }
            }
          `
        : ``}
    }
  `
);

const Container = styled(Grid)`
  flex: 1;
`;

const Modal = styled(UIModal)`
  margin: var(--i-large);
  width: 50%;
`;

export default { Stepper, Container, Modal };
