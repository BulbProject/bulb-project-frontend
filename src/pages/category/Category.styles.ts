import styled from 'styled-components';
import Button from 'ustudio-ui/components/Button';

const Wrapper = styled.div`
  margin-top: calc(var(--i-large) * -1);
  padding: var(--i-large);

  background-color: #f0f5f2;
`;

const RetryButton = styled(Button)`
  margin-top: var(--i-large);
`;

export default { Wrapper, RetryButton };
