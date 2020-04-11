import styled, { css } from 'styled-components';
import { Flex, Progress, Text } from 'ustudio-ui';
import { StepProps } from './props';

const StepCircle = styled.div`
  width: 1rem;
  height: 1rem;

  position: absolute;
  left: 50%;

  transform: translateX(-50%);

  border-radius: 0.5rem;

  transition: background-color var(--transition);
`;

const StepProgress = styled(Progress)`
  width: calc(100% - 2rem);

  position: absolute;
  left: calc(-50% + 0.5rem);

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

    height: 4rem;

    position: relative;

    transition: color var(--transition);

    align-self: flex-start;

    ${StepCircle} {
      top: calc(100% - 0.5rem);

      background-color: ${isActive ? 'var(--c-primary)' : 'var(--c-light)'};
    }

    ${StepProgress} {
      top: calc(100% - 0.25rem);
    }
  `
);

const Stepper = styled(Flex)<{ length: number }>(
  ({ length }) => css`
    height: ${`${length > 4 ? 8 : 4}rem`};

    ${Step} {
      width: ${`${100 / length}%`};

      ${length > 4
        ? css`
            &:nth-child(2n - 1) {
              align-self: flex-end;

              ${StepCircle} {
                top: -0.5rem;
              }

              ${StepProgress} {
                top: -0.25rem;
              }
            }
          `
        : ``};
    }
  `
);

export default { Stepper, Step, StepProgress, StepCircle, StepTitle };
