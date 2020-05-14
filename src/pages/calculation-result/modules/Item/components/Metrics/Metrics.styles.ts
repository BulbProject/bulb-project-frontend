import styled from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';

const Metrics = styled(Flex)`
  padding-top: var(--i-regular);

  border-top: 1px solid var(--c-light);
`;

const Metric = styled(Flex)`
  margin-bottom: 1.5rem;
`;

const Observation = styled(Flex)`
  &:not(:first-child) {
    margin-bottom: var(--i-regular);
  }
`;

const ObservationTitle = styled(Flex)`
  white-space: nowrap;
  overflow: hidden;
`;

export default { Metrics, Metric, Observation, ObservationTitle };
