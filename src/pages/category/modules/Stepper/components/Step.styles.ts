import styled, { css } from 'styled-components';
import { Progress, Text } from 'ustudio-ui';

import { StepProps } from './Step.types';
import { stepCircleDimension, stepHeight, stepProgressHeight } from '../Stepper.config';

const StepCircle = styled.div`
  width: ${stepCircleDimension}rem;
  height: ${stepCircleDimension}rem;

  position: absolute;
  left: 50%;

  transform: translateX(-50%);

  border-radius: ${stepCircleDimension / 2}rem;

  transition: background-color var(--transition);
`;

const StepProgress = styled(Progress)`
  height: ${stepProgressHeight}rem;
  width: calc(100% - ${1 + stepCircleDimension}rem);

  position: absolute;
  left: calc(-50% + ${stepCircleDimension / 2}rem);

  margin: 0 var(--i-medium);

  cursor: default;

  &:after {
    animation: none;
    background: var(--c-primary);

    transition: width var(--transition);
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
    align-self: flex-start;

    position: relative;

    transition: color var(--transition);
    transition-property: color;

    &,
    ${StepCircle} {
      transition-delay: ${isActive ? 300 : 0}ms;
    }

    ${StepCircle} {
      top: calc(100% - ${stepCircleDimension / 2}rem);

      background-color: ${isActive ? 'var(--c-primary)' : 'var(--c-light)'};

      transition-property: background-color;
    }

    ${StepProgress} {
      top: calc(100% - ${stepProgressHeight / 2}rem);
    }
  `
);

export default { Step, StepCircle, StepProgress, StepTitle };
