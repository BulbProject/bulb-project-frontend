import styled, { css } from 'styled-components';

import Grid from 'ustudio-ui/components/Grid/Grid';
import { Mixin } from 'ustudio-ui/theme';

const Container = styled(Grid)`
  padding: 0 var(--i-large);

  ${Mixin.Screen.md(
    css`
      padding: 0;
    `
  )}
`;

const Styled = {
  Container,
};

export default Styled;
