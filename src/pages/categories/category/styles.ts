import styled, { css } from 'styled-components';
import { Button, Grid, Text } from 'ustudio-ui';
import { Mixin } from 'ustudio-ui/theme';

import ClassificationComponent from 'components/Classification';

const Wrapper = styled.div`
  background-color: var(--c-light);

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

const CategoryDescription = styled(Text)`
  color: var(--c-dark);

  margin-top: var(--i-medium);
`;

const Classification = styled(ClassificationComponent)`
  margin-top: var(--i-regular);
`;

const RetryButton = styled(Button)`
  margin-top: var(--i-large);
`;

export default { Wrapper, Container, CategoryDescription, Classification, RetryButton };
