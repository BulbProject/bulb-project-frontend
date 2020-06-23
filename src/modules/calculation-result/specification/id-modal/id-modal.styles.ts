import styled, { css, keyframes } from 'styled-components';
import Button from 'ustudio-ui/components/Button';
import Text from 'ustudio-ui/components/Text';
import { Mixin } from 'ustudio-ui/theme';

const CopyButton = styled(Button)`
  svg {
    height: 0.75rem;
    width: auto;

    margin-left: var(--i-medium);
  }
`;

const SmallBold = styled(Text)`
  font-weight: 700;

  margin: var(--i-medium) 0 var(--i-regular);
`;

const popUp = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, 0);
  }
  
  25%,
  50%,
  75% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
  
  100% {
    opacity: 0;
    transform: translate(-50%, 0);
  }
`;

const Tooltip = styled(Text)<{ isShown: boolean }>(
  ({ isShown }) => css`
    ${Mixin.Style.inputPadding()};
    ${Mixin.Font.bodySmall()};

    position: absolute;
    top: 50%;
    left: 50%;

    z-index: 2;

    opacity: 0;

    transform: translate(-50%, 0);

    transition: var(--transition);

    color: var(--c-white);
    background-color: var(--c-secondary);

    ${isShown
      ? css`
          animation: ${popUp} 2s ease-in-out;
        `
      : ``};
  `
);

const Styled = { CopyButton, SmallBold, Tooltip };

export default Styled;
