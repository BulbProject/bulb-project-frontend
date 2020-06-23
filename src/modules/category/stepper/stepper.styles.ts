import styled, { css } from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import { Mixin } from 'ustudio-ui/theme';

import stepConfig from './step/step.config';
import StepStyles from './step/step.styles';

const { Step, StepCircle, StepProgress } = StepStyles;

const Stepper = styled(Flex)<{ length: number }>(
  ({ length }) => css`
    padding: 0 var(--i-large);
    margin-top: var(--i-regular);

    ${Step} {
      width: ${`${100 / length}%`};

      ${length > 4
        ? css`
            &:nth-child(2n - 1) {
              align-self: flex-end;

              ${StepCircle} {
                top: -${stepConfig.circleDimension / 2}rem;
              }

              ${StepProgress} {
                top: -${stepConfig.progressHeight / 2}rem;
              }
            }
          `
        : ``}
    }

    ${Mixin.Screen.md(css`
      height: ${`${length > stepConfig.height ? stepConfig.height * 2 : stepConfig.height}rem`};

      padding: 0;

      margin-bottom: var(--i-large);
      margin-top: 0;
    `)}
  `
);

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

const Styled = { Stepper, MobileStep, Description };

export default Styled;
