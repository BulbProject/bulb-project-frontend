import styled from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';
import Button from 'ustudio-ui/components/Button';

export const RequestedNeed = styled(Flex)`
  position: sticky;
  top: calc(var(--i-large) + 64px);
`;

export const Recalculate = styled(Button)`
  width: 100%;
  padding: var(--i-regular);
`;

export default { RequestedNeed, Recalculate };
