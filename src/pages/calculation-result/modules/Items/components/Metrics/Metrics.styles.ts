import styled from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';

const ObservationTitle = styled(Flex)`
  white-space: nowrap;
  overflow: hidden;
`;

const Dots = styled(Flex)`
  border-bottom: 1px dotted var(--c-neutral);

  transform: translateY(-4px);
`;

export default { ObservationTitle, Dots };
