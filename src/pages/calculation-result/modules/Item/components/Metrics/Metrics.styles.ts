import styled from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';

const Metrics = styled(Flex)`
  margin-top: var(--i-large);
  padding-top: var(--i-regular);

  border-top: 1px solid var(--c-light);
`;

const ObservationTitle = styled(Flex)`
  white-space: nowrap;
  overflow: hidden;
`;

export default { Metrics, ObservationTitle };
