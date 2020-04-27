import styled from 'styled-components';
import Button from 'ustudio-ui/components/Button';
import Text from 'ustudio-ui/components/Text';

import { Classification as ClassificationComponent } from 'shared';

const Wrapper = styled.div`
  background-color: #f0f5f2;

  margin-top: calc(var(--i-large) * -1);
  padding: var(--i-large);
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

const RetryButton = styled(Button)`
  margin-top: var(--i-large);
`;

export default { Wrapper, CategoryTitle, CategoryDescription, Classification, RetryButton };
