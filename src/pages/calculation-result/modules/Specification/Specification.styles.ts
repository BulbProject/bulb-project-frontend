import styled, { css, keyframes } from 'styled-components';
import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';
import Button from 'ustudio-ui/components/Button';
import { Mixin } from 'ustudio-ui/theme';

const Group = styled(Flex).attrs(() => ({
  direction: 'column',
  alignment: {
    horizontal: 'center',
  },
}))`
  &:not(:last-child) {
    margin-bottom: var(--i-large);
  }

  textarea {
    ${Mixin.Style.inputPadding()};
    ${Mixin.Font.bodySmall()};

    width: 100%;
    text-align: center;

    cursor: pointer;

    background: var(--c-light);
    pointer-events: none;
  }
`;

const GroupTitle = styled(Text).attrs(() => ({
  appearance: 'bold',
}))`
  color: var(--c-secondary);

  margin-bottom: var(--i-regular);
`;

const Tab = styled(Text)`
  position: relative;

  z-index: 3;
`;

const Overlay = styled.div<{ isActive: boolean }>(
  ({ isActive }) => css`
    position: absolute;

    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    z-index: 2;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: var(--c-darkest);

    opacity: ${isActive ? 0.5 : 0};
    pointer-events: none;

    transition: opacity;
  `
);

const CopyButton = styled(Button)`
  margin: var(--i-regular) 0 0;

  svg {
    height: 0.75rem;
    width: auto;

    margin-left: var(--i-medium);
  }
`;

const SmallBold = styled(Text)`
  font-weight: 700;

  margin: var(--i-medium) 0 var(--i-large);
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

    background-color: var(--c-light);

    ${isShown
      ? css`
          animation: ${popUp} 2s ease-in-out;
        `
      : ``};
  `
);

export default { Group, GroupTitle, Tab, Overlay, CopyButton, SmallBold, Tooltip };
