import styled, { css } from 'styled-components';
import { Grid, Text } from 'ustudio-ui';
import { Mixin } from 'ustudio-ui/theme';

const Wrapper = styled.div`
  padding: var(--i-large) 0;
`;

const Container = styled(Grid).attrs(() => ({
  isContainer: true,
}))`
  padding: 0 var(--i-large);

  ${Mixin.Screen.xs(
    css`
      padding: 0;
    `
  )}
`;

const ErrorStatus = styled(Text)`
  font-size: 6rem;
`;

const Logo = styled.img`
  width: 4rem;
`;

const ErrorDescription = styled(Text)`
  color: var(--c-dark);
`;

export default { Wrapper, Container, ErrorStatus, ErrorDescription, Logo };
