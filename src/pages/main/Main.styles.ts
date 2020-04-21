import styled from 'styled-components';
import { Text } from 'ustudio-ui';

const LoaderContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`;

const ListTitle = styled(Text)`
  margin-bottom: var(--i-large);
`;

export default {
  LoaderContainer,
  ListTitle,
};
