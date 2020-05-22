import styled, { css } from 'styled-components';
import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';

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

export default { Group, GroupTitle, Tab, Overlay };
