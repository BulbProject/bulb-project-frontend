import styled from 'styled-components';

import Button from 'ustudio-ui/components/Button';

const CenteredContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`;

const ActionButton = styled(Button)`
  svg {
    width: var(--i-regular);

    margin-right: var(--i-medium);
  }
`;

export default { CenteredContainer, ActionButton };
