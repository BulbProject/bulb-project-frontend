import styled from 'styled-components';

import { Button, Text } from 'ustudio-ui';

const CenteredContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`;

const ErrorText = styled(Text)`
  margin: var(--i-large) 0 var(--i-regular);

  color: var(--c-negative);
`;

const Icon = styled.img`
  width: 1rem;

  margin-right: var(--i-medium);
`;

const RefreshButton = styled(Button)`
  margin-left: var(--i-regular);
`;

export default { CenteredContainer, ErrorText, Icon, RefreshButton };
