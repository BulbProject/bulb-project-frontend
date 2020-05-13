import styled, { css } from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import Grid from 'ustudio-ui/components/Grid/Grid';
import Cell from 'ustudio-ui/components/Grid/Cell';
import UIModal from 'ustudio-ui/components/Modal';
import { Mixin } from 'ustudio-ui/theme';

import { StepStyled } from './components/Step';
import { stepCircleDimension, stepProgressHeight, stepHeight } from './Stepper.module';

const Stepper = styled(Flex)<{ length: number }>(
  ({ length }) => css`
    padding: 0 var(--i-large);
    margin-top: var(--i-regular);

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

    ${Mixin.Screen.md(css`
      height: ${`${length > stepHeight ? stepHeight * 2 : stepHeight}rem`};

      padding: 0;

      margin-bottom: var(--i-large);
      margin-top: 0;
    `)}
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
  width: 100%;

  ${Mixin.Screen.md(css`
    width: 50%;
    margin: var(--i-large);
  `)}
`;

const MobileStep = styled(Text)`
  position: sticky;
  top: 4rem;
`;

const Description = styled(Text)`
  padding: 0 var(--i-large);
  margin-top: var(--i-regular);

  ${Mixin.Screen.md(css`
    padding: 0;
    margin-top: 0;
  `)}
`;

const MobileButtonsContainer = styled(Grid)`
  grid-gap: 1rem;
`;

export default { Stepper, Container, Modal, Step, MobileStep, Description, MobileButtonsContainer };
