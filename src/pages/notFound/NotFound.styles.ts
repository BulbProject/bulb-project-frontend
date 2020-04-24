import styled from 'styled-components';
import { Text, Flex } from 'ustudio-ui';
import { Mixin } from 'ustudio-ui/theme';

const Content = styled(Flex)`
  margin-top: 4rem;
`;

const ErrorStatus = styled(Text)`
  ${Mixin.Font.h1()}

  font-size: 6rem;
`;

const Logo = styled.img`
  width: 4rem;
`;

export default { Content, ErrorStatus, Logo };
