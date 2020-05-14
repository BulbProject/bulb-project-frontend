import styled, { css } from 'styled-components';

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

const ObservationTitle = styled(Flex)`
  white-space: nowrap;
  overflow: hidden;
`;

const Highlight = styled.div(({ isHovered }: { isHovered: boolean }) => {
  return css`
    position: absolute;
    top: -4px;
    left: -1rem;
    right: -1rem;
    height: 24px;
    background-color: rgba(0, 0, 0, 0.05);
    opacity: ${isHovered ? 1 : 0};
    transition: var(--transition);
  `;
});

export default { Metrics, Metric, Observation, ObservationTitle, Highlight };
