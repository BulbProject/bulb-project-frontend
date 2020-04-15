import styled, { css } from 'styled-components';

import { Flex, Grid } from 'ustudio-ui';

import Styled from './components/Step/styles';
import { stepCircleDimension, stepProgressHeight, stepHeight } from '../../config';

const Stepper = styled(Flex)<{ length: number }>(
  ({ length }) => css`
    height: ${`${length > stepHeight ? stepHeight * 2 : stepHeight}rem`};

    ${Styled.Step} {
      width: ${`${100 / length}%`};

      ${length > 4
        ? css`
            &:nth-child(2n - 1) {
              align-self: flex-end;

              ${Styled.StepCircle} {
                top: -${stepCircleDimension / 2}rem;
              }

              ${Styled.StepProgress} {
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
  margin-top: var(--i-large);
`;

const ButtonsContainer = styled(Flex)`
  margin: var(--i-large) 0;
`;

export default { Stepper, Container, ButtonsContainer };
