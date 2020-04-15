import styled from 'styled-components';
import { Text } from 'ustudio-ui';

const Requirement = styled.div`
  &:not(:last-child) {
    margin-bottom: var(--i-regular);
  }
`;

const Title = styled(Text)`
  margin-bottom: var(--i-small);
`;

export default { Requirement, Title };
