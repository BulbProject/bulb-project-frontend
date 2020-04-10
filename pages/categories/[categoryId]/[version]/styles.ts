import styled from 'styled-components';
import { Grid, Text } from 'ustudio-ui';

import ClassificationComponent from '../../../../components/Classification';

const Container = styled(Grid)`
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

export default { Container, CategoryDescription, Classification };
