import styled from 'styled-components';
import Text from 'ustudio-ui/components/Text';
import UIButton from 'ustudio-ui/components/Button';

const GroupTitle = styled(Text).attrs(() => ({
  appearance: 'bold',
}))`
  color: var(--c-secondary);

  margin-bottom: var(--i-large);
`;

const Tab = styled(Text)`
  position: relative;

  z-index: 3;
`;

const Button = styled(UIButton)`
  width: 50%;

  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

const Styled = { GroupTitle, Tab, Button };

export default Styled;
