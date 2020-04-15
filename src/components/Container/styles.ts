import styled, { css } from 'styled-components';
import { Grid } from 'ustudio-ui';
import { Mixin } from 'ustudio-ui/theme';

const Wrapper = styled.div`
  margin: var(--i-large) 0;
`;

const Container = styled(Grid)`
  padding: 0 var(--i-large);
  ${Mixin.Screen.xs(
    css`
      padding: 0;
    `
  )}
`;

export default {
  Wrapper,
  Container,
};
