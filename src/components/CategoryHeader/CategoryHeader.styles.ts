import styled from 'styled-components';
import Text from 'ustudio-ui/components/Text';
import { Classification as ClassificationComponent } from '../../shared/Classification';

const Wrapper = styled.div`
  margin-top: calc(var(--i-large) * -1);
  padding: var(--i-large);

  background-color: #f0f5f2;
`;

const CategoryTitle = styled(Text)`
  margin-bottom: var(--i-large);

  font-weight: 300;
`;

const CategoryDescription = styled(Text)`
  margin-top: var(--i-medium);

  color: var(--c-dark);
`;

const Classification = styled(ClassificationComponent)`
  margin-top: var(--i-regular);
`;

export default { Wrapper, CategoryTitle, CategoryDescription, Classification };
