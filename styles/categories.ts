import styled, { css } from 'styled-components';
import { Flex, Text, Grid } from 'ustudio-ui';
import { Mixin } from 'ustudio-ui/theme';

const Wrapper = styled.div`
  padding: var(--i-large) 0;
`;

const Container = styled(Grid)`
  padding: 0 var(--i-large);
  ${Mixin.Screen.xs(
    css`
      padding: 0;
    `
  )}
`;

const ListTitle = styled(Text)`
  margin-bottom: 41px;
`;

const Link = styled.a`
  &:after {
    height: 0;
  }
`;

const Card = styled(Flex)`
  margin-bottom: var(--i-large);
  padding: var(--i-regular);

  border: 1px solid var(--c-light);
  box-sizing: border-box;
  border-radius: var(--border-radius);

  transition: var(--transition);

  &:hover {
    border: 1px solid var(--c-primary);
    box-shadow: var(--s-primary);
  }
  &:focus {
    border: 1px solid var(--c-primary);
  }
`;

const CardTitle = styled(Text)`
  margin-bottom: var(--i-medium);
  color: var(--c-darkest);
`;

const CardDescription = styled(Text)`
  margin-bottom: var(--i-regular);

  color: var(--c-dark);
`;

const ClassificationDescription = styled(Text)`
  margin-left: 6px;
  color: var(--c-dark);
`;
const ClassificationId = styled(Text)`
  color: var(--c-darkest);
`;

export default {
  Wrapper,
  Container,
  ListTitle,
  Link,
  Card,
  CardTitle,
  CardDescription,
  ClassificationId,
  ClassificationDescription,
};
