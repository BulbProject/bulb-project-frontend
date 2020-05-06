import styled from 'styled-components';
import Text from 'ustudio-ui/components/Text';
import { Classification as ClassificationComponent } from '../../shared/Classification';

const Wrapper = styled.div`
  margin-top: calc(var(--i-large) * -1);
  padding: var(--i-large);

  background-color: #f0f5f2;
`;

const CategoryTitle = styled(Text)`
  font-weight: 300;

  margin-bottom: var(--i-large);
`;

const CategoryDescription = styled(Text)`
  color: var(--c-dark);

  margin-top: var(--i-medium);
`;

const Classification = styled(ClassificationComponent)`
  margin-top: var(--i-regular);
`;

export default { Wrapper, CategoryTitle, CategoryDescription, Classification };
