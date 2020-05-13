import styled, { css } from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';
import Grid from 'ustudio-ui/components/Grid/Grid';
import Cell from 'ustudio-ui/components/Grid/Cell';
import UIModal from 'ustudio-ui/components/Modal';
import { Mixin } from 'ustudio-ui/theme';

import { StepStyled } from './components/Step';
import { stepCircleDimension, stepProgressHeight, stepHeight } from './Stepper.module';

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

  padding: 0 var(--i-large);

  ${Mixin.Screen.md(css`
    padding: 0;
  `)}
`;

const Step = styled(Cell)`
  margin: var(--i-regular) 0;
  padding: var(--i-regular);

  border: 1px solid var(--c-light);
  border-radius: var(--border-radius);

  transition: var(--transition);
`;

const Modal = styled(UIModal)`
  margin: var(--i-large);
  width: 50%;
`;

export default { Stepper, Container, Modal, Step };
