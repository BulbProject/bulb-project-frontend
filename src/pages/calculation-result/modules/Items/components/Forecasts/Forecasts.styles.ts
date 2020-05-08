import styled from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';

const Forecasts = styled(Flex)`
  flex-direction: column;

  padding: var(--i-regular) 0;
  margin-bottom: var(--i-regular);

  border-top: 1px solid var(--c-light);
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

export default { Forecasts, ObservationTitle, Dots };
