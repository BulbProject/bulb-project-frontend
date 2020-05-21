import styled from 'styled-components';
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

export default { Group, GroupTitle, Tab };
