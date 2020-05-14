import styled, { css } from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';

const Metric = styled(Flex)(({ economy }: { economy: boolean }) => {
  return economy
    ? css`
        position: relative;

        &:before {
          content: '';

          position: absolute;
          top: -6px;
          bottom: 10px;
          left: -6px;
          right: -6px;

          border: 2px solid var(--c-negative);
          border-radius: var(--i-small);
        }
      `
    : '';
});

const ObservationTitle = styled(Flex)`
  white-space: nowrap;
  overflow: hidden;
`;

const Dots = styled(Flex)`
  border-bottom: 1px dotted var(--c-neutral);

  transform: translateY(-4px);
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

export default { Metric, ObservationTitle, Dots, Highlight };
