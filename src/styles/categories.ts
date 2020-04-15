import styled, { css } from 'styled-components';
import { Flex, Text, Grid, Placeholder } from 'ustudio-ui';
import { Mixin } from 'ustudio-ui/theme';
import { Link as RouterLink } from 'react-router-dom';

//@TODO add SVG
//import { ReactComponent as ReloadIconEl } from '../assets/icons/reload.svg';

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
  margin-bottom: var(--i-large);
`;

const Link = styled(RouterLink)`
  &:after {
    display: none;
  }
`;

const BaseCard = styled(Flex)`
  margin-bottom: var(--i-large);
  padding: var(--i-regular);
  border: 1px solid var(--c-light);
  box-sizing: border-box;
  border-radius: var(--border-radius);
  transition: var(--transition);
`;

const StubTitle = styled(Placeholder)`
  margin-bottom: var(--i-medium);
`;
const StubDescription = styled(Placeholder)`
  margin-bottom: var(--i-regular);
`;
const StubClassificationDescription = styled(Placeholder)`
  margin-left: var(--i-regular);
`;

const Card = styled(BaseCard)`
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

const ButtonContainer = styled(Flex)`
  margin-top: var(--i-large);
`;
const ReloadIcon = styled.div`
  width: 2rem;
  height: 2rem;
  display: inline-block;
  color: var(--c-primary);
  transition: var(--transition);
  &:hover {
    transform: rotate(90deg);
  }
`;

export default {
  Wrapper,
  Container,
  ListTitle,
  Link,
  Card,
  BaseCard,
  StubTitle,
  StubDescription,
  StubClassificationDescription,
  CardTitle,
  CardDescription,
  ButtonContainer,
  ReloadIcon,
};
