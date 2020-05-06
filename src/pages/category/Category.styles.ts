import styled from 'styled-components';
import Button from 'ustudio-ui/components/Button';

const Wrapper = styled.div`
  background-color: #f0f5f2;

  margin-top: calc(var(--i-large) * -1);
  padding: var(--i-large);
`;

const RetryButton = styled(Button)`
  margin-top: var(--i-large);
`;

export default { Wrapper, RetryButton };
