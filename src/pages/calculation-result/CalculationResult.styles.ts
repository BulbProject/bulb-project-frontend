import styled from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';
import Button from 'ustudio-ui/components/Button';

const Wrapper = styled(Flex)`
  max-width: 100vw;

  margin: calc(var(--i-large) * -1) 0;
  padding: 0 var(--i-large) 0;
`;

const FilterButton = styled(Button)`
  svg {
    width: 0.7rem;

    margin-left: var(--i-medium);
    margin-top: 1px;
  }
`;

const RequestedNeed = styled(Flex)`
  width: 380px;
`;

export default { Wrapper, FilterButton, RequestedNeed };
