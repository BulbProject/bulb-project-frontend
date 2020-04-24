import styled from 'styled-components';
import Button from 'ustudio-ui/components/Button';
import Text from 'ustudio-ui/components/Text';

import { Classification as ClassificationComponent } from 'shared';

const Wrapper = styled.div`
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

export default { Wrapper, CategoryDescription, Classification, RetryButton };
