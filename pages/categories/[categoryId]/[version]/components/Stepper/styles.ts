import styled, { css } from 'styled-components';
import { Flex, Progress, Text } from 'ustudio-ui';
import { StepProps } from './props';

const circleDimension = 1;
const progressHeight = 0.5;
const stepHeight = 4;

const StepCircle = styled.div`
  width: ${circleDimension}rem;
  height: ${circleDimension}rem;

  position: absolute;
  left: 50%;

  transform: translateX(-50%);

  border-radius: ${circleDimension / 2}rem;

  transition: background-color var(--transition);
`;

const StepProgress = styled(Progress)`
  width: calc(100% - ${circleDimension * 2}rem);

  position: absolute;
  left: calc(-50% + ${circleDimension / 2}rem);

  margin: 0 var(--i-medium);

  cursor: default;

  &:after {
    animation: none;
    background: var(--c-primary);
  }
`;

const StepTitle = styled(Text)`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translateX(-50%) translateY(-50%);
`;

const Step = styled.div<Pick<StepProps, 'isActive'>>(
  ({ isActive }) => css`
    color: ${isActive ? 'var(--c-primary)' : 'var(--c-neutral)'};
    text-align: center;

    height: ${stepHeight}rem;

    position: relative;

    transition: color var(--transition);

    align-self: flex-start;

    ${StepCircle} {
      top: calc(100% - ${circleDimension / 2}rem);

      background-color: ${isActive ? 'var(--c-primary)' : 'var(--c-light)'};
    }

    ${StepProgress} {
      top: calc(100% - ${progressHeight / 2}rem);
    }
  `
);

const Stepper = styled(Flex)<{ length: number }>(
  ({ length }) => css`
    height: ${`${length > stepHeight ? stepHeight * 2 : stepHeight}rem`};

    ${Step} {
      width: ${`${100 / length}%`};

      ${length > 4
        ? css`
            &:nth-child(2n - 1) {
              align-self: flex-end;

              ${StepCircle} {
                top: -${circleDimension / 2}rem;
              }

              ${StepProgress} {
                top: -${progressHeight / 2}rem;
              }
            }
          `
        : ``}
    }
  `
);

export default { Stepper, Step, StepProgress, StepCircle, StepTitle };
