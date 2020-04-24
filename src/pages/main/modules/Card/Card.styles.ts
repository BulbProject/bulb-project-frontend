import styled from 'styled-components';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

import { Link as RouterLink } from 'react-router-dom';

import ReloadIconEl from '../../../../assets/icons/reload.inline.svg';

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

const CardTitle = styled(Text)`
  margin-bottom: var(--i-medium);

  color: var(--c-darkest);
  transition(var--transition)
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
  Link,
  Card,
  BaseCard,
  CardTitle,
  ReloadIcon,
};
