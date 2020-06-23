import styled from 'styled-components';
import Text from 'ustudio-ui/components/Text';

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

const Styled = { GroupTitle, Tab };

export default Styled;
