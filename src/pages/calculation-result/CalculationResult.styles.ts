import styled from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';
import Button from 'ustudio-ui/components/Button';

const Wrapper = styled(Flex)`
  max-width: 100vw;

  padding: var(--i-large);
`;

const FilterButton = styled(Button)`
  svg {
    width: 0.7rem;

    margin-left: var(--i-medium);
    margin-top: 1px;
  }
`;

const RequestedNeed = styled(Flex)`
  flex: 0.5;
`;

export default { Wrapper, FilterButton, RequestedNeed };
