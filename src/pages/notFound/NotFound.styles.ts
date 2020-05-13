import styled from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import { Mixin } from 'ustudio-ui/theme';

const Content = styled(Flex)`
  margin-top: 7rem;
`;

const ErrorStatus = styled(Text)`
  ${Mixin.Font.h1()};

  font-size: 6rem;
`;

const Logo = styled.img`
  width: 4rem;
`;

export default { Content, ErrorStatus, Logo };
