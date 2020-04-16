import styled from 'styled-components';
import { Flex, Text, Placeholder } from 'ustudio-ui';

import { Link as RouterLink } from 'react-router-dom';

import ReloadIconEl from '../assets/icons/reload.inline.svg';

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

const CardTitle = styled(Text)`
  margin-bottom: var(--i-medium);

  color: var(--c-darkest);
  transition(var--transition)
`;

const CardDescription = styled(Text)`
  margin-bottom: var(--i-regular);
  color: var(--c-dark);
`;

const Card = styled(BaseCard)`
  &:hover {
    border: 1px solid var(--c-primary);
    box-shadow: var(--s-primary);
  }

  &:focus {
    border: 1px solid var(--c-primary);
  }
  &:active {
    ${CardTitle} {
      color: var(--c-primary);
    }
  }
`;

const ButtonContainer = styled(Flex)`
  margin-top: var(--i-large);
`;

const ReloadIcon = styled(ReloadIconEl)`
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
