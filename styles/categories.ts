import styled from 'styled-components';
import { Flex, Text } from 'ustudio-ui';

const Container = styled(Flex)`
  height: 100%;
  min-height: 100vh;
`;

const Categories = styled(Flex)`
  max-width: 1024px;
  min-height: 100vh;

  padding: var(--i-regular) 0;
`;

const ListTitle = styled(Text)`
  margin-bottom: 41px;
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
`;

const CardDescription = styled(Text)`
  margin-bottom: var(--i-regular);
  
  color: var(--c-dark);
`;

const ClassificationDescription = styled(Text)`
  margin-left: 6px;
  color: var(--c-dark);
`;

export default {
  Container,
  Categories,
  ListTitle,
  Card,
  CardTitle,
  CardDescription,
  ClassificationDescription,
};
