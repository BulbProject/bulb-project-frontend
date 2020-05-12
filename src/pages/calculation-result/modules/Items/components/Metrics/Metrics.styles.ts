import styled from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';

const Metrics = styled(Flex)`
  flex-direction: column;

  margin-bottom: var(--i-regular);

  border-bottom: 1px solid var(--c-light);
`;

const ObservationTitle = styled(Flex)`
  white-space: nowrap;
  overflow: hidden;
`;

const Dots = styled(Flex)`
  border-bottom: 1px dotted var(--c-neutral);

  transform: translateY(-4px);
`;

export default { Metrics, ObservationTitle, Dots };
