import styled, { css } from 'styled-components';
import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';
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

const JsonId = styled.button`
  ${Mixin.Style.inputPadding()};
  ${Mixin.Font.bodyRegular()};

  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: var(--i-regular);

  border-radius: var(--border-radius);

  background-color: var(--c-light);

  transition: color var(--transition);

  &:hover,
  &:focus {
    color: var(--c-secondary);
  }

  textarea {
    width: 100%;
    text-align: center;

    cursor: pointer;

    background: transparent;
    pointer-events: none;
  }
`;

export default { Group, GroupTitle, Tab, Overlay, JsonId };
