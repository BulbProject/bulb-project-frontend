import styled from 'styled-components';
import Text from 'ustudio-ui/components/Text';
import { Classification as ClassificationComponent } from '../classification';

const Wrapper = styled.div`
  padding: var(--i-large) 0;

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

const Styled = { Wrapper, CategoryTitle, CategoryDescription, Classification };

export default Styled;
