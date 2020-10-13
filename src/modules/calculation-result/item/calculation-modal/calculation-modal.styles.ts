import styled from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';
import { NumberInput } from 'ustudio-ui';

const WarningContainer = styled(Flex)`
  height: 5px;
  margin-bottom: 20px;
`;

const Input = styled(NumberInput)`
  margin-top: 10px;
`;

const Styled = { WarningContainer, Input };

export default Styled;
