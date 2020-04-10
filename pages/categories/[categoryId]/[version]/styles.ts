import styled from 'styled-components';
import { Button, Text } from 'ustudio-ui';

import ClassificationComponent from '../../../../components/Classification';

const Container = styled.div`
  background-color: var(--c-light);

  padding: var(--i-large) 0;
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

export default { Container, CategoryDescription, Classification, RetryButton };
