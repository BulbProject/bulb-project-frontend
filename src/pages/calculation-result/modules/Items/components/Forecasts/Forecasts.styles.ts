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

export default { Forecasts, ObservationTitle };
