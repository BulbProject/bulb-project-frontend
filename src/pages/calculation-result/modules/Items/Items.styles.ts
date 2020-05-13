import styled from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';

const Items = styled(Flex)`
  position: relative;

  overflow-x: hidden;

  &:after {
    content: '';

    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;

    width: 30px;

    background-image: linear-gradient(to left, rgba(222, 222, 222, 0.7), rgba(222, 222, 222, 0));

    pointer-events: none;
  }
`;

export default { Items };
