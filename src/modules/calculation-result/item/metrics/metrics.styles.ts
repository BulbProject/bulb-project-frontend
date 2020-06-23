import styled from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';

const Metrics = styled(Flex)`
  padding-top: var(--i-regular);

  border-top: 1px solid var(--c-light);
`;

const Metric = styled(Flex)`
  :not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const Observation = styled(Flex)`
  position: relative;

  &:not(:first-child) {
    margin-bottom: var(--i-regular);
  }
`;

const Highlight = styled.div`
  position: absolute;
  top: -4px;
  left: -1rem;

  z-index: 9;

  height: 24px;
  width: calc(100vw - 1rem);

  background-color: var(--c-light);

  opacity: 0;

  transition: opacity var(--transition);

  &:hover {
    opacity: 1;
  }
`;

const ObservationTitle = styled(Flex)`
  white-space: nowrap;
  overflow: hidden;

  flex: calc(2 / 3);

  small {
    position: relative;
    z-index: 10;

    &:hover + ${Highlight} {
      opacity: 1;
    }
  }
`;

const ObservationMeasure = styled(Flex)`
  justify-content: center;

  white-space: nowrap;

  flex: calc(1 / 3);

  small {
    position: relative;
    z-index: 10;

    &:hover + ${Highlight} {
      opacity: 1;
    }
  }
`;

const Styled = { Metrics, Metric, Observation, ObservationTitle, ObservationMeasure, Highlight };

export default Styled;
