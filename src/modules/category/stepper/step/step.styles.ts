import styled, { css } from 'styled-components';
import Progress from 'ustudio-ui/components/Progress';
import Text from 'ustudio-ui/components/Text';

import stepConfig from './step.config';

const StepCircle = styled.div`
  width: ${stepConfig.circleDimension}rem;
  height: ${stepConfig.circleDimension}rem;

  position: absolute;
  left: 50%;

  transform: translateX(-50%);

  border-radius: ${stepConfig.circleDimension / 2}rem;

  transition: background-color var(--transition);
`;

const StepProgress = styled(Progress)`
  height: ${stepConfig.progressHeight}rem;
  width: calc(100% - ${1 + stepConfig.circleDimension}rem);

  position: absolute;
  left: calc(-50% + ${stepConfig.circleDimension / 2}rem);

  margin: 0 var(--i-medium);

  cursor: default;

  &:after {
    animation: none;
    background: var(--c-primary);

    transition: width var(--transition);
  }
`;

const StepTitle = styled(Text)`
  width: 100%;

  position: absolute;
  top: 50%;
  left: 50%;

  transform: translateX(-50%) translateY(-50%);
`;

const Step = styled.div<{ isActive: boolean }>(
  ({ isActive }) => css`
    color: ${isActive ? 'var(--c-primary)' : 'var(--c-neutral)'};
    text-align: center;

    height: ${stepConfig.height}rem;
    align-self: flex-start;

    position: relative;

    transition: color var(--transition);
    transition-property: color;

    &,
    ${StepCircle} {
      transition-delay: ${isActive ? 300 : 0}ms;
    }

    ${StepCircle} {
      top: calc(100% - ${stepConfig.circleDimension / 2}rem);

      background-color: ${isActive ? 'var(--c-primary)' : 'var(--c-light)'};

      transition-property: background-color;
    }

    ${StepProgress} {
      top: calc(100% - ${stepConfig.progressHeight / 2}rem);
    }
  `
);

const Styled = { Step, StepCircle, StepProgress, StepTitle };

export default Styled;
