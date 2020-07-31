import styled, { css } from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import { Mixin } from 'ustudio-ui/theme';

import layoutConfig from '../layout.config';

const Title = styled(Text)`
  text-transform: uppercase;
`;

const RequestedNeed = styled(Flex)`
  ${Mixin.Screen.xs(css`
    min-width: ${layoutConfig.requestedNeedWidth}px;
  `)};
`;

const Styled = { Title, RequestedNeed };

export default Styled;
