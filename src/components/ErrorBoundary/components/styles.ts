import styled from 'styled-components';
import { Text, Flex } from 'ustudio-ui';

const Content = styled(Flex)`
  margin-top: 4rem;
`;

const Logo = styled.img`
  width: 4rem;
  margin-bottom: 2rem;
`;

const ErrorDescription = styled(Text)`
  color: var(--c-dark);
`;

const ButtonsContainer = styled(Flex)`
  margin: 2rem 0;
`;

export default { Content, ErrorDescription, Logo, ButtonsContainer };
